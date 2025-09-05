"use client"

import { useState } from "react"
import { ContractHeader } from "@/components/contracts/contract-header"
import { ContractTemplates } from "@/components/contracts/contract-templates"
import { ContractDeployer } from "@/components/contracts/contract-deployer"
import { DeployedContracts } from "@/components/contracts/deployed-contracts"

export default function ContractsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [deployedContracts, setDeployedContracts] = useState([
    {
      id: "1",
      name: "EcoToken",
      address: "0x1234...5678",
      type: "ERC20",
      deployedAt: Date.now() - 86400000,
      status: "active",
      transactions: 1247,
      gasUsed: 2150000,
    },
    {
      id: "2",
      name: "GreenNFT",
      address: "0x9876...5432",
      type: "ERC721",
      deployedAt: Date.now() - 172800000,
      status: "active",
      transactions: 89,
      gasUsed: 890000,
    },
  ])

  const handleDeploy = (contractData: any) => {
    const newContract = {
      id: Date.now().toString(),
      name: contractData.name,
      address: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
      type: contractData.type,
      deployedAt: Date.now(),
      status: "active",
      transactions: 0,
      gasUsed: contractData.estimatedGas || 150000,
    }

    setDeployedContracts((prev) => [newContract, ...prev])
    setSelectedTemplate(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <ContractHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ContractTemplates selectedTemplate={selectedTemplate} onSelectTemplate={setSelectedTemplate} />

            {selectedTemplate && (
              <ContractDeployer
                template={selectedTemplate}
                onDeploy={handleDeploy}
                onCancel={() => setSelectedTemplate(null)}
              />
            )}
          </div>

          <div>
            <DeployedContracts contracts={deployedContracts} />
          </div>
        </div>
      </div>
    </div>
  )
}
