import { type NextRequest, NextResponse } from "next/server"
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
    const supabase = await createClient()

    // Get relevant knowledge base articles
    const { data: kbArticles } = await supabase
      .from("knowledge_base")
      .select("title, content, category")
      .textSearch("search_vector", `${subject} ${description}`)
      .limit(5)

    // Create a basic analysis without AI SDK tools
    const analysis = {
      category: categorizeTicket(subject, description),
      priority: determinePriority(subject, description),
      sentiment: 0.5, // Neutral sentiment as default
      confidence: 0.8,
      suggested_response: generateSuggestedResponse(subject, description),
      related_kb_articles: kbArticles?.map((article) => article.title) || [],
      escalation_needed: needsEscalation(subject, description),
      estimated_resolution_time: 60, // Default 60 minutes
    }

    // Store analysis
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

// Helper methods for ticket analysis
function categorizeTicket(subject: string, description: string): string {
  const text = `${subject} ${description}`.toLowerCase()

  if (text.includes("payment") || text.includes("billing") || text.includes("charge")) return "billing"
  if (text.includes("mining") || text.includes("hash") || text.includes("pool")) return "mining"
  if (text.includes("nft") || text.includes("token") || text.includes("mint")) return "nft"
  if (text.includes("trade") || text.includes("exchange") || text.includes("swap")) return "trading"
  if (text.includes("account") || text.includes("login") || text.includes("password")) return "account"
  if (text.includes("bug") || text.includes("error") || text.includes("crash")) return "technical"

  return "general"
}

function determinePriority(subject: string, description: string): string {
  const text = `${subject} ${description}`.toLowerCase()

  if (text.includes("urgent") || text.includes("critical") || text.includes("security")) return "critical"
  if (text.includes("important") || text.includes("blocking") || text.includes("cannot")) return "high"
  if (text.includes("feature") || text.includes("request") || text.includes("suggestion")) return "medium"

  return "low"
}

function generateSuggestedResponse(subject: string, description: string): string {
  const category = categorizeTicket(subject, description)

  const responses = {
    billing:
      "Thank you for contacting us about your billing inquiry. We'll review your account and get back to you within 24 hours with a resolution.",
    mining:
      "We've received your mining-related inquiry. Our technical team will investigate and provide you with detailed information about your mining operations.",
    nft: "Thank you for your NFT-related question. We'll help you with your token or minting inquiry and respond within 2 business days.",
    trading:
      "We've received your trading inquiry. Our support team will review your case and provide assistance with your trading operations.",
    account:
      "Thank you for contacting us about your account. We'll help you resolve this issue securely and get back to you soon.",
    technical:
      "We've received your technical support request. Our development team will investigate this issue and provide a solution.",
    general:
      "Thank you for contacting BitnunEco support. We've received your inquiry and will respond within 24 hours.",
  }

  return responses[category] || responses.general
}

function needsEscalation(subject: string, description: string): boolean {
  const text = `${subject} ${description}`.toLowerCase()
  return text.includes("security") || text.includes("hack") || text.includes("fraud") || text.includes("legal")
}
