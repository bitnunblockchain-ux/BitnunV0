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
        execute: async ({ address }) => {
          const { data } = await supabase.from("user_wallets").select("balance").eq("address", address).single()

          return { balance: data?.balance || 0 }
        },
      }),

      getTransactions: tool({
        description: "Get recent transactions",
        parameters: z.object({
          userId: z.string().describe("User ID"),
          limit: z.number().optional().describe("Number of transactions"),
        }),
        execute: async ({ userId, limit = 10 }) => {
          const { data } = await supabase
            .from("transactions")
            .select("*")
            .eq("user_id", userId)
            .order("created_at", { ascending: false })
            .limit(limit)

          return { transactions: data || [] }
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
        execute: async ({ userId, pair, type, amount, price }) => {
          const { data, error } = await supabase
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

          if (error) throw new Error(error.message)
          return { order: data, message: `${type} order created successfully` }
        },
      }),

      getPortfolio: tool({
        description: "Get user portfolio overview",
        parameters: z.object({
          userId: z.string().describe("User ID"),
        }),
        execute: async ({ userId }) => {
          const { data: wallets } = await supabase.from("user_wallets").select("*").eq("user_id", userId)

          const { data: stakes } = await supabase.from("user_stakes").select("*").eq("user_id", userId)

          const { data: positions } = await supabase.from("user_positions").select("*").eq("user_id", userId)

          return { wallets, stakes, positions }
        },
      }),

      deployContract: tool({
        description: "Deploy a smart contract",
        parameters: z.object({
          userId: z.string().describe("User ID"),
          contractCode: z.string().describe("Contract source code"),
          contractName: z.string().describe("Contract name"),
        }),
        execute: async ({ userId, contractCode, contractName }) => {
          const contractAddress = `0x${Math.random().toString(16).substr(2, 40)}`

          const { data, error } = await supabase
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

          if (error) throw new Error(error.message)
          return { contract: data, address: contractAddress }
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
