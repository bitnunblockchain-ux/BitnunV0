import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, wallet_address, user_id, crypto_type } = await request.json()
    const supabase = createClient()

    // Generate payment address and amount for crypto payment
    const paymentData = await generateCryptoPayment(crypto_type, amount, currency)

    // Record pending transaction
    const { data: transaction } = await supabase
      .from("transactions")
      .insert({
        user_id,
        type: "payment",
        status: "pending",
        amount,
        currency,
        fee: amount * 0.015, // 1.5% crypto fee
        metadata: {
          crypto_type,
          payment_address: paymentData.address,
          required_amount: paymentData.crypto_amount,
          wallet_address,
          expires_at: new Date(Date.now() + 30 * 60 * 1000).toISOString(), // 30 min expiry
        },
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      payment_address: paymentData.address,
      required_amount: paymentData.crypto_amount,
      qr_code: paymentData.qr_code,
      transaction_id: transaction.id,
      expires_in: 1800, // 30 minutes
    })
  } catch (error) {
    console.error("Crypto payment error:", error)
    return NextResponse.json({ error: "Crypto payment setup failed" }, { status: 500 })
  }
}

async function generateCryptoPayment(crypto_type: string, amount: number, currency: string) {
  // Get current exchange rate
  const rate = await getCryptoExchangeRate(crypto_type, currency)
  const crypto_amount = amount / rate

  // Generate unique payment address (in production, use proper crypto payment processor)
  const payment_address = generatePaymentAddress(crypto_type)

  // Generate QR code for payment
  const qr_code = `data:image/svg+xml;base64,${Buffer.from(
    generateQRCodeSVG(`${crypto_type}:${payment_address}?amount=${crypto_amount}`),
  ).toString("base64")}`

  return {
    address: payment_address,
    crypto_amount,
    qr_code,
  }
}

function generatePaymentAddress(crypto_type: string): string {
  // Generate unique addresses based on crypto type
  const prefixes = {
    btc: "1",
    eth: "0x",
    usdc: "0x",
    usdt: "0x",
    btn: "btn",
  }

  const prefix = prefixes[crypto_type as keyof typeof prefixes] || "0x"
  const randomHex = Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")

  return `${prefix}${randomHex}`
}

async function getCryptoExchangeRate(crypto: string, fiat: string): Promise<number> {
  // In production, integrate with CoinGecko, CoinMarketCap, or similar
  const mockRates: Record<string, number> = {
    btc: 45000,
    eth: 2800,
    usdc: 1,
    usdt: 1,
    btn: 0.25,
  }

  return mockRates[crypto] || 1
}

function generateQRCodeSVG(data: string): string {
  // Simple QR code SVG generation (in production, use proper QR library)
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
    <rect width="200" height="200" fill="white"/>
    <text x="100" y="100" text-anchor="middle" font-size="12" fill="black">QR: ${data.slice(0, 20)}...</text>
  </svg>`
}
