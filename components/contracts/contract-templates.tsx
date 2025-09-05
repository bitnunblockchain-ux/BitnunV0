"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Coins, ImageIcon, Vote, Users, Zap, Lock } from "lucide-react"

const contractTemplates = [
  {
    id: "erc20",
    name: "ERC20 Token",
    description: "Standard fungible token contract with mint, burn, and transfer capabilities",
    icon: Coins,
    difficulty: "Beginner",
    gasEstimate: "150,000",
    features: ["Mintable", "Burnable", "Pausable", "Access Control"],
    useCase: "Create your own cryptocurrency or utility token",
  },
  {
    id: "erc721",
    name: "ERC721 NFT",
    description: "Non-fungible token contract for unique digital assets and collectibles",
    icon: ImageIcon,
    difficulty: "Intermediate",
    gasEstimate: "200,000",
    features: ["Mintable", "Metadata URI", "Royalties", "Enumerable"],
    useCase: "Launch NFT collections and digital art marketplaces",
  },
  {
    id: "governance",
    name: "DAO Governance",
    description: "Decentralized governance contract with proposal and voting mechanisms",
    icon: Vote,
    difficulty: "Advanced",
    gasEstimate: "300,000",
    features: ["Proposals", "Voting", "Timelock", "Treasury"],
    useCase: "Create decentralized autonomous organizations",
  },
  {
    id: "multisig",
    name: "Multi-Signature Wallet",
    description: "Secure wallet requiring multiple signatures for transaction approval",
    icon: Lock,
    difficulty: "Advanced",
    gasEstimate: "250,000",
    features: ["Multi-Sig", "Owner Management", "Transaction Queue", "Emergency"],
    useCase: "Secure treasury and fund management",
  },
  {
    id: "staking",
    name: "Staking Pool",
    description: "Token staking contract with rewards distribution and lock periods",
    icon: Zap,
    difficulty: "Intermediate",
    gasEstimate: "180,000",
    features: ["Staking", "Rewards", "Lock Periods", "Compound"],
    useCase: "Create yield farming and staking mechanisms",
  },
  {
    id: "crowdsale",
    name: "Token Crowdsale",
    description: "ICO/IDO contract for token distribution and fundraising campaigns",
    icon: Users,
    difficulty: "Intermediate",
    gasEstimate: "220,000",
    features: ["Whitelist", "Vesting", "Refunds", "Caps"],
    useCase: "Launch token sales and fundraising campaigns",
  },
]

interface ContractTemplatesProps {
  selectedTemplate: string | null
  onSelectTemplate: (templateId: string) => void
}

export function ContractTemplates({ selectedTemplate, onSelectTemplate }: ContractTemplatesProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "Advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">Contract Templates</h2>

      <div className="grid grid-cols-1 gap-4">
        {contractTemplates.map((template) => {
          const Icon = template.icon
          const isSelected = selectedTemplate === template.id

          return (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                isSelected ? "ring-2 ring-primary border-primary" : ""
              }`}
              onClick={() => onSelectTemplate(template.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <Badge className={getDifficultyColor(template.difficulty)}>{template.difficulty}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Est. Gas</p>
                    <p className="font-semibold text-foreground">{template.gasEstimate}</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">{template.description}</p>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Features:</p>
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <Badge key={feature} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-1">Use Case:</p>
                  <p className="text-sm text-muted-foreground">{template.useCase}</p>
                </div>

                <Button className="w-full" variant={isSelected ? "default" : "outline"}>
                  {isSelected ? "Selected" : "Select Template"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
