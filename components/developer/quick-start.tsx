"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Check, Terminal, Zap } from "lucide-react"

export function QuickStart() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const codeExamples = {
    javascript: `// Install BitnunEco SDK
npm install @bitnuneco/sdk

// Initialize the client
import { BitnunEco } from '@bitnuneco/sdk';

const client = new BitnunEco({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Get wallet balance
const balance = await client.wallet.getBalance('0x...');
console.log(\`Balance: \${balance} BTN\`);

// Start mining
const miningSession = await client.mining.start({
  intensity: 'medium',
  duration: 3600 // 1 hour
});`,
    python: `# Install BitnunEco Python SDK
pip install bitnuneco-sdk

# Initialize the client
from bitnuneco import BitnunEco

client = BitnunEco(
    api_key="your-api-key",
    network="mainnet"
)

# Get wallet balance
balance = client.wallet.get_balance("0x...")
print(f"Balance: {balance} BTN")

# Start mining
mining_session = client.mining.start(
    intensity="medium",
    duration=3600  # 1 hour
)`,
    curl: `# Get API status
curl -X GET "https://api.bitnuneco.com/v1/status" \\
  -H "Authorization: Bearer your-api-key"

# Get wallet balance
curl -X GET "https://api.bitnuneco.com/v1/wallet/balance" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"address": "0x..."}'

# Start mining session
curl -X POST "https://api.bitnuneco.com/v1/mining/start" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"intensity": "medium", "duration": 3600}'`,
  }

  const [selectedLanguage, setSelectedLanguage] = useState<keyof typeof codeExamples>("javascript")

  const copyToClipboard = (code: string, language: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(language)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const quickStartSteps = [
    {
      step: 1,
      title: "Get API Key",
      description: "Sign up and generate your API key from the developer dashboard",
      action: "Get API Key",
    },
    {
      step: 2,
      title: "Install SDK",
      description: "Choose your preferred language and install the BitnunEco SDK",
      action: "View SDKs",
    },
    {
      step: 3,
      title: "Make First Call",
      description: "Test your integration with a simple API call",
      action: "Try Now",
    },
    {
      step: 4,
      title: "Build & Deploy",
      description: "Start building your sustainable blockchain application",
      action: "Deploy",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span>Quick Start Guide</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickStartSteps.map((step) => (
            <div key={step.step} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    {step.action}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Code Examples */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Code Examples</h4>
            <div className="flex space-x-1 bg-muted rounded-lg p-1">
              {Object.keys(codeExamples).map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang as keyof typeof codeExamples)}
                  className="text-xs"
                >
                  {lang === "javascript" ? "JavaScript" : lang === "python" ? "Python" : "cURL"}
                </Button>
              ))}
            </div>
          </div>

          <div className="relative">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
              <code>{codeExamples[selectedLanguage]}</code>
            </pre>
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-100"
              onClick={() => copyToClipboard(codeExamples[selectedLanguage], selectedLanguage)}
            >
              {copiedCode === selectedLanguage ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Popular Use Cases */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Popular Use Cases</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Eco-friendly DApps",
              "Carbon Credit Trading",
              "Sustainable Mining Pools",
              "Green NFT Marketplaces",
              "Environmental Impact Tracking",
              "Renewable Energy Trading",
            ].map((useCase, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 bg-muted rounded-lg">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground">{useCase}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
