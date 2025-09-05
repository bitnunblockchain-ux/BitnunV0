import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const errorData = await request.json()

    // Log error for monitoring
    console.error("[v0] Client Error Report:", {
      timestamp: new Date().toISOString(),
      ...errorData,
    })

    // In production, you would send this to your error tracking service
    // Example: Sentry, LogRocket, Bugsnag, etc.

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error processing error report:", error)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
