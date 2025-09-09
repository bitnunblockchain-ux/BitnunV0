import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

export async function POST(request: NextRequest) {
  try {
    const { amount, currency, payment_method_id, user_id } = await request.json()
    const supabase = createClient()

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency.toLowerCase(),
      payment_method: payment_method_id,
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payments/success`,
      metadata: {
        user_id,
        platform: "bitnun-eco",
      },
    })

    // Record transaction in database
    const { data: transaction } = await supabase
      .from("transactions")
      .insert({
        user_id,
        type: "payment",
        status: paymentIntent.status === "succeeded" ? "completed" : "pending",
        amount,
        currency,
        fee: amount * 0.029 + 0.3, // Stripe fees
        external_tx_id: paymentIntent.id,
        metadata: {
          stripe_payment_intent: paymentIntent.id,
          payment_method: payment_method_id,
        },
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      payment_intent: paymentIntent,
      transaction,
    })
  } catch (error) {
    console.error("Stripe payment error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}
