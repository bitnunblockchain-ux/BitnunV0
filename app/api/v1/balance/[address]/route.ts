import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest, { params }: { params: { address: string } }) {
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
    if (!keyData.permissions.includes("read")) {
      return NextResponse.json({ error: "Insufficient permissions" }, { status: 403 })
    }

    const { data: walletData, error: walletError } = await supabase
      .from("user_wallets")
      .select("balance, currency, updated_at")
      .eq("wallet_address", params.address)
      .single()

    if (walletError) {
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    const { data: marketData } = await supabase
      .from("trading_pairs")
      .select("price")
      .eq("base_token", walletData.currency)
      .eq("quote_token", "USDT")
      .single()

    const usdValue = marketData ? Number.parseFloat(walletData.balance) * marketData.price : 0

    // Log API usage
    await supabase.from("api_usage").insert({
      api_key_id: keyData.id,
      endpoint: `/api/v1/balance/${params.address}`,
      method: "GET",
      status_code: 200,
      response_time_ms: 150,
    })

    // Update last used timestamp
    await supabase.from("api_keys").update({ last_used_at: new Date().toISOString() }).eq("id", keyData.id)

    const realBalance = {
      address: params.address,
      balance: walletData.balance,
      currency: walletData.currency,
      usd_value: usdValue,
      last_updated: walletData.updated_at,
    }

    return NextResponse.json(realBalance)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
