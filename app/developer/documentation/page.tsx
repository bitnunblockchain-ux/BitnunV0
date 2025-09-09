"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Code, Zap, Shield, Globe } from "lucide-react"

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/balance/{address}",
      description: "Get account balance for a specific address",
      parameters: [{ name: "address", type: "string", required: true, description: "Wallet address" }],
      response: { balance: "string", currency: "string", usd_value: "number" },
    },
    {
      method: "POST",
      endpoint: "/api/v1/transaction",
      description: "Submit a new transaction to the blockchain",
      parameters: [
        { name: "to", type: "string", required: true, description: "Recipient address" },
        { name: "amount", type: "string", required: true, description: "Amount to send" },
        { name: "currency", type: "string", required: true, description: "Currency symbol" },
      ],
      response: { transaction_hash: "string", status: "string", gas_fee: "string" },
    },
    {
      method: "GET",
      endpoint: "/api/v1/transactions/{address}",
      description: "Get transaction history for an address",
      parameters: [
        { name: "address", type: "string", required: true, description: "Wallet address" },
        { name: "limit", type: "number", required: false, description: "Number of transactions to return" },
        { name: "offset", type: "number", required: false, description: "Pagination offset" },
      ],
      response: { transactions: "array", total: "number", page: "number" },
    },
  ]

  const codeExamples = {
    javascript: `// Initialize the SDK
import { BitnunSDK } from '@bitnun/sdk';

const sdk = new BitnunSDK({
  apiKey: 'your-api-key',
  network: 'mainnet' // or 'testnet'
});

// Get account balance
async function getBalance(address) {
  try {
    const balance = await sdk.getBalance(address);
    console.log('Balance:', balance);
    return balance;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Send transaction
async function sendTransaction(to, amount, currency) {
  try {
    const tx = await sdk.sendTransaction({
      to: to,
      amount: amount,
      currency: currency
    });
    console.log('Transaction:', tx);
    return tx;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    python: `# Initialize the SDK
from bitnun import BitnunSDK

sdk = BitnunSDK(
    api_key="your-api-key",
    network="mainnet"  # or "testnet"
)

# Get account balance
def get_balance(address):
    try:
        balance = sdk.get_balance(address)
        print(f"Balance: {balance}")
        return balance
    except Exception as error:
        print(f"Error: {error}")

# Send transaction
def send_transaction(to, amount, currency):
    try:
        tx = sdk.send_transaction(
            to=to,
            amount=amount,
            currency=currency
        )
        print(f"Transaction: {tx}")
        return tx
    except Exception as error:
        print(f"Error: {error}")`,
    curl: `# Get account balance
curl -X GET "https://api.bitnun.eco/v1/balance/0x123..." \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"

# Send transaction
curl -X POST "https://api.bitnun.eco/v1/transaction" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "to": "0x456...",
    "amount": "1.5",
    "currency": "BTN"
  }'

# Get transaction history
curl -X GET "https://api.bitnun.eco/v1/transactions/0x123...?limit=10" \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json"`,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            API Documentation
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Complete reference for the BitnunEco API. Build powerful blockchain applications with our comprehensive
            toolkit.
          </p>
        </div>

        {/* Search */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-700/50 border-gray-600 text-white"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Start */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Quick Start
            </CardTitle>
            <CardDescription className="text-gray-400">Get up and running in minutes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                  <h4 className="font-medium text-white">Get API Key</h4>
                </div>
                <p className="text-sm text-gray-400">Create an API key from your developer dashboard</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </div>
                  <h4 className="font-medium text-white">Install SDK</h4>
                </div>
                <p className="text-sm text-gray-400">Install our SDK or use direct REST API calls</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </div>
                  <h4 className="font-medium text-white">Start Building</h4>
                </div>
                <p className="text-sm text-gray-400">Make your first API call and start building</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Documentation */}
        <Tabs defaultValue="endpoints" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800/50 border-gray-700">
            <TabsTrigger value="endpoints">API Endpoints</TabsTrigger>
            <TabsTrigger value="examples">Code Examples</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="endpoints" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">API Endpoints</CardTitle>
                <CardDescription className="text-gray-400">
                  Complete list of available API endpoints and their parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {apiEndpoints.map((endpoint, i) => (
                  <div key={i} className="bg-gray-700/30 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge
                        variant={endpoint.method === "GET" ? "default" : "secondary"}
                        className={endpoint.method === "GET" ? "bg-green-600" : "bg-blue-600"}
                      >
                        {endpoint.method}
                      </Badge>
                      <code className="text-primary font-mono">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-gray-300 mb-4">{endpoint.description}</p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">Parameters</h5>
                        <div className="space-y-2">
                          {endpoint.parameters.map((param, j) => (
                            <div key={j} className="bg-gray-600/30 rounded p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <code className="text-sm text-primary">{param.name}</code>
                                <Badge variant="outline" className="text-xs">
                                  {param.type}
                                </Badge>
                                {param.required && (
                                  <Badge variant="destructive" className="text-xs">
                                    required
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-400">{param.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h5 className="font-medium text-white mb-2">Response</h5>
                        <div className="bg-gray-600/30 rounded p-3">
                          <pre className="text-sm text-gray-300">{JSON.stringify(endpoint.response, null, 2)}</pre>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="examples" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Code Examples
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Ready-to-use code examples in multiple programming languages
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript" className="space-y-4">
                  <TabsList className="bg-gray-700/50">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>

                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-300">
                          <code>{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authentication" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Authentication
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Secure your API requests with proper authentication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">API Key Authentication</h4>
                  <p className="text-gray-300 mb-3">
                    Include your API key in the Authorization header of every request:
                  </p>
                  <div className="bg-gray-900/50 rounded p-3">
                    <code className="text-primary">Authorization: Bearer your-api-key</code>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Rate Limiting</h4>
                  <p className="text-gray-300 mb-3">
                    API requests are rate limited based on your subscription plan. Rate limit headers are included in
                    every response:
                  </p>
                  <div className="bg-gray-900/50 rounded p-3 space-y-1">
                    <div className="text-gray-300">
                      <code className="text-primary">X-RateLimit-Limit:</code> 1000
                    </div>
                    <div className="text-gray-300">
                      <code className="text-primary">X-RateLimit-Remaining:</code> 999
                    </div>
                    <div className="text-gray-300">
                      <code className="text-primary">X-RateLimit-Reset:</code> 1640995200
                    </div>
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Error Handling</h4>
                  <p className="text-gray-300 mb-3">The API uses standard HTTP status codes:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-green-600">200</Badge>
                      <span className="text-gray-300">Success</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-yellow-600">400</Badge>
                      <span className="text-gray-300">Bad Request</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-600">401</Badge>
                      <span className="text-gray-300">Unauthorized</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-red-600">429</Badge>
                      <span className="text-gray-300">Rate Limited</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="webhooks" className="space-y-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Webhooks
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Receive real-time notifications for blockchain events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Webhook Events</h4>
                  <p className="text-gray-300 mb-3">Subscribe to these events:</p>
                  <div className="space-y-2">
                    {[
                      "transaction.confirmed",
                      "transaction.failed",
                      "balance.updated",
                      "block.mined",
                      "contract.deployed",
                    ].map((event) => (
                      <div key={event} className="flex items-center gap-2">
                        <Badge variant="outline">{event}</Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-700/30 rounded-lg p-4">
                  <h4 className="font-medium text-white mb-2">Webhook Payload</h4>
                  <div className="bg-gray-900/50 rounded p-3">
                    <pre className="text-sm text-gray-300">
                      {JSON.stringify(
                        {
                          event: "transaction.confirmed",
                          data: {
                            transaction_hash: "0x123...",
                            from: "0x456...",
                            to: "0x789...",
                            amount: "1.5",
                            currency: "BTN",
                            block_number: 12345,
                          },
                          timestamp: "2024-01-01T00:00:00Z",
                        },
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
