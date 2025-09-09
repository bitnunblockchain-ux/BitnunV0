"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { getMultiNodeManager, type BlockchainNode, type SmartContract } from "@/lib/blockchain/multi-node-manager"
import { Activity, Server, Zap, Globe, Code, TrendingUp } from "lucide-react"

export default function NodesPage() {
  const [nodes, setNodes] = useState<BlockchainNode[]>([])
  const [contracts, setContracts] = useState<SmartContract[]>([])
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const multiNodeManager = getMultiNodeManager()

  useEffect(() => {
    loadData()

    // Set up real-time event listeners
    const handleBlockchainEvent = (event: CustomEvent) => {
      console.log("[v0] Blockchain event received:", event.detail)
      loadData() // Refresh data on blockchain events
    }

    window.addEventListener("blockchain-event", handleBlockchainEvent as EventListener)
    window.addEventListener("transaction-event", handleBlockchainEvent as EventListener)
    window.addEventListener("contract-event", handleBlockchainEvent as EventListener)

    return () => {
      window.removeEventListener("blockchain-event", handleBlockchainEvent as EventListener)
      window.removeEventListener("transaction-event", handleBlockchainEvent as EventListener)
      window.removeEventListener("contract-event", handleBlockchainEvent as EventListener)
    }
  }, [])

  const loadData = async () => {
    try {
      const [nodesList, contractsList, metricsData] = await Promise.all([
        multiNodeManager.getActiveNodes(),
        multiNodeManager.getSmartContracts(),
        multiNodeManager.getNodeMetrics(),
      ])

      setNodes(nodesList)
      setContracts(contractsList)
      setMetrics(metricsData)
    } catch (error) {
      console.error("[v0] Failed to load data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "syncing":
        return "bg-yellow-500"
      case "inactive":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const deployTestContract = async () => {
    const contractAddress = await multiNodeManager.deploySmartContract(
      "TestToken",
      "token",
      "0x608060405234801561001057600080fd5b50...",
      { name: "TestToken", symbol: "TEST" },
      "contract TestToken { ... }",
    )

    if (contractAddress) {
      await multiNodeManager.emitRealtimeEvent(
        "contract_deployed",
        {
          address: contractAddress,
          name: "TestToken",
        },
        undefined,
        true,
      )
      loadData()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading blockchain infrastructure...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Blockchain Infrastructure
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Multi-node blockchain network with smart contract deployment and real-time monitoring
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Nodes</CardTitle>
              <Server className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{nodes.length}</div>
              <p className="text-xs text-muted-foreground">Across 5 regions</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Smart Contracts</CardTitle>
              <Code className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{contracts.length}</div>
              <p className="text-xs text-muted-foreground">Deployed & verified</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Hash Rate</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {nodes.reduce((sum, node) => sum + node.hash_rate, 0).toFixed(1)} TH/s
              </div>
              <p className="text-xs text-muted-foreground">Combined network power</p>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Network Health</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">99.9%</div>
              <p className="text-xs text-muted-foreground">Uptime this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="nodes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="nodes">Blockchain Nodes</TabsTrigger>
            <TabsTrigger value="contracts">Smart Contracts</TabsTrigger>
            <TabsTrigger value="metrics">Performance Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="nodes" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {nodes.map((node) => (
                <Card key={node.id} className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{node.node_id}</CardTitle>
                      <Badge className={`${getStatusColor(node.status)} text-white`}>{node.status}</Badge>
                    </div>
                    <CardDescription>
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4" />
                        {node.region} • {node.node_type} node
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Hash Rate</span>
                        <span className="font-mono">{node.hash_rate.toFixed(2)} TH/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Peers</span>
                        <span className="font-mono">{node.peers_connected}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Blocks Processed</span>
                        <span className="font-mono">{node.blocks_processed.toLocaleString()}</span>
                      </div>
                    </div>
                    <Progress value={Math.min((node.peers_connected / 20) * 100, 100)} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contracts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold">Smart Contracts</h3>
              <Button onClick={deployTestContract} className="bg-primary hover:bg-primary/90">
                Deploy Test Contract
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contracts.map((contract) => (
                <Card key={contract.id} className="bg-card/50 backdrop-blur border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{contract.contract_name}</CardTitle>
                      <Badge variant="outline">{contract.contract_type}</Badge>
                    </div>
                    <CardDescription className="font-mono text-xs">{contract.contract_address}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Status</span>
                      <Badge className={contract.status === "active" ? "bg-green-500" : "bg-gray-500"}>
                        {contract.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Verification</span>
                      <Badge variant={contract.verification_status === "verified" ? "default" : "secondary"}>
                        {contract.verification_status}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent"
                      onClick={() =>
                        multiNodeManager.callSmartContract(contract.contract_address, "balanceOf", ["0x123..."])
                      }
                    >
                      Interact with Contract
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <Card className="bg-card/50 backdrop-blur border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Network Performance Metrics
                </CardTitle>
                <CardDescription>Real-time monitoring of blockchain network performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Performance metrics visualization coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
