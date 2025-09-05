"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Shield } from "lucide-react"

export function ProofOfAction() {
  const consensusStats = {
    activeValidators: 1247,
    consensusReached: 98.7,
    averageValidationTime: 2.3,
    totalActionsValidated: 45231,
  }

  const recentValidations = [
    {
      id: "val-001",
      action: "NFT Purchase",
      user: "0x1234...5678",
      validators: 15,
      consensus: 100,
      status: "validated",
      timestamp: "2 min ago",
      reward: "5 BTN",
    },
    {
      id: "val-002",
      action: "Eco Challenge Completion",
      user: "0x9876...4321",
      validators: 12,
      consensus: 92,
      status: "validating",
      timestamp: "5 min ago",
      reward: "3 BTN",
    },
    {
      id: "val-003",
      action: "Mining Session",
      user: "0x5555...7777",
      validators: 18,
      consensus: 89,
      status: "disputed",
      timestamp: "8 min ago",
      reward: "0.45 BTN",
    },
    {
      id: "val-004",
      action: "Daily Login",
      user: "0x3333...9999",
      validators: 8,
      consensus: 100,
      status: "validated",
      timestamp: "12 min ago",
      reward: "1 BTN",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "validated":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "validating":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "disputed":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "validated":
        return "bg-green-100 text-green-800"
      case "validating":
        return "bg-yellow-100 text-yellow-800"
      case "disputed":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-500" />
          <span>Proof-of-Action Consensus</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Consensus Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">{consensusStats.activeValidators.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Active Validators</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">{consensusStats.consensusReached}%</p>
            <p className="text-sm text-muted-foreground">Consensus Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-600">{consensusStats.averageValidationTime}s</p>
            <p className="text-sm text-muted-foreground">Avg. Validation</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              {consensusStats.totalActionsValidated.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Validated</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">How Proof-of-Action Works</h4>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>User performs an action (mining, NFT purchase, eco-challenge)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>AI validators analyze action authenticity and impact</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Consensus reached when 75%+ validators agree</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span>Rewards distributed based on validated impact</span>
            </div>
          </div>
        </div>

        {/* Recent Validations */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Validations</h4>
          <div className="space-y-3">
            {recentValidations.map((validation) => (
              <div key={validation.id} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(validation.status)}
                    <div>
                      <h5 className="font-medium text-foreground text-sm">{validation.action}</h5>
                      <p className="text-xs text-muted-foreground">User: {validation.user}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(validation.status)} variant="outline">
                    {validation.status}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Consensus</span>
                    <span className="text-foreground">
                      {validation.consensus}% ({validation.validators} validators)
                    </span>
                  </div>
                  <Progress value={validation.consensus} className="h-1.5" />
                </div>

                <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                  <span>{validation.timestamp}</span>
                  <Badge variant="secondary" className="text-xs">
                    {validation.reward}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Network Health */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h4 className="font-medium text-green-900">Network Health: Excellent</h4>
          </div>
          <p className="text-sm text-green-800">
            All validation nodes are online and consensus is being reached efficiently. Average validation time is
            within optimal range.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
