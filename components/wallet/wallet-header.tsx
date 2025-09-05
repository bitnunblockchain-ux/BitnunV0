"use client"
import { Badge } from "@/components/ui/badge"
import { Wallet, Shield, Zap } from "lucide-react"

export function WalletHeader() {
  return (
    <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Wallet className="h-16 w-16 text-emerald-200" />
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-balance">BitnunEco Wallet</h1>
            <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto text-balance">
              Secure, fast, and eco-friendly BTN token management with zero transaction fees
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Shield className="h-4 w-4 mr-2" />
              Bank-Grade Security
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Zap className="h-4 w-4 mr-2" />
              Instant Transactions
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              Zero Fees
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
