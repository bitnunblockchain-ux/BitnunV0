"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Copy, MoreVertical, Activity, Zap } from "lucide-react"

interface Contract {
  id: string
  name: string
  address: string
  type: string
  deployedAt: number
  status: string
  transactions: number
  gasUsed: number
}

interface DeployedContractsProps {
  contracts: Contract[]
}

export function DeployedContracts({ contracts }: DeployedContractsProps) {
  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getTypeColor = (type: string) => {
    const colors = {
      ERC20: "bg-blue-100 text-blue-800",
      ERC721: "bg-purple-100 text-purple-800",
      GOVERNANCE: "bg-green-100 text-green-800",
      MULTISIG: "bg-red-100 text-red-800",
      STAKING: "bg-yellow-100 text-yellow-800",
      CROWDSALE: "bg-indigo-100 text-indigo-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Deployed Contracts</h2>

      {contracts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Activity className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No Contracts Deployed</h3>
            <p className="text-muted-foreground">Deploy your first smart contract using the templates on the left.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <span>{contract.name}</span>
                      <Badge className={getTypeColor(contract.type)}>{contract.type}</Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">Deployed {formatDate(contract.deployedAt)}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">Address:</span>
                      <code className="text-sm bg-background px-2 py-1 rounded">{contract.address}</code>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => copyAddress(contract.address)}>
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Activity className="w-4 h-4 text-blue-500 mr-1" />
                        <span className="text-sm font-medium">Transactions</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{contract.transactions.toLocaleString()}</p>
                    </div>

                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-center mb-1">
                        <Zap className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm font-medium">Gas Used</span>
                      </div>
                      <p className="text-lg font-bold text-foreground">{contract.gasUsed.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View on Explorer
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      Interact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
