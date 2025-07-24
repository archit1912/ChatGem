import { config } from "./config"

const supabaseUrl = config.supabase.url
const supabaseAnonKey = config.supabase.anonKey

// This file is kept for compatibility but not used in test mode
export const supabase = null
export const createServerClient = () => null
