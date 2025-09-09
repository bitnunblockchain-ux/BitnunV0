import { openai } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const supabase = createClient()

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    tools: {
      getBalance: tool({
        description: "Get user wallet balance",
        parameters: z.object({
          address: z.string().describe("Wallet address"),
        }),
        execute: ({ address }: { address: string }) => {
          return supabase
            .from("user_wallets")
            .select("balance")
            .eq("address", address)
            .single()
            .then(({ data }) => ({
              balance: data?.balance || 0,
            }))
        },
      }),

      getTransactions: tool({
        description: "Get recent transactions",
        parameters: z.object({
          userId: z.string().describe("User ID"),
          limit: z.number().optional().describe("Number of transactions"),
        }),
        execute: ({ userId, limit = 10 }: { userId: string; limit?: number }) => {
          return supabase
            .from("transactions")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(limit)
            .then(({ data }) => ({ transactions: data || [] }))
        },
      }),

      createTrade: tool({
        description: "Execute a trade order",
        parameters: z.object({
          userId: z.string().describe("User ID"),
          pair: z.string().describe("Trading pair"),
          type: z.enum(["buy", "sell"]).describe("Order type"),
          amount: z.number().describe("Amount to trade"),
          price: z.number().describe("Price per unit"),
        }),
        execute: ({
          userId,
          pair,
          type,
          amount,
          price,
        }: { userId: string; pair: string; type: "buy" | "sell"; amount: number; price: number }) => {
          return supabase
            .from("orders")
            .insert({
              user_id: userId,
              trading_pair: pair,
              order_type: type,
              amount,
              price,
              status: "pending",
            })
            .select()
            .single()
            .then(({ data, error }) => {
              if (error) throw new Error(error.message)
              return { order: data, message: `${type} order created successfully` }
            })
        },
      }),

      getPortfolio: tool({
        description: "Get user portfolio overview",
        parameters: z.object({
          userId: z.string().describe("User ID"),
        }),
        execute: ({ userId }: { userId: string }) => {
          return Promise.all([
            supabase.from("user_wallets").select("*").eq("user_id", userId),
            supabase.from("user_stakes").select("*").eq("user_id", userId),
            supabase.from("user_positions").select("*").eq("user_id", userId),
          ]).then(([wallets, stakes, positions]) => ({
            wallets: wallets.data,
            stakes: stakes.data,
            positions: positions.data,
          }))
        },
      }),

      deployContract: tool({
        description: "Deploy a smart contract",
        parameters: z.object({
          userId: z.string().describe("User ID"),
          contractCode: z.string().describe("Contract source code"),
          contractName: z.string().describe("Contract name"),
        }),
        execute: ({
          userId,
          contractCode,
          contractName,
        }: { userId: string; contractCode: string; contractName: string }) => {
          const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`

          return supabase
            .from("smart_contracts")
            .insert({
              user_id: userId,
              name: contractName,
              address: contractAddress,
              source_code: contractCode,
              status: "deployed",
            })
            .select()
            .single()
            .then(({ data, error }) => {
              if (error) throw new Error(error.message)
              return { contract: data, address: contractAddress }
            })
        },
      }),
    },
    system: `You are BitnunEco AI Assistant, an advanced blockchain platform assistant that can help users with:

1. **Wallet Management**: Check balances, view transactions, manage multiple wallets
2. **Trading Operations**: Execute trades, analyze markets, manage portfolios
3. **DeFi Operations**: Stake tokens, provide liquidity, yield farming
4. **Smart Contracts**: Deploy contracts, interact with existing contracts
5. **Mining Operations**: Monitor mining performance, optimize rewards
6. **Analytics**: Portfolio analysis, performance tracking, market insights
7. **Developer Tools**: API management, bot configuration, automation

You have access to real-time blockchain data and can execute operations directly on the platform. Always provide accurate, helpful responses and use the available tools when users request specific actions.

Current capabilities:
- Real-time balance checking
- Transaction history
- Trade execution
- Portfolio analysis
- Smart contract deployment
- Mining optimization
- Market analysis`,
  })

  return result.toDataStreamResponse()
}
