import { Card, CardContent } from "@/components/ui/card"

export default function PaymentSuccessLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <h2 className="text-xl font-semibold mb-2">Loading Payment Status</h2>
          <p className="text-gray-600 text-center">Please wait while we load your payment information...</p>
        </CardContent>
      </Card>
    </div>
  )
}
