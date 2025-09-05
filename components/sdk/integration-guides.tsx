"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Code, Play, Download, ExternalLink, Clock } from "lucide-react"

export function IntegrationGuides() {
  const guides = [
    {
      title: "Quick Start Guide",
      description: "Get up and running with BitnunEco SDK in 5 minutes",
      difficulty: "Beginner",
      duration: "5 min",
      language: "JavaScript",
      category: "Getting Started",
    },
    {
      title: "Wallet Integration",
      description: "Connect and manage user wallets in your application",
      difficulty: "Intermediate",
      duration: "15 min",
      language: "TypeScript",
      category: "Wallet",
    },
    {
      title: "Smart Contract Deployment",
      description: "Deploy and interact with smart contracts on BitnunEco",
      difficulty: "Advanced",
      duration: "30 min",
      language: "Solidity",
      category: "Smart Contracts",
    },
    {
      title: "DeFi Protocol Integration",
      description: "Build DeFi applications using BitnunEco's liquidity pools",
      difficulty: "Advanced",
      duration: "45 min",
      language: "TypeScript",
      category: "DeFi",
    },
    {
      title: "NFT Marketplace Setup",
      description: "Create and manage NFT collections and marketplaces",
      difficulty: "Intermediate",
      duration: "25 min",
      language: "JavaScript",
      category: "NFT",
    },
    {
      title: "Cross-Chain Bridge",
      description: "Enable cross-chain transactions in your application",
      difficulty: "Advanced",
      duration: "40 min",
      language: "TypeScript",
      category: "Bridge",
    },
  ]

  const codeExamples = {
    javascript: `// Initialize BitnunEco SDK
import { BitnunEco } from '@bitnuneco/sdk'

const bitnun = new BitnunEco({
  network: 'mainnet',
  apiKey: 'your-api-key'
})

// Connect wallet
const wallet = await bitnun.wallet.connect()
console.log('Connected:', wallet.address)

// Send transaction
const tx = await bitnun.transaction.send({
  to: '0x...',
  amount: '1.0',
  token: 'BTN'
})`,
    typescript: `import { BitnunEco, WalletConfig } from '@bitnuneco/sdk'

interface AppConfig {
  network: 'mainnet' | 'testnet'
  apiKey: string
}

class BitnunApp {
  private sdk: BitnunEco
  
  constructor(config: AppConfig) {
    this.sdk = new BitnunEco(config)
  }
  
  async connectWallet(): Promise<string> {
    const wallet = await this.sdk.wallet.connect()
    return wallet.address
  }
}`,
    python: `from bitnuneco import BitnunEco

# Initialize SDK
bitnun = BitnunEco(
    network='mainnet',
    api_key='your-api-key'
)

# Connect wallet
wallet = bitnun.wallet.connect()
print(f"Connected: {wallet.address}")

# Get balance
balance = bitnun.wallet.get_balance('BTN')
print(f"Balance: {balance} BTN")`,
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Integration Guides
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Step-by-step guides to integrate BitnunEco into your applications with code examples and best practices.
        </p>
      </div>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Integration Guides</TabsTrigger>
          <TabsTrigger value="examples">Code Examples</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {guides.map((guide) => (
              <Card key={guide.title} className="hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Book className="h-5 w-5 text-emerald-500" />
                    <Badge
                      variant={
                        guide.difficulty === "Beginner"
                          ? "secondary"
                          : guide.difficulty === "Intermediate"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {guide.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {guide.duration}
                    </div>
                    <Badge variant="outline">{guide.language}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Play className="h-4 w-4 mr-2" />
                      Start Guide
                    </Button>
                    <Button size="sm" variant="outline">
                      <Code className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          <Tabs defaultValue="javascript">
            <TabsList>
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
            </TabsList>
            {Object.entries(codeExamples).map(([lang, code]) => (
              <TabsContent key={lang} value={lang}>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)} Example
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{code}</code>
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Complete API reference and guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Docs
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>GitHub Repository</CardTitle>
                <CardDescription>Source code and examples</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Discord Community</CardTitle>
                <CardDescription>Get help from developers</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Discord
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Step-by-step video guides</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch Videos
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
