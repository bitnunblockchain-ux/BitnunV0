"use client"

import { useState } from "react"
import { TradingHeader } from "@/components/trading/trading-header"
import { TradingChart } from "@/components/trading/trading-chart"
import { OrderBook } from "@/components/trading/order-book"
import { TradingForm } from "@/components/trading/trading-form"
import { PositionsPanel } from "@/components/trading/positions-panel"
import { MarketStats } from "@/components/trading/market-stats"

export default function TradingPage() {
  const [selectedPair, setSelectedPair] = useState("BTN/USDT")
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20">
      <div className="container mx-auto px-4 py-6">
        <TradingHeader selectedPair={selectedPair} onPairChange={setSelectedPair} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Market Stats */}
          <div className="lg:col-span-4">
            <MarketStats selectedPair={selectedPair} />
          </div>

          {/* Trading Chart */}
          <div className="lg:col-span-3">
            <TradingChart selectedPair={selectedPair} />
          </div>

          {/* Order Book */}
          <div className="lg:col-span-1">
            <OrderBook selectedPair={selectedPair} />
          </div>

          {/* Trading Form */}
          <div className="lg:col-span-1">
            <TradingForm selectedPair={selectedPair} orderType={orderType} onOrderTypeChange={setOrderType} />
          </div>

          {/* Positions Panel */}
          <div className="lg:col-span-3">
            <PositionsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
