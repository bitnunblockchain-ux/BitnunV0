"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpRight, ArrowDownLeft, Copy, QrCode } from "lucide-react"

export function SendReceive() {
  const [activeTab, setActiveTab] = useState<"send" | "receive">("send")
  const walletAddress = "btn1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Send BTN */}
      <Card className="border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-emerald-600" />
            Send BTN
          </CardTitle>
          <CardDescription>Transfer BTN tokens to another wallet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="btn1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
              className="font-mono text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (BTN)</Label>
            <Input id="amount" type="number" placeholder="0.00" step="0.01" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="memo">Memo (Optional)</Label>
            <Textarea id="memo" placeholder="Add a note for this transaction" rows={3} />
          </div>

          <div className="pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span>Transaction Fee</span>
              <span className="font-medium text-emerald-600">Free</span>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Send BTN</Button>
          </div>
        </CardContent>
      </Card>

      {/* Receive BTN */}
      <Card className="border-teal-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-teal-600" />
            Receive BTN
          </CardTitle>
          <CardDescription>Share your wallet address to receive BTN</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Your Wallet Address</Label>
            <div className="flex gap-2">
              <Input value={walletAddress} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(walletAddress)}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
              <QrCode className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-sm text-gray-600">QR Code for easy sharing</p>
          </div>

          <div className="pt-4">
            <Button variant="outline" className="w-full bg-transparent">
              Share Address
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
