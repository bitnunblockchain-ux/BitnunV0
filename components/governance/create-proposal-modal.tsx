"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, FileText, DollarSign, Settings, Zap } from "lucide-react"

interface CreateProposalModalProps {
  onClose: () => void
}

export function CreateProposalModal({ onClose }: CreateProposalModalProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [votingPeriod, setVotingPeriod] = useState("7")
  const [requiredMajority, setRequiredMajority] = useState("50")
  const [treasuryAmount, setTreasuryAmount] = useState("")

  const handleSubmit = () => {
    // TODO: Implement actual proposal creation API call
    const proposalData = {
      title,
      description,
      category,
      votingPeriod: Number.parseInt(votingPeriod),
      requiredMajority: Number.parseInt(requiredMajority),
      treasuryAmount: treasuryAmount ? Number.parseFloat(treasuryAmount) : undefined,
    }

    // Here would be the API call to create the proposal
    // await createProposal(proposalData)

    onClose()
  }

  const categories = [
    { value: "tokenomics", label: "Tokenomics", icon: Zap },
    { value: "platform", label: "Platform", icon: Settings },
    { value: "treasury", label: "Treasury", icon: DollarSign },
    { value: "governance", label: "Governance", icon: FileText },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-emerald-200 dark:border-emerald-800">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Proposal</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Proposal Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a clear, descriptive title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information about your proposal, including rationale and expected outcomes"
                  rows={4}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select proposal category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4" />
                          {cat.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Voting Parameters */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Voting Parameters</h3>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="voting-period">Voting Period (days)</Label>
                  <Select value={votingPeriod} onValueChange={setVotingPeriod}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 days</SelectItem>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="14">14 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="required-majority">Required Majority (%)</Label>
                  <Select value={requiredMajority} onValueChange={setRequiredMajority}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="50">Simple Majority (50%)</SelectItem>
                      <SelectItem value="60">Supermajority (60%)</SelectItem>
                      <SelectItem value="66">Supermajority (66%)</SelectItem>
                      <SelectItem value="75">Supermajority (75%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Treasury Request (if applicable) */}
            {category === "treasury" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Treasury Request</h3>

                <div>
                  <Label htmlFor="treasury-amount">Requested Amount (BTN)</Label>
                  <Input
                    id="treasury-amount"
                    type="number"
                    value={treasuryAmount}
                    onChange={(e) => setTreasuryAmount(e.target.value)}
                    placeholder="Enter amount in BTN"
                    className="mt-1"
                  />
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Treasury balance: 8.5M BTN available</p>
                </div>
              </div>
            )}

            {/* Requirements */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Proposal Requirements</h4>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    ✓ Minimum 1,000 BTN voting power
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    ✓ Clear title and description
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
                    ✓ Valid category selection
                  </Badge>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!title || !description || !category}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600"
              >
                Create Proposal
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
