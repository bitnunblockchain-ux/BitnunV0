import { type NextRequest, NextResponse } from "next/server"
import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const TicketAnalysisSchema = z.object({
  category: z.enum(["technical", "billing", "mining", "nft", "trading", "account", "general"]),
  priority: z.enum(["low", "medium", "high", "critical"]),
  sentiment: z.number().min(-1).max(1),
  confidence: z.number().min(0).max(1),
  suggested_response: z.string(),
  related_kb_articles: z.array(z.string()),
  escalation_needed: z.boolean(),
  estimated_resolution_time: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const { subject, description, user_context } = await request.json()
    const supabase = createClient()

    // Get relevant knowledge base articles
    const { data: kbArticles } = await supabase
      .from("knowledge_base")
      .select("title, content, category")
      .textSearch("search_vector", `${subject} ${description}`)
      .limit(5)

    // AI analysis of the ticket
    const { object: analysis } = await generateObject({
      model: openai("gpt-4-turbo"),
      schema: TicketAnalysisSchema,
      prompt: `Analyze this support ticket and provide categorization, priority, sentiment analysis, and suggested response.

Ticket Subject: ${subject}
Ticket Description: ${description}
User Context: ${JSON.stringify(user_context)}

Available Knowledge Base Articles:
${kbArticles?.map((article) => `- ${article.title}: ${article.content.slice(0, 200)}...`).join("\n")}

Provide:
1. Category classification
2. Priority level (critical for security/payment issues, high for blocking issues, medium for feature requests, low for general questions)
3. Sentiment score (-1 to 1, where -1 is very negative, 0 is neutral, 1 is positive)
4. Confidence in your analysis (0 to 1)
5. A helpful, professional suggested response
6. Related knowledge base article titles
7. Whether this needs human escalation
8. Estimated resolution time in minutes`,
    })

    // Store AI analysis
    const { data: ticket } = await supabase
      .from("support_tickets")
      .insert({
        subject,
        description,
        category: analysis.category,
        priority: analysis.priority,
        ai_category_confidence: analysis.confidence,
        ai_sentiment_score: analysis.sentiment,
        ai_suggested_response: analysis.suggested_response,
        metadata: {
          ai_analysis: analysis,
          related_articles: analysis.related_kb_articles,
          escalation_needed: analysis.escalation_needed,
          estimated_resolution_time: analysis.estimated_resolution_time,
        },
      })
      .select()
      .single()

    // Auto-assign to appropriate agent or AI if confidence is high
    if (analysis.confidence > 0.8 && !analysis.escalation_needed) {
      // Auto-respond with AI suggestion
      await supabase.from("ticket_messages").insert({
        ticket_id: ticket.id,
        user_id: null, // System/AI response
        message: analysis.suggested_response,
        is_ai_generated: true,
        ai_confidence: analysis.confidence,
      })

      // Mark as in progress
      await supabase.from("support_tickets").update({ status: "in_progress" }).eq("id", ticket.id)
    }

    return NextResponse.json({
      success: true,
      ticket,
      analysis,
      auto_responded: analysis.confidence > 0.8 && !analysis.escalation_needed,
    })
  } catch (error) {
    console.error("AI ticket analysis error:", error)
    return NextResponse.json({ error: "Failed to analyze ticket" }, { status: 500 })
  }
}
