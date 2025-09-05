"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Loader2, Code, Zap, CheckCircle } from "lucide-react"

interface ContractDeployerProps {
  template: string
  onDeploy: (contractData: any) => void
  onCancel: () => void
}

export function ContractDeployer({ template, onDeploy, onCancel }: ContractDeployerProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [contractName, setContractName] = useState("")
  const [contractSymbol, setContractSymbol] = useState("")
  const [initialSupply, setInitialSupply] = useState("")
  const [description, setDescription] = useState("")

  const handleDeploy = async () => {
    setIsDeploying(true)

    // Simulate deployment process
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const contractData = {
      name: contractName,
      symbol: contractSymbol,
      initialSupply,
      description,
      type: template.toUpperCase(),
      estimatedGas: getEstimatedGas(template),
    }

    onDeploy(contractData)
    setIsDeploying(false)
  }

  const getEstimatedGas = (templateType: string) => {
    const gasEstimates = {
      erc20: 150000,
      erc721: 200000,
      governance: 300000,
      multisig: 250000,
      staking: 180000,
      crowdsale: 220000,
    }
    return gasEstimates[templateType as keyof typeof gasEstimates] || 150000
  }

  const getTemplateFields = () => {
    switch (template) {
      case "erc20":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Token Name</Label>
              <Input
                id="name"
                placeholder="e.g., EcoToken"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., ECO"
                value={contractSymbol}
                onChange={(e) => setContractSymbol(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supply">Initial Supply</Label>
              <Input
                id="supply"
                placeholder="e.g., 1000000"
                value={initialSupply}
                onChange={(e) => setInitialSupply(e.target.value)}
              />
            </div>
          </>
        )
      case "erc721":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Collection Name</Label>
              <Input
                id="name"
                placeholder="e.g., Green NFTs"
                value={contractName}
                onChange={(e) => setContractName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="symbol">Collection Symbol</Label>
              <Input
                id="symbol"
                placeholder="e.g., GNFT"
                value={contractSymbol}
                onChange={(e) => setContractSymbol(e.target.value)}
              />
            </div>
          </>
        )
      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="name">Contract Name</Label>
            <Input
              id="name"
              placeholder="Enter contract name"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Code className="w-5 h-5" />
          <span>Deploy Contract</span>
          <Badge variant="secondary">{template.toUpperCase()}</Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {getTemplateFields()}

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Describe your contract's purpose..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
            <Zap className="w-4 h-4 mr-2 text-yellow-500" />
            Deployment Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Template:</span>
              <span className="font-medium">{template.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Estimated Gas:</span>
              <span className="font-medium">{getEstimatedGas(template).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network:</span>
              <span className="font-medium">BitnunEco Mainnet</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deployment Cost:</span>
              <span className="font-medium text-green-600">FREE (Zero Gas)</span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <Button onClick={handleDeploy} disabled={!contractName || isDeploying} className="flex-1">
            {isDeploying ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deploying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Deploy Contract
              </>
            )}
          </Button>

          <Button variant="outline" onClick={onCancel} disabled={isDeploying}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
