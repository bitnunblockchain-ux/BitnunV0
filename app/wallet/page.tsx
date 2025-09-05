"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WalletHeader } from "@/components/wallet/wallet-header"
import { WalletBalance } from "@/components/wallet/wallet-balance"
import { TransactionHistory } from "@/components/wallet/transaction-history"
import { SendReceive } from "@/components/wallet/send-receive"
import { WalletSecurity } from "@/components/wallet/wallet-security"

export default function WalletPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <WalletHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <WalletBalance />

        <Tabs defaultValue="transactions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="send-receive">Send & Receive</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="send-receive">
            <SendReceive />
          </TabsContent>

          <TabsContent value="security">
            <WalletSecurity />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
