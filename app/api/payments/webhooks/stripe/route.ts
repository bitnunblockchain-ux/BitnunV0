import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature")!

    const event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    const supabase = await createClient()

    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Update transaction status
        await supabase
          .from("transactions")
          .update({
            status: "completed",
            updated_at: new Date().toISOString(),
          })
          .eq("external_tx_id", paymentIntent.id)

        // Credit user account if needed
        if (paymentIntent.metadata.user_id) {
          await creditUserAccount(paymentIntent.metadata.user_id, paymentIntent.amount / 100)
        }
        break

      case "payment_intent.payment_failed":
        const failedPayment = event.data.object as Stripe.PaymentIntent

        await supabase
          .from("transactions")
          .update({
            status: "failed",
            updated_at: new Date().toISOString(),
          })
          .eq("external_tx_id", failedPayment.id)
        break

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 400 })
  }
}

async function creditUserAccount(userId: string, amount: number) {
  const supabase = await createClient()

  // Add to user's USD balance
  await supabase.rpc("update_user_balance", {
    user_id: userId,
    amount: amount,
    currency: "USD",
  })

  // Send notification
  await supabase.from("notifications").insert({
    user_id: userId,
    title: "Payment Received",
    message: `Your account has been credited with $${amount.toFixed(2)}`,
    type: "payment",
  })
}
