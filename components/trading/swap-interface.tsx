"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Settings, Info } from "lucide-react"

interface SwapInterfaceProps {
  fromToken: string
  toToken: string
  onFromTokenSelect: () => void
  onToTokenSelect: () => void
  onSwapTokens: () => void
}

export function SwapInterface({
  fromToken,
  toToken,
  onFromTokenSelect,
  onToTokenSelect,
  onSwapTokens,
}: SwapInterfaceProps) {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [slippage, setSlippage] = useState(0.5)

  const handleSwap = () => {
    // TODO: Implement actual swap execution with proper error handling
  }

  const rate = 0.0245
  const priceImpact = 0.12
  const minimumReceived = Number.parseFloat(toAmount) * (1 - slippage / 100)

  return (
    <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Swap Tokens</h3>
        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-300">From</label>
            <span className="text-sm text-gray-600 dark:text-gray-300">Balance: 1,247.89 {fromToken}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => {
                setFromAmount(e.target.value)
                if (e.target.value) {
                  setToAmount((Number.parseFloat(e.target.value) * rate).toFixed(6))
                } else {
                  setToAmount("")
                }
              }}
              className="flex-1"
            />
            <Button variant="outline" onClick={onFromTokenSelect} className="min-w-[100px] bg-transparent">
              {fromToken}
            </Button>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button variant="outline" size="sm" onClick={onSwapTokens} className="rounded-full p-2 bg-transparent">
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-sm text-gray-600 dark:text-gray-300">To</label>
            <span className="text-sm text-gray-600 dark:text-gray-300">Balance: 850.32 {toToken}</span>
          </div>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              onChange={(e) => {
                setToAmount(e.target.value)
                if (e.target.value) {
                  setFromAmount((Number.parseFloat(e.target.value) / rate).toFixed(6))
                } else {
                  setFromAmount("")
                }
              }}
              className="flex-1"
            />
            <Button variant="outline" onClick={onToTokenSelect} className="min-w-[100px] bg-transparent">
              {toToken}
            </Button>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Rate</span>
              <span className="text-gray-900 dark:text-white">
                1 {fromToken} = {rate.toFixed(6)} {toToken}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Price Impact</span>
              <span className={`${priceImpact > 1 ? "text-red-500" : "text-emerald-500"}`}>
                {priceImpact.toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Minimum Received</span>
              <span className="text-gray-900 dark:text-white">
                {minimumReceived.toFixed(6)} {toToken}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600 dark:text-gray-300">Slippage Tolerance</span>
              <span className="text-gray-900 dark:text-white">{slippage}%</span>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount}
          className="w-full bg-emerald-500 hover:bg-emerald-600"
        >
          {!fromAmount || !toAmount ? "Enter Amount" : `Swap ${fromToken} for ${toToken}`}
        </Button>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
          <Info className="w-4 h-4" />
          <span>Swaps are executed instantly with minimal slippage</span>
        </div>
      </div>
    </Card>
  )
}
