"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Wallet, TrendingUp, TrendingDown } from "lucide-react"

interface TradingFormProps {
  selectedPair: string
  orderType: "buy" | "sell"
  onOrderTypeChange: (type: "buy" | "sell") => void
}

export function TradingForm({ selectedPair, orderType, onOrderTypeChange }: TradingFormProps) {
  const [orderMode, setOrderMode] = useState<"market" | "limit" | "stop">("market")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [total, setTotal] = useState("")

  const [baseToken, quoteToken] = selectedPair.split("/")
  const balance = orderType === "buy" ? 1250.5 : 5000.25

  const handleSubmitOrder = () => {
    // Real order submission logic would go here
    console.log("[v0] Submitting order:", { orderType, orderMode, amount, price, total })
  }

  return (
    <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Place Order</h3>
        <Badge variant="outline" className="text-xs">
          <Wallet className="w-3 h-3 mr-1" />
          Connected
        </Badge>
      </div>

      {/* Buy/Sell Toggle */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Button
          variant={orderType === "buy" ? "default" : "outline"}
          onClick={() => onOrderTypeChange("buy")}
          className={orderType === "buy" ? "bg-emerald-500 hover:bg-emerald-600" : ""}
        >
          <TrendingUp className="w-4 h-4 mr-2" />
          Buy {baseToken}
        </Button>
        <Button
          variant={orderType === "sell" ? "default" : "outline"}
          onClick={() => onOrderTypeChange("sell")}
          className={orderType === "sell" ? "bg-red-500 hover:bg-red-600" : ""}
        >
          <TrendingDown className="w-4 h-4 mr-2" />
          Sell {baseToken}
        </Button>
      </div>

      {/* Order Type Tabs */}
      <Tabs value={orderMode} onValueChange={(value) => setOrderMode(value as any)} className="mb-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="market">Market</TabsTrigger>
          <TabsTrigger value="limit">Limit</TabsTrigger>
          <TabsTrigger value="stop">Stop</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="market-amount">Amount ({baseToken})</Label>
            <Input
              id="market-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="limit" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="limit-price">Price ({quoteToken})</Label>
            <Input
              id="limit-price"
              type="number"
              placeholder="0.024500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="limit-amount">Amount ({baseToken})</Label>
            <Input
              id="limit-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </TabsContent>

        <TabsContent value="stop" className="space-y-4 mt-4">
          <div>
            <Label htmlFor="stop-price">Stop Price ({quoteToken})</Label>
            <Input
              id="stop-price"
              type="number"
              placeholder="0.024000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="stop-amount">Amount ({baseToken})</Label>
            <Input
              id="stop-amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Balance and Total */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">Available:</span>
          <span className="font-medium">
            {balance.toFixed(2)} {orderType === "buy" ? quoteToken : baseToken}
          </span>
        </div>
        {orderMode !== "market" && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-300">Total:</span>
            <span className="font-medium">
              {total || "0.00"} {quoteToken}
            </span>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmitOrder}
        className={`w-full ${
          orderType === "buy" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-red-500 hover:bg-red-600"
        }`}
        disabled={!amount}
      >
        {orderType === "buy" ? "Buy" : "Sell"} {baseToken}
      </Button>

      {/* Quick Percentage Buttons */}
      <div className="grid grid-cols-4 gap-2 mt-3">
        {["25%", "50%", "75%", "100%"].map((percentage) => (
          <Button
            key={percentage}
            variant="outline"
            size="sm"
            onClick={() => {
              const percent = Number.parseInt(percentage) / 100
              const maxAmount = orderType === "buy" ? (balance / 0.0245).toString() : (balance * percent).toString()
              setAmount((Number.parseFloat(maxAmount) * percent).toFixed(2))
            }}
          >
            {percentage}
          </Button>
        ))}
      </div>
    </Card>
  )
}
