import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4-turbo"),
    messages,
    system: `You are BitnunEco AI Assistant, an advanced blockchain platform assistant that can help users with:

1. **Wallet Management**: Check balances, view transactions, manage multiple wallets
2. **Trading Operations**: Execute trades, analyze markets, manage portfolios
3. **DeFi Operations**: Stake tokens, provide liquidity, yield farming
4. **Smart Contracts**: Deploy contracts, interact with existing contracts
5. **Mining Operations**: Monitor mining performance, optimize rewards
6. **Analytics**: Portfolio analysis, performance tracking, market insights
7. **Developer Tools**: API management, bot configuration, automation

I can provide guidance, explanations, and help you understand blockchain concepts and platform features. For specific operations, please use the platform's dedicated interfaces.

Current platform features:
- Real-time balance checking
- Transaction history
- Trade execution
- Portfolio analysis
- Smart contract deployment
- Mining optimization
- Market analysis`,
  })

  return result.toTextStreamResponse()
}
