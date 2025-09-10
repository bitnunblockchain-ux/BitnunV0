"use client"

import { useState } from "react"
import { SwapHeader } from "@/components/trading/swap-header"
import { SwapInterface } from "@/components/trading/swap-interface"
import { SwapHistory } from "@/components/trading/swap-history"
import { TokenSelector } from "@/components/trading/token-selector"

export default function SwapPage() {
  const [fromToken, setFromToken] = useState("BTN")
  const [toToken, setToToken] = useState("USDT")
  const [showTokenSelector, setShowTokenSelector] = useState<"from" | "to" | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <SwapHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2">
            <SwapInterface
              fromToken={fromToken}
              toToken={toToken}
              onFromTokenSelect={() => setShowTokenSelector("from")}
              onToTokenSelect={() => setShowTokenSelector("to")}
              onSwapTokens={() => {
                setFromToken(toToken)
                setToToken(fromToken)
              }}
            />
          </div>

          <div className="lg:col-span-1">
            <SwapHistory />
          </div>
        </div>

        {showTokenSelector && (
          <TokenSelector
            isOpen={!!showTokenSelector}
            onSelect={(token) => {
              if (showTokenSelector === "from") {
                setFromToken(token.symbol)
              } else {
                setToToken(token.symbol)
              }
              setShowTokenSelector(null)
            }}
            onClose={() => setShowTokenSelector(null)}
          />
        )}
      </div>
    </div>
  )
}
