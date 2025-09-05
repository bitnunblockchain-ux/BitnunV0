"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Users, Key, CheckCircle, Clock } from "lucide-react"

export function MultiSigWallet() {
  const [selectedWallet, setSelectedWallet] = useState("treasury")

  const wallets = [
    { id: "treasury", name: "Treasury Wallet", balance: "1,250,000 BTN", signers: 5, required: 3, pending: 2 },
    { id: "operations", name: "Operations Wallet", balance: "500,000 BTN", signers: 3, required: 2, pending: 1 },
    { id: "emergency", name: "Emergency Wallet", balance: "100,000 BTN", signers: 7, required: 5, pending: 0 },
  ]

  const pendingTransactions = [
    {
      id: "tx-001",
      type: "Transfer",
      amount: "50,000 BTN",
      to: "0x742d35Cc6634C0532925a3b8D4C0d4e5C1F69e2F",
      signatures: 2,
      required: 3,
      status: "pending",
    },
    {
      id: "tx-002",
      type: "Contract Call",
      amount: "25,000 BTN",
      to: "Staking Contract",
      signatures: 1,
      required: 3,
      status: "pending",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {wallets.map((wallet) => (
          <Card
            key={wallet.id}
            className={`cursor-pointer transition-all ${selectedWallet === wallet.id ? "ring-2 ring-emerald-500" : ""}`}
            onClick={() => setSelectedWallet(wallet.id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {wallet.name}
                <Users className="h-5 w-5 text-emerald-600" />
              </CardTitle>
              <CardDescription>{wallet.balance}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Signers:</span>
                  <span>{wallet.signers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Required:</span>
                  <span>{wallet.required}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Pending:</span>
                  <Badge variant={wallet.pending > 0 ? "secondary" : "outline"}>{wallet.pending}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Transactions</CardTitle>
            <CardDescription>Transactions awaiting signatures</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingTransactions.map((tx) => (
              <div key={tx.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{tx.type}</p>
                    <p className="text-sm text-gray-600">{tx.amount}</p>
                  </div>
                  <Badge variant="secondary">
                    <Clock className="h-3 w-3 mr-1" />
                    {tx.signatures}/{tx.required} signatures
                  </Badge>
                </div>
                <p className="text-sm text-gray-600">To: {tx.to}</p>
                <div className="flex space-x-2">
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Sign
                  </Button>
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create Transaction</CardTitle>
            <CardDescription>Initiate a new multi-signature transaction</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Address</Label>
              <Input id="recipient" placeholder="0x..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount (BTN)</Label>
              <Input id="amount" type="number" placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Transaction description..." />
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              <Key className="h-4 w-4 mr-2" />
              Create Transaction
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
