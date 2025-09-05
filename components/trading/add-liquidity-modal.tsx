"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Settings, Info } from "lucide-react"

interface AddLiquidityModalProps {
  isOpen: boolean
  onClose: () => void
  token0?: string
  token1?: string
}

export function AddLiquidityModal({ isOpen, onClose, token0 = "BTN", token1 = "USDT" }: AddLiquidityModalProps) {
  const [amount0, setAmount0] = useState("")
  const [amount1, setAmount1] = useState("")
  const [slippage, setSlippage] = useState("0.5")

  const handleAmount0Change = (value: string) => {
    setAmount0(value)
    // Auto-calculate amount1 based on pool ratio
    if (value) {
      const ratio = 5.35 // BTN/USDT price
      setAmount1((Number.parseFloat(value) * ratio).toFixed(2))
    } else {
      setAmount1("")
    }
  }

  const handleAmount1Change = (value: string) => {
    setAmount1(value)
    // Auto-calculate amount0 based on pool ratio
    if (value) {
      const ratio = 5.35 // BTN/USDT price
      setAmount0((Number.parseFloat(value) / ratio).toFixed(6))
    } else {
      setAmount0("")
    }
  }

  const estimatedLP = amount0 && amount1 ? Math.sqrt(Number.parseFloat(amount0) * Number.parseFloat(amount1)) : 0
  const poolShare = estimatedLP > 0 ? ((estimatedLP / 1000000) * 100).toFixed(4) : "0"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-800">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-white">Add Liquidity</DialogTitle>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Token Input 0 */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-400">Amount</Label>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount0}
                    onChange={(e) => handleAmount0Change(e.target.value)}
                    className="border-0 bg-transparent text-xl font-semibold text-white p-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">
                      {token0}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Balance: 15,000 {token0}</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-emerald-400 hover:text-emerald-300">
                    MAX
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plus Icon */}
          <div className="flex justify-center">
            <div className="p-2 bg-gray-800 rounded-full border border-gray-700">
              <Plus className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Token Input 1 */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-400">Amount</Label>
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={amount1}
                    onChange={(e) => handleAmount1Change(e.target.value)}
                    className="border-0 bg-transparent text-xl font-semibold text-white p-0 focus-visible:ring-0"
                  />
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="border-cyan-500/30 text-cyan-400">
                      {token1}
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>Balance: 50,000 {token1}</span>
                  <Button variant="ghost" size="sm" className="h-auto p-0 text-emerald-400 hover:text-emerald-300">
                    MAX
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pool Information */}
          <Card className="bg-gray-800/30 border-gray-700">
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Info className="w-4 h-4" />
                <span>Pool Information</span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Pool Share</span>
                  <span className="text-white">{poolShare}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LP Tokens</span>
                  <span className="text-white">{estimatedLP.toFixed(6)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Exchange Rate</span>
                  <span className="text-white">
                    1 {token0} = 5.35 {token1}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <span className="text-white">{slippage}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Slippage Settings */}
          <div className="space-y-2">
            <Label className="text-sm text-gray-400">Slippage Tolerance</Label>
            <div className="flex gap-2">
              {["0.1", "0.5", "1.0"].map((value) => (
                <Button
                  key={value}
                  variant={slippage === value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSlippage(value)}
                  className={slippage === value ? "bg-emerald-600 hover:bg-emerald-700" : "border-gray-700"}
                >
                  {value}%
                </Button>
              ))}
              <Input
                type="number"
                placeholder="Custom"
                value={slippage}
                onChange={(e) => setSlippage(e.target.value)}
                className="w-20 h-8 text-sm bg-gray-800 border-gray-700"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold"
              disabled={!amount0 || !amount1}
            >
              Add Liquidity
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
