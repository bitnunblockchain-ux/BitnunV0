"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { PiggyBank, TrendingDown, Shield, AlertTriangle, DollarSign, Percent } from "lucide-react"

interface LendingMarket {
  asset: string
  symbol: string
  supplyAPY: number
  borrowAPY: number
  totalSupplied: number
  totalBorrowed: number
  utilizationRate: number
  collateralFactor: number
  liquidationThreshold: number
}

export default function LendingPage() {
  const [selectedAsset, setSelectedAsset] = useState<LendingMarket | null>(null)
  const [activeTab, setActiveTab] = useState<"supply" | "borrow">("supply")
  const [amount, setAmount] = useState("")
  const [collateralRatio, setCollateralRatio] = useState([150])

  const lendingMarkets: LendingMarket[] = [
    {
      asset: "Bitcoin",
      symbol: "BTC",
      supplyAPY: 3.2,
      borrowAPY: 5.8,
      totalSupplied: 1250000,
      totalBorrowed: 890000,
      utilizationRate: 71.2,
      collateralFactor: 75,
      liquidationThreshold: 80,
    },
    {
      asset: "Ethereum",
      symbol: "ETH",
      supplyAPY: 4.1,
      borrowAPY: 6.5,
      totalSupplied: 2100000,
      totalBorrowed: 1470000,
      utilizationRate: 70.0,
      collateralFactor: 80,
      liquidationThreshold: 85,
    },
    {
      asset: "BitnunEco Token",
      symbol: "BTN",
      supplyAPY: 8.5,
      borrowAPY: 12.3,
      totalSupplied: 5600000,
      totalBorrowed: 3920000,
      utilizationRate: 70.0,
      collateralFactor: 70,
      liquidationThreshold: 75,
    },
    {
      asset: "USD Coin",
      symbol: "USDC",
      supplyAPY: 2.8,
      borrowAPY: 4.2,
      totalSupplied: 8900000,
      totalBorrowed: 6230000,
      utilizationRate: 70.0,
      collateralFactor: 85,
      liquidationThreshold: 90,
    },
  ]

  const calculateBorrowPower = (collateralValue: number, collateralFactor: number) => {
    return (collateralValue * collateralFactor) / 100
  }

  const calculateLiquidationPrice = (borrowAmount: number, collateralAmount: number, threshold: number) => {
    return (borrowAmount * threshold) / (100 * collateralAmount)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Lending & Borrowing
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Supply assets to earn interest or borrow against your collateral. Decentralized lending made simple.
          </p>
        </div>

        {/* Protocol Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Supplied</CardTitle>
              <PiggyBank className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${lendingMarkets.reduce((sum, market) => sum + market.totalSupplied, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-green-400">+15.2%</span> this month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Borrowed</CardTitle>
              <TrendingDown className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                ${lendingMarkets.reduce((sum, market) => sum + market.totalBorrowed, 0).toLocaleString()}
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-blue-400">70.5%</span> utilization
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Active Loans</CardTitle>
              <DollarSign className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">2,847</div>
              <p className="text-xs text-gray-400">Healthy positions</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Avg Supply APY</CardTitle>
              <Percent className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">
                {(lendingMarkets.reduce((sum, market) => sum + market.supplyAPY, 0) / lendingMarkets.length).toFixed(1)}
                %
              </div>
              <p className="text-xs text-gray-400">Across all markets</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Markets List */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Lending Markets</CardTitle>
                <CardDescription className="text-gray-400">Select an asset to supply or borrow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lendingMarkets.map((market) => (
                    <div
                      key={market.symbol}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedAsset?.symbol === market.symbol
                          ? "border-primary bg-primary/10"
                          : "border-gray-600 bg-gray-700/30 hover:bg-gray-700/50"
                      }`}
                      onClick={() => setSelectedAsset(market)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center font-bold">
                            {market.symbol.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-white">{market.asset}</h3>
                            <p className="text-sm text-gray-400">{market.symbol}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className="bg-green-600 mb-1">{market.supplyAPY.toFixed(1)}% APY</Badge>
                          <p className="text-xs text-gray-400">Supply Rate</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Total Supplied:</span>
                          <p className="text-white font-medium">${market.totalSupplied.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Total Borrowed:</span>
                          <p className="text-white font-medium">${market.totalBorrowed.toLocaleString()}</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Utilization:</span>
                          <p className="text-white font-medium">{market.utilizationRate.toFixed(1)}%</p>
                        </div>
                        <div>
                          <span className="text-gray-400">Borrow APY:</span>
                          <p className="text-red-400 font-medium">{market.borrowAPY.toFixed(1)}%</p>
                        </div>
                      </div>

                      <div className="mt-3">
                        <Progress value={market.utilizationRate} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Supply/Borrow Interface */}
          <div>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {selectedAsset ? `${selectedAsset.asset} (${selectedAsset.symbol})` : "Select Asset"}
                </CardTitle>
                <CardDescription className="text-gray-400">Supply or borrow this asset</CardDescription>
              </CardHeader>
              <CardContent>
                {selectedAsset ? (
                  <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "supply" | "borrow")}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-700/50">
                      <TabsTrigger value="supply">Supply</TabsTrigger>
                      <TabsTrigger value="borrow">Borrow</TabsTrigger>
                    </TabsList>

                    <TabsContent value="supply" className="space-y-4">
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Supply APY</span>
                            <span className="text-green-400 font-bold">{selectedAsset.supplyAPY.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Collateral Factor</span>
                            <span className="text-white">{selectedAsset.collateralFactor}%</span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="supply-amount" className="text-gray-300">
                            Amount to Supply
                          </Label>
                          <Input
                            id="supply-amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-gray-700/50 border-gray-600 text-white"
                            placeholder="0.0"
                          />
                          <p className="text-xs text-gray-400 mt-1">Balance: 1,250.00 {selectedAsset.symbol}</p>
                        </div>

                        {amount && (
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-white mb-2">Transaction Overview</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Supply Amount:</span>
                                <span className="text-white">
                                  {amount} {selectedAsset.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Yearly Earnings:</span>
                                <span className="text-green-400">
                                  {(Number(amount) * selectedAsset.supplyAPY * 0.01).toFixed(4)} {selectedAsset.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Borrow Power:</span>
                                <span className="text-primary">
                                  $
                                  {calculateBorrowPower(
                                    Number(amount) * 50000,
                                    selectedAsset.collateralFactor,
                                  ).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <PiggyBank className="h-4 w-4 mr-2" />
                          Supply {selectedAsset.symbol}
                        </Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="borrow" className="space-y-4">
                      <div className="space-y-4">
                        <div className="bg-gray-700/30 rounded-lg p-3">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-400">Borrow APY</span>
                            <span className="text-red-400 font-bold">{selectedAsset.borrowAPY.toFixed(2)}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-400">Liquidation Threshold</span>
                            <span className="text-white">{selectedAsset.liquidationThreshold}%</span>
                          </div>
                        </div>

                        <div>
                          <Label htmlFor="borrow-amount" className="text-gray-300">
                            Amount to Borrow
                          </Label>
                          <Input
                            id="borrow-amount"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="bg-gray-700/50 border-gray-600 text-white"
                            placeholder="0.0"
                          />
                          <p className="text-xs text-gray-400 mt-1">Available: 850.00 {selectedAsset.symbol}</p>
                        </div>

                        <div>
                          <Label className="text-gray-300">Collateral Ratio: {collateralRatio[0]}%</Label>
                          <Slider
                            value={collateralRatio}
                            onValueChange={setCollateralRatio}
                            max={300}
                            min={120}
                            step={10}
                            className="mt-2"
                          />
                          <div className="flex justify-between text-xs text-gray-400 mt-1">
                            <span>Risky (120%)</span>
                            <span>Safe (300%)</span>
                          </div>
                        </div>

                        {amount && (
                          <div className="bg-gray-700/30 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-white mb-2">Loan Overview</h4>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Borrow Amount:</span>
                                <span className="text-white">
                                  {amount} {selectedAsset.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Yearly Interest:</span>
                                <span className="text-red-400">
                                  {(Number(amount) * selectedAsset.borrowAPY * 0.01).toFixed(4)} {selectedAsset.symbol}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Liquidation Price:</span>
                                <span className="text-yellow-400">
                                  $
                                  {calculateLiquidationPrice(
                                    Number(amount) * 50000,
                                    100,
                                    selectedAsset.liquidationThreshold,
                                  ).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium">Risk Warning</span>
                          </div>
                          <p className="text-xs text-gray-300">
                            Borrowing carries liquidation risk. Monitor your collateral ratio to avoid liquidation.
                          </p>
                        </div>

                        <Button className="w-full bg-red-600 hover:bg-red-700">
                          <TrendingDown className="h-4 w-4 mr-2" />
                          Borrow {selectedAsset.symbol}
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                ) : (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-400">Select an asset to start lending or borrowing</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
