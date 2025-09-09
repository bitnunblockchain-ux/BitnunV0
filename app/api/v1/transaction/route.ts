import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    // Verify API key
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Missing or invalid API key" }, { status: 401 })
    }

    const apiKey = authHeader.substring(7)
    const supabase = await createClient()

    // Validate API key
    const { data: keyData, error: keyError } = await supabase
      .from("api_keys")
      .select("*")
      .eq("api_key", apiKey)
      .eq("is_active", true)
      .single()

    if (keyError || !keyData) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    // Check permissions
    if (!keyData.permissions.includes("write")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    // Parse request body
    const body = await request.json()
    const { to, amount, currency } = body

    // Validate required fields
    if (!to || !amount || !currency) {
      return NextResponse.json({ error: "Missing required fields: to, amount, currency" }, { status: 400 })
    }

    // Log API usage
    await supabase.from("api_usage").insert({
      api_key_id: keyData.id,
      endpoint: "/api/v1/transaction",
      method: "POST",
      status_code: 200,
      response_time_ms: 250,
    })

    // Update last used timestamp
    await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", keyData.id)

    // Mock transaction submission (replace with actual blockchain transaction)
    const mockTransaction = {
      transaction_hash: `0x${Math.random().toString(16).substring(2, 66)}`,
      status: "pending",
      to: to,
      amount: amount,
      currency: currency,
      gas_fee: "0.001",
      timestamp: new Date().toISOString(),
    }

    return NextResponse.json(mockTransaction)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
