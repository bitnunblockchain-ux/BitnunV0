import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const { amount, from_user_id, to_user_id, description } = await request.json()
    const supabase = await createClient()

    // Check sender's BTN balance
    const { data: senderBalance } = await supabase
      .from("btn_balances")
      .select("balance")
      .eq("user_id", from_user_id)
      .single()

    if (!senderBalance || senderBalance.balance < amount) {
      return NextResponse.json({ error: "Insufficient BTN balance" }, { status: 400 })
    }

    // Execute BTN transfer (atomic transaction)
    const { data: transfer } = await supabase.rpc("transfer_btn", {
      from_user: from_user_id,
      to_user: to_user_id,
      transfer_amount: amount,
      transfer_description: description,
    })

    // Record transaction
    const { data: transaction } = await supabase
      .from("transactions")
      .insert({
        user_id: from_user_id,
        type: "payment",
        status: "completed",
        amount,
        currency: "BTN",
        fee: 0, // No fees for BTN native transfers
        metadata: {
          to_user_id,
          description,
          transfer_id: transfer.id,
        },
      })
      .select()
      .single()

    return NextResponse.json({
      success: true,
      transaction,
      new_balance: transfer.new_balance,
    })
  } catch (error) {
    console.error("BTN payment error:", error)
    return NextResponse.json({ error: "BTN payment failed" }, { status: 500 })
  }
}
