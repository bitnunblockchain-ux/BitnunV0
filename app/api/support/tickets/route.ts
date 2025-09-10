import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const priority = searchParams.get("priority")

    const supabase = await createClient()

    let query = supabase
      .from("support_tickets")
      .select(`
        *,
        ticket_messages (
          id,
          message,
          is_ai_generated,
          created_at
        )
      `)
      .order("created_at", { ascending: false })

    if (status) query = query.eq("status", status)
    if (category) query = query.eq("category", category)
    if (priority) query = query.eq("priority", priority)

    const { data: tickets, error } = await query

    if (error) throw error

    return NextResponse.json({ tickets })
  } catch (error) {
    console.error("Fetch tickets error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        error: "Failed to fetch tickets",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { subject, description, category, priority, user_id } = await request.json()
    const supabase = await createClient()

    // Create ticket
    const { data: ticket, error } = await supabase
      .from("support_tickets")
      .insert({
        user_id,
        subject,
        description,
        category,
        priority,
      })
      .select()
      .single()

    if (error) throw error

    // Trigger AI analysis
    const aiAnalysis = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/support/ai-analyze`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subject,
        description,
        user_context: { user_id, category, priority },
      }),
    })

    return NextResponse.json({
      success: true,
      ticket,
      ai_analysis: await aiAnalysis.json(),
    })
  } catch (error) {
    console.error("Create ticket error:", error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        error: "Failed to create ticket",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
