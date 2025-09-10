import { type NextRequest, NextResponse } from "next/server"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

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

  try {
    const price = billing === "yearly" ? plan.price_yearly : plan.price_monthly

    // Process payment through your hidden account system
    const paymentResult = await processCustomPayment({
      amount: price,
      currency: "usd",
      type: "subscription",
      userId,
      planSlug,
      billing,
    })

    if (paymentResult.success) {
      // Update user subscription in database
      await supabase.from("user_subscriptions").upsert({
        user_id: userId,
        plan_id: plan.id,
        status: "active",
        current_period_start: new Date().toISOString(),
        current_period_end: new Date(
          Date.now() + (billing === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000,
        ).toISOString(),
      })

      return NextResponse.json({
        success: true,
        subscription_id: paymentResult.transaction_id,
        message: "Subscription activated successfully",
      })
    } else {
      return NextResponse.json({ error: paymentResult.error }, { status: 400 })
    }
  } catch (error: any) {
    console.error("Custom payment error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
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

    const paymentResult = await processCustomPayment({
      amount,
      currency,
      type: "credits",
      userId,
      creditAmount,
    })

    if (paymentResult.success) {
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
      success: paymentResult.success,
      transaction_id: paymentResult.transaction_id,
      credits_added: paymentResult.success ? creditAmount : 0,
    })
  } catch (error: any) {
    console.error("Custom credits payment error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
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
    const paymentResult = await processCustomPayment({
      amount,
      currency,
      type: "one-time",
      userId,
      description,
    })

    if (paymentResult.success) {
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
      success: paymentResult.success,
      transaction_id: paymentResult.transaction_id,
    })
  } catch (error: any) {
    console.error("Custom one-time payment error:", error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }
}

async function processCustomPayment(paymentData: any) {
  // TODO: Integrate with your hidden account payment system
  // This is a placeholder - replace with your actual payment processing logic

  console.log("Processing custom payment:", paymentData)

  // Simulate successful payment for now
  return {
    success: true,
    transaction_id: `custom_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    message: "Payment processed successfully",
  }
}

// Helper function to add credits
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
