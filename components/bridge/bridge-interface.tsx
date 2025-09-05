"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, Settings, Info, Zap, Clock } from "lucide-react"

interface Network {
  id: string
  name: string
  symbol: string
  color: string
  fee: number
  time: string
}

export function BridgeInterface() {
  const [fromNetwork, setFromNetwork] = useState("ethereum")
  const [toNetwork, setToNetwork] = useState("polygon")
  const [fromToken, setFromToken] = useState("BTN")
  const [toToken, setToToken] = useState("BTN")
  const [amount, setAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)

  const networks: Network[] = [
    { id: "ethereum", name: "Ethereum", symbol: "ETH", color: "bg-blue-500", fee: 25.5, time: "5-10 min" },
    { id: "polygon", name: "Polygon", symbol: "MATIC", color: "bg-purple-500", fee: 0.1, time: "2-3 min" },
    { id: "bsc", name: "BSC", symbol: "BNB", color: "bg-yellow-500", fee: 0.5, time: "1-2 min" },
    { id: "arbitrum", name: "Arbitrum", symbol: "ARB", color: "bg-blue-600", fee: 2.1, time: "3-5 min" },
    { id: "optimism", name: "Optimism", symbol: "OP", color: "bg-red-500", fee: 1.8, time: "3-5 min" },
    { id: "avalanche", name: "Avalanche", symbol: "AVAX", color: "bg-red-600", fee: 0.8, time: "1-2 min" },
  ]

  const tokens = ["BTN", "USDT", "USDC", "ETH", "WBTC"]

  const fromNetworkData = networks.find((n) => n.id === fromNetwork)
  const toNetworkData = networks.find((n) => n.id === toNetwork)

  const estimatedFee = fromNetworkData?.fee || 0
  const estimatedTime = fromNetworkData?.time || "Unknown"
  const estimatedReceived = amount ? (Number.parseFloat(amount) * 0.999).toFixed(6) : "0"

  const handleSwapNetworks = () => {
    const temp = fromNetwork
    setFromNetwork(toNetwork)
    setToNetwork(temp)
  }

  const handleBridge = () => {
    console.log("[v0] Bridging assets:", {
      fromNetwork,
      toNetwork,
      fromToken,
      toToken,
      amount,
    })
  }

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bridge Assets</h3>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-6">
        {/* From Network */}
        <div className="space-y-3">
          <Label>From Network</Label>
          <div className="grid grid-cols-2 gap-3">
            <Select value={fromNetwork} onValueChange={setFromNetwork}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${network.color}`} />
                      {network.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={fromToken} onValueChange={setFromToken}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token} value={token}>
                    {token}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Input
              type="number"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-lg"
            />
            <div className="flex justify-between items-center mt-1 text-sm text-gray-600 dark:text-gray-300">
              <span>Balance: 1,247.89 {fromToken}</span>
              <Button variant="ghost" size="sm" className="h-auto p-0 text-emerald-500">
                Max
              </Button>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={handleSwapNetworks} className="rounded-full p-2 bg-transparent">
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Network */}
        <div className="space-y-3">
          <Label>To Network</Label>
          <div className="grid grid-cols-2 gap-3">
            <Select value={toNetwork} onValueChange={setToNetwork}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {networks.map((network) => (
                  <SelectItem key={network.id} value={network.id}>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${network.color}`} />
                      {network.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={toToken} onValueChange={setToToken}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tokens.map((token) => (
                  <SelectItem key={token} value={token}>
                    {token}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {estimatedReceived} {toToken}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">You will receive</div>
          </div>
        </div>

        {/* Bridge Details */}
        {amount && (
          <div className="space-y-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Bridge Fee</span>
              <span className="text-gray-900 dark:text-white">${estimatedFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Estimated Time</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span className="text-gray-900 dark:text-white">{estimatedTime}</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Slippage Tolerance</span>
              <span className="text-gray-900 dark:text-white">{slippage}%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Minimum Received</span>
              <span className="text-gray-900 dark:text-white">
                {(Number.parseFloat(estimatedReceived) * (1 - slippage / 100)).toFixed(6)} {toToken}
              </span>
            </div>
          </div>
        )}

        {/* Bridge Button */}
        <Button
          onClick={handleBridge}
          disabled={!amount || fromNetwork === toNetwork}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          {!amount ? (
            "Enter Amount"
          ) : fromNetwork === toNetwork ? (
            "Select Different Networks"
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Bridge {fromToken}
            </>
          )}
        </Button>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Info className="w-4 h-4" />
          <span>Cross-chain bridges are secured by multiple validators and may take several minutes to complete.</span>
        </div>
      </div>
    </Card>
  )
}
