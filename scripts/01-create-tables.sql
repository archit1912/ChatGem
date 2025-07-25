-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    tokens INTEGER DEFAULT 10 CHECK (tokens >= 0),
    is_admin BOOLEAN DEFAULT FALSE,
    last_free_reset DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant')),
    tokens_used INTEGER DEFAULT 1 CHECK (tokens_used >= 0),
    model_used VARCHAR(50) DEFAULT 'gemini-1.5-pro',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    order_id VARCHAR(255) UNIQUE NOT NULL,
    payment_id VARCHAR(255),
    cashfree_order_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    tokens_purchased INTEGER NOT NULL CHECK (tokens_purchased > 0),
    bonus_tokens INTEGER DEFAULT 0 CHECK (bonus_tokens >= 0),
    total_tokens INTEGER GENERATED ALWAYS AS (tokens_purchased + bonus_tokens) STORED,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
    payment_method VARCHAR(50),
    gateway_response JSONB,
    plan_name VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_logs table for debugging
CREATE TABLE IF NOT EXISTS payment_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    transaction_id UUID REFERENCES transactions(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL,
    event_data JSONB,
    webhook_signature VARCHAR(255),
    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user_sessions table for session management
CREATE TABLE IF NOT EXISTS user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_order_id ON transactions(order_id);
CREATE INDEX IF NOT EXISTS idx_transactions_status ON transactions(status);
CREATE INDEX IF NOT EXISTS idx_transactions_created_at ON transactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_logs_transaction_id ON payment_logs(transaction_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_token ON user_sessions(session_token);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at BEFORE UPDATE ON transactions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_sessions ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Messages policies
CREATE POLICY "Users can view own messages" ON messages
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own messages" ON messages
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Transactions policies
CREATE POLICY "Users can view own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admin policies (users with is_admin = true can see everything)
CREATE POLICY "Admins can view all users" ON users
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can view all messages" ON messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can view all transactions" ON transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Service role policies for webhooks and system operations
CREATE POLICY "Service role full access users" ON users
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access messages" ON messages
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access transactions" ON transactions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access payment_logs" ON payment_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Functions for common operations
CREATE OR REPLACE FUNCTION get_user_stats(user_uuid UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'total_messages', COUNT(m.id),
        'total_tokens_used', COALESCE(SUM(m.tokens_used), 0),
        'total_spent', COALESCE(SUM(t.amount), 0),
        'total_tokens_purchased', COALESCE(SUM(t.total_tokens), 0),
        'successful_transactions', COUNT(CASE WHEN t.status = 'completed' THEN 1 END)
    ) INTO result
    FROM users u
    LEFT JOIN messages m ON u.id = m.user_id
    LEFT JOIN transactions t ON u.id = t.user_id
    WHERE u.id = user_uuid
    GROUP BY u.id;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset daily free tokens
CREATE OR REPLACE FUNCTION reset_daily_free_tokens()
RETURNS INTEGER AS $$
DECLARE
    updated_count INTEGER;
BEGIN
    UPDATE users 
    SET 
        tokens = GREATEST(tokens, 10),
        last_free_reset = CURRENT_DATE,
        updated_at = NOW()
    WHERE 
        last_free_reset < CURRENT_DATE 
        AND tokens < 10;
    
    GET DIAGNOSTICS updated_count = ROW_COUNT;
    RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to add tokens to user
CREATE OR REPLACE FUNCTION add_tokens_to_user(user_uuid UUID, tokens_to_add INTEGER)
RETURNS INTEGER AS $$
DECLARE
    new_balance INTEGER;
BEGIN
    UPDATE users 
    SET 
        tokens = tokens + tokens_to_add,
        updated_at = NOW()
    WHERE id = user_uuid
    RETURNING tokens INTO new_balance;
    
    RETURN new_balance;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to use tokens
CREATE OR REPLACE FUNCTION use_user_tokens(user_uuid UUID, tokens_to_use INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    current_tokens INTEGER;
    success BOOLEAN := FALSE;
BEGIN
    SELECT tokens INTO current_tokens FROM users WHERE id = user_uuid;
    
    IF current_tokens >= tokens_to_use THEN
        UPDATE users 
        SET 
            tokens = tokens - tokens_to_use,
            updated_at = NOW()
        WHERE id = user_uuid;
        success := TRUE;
    END IF;
    
    RETURN success;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert default admin user (will be created via auth, this is just the profile)
INSERT INTO users (id, email, tokens, is_admin, created_at) 
VALUES (
    '00000000-0000-0000-0000-000000000001'::UUID,
    'admin@chatgem.com',
    10000,
    true,
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Create a scheduled job to reset daily free tokens (if pg_cron is available)
-- SELECT cron.schedule('reset-daily-tokens', '0 0 * * *', 'SELECT reset_daily_free_tokens();');
