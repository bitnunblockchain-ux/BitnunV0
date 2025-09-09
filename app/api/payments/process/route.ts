import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
})

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { type, planSlug, billing, amount, currency = "usd", paymentMethodId } = body

    switch (type) {
      case "subscription":
        return await processSubscription(supabase, user.id, planSlug, billing, paymentMethodId)

      case "credits":
        return await processCredits(supabase, user.id, amount, currency, paymentMethodId)

      case "one-time":
        return await processOneTimePayment(supabase, user.id, amount, currency, paymentMethodId, body.description)

      default:
        return NextResponse.json({ error: "Invalid payment type" }, { status: 400 })
    }
  } catch (error) {
    console.error("Payment processing error:", {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    })
    return NextResponse.json(
      {
        error: "Payment processing failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

async function processSubscription(
  supabase: any,
  userId: string,
  planSlug: string,
  billing: string,
  paymentMethodId: string,
) {
  // Get plan details
  const { data: plan, error: planError } = await supabase
    .from("subscription_plans")
    .select("*")
    .eq("slug", planSlug)
    .eq("is_active", true)
    .single()

  if (planError || !plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 })
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("email, full_name").eq("id", userId).single()

  try {
    // Create or retrieve Stripe customer
    let customer
    const { data: existingCustomer } = await supabase
      .from("stripe_customers")
      .select("stripe_customer_id")
      .eq("user_id", userId)
      .single()

    if (existingCustomer) {
      customer = await stripe.customers.retrieve(existingCustomer.stripe_customer_id)
    } else {
      customer = await stripe.customers.create({
        email: profile.email,
        name: profile.full_name,
        metadata: { user_id: userId },
      })

      // Store customer ID
      await supabase.from("stripe_customers").insert({
        user_id: userId,
        stripe_customer_id: customer.id,
      })
    }

    // Create subscription
    const price = billing === "yearly" ? plan.price_yearly : plan.price_monthly
    const interval = billing === "yearly" ? "year" : "month"

    // Create Stripe price if it doesn't exist
    const stripePrice = await stripe.prices.create({
      unit_amount: Math.round(price * 100), // Convert to cents
      currency: "usd",
      recurring: { interval },
      product_data: {
        name: `${plan.name} Plan`,
      },
    })

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: stripePrice.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { save_default_payment_method: "on_subscription" },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        user_id: userId,
        plan_slug: planSlug,
        billing: billing,
      },
    })

    // Update user subscription in database
    await supabase.from("user_subscriptions").upsert({
      user_id: userId,
      plan_id: plan.id,
      stripe_subscription_id: subscription.id,
      status: "pending",
      // These will be updated via webhooks when the subscription is confirmed
    })

    return NextResponse.json({
      success: true,
      subscription_id: subscription.id,
      client_secret: (subscription.latest_invoice as any)?.payment_intent?.client_secret,
    })
  } catch (stripeError: any) {
    console.error("Stripe subscription error:", stripeError)
    return NextResponse.json({ error: stripeError.message }, { status: 400 })
  }
}

async function processCredits(
  supabase: any,
  userId: string,
  amount: number,
  currency: string,
  paymentMethodId: string,
) {
  try {
    // Calculate credit amount (1 USD = 100 credits)
    const creditAmount = amount * 100

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to cents
      currency: currency,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/credits/success`,
      metadata: {
        user_id: userId,
        type: "credits",
        credit_amount: creditAmount.toString(),
      },
    })

    if (paymentIntent.status === "succeeded") {
      // Add credits to user account
      await addUserCredits(supabase, userId, creditAmount, "purchase", `Purchased ${creditAmount} credits`)

      // Record revenue
      await supabase.from("revenue_tracking").upsert(
        {
          date: new Date().toISOString().split("T")[0],
          revenue_type: "credits",
          amount: amount,
          currency: currency,
          user_count: 1,
          transaction_count: 1,
        },
        {
          onConflict: "date,revenue_type",
          ignoreDuplicates: false,
        },
      )
    }

    return NextResponse.json({
      success: true,
      payment_intent_id: paymentIntent.id,
      status: paymentIntent.status,
      credits_added: paymentIntent.status === "succeeded" ? creditAmount : 0,
    })
  } catch (stripeError: any) {
    console.error("Stripe credits error:", stripeError)
    return NextResponse.json({ error: stripeError.message }, { status: 400 })
  }
}

async function processOneTimePayment(
  supabase: any,
  userId: string,
  amount: number,
  currency: string,
  paymentMethodId: string,
  description: string,
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: currency,
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
      description: description,
      metadata: {
        user_id: userId,
        type: "one-time",
      },
    })

    if (paymentIntent.status === "succeeded") {
      // Record revenue
      await supabase.from("revenue_tracking").upsert(
        {
          date: new Date().toISOString().split("T")[0],
          revenue_type: "one-time",
          amount: amount,
          currency: currency,
          user_count: 1,
          transaction_count: 1,
        },
        {
          onConflict: "date,revenue_type",
          ignoreDuplicates: false,
        },
      )
    }

    return NextResponse.json({
      success: true,
      payment_intent_id: paymentIntent.id,
      status: paymentIntent.status,
    })
  } catch (stripeError: any) {
    console.error("Stripe one-time payment error:", stripeError)
    return NextResponse.json({ error: stripeError.message }, { status: 400 })
  }
}

// Helper function to add credits (called via RPC)
async function addUserCredits(
  supabase: any,
  userId: string,
  amount: number,
  transactionType: string,
  description: string,
) {
  // Update user credits
  const { error: updateError } = await supabase.from("user_credits").upsert({
    user_id: userId,
    balance: supabase.raw("balance + ?", [amount]),
    total_purchased:
      transactionType === "purchase" ? supabase.raw("total_purchased + ?", [amount]) : supabase.raw("total_purchased"),
    updated_at: new Date().toISOString(),
  })

  if (updateError) throw updateError

  // Record transaction
  await supabase.from("credit_transactions").insert({
    user_id: userId,
    amount: amount,
    type: transactionType,
    description: description,
  })
}
