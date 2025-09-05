"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Terminal, Code, Wrench, Download, ExternalLink, Play } from "lucide-react"

export function DeveloperTools() {
  const tools = [
    {
      name: "BitnunEco CLI",
      description: "Command-line interface for project scaffolding and deployment",
      version: "v2.1.0",
      downloads: "125K",
      category: "CLI Tools",
      icon: Terminal,
    },
    {
      name: "Smart Contract IDE",
      description: "Web-based IDE for writing and testing smart contracts",
      version: "v1.8.2",
      downloads: "89K",
      category: "Development",
      icon: Code,
    },
    {
      name: "Network Explorer",
      description: "Explore transactions, blocks, and network statistics",
      version: "v3.0.1",
      downloads: "156K",
      category: "Analytics",
      icon: ExternalLink,
    },
    {
      name: "Wallet Connector",
      description: "Easy wallet integration library for web applications",
      version: "v1.5.4",
      downloads: "203K",
      category: "Integration",
      icon: Wrench,
    },
  ]

  const cliCommands = [
    {
      command: "npm install -g @bitnuneco/cli",
      description: "Install BitnunEco CLI globally",
    },
    {
      command: "bitnun init my-dapp",
      description: "Create a new DApp project",
    },
    {
      command: "bitnun deploy --network mainnet",
      description: "Deploy to BitnunEco mainnet",
    },
    {
      command: "bitnun test --coverage",
      description: "Run tests with coverage report",
    },
  ]

  const sdkFeatures = [
    {
      feature: "Wallet Management",
      description: "Connect, manage, and interact with user wallets",
      status: "Stable",
    },
    {
      feature: "Smart Contracts",
      description: "Deploy and interact with smart contracts",
      status: "Stable",
    },
    {
      feature: "DeFi Protocols",
      description: "Access liquidity pools and trading functions",
      status: "Beta",
    },
    {
      feature: "NFT Operations",
      description: "Mint, transfer, and manage NFT collections",
      status: "Stable",
    },
    {
      feature: "Cross-Chain Bridge",
      description: "Enable cross-chain asset transfers",
      status: "Alpha",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Developer Tools
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Comprehensive toolkit for building, testing, and deploying applications on the BitnunEco blockchain.
        </p>
      </div>

      <Tabs defaultValue="tools" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="cli">CLI</TabsTrigger>
          <TabsTrigger value="sdk">SDK</TabsTrigger>
          <TabsTrigger value="playground">Playground</TabsTrigger>
        </TabsList>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card key={tool.name} className="hover:border-emerald-500/50 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-emerald-500/10 rounded-lg">
                        <tool.icon className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.name}</CardTitle>
                        <Badge variant="secondary">{tool.category}</Badge>
                      </div>
                    </div>
                    <Badge variant="outline">{tool.version}</Badge>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{tool.downloads} downloads</span>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Install
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cli" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                BitnunEco CLI Commands
              </CardTitle>
              <CardDescription>Essential commands for BitnunEco development workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cliCommands.map((cmd, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <code className="bg-muted px-3 py-2 rounded text-sm font-mono flex-1 mr-2">{cmd.command}</code>
                    <Button size="sm" variant="outline">
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{cmd.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <pre className="text-sm">
                    {`# Install CLI
npm install -g @bitnuneco/cli

# Create new project
bitnun init my-project
cd my-project

# Start development server
bitnun dev

# Deploy to testnet
bitnun deploy --network testnet`}
                  </pre>
                </div>
                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Try Interactive Tutorial
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>SDK Features</CardTitle>
              <CardDescription>Current status of BitnunEco SDK features and capabilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sdkFeatures.map((feature) => (
                  <div key={feature.feature} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{feature.feature}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                    <Badge
                      variant={
                        feature.status === "Stable"
                          ? "secondary"
                          : feature.status === "Beta"
                            ? "default"
                            : "destructive"
                      }
                    >
                      {feature.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>JavaScript SDK</CardTitle>
                <CardDescription>For web and Node.js applications</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  npm install @bitnuneco/sdk
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Python SDK</CardTitle>
                <CardDescription>For Python applications and scripts</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  pip install bitnuneco
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="playground" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Interactive Playground</CardTitle>
              <CardDescription>Test BitnunEco features directly in your browser</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Try it now:</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Code className="h-4 w-4 mr-2" />
                    Smart Contract Deployment
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Wrench className="h-4 w-4 mr-2" />
                    Wallet Integration
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Terminal className="h-4 w-4 mr-2" />
                    API Testing
                  </Button>
                </div>
              </div>
              <Button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                <Play className="h-4 w-4 mr-2" />
                Open Playground
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
