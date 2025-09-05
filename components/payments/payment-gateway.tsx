"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Wallet, Bitcoin, Shield, Zap, Globe } from "lucide-react"

interface PaymentGatewayProps {
  amount?: number
  currency?: string
  onPaymentComplete?: (result: any) => void
}

export default function PaymentGateway({ amount = 0, currency = "USD", onPaymentComplete }: PaymentGatewayProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>("")
  const [processing, setProcessing] = useState(false)

  const paymentMethods = [
    {
      id: "card",
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, American Express",
      fees: "2.9% + $0.30",
      supported: ["USD", "EUR", "GBP", "CAD", "AUD"],
    },
    {
      id: "crypto",
      name: "Cryptocurrency",
      icon: <Bitcoin className="h-5 w-5" />,
      description: "Bitcoin, Ethereum, USDC, USDT",
      fees: "1.5%",
      supported: ["BTC", "ETH", "USDC", "USDT", "BTN"],
    },
    {
      id: "btn",
      name: "BTN Native",
      icon: <Wallet className="h-5 w-5" />,
      description: "BitnunEco native token",
      fees: "0%",
      supported: ["BTN"],
    },
    {
      id: "bank",
      name: "Bank Transfer",
      icon: <Globe className="h-5 w-5" />,
      description: "ACH, Wire Transfer, SEPA",
      fees: "0.8%",
      supported: ["USD", "EUR", "GBP"],
    },
  ]

  const handlePayment = async () => {
    setProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const result = {
      success: true,
      transactionId: `tx_${Date.now()}`,
      amount,
      currency,
      method: selectedMethod,
    }

    setProcessing(false)
    onPaymentComplete?.(result)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Payment Amount */}
      <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            <span>Payment Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="amount" className="text-slate-300">
                Amount
              </Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                className="bg-slate-700/50 border-slate-600 text-white"
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="currency" className="text-slate-300">
                Currency
              </Label>
              <Select value={currency}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="BTN">BTN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="text-center p-4 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-lg border border-cyan-500/20">
            <div className="text-3xl font-bold text-white">
              {amount.toLocaleString()} {currency}
            </div>
            <div className="text-slate-400">Total Amount</div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="bg-slate-800/50 border-cyan-500/30 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Shield className="h-5 w-5 text-emerald-400" />
            <span>Select Payment Method</span>
          </CardTitle>
          <CardDescription>Choose your preferred payment option</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedMethod === method.id
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-slate-600 bg-slate-700/30 hover:border-slate-500"
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="p-2 rounded-full bg-slate-600/50">{method.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-white">{method.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {method.fees}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{method.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {method.supported.slice(0, 3).map((curr) => (
                        <Badge key={curr} variant="secondary" className="text-xs">
                          {curr}
                        </Badge>
                      ))}
                      {method.supported.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{method.supported.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedMethod && (
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600">
              <h4 className="font-medium text-white mb-3">Payment Information</h4>

              {selectedMethod === "card" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="cardNumber" className="text-slate-300">
                      Card Number
                    </Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      className="bg-slate-600/50 border-slate-500 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry" className="text-slate-300">
                      Expiry Date
                    </Label>
                    <Input id="expiry" placeholder="MM/YY" className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-slate-300">
                      CVV
                    </Label>
                    <Input id="cvv" placeholder="123" className="bg-slate-600/50 border-slate-500 text-white" />
                  </div>
                </div>
              )}

              {selectedMethod === "crypto" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cryptoCurrency" className="text-slate-300">
                      Cryptocurrency
                    </Label>
                    <Select>
                      <SelectTrigger className="bg-slate-600/50 border-slate-500 text-white">
                        <SelectValue placeholder="Select cryptocurrency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                        <SelectItem value="btn">BitnunEco (BTN)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="walletAddress" className="text-slate-300">
                      Wallet Address
                    </Label>
                    <Input
                      id="walletAddress"
                      placeholder="0x742d35Cc6634C0532925a3b8D404fddBD4f3dC"
                      className="bg-slate-600/50 border-slate-500 text-white"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === "btn" && (
                <div className="text-center p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-lg">
                  <Wallet className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
                  <p className="text-white font-medium">BTN Native Payment</p>
                  <p className="text-slate-400 text-sm">Zero fees • Instant settlement</p>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={handlePayment}
            disabled={!selectedMethod || processing}
            className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50"
          >
            {processing ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              `Pay ${amount.toLocaleString()} ${currency}`
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
