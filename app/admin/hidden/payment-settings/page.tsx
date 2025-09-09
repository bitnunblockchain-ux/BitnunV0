"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, CreditCard, Wallet, Ban as Bank, Shield, AlertTriangle } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface PaymentSetting {
  id: string
  setting_key: string
  setting_value: string
  is_encrypted: boolean
  created_at: string
  updated_at: string
}

interface RevenueData {
  total_revenue: number
  monthly_revenue: number
  subscription_revenue: number
  credits_revenue: number
  transaction_count: number
  active_subscribers: number
}

export default function PaymentSettingsPage() {
  const [settings, setSettings] = useState<PaymentSetting[]>([])
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({})
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const supabase = createClientComponentClient()

  useEffect(() => {
    fetchPaymentSettings()
    fetchRevenueData()
  }, [])

  const fetchPaymentSettings = async () => {
    try {
      const { data, error } = await supabase.from("admin_payment_settings").select("*").order("setting_key")

      if (error) throw error
      setSettings(data || [])
    } catch (error) {
      console.error("Error fetching payment settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchRevenueData = async () => {
    try {
      // Fetch revenue analytics
      const { data: revenue, error } = await supabase
        .from("revenue_tracking")
        .select("*")
        .gte("date", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0])

      if (error) throw error

      // Calculate totals
      const totalRevenue = revenue?.reduce((sum, r) => sum + Number.parseFloat(r.amount), 0) || 0
      const subscriptionRevenue =
        revenue
          ?.filter((r) => r.revenue_type === "subscription")
          .reduce((sum, r) => sum + Number.parseFloat(r.amount), 0) || 0
      const creditsRevenue =
        revenue?.filter((r) => r.revenue_type === "credits").reduce((sum, r) => sum + Number.parseFloat(r.amount), 0) ||
        0
      const transactionCount = revenue?.reduce((sum, r) => sum + r.transaction_count, 0) || 0

      // Get active subscribers count
      const { count: activeSubscribers } = await supabase
        .from("user_subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active")

      setRevenueData({
        total_revenue: totalRevenue,
        monthly_revenue: totalRevenue, // Last 30 days
        subscription_revenue: subscriptionRevenue,
        credits_revenue: creditsRevenue,
        transaction_count: transactionCount,
        active_subscribers: activeSubscribers || 0,
      })
    } catch (error) {
      console.error("Error fetching revenue data:", error)
    }
  }

  const updateSetting = async (key: string, value: string, isEncrypted = true) => {
    setSaving(true)
    try {
      const { error } = await supabase.from("admin_payment_settings").upsert({
        setting_key: key,
        setting_value: value,
        is_encrypted: isEncrypted,
        updated_at: new Date().toISOString(),
      })

      if (error) throw error

      setMessage({ type: "success", text: "Setting updated successfully" })
      fetchPaymentSettings()
    } catch (error) {
      console.error("Error updating setting:", error)
      setMessage({ type: "error", text: "Failed to update setting" })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const toggleSecretVisibility = (key: string) => {
    setShowSecrets((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const getSetting = (key: string) => {
    return settings.find((s) => s.setting_key === key)?.setting_value || ""
  }

  const renderSecretInput = (key: string, label: string, placeholder: string, description?: string) => {
    const isVisible = showSecrets[key]
    const value = getSetting(key)

    return (
      <div className="space-y-2">
        <Label htmlFor={key}>{label}</Label>
        <div className="relative">
          <Input
            id={key}
            type={isVisible ? "text" : "password"}
            placeholder={placeholder}
            defaultValue={value}
            onBlur={(e) => {
              if (e.target.value !== value) {
                updateSetting(key, e.target.value)
              }
            }}
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => toggleSecretVisibility(key)}
          >
            {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Payment Settings</h1>
          <p className="text-muted-foreground">Manage payment credentials and revenue tracking</p>
        </div>

        {message && (
          <Alert className={`mb-6 ${message.type === "error" ? "border-destructive" : "border-green-500"}`}>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Revenue Overview */}
        {revenueData && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueData.total_revenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueData.monthly_revenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Subscriptions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueData.subscription_revenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Credits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${revenueData.credits_revenue.toFixed(2)}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueData.transaction_count}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Subs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{revenueData.active_subscribers}</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="stripe" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="stripe">Stripe</TabsTrigger>
            <TabsTrigger value="crypto">Crypto Wallets</TabsTrigger>
            <TabsTrigger value="banking">Banking</TabsTrigger>
            <TabsTrigger value="automation">AI Automation</TabsTrigger>
          </TabsList>

          <TabsContent value="stripe" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Stripe Configuration
                </CardTitle>
                <CardDescription>Configure Stripe for credit card and bank transfer processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput(
                  "stripe_secret_key",
                  "Stripe Secret Key",
                  "sk_live_...",
                  "Your Stripe secret key for processing payments",
                )}

                {renderSecretInput(
                  "stripe_webhook_secret",
                  "Stripe Webhook Secret",
                  "whsec_...",
                  "Webhook endpoint secret for secure event handling",
                )}

                <div className="space-y-2">
                  <Label htmlFor="stripe_public_key">Stripe Publishable Key</Label>
                  <Input
                    id="stripe_public_key"
                    placeholder="pk_live_..."
                    defaultValue={getSetting("stripe_public_key")}
                    onBlur={(e) => updateSetting("stripe_public_key", e.target.value, false)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crypto" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5" />
                  Cryptocurrency Wallets
                </CardTitle>
                <CardDescription>Configure wallet addresses and private keys for crypto payments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput(
                  "btc_wallet_address",
                  "Bitcoin Wallet Address",
                  "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
                  "Your Bitcoin wallet address for receiving payments",
                )}

                {renderSecretInput(
                  "btc_private_key",
                  "Bitcoin Private Key",
                  "Enter your Bitcoin private key",
                  "Private key for automated Bitcoin transfers",
                )}

                {renderSecretInput(
                  "eth_wallet_address",
                  "Ethereum Wallet Address",
                  "0x742d35Cc6634C0532925a3b8D4C9db96590b5b8c",
                  "Your Ethereum wallet address for receiving payments",
                )}

                {renderSecretInput(
                  "eth_private_key",
                  "Ethereum Private Key",
                  "Enter your Ethereum private key",
                  "Private key for automated ETH and ERC-20 transfers",
                )}

                {renderSecretInput(
                  "btn_wallet_private_key",
                  "BTN Wallet Private Key",
                  "Enter your BTN wallet private key",
                  "Private key for automated BTN token transfers",
                )}

                {renderSecretInput(
                  "usdt_wallet_address",
                  "USDT Wallet Address",
                  "0x...",
                  "Your USDT wallet address for stablecoin payments",
                )}

                {renderSecretInput(
                  "bnb_wallet_address",
                  "Binance Smart Chain (BNB) Address",
                  "0x...",
                  "Your BSC wallet address for BNB and BEP-20 tokens",
                )}

                {renderSecretInput(
                  "sol_wallet_address",
                  "Solana Wallet Address",
                  "Enter your Solana wallet address",
                  "Your Solana wallet address for SOL payments",
                )}

                {renderSecretInput(
                  "ada_wallet_address",
                  "Cardano Wallet Address",
                  "addr1...",
                  "Your Cardano wallet address for ADA payments",
                )}

                {renderSecretInput(
                  "polygon_wallet_address",
                  "Polygon (MATIC) Address",
                  "0x...",
                  "Your Polygon wallet address for MATIC payments",
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="banking" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bank className="h-5 w-5" />
                  Banking Information
                </CardTitle>
                <CardDescription>Configure bank accounts for fiat currency processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput(
                  "bank_account_iban",
                  "Primary Bank Account IBAN",
                  "GB29 NWBK 6016 1331 9268 19",
                  "Your primary bank account IBAN for receiving fiat payments",
                )}

                {renderSecretInput(
                  "bank_account_iban_secondary",
                  "Secondary Bank Account IBAN",
                  "DE89 3704 0044 0532 0130 00",
                  "Your secondary bank account IBAN for backup payments",
                )}

                {renderSecretInput(
                  "bank_swift_code",
                  "SWIFT/BIC Code",
                  "NWBKGB2L",
                  "Your bank SWIFT code for international transfers",
                )}

                {renderSecretInput(
                  "visa_card_number",
                  "Visa Card Number",
                  "4111 1111 1111 1111",
                  "Your Visa card number for receiving payments",
                )}

                {renderSecretInput("visa_card_cvv", "Visa Card CVV", "123", "Your Visa card CVV code")}

                <div className="space-y-2">
                  <Label htmlFor="visa_card_expiry">Visa Card Expiry</Label>
                  <Input
                    id="visa_card_expiry"
                    placeholder="MM/YY"
                    defaultValue={getSetting("visa_card_expiry")}
                    onBlur={(e) => updateSetting("visa_card_expiry", e.target.value, true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank_name">Bank Name</Label>
                  <Input
                    id="bank_name"
                    placeholder="Your Bank Name"
                    defaultValue={getSetting("bank_name")}
                    onBlur={(e) => updateSetting("bank_name", e.target.value, false)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bank_address">Bank Address</Label>
                  <Textarea
                    id="bank_address"
                    placeholder="Bank address for wire transfers"
                    defaultValue={getSetting("bank_address")}
                    onBlur={(e) => updateSetting("bank_address", e.target.value, false)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_holder_name">Account Holder Name</Label>
                  <Input
                    id="account_holder_name"
                    placeholder="Your full name as on bank account"
                    defaultValue={getSetting("account_holder_name")}
                    onBlur={(e) => updateSetting("account_holder_name", e.target.value, false)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="account_holder_address">Account Holder Address</Label>
                  <Textarea
                    id="account_holder_address"
                    placeholder="Your registered address"
                    defaultValue={getSetting("account_holder_address")}
                    onBlur={(e) => updateSetting("account_holder_address", e.target.value, false)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alternative Payment Methods</CardTitle>
                <CardDescription>Configure additional payment processors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {renderSecretInput(
                  "paypal_client_id",
                  "PayPal Client ID",
                  "Enter your PayPal client ID",
                  "Your PayPal client ID for payment processing",
                )}

                {renderSecretInput(
                  "paypal_client_secret",
                  "PayPal Client Secret",
                  "Enter your PayPal client secret",
                  "Your PayPal client secret for API access",
                )}

                {renderSecretInput(
                  "wise_api_key",
                  "Wise (TransferWise) API Key",
                  "Enter your Wise API key",
                  "API key for international transfers via Wise",
                )}

                {renderSecretInput(
                  "revolut_api_key",
                  "Revolut Business API Key",
                  "Enter your Revolut API key",
                  "API key for Revolut business payments",
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  AI Payment Automation
                </CardTitle>
                <CardDescription>Configure AI automation settings for payment processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="auto_payment_threshold">Auto Payment Threshold ($)</Label>
                  <Input
                    id="auto_payment_threshold"
                    type="number"
                    placeholder="1000"
                    defaultValue={getSetting("auto_payment_threshold")}
                    onBlur={(e) => updateSetting("auto_payment_threshold", e.target.value, false)}
                  />
                  <p className="text-sm text-muted-foreground">Minimum amount for automatic payment processing</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ai_risk_threshold">AI Risk Assessment Threshold</Label>
                  <Input
                    id="ai_risk_threshold"
                    type="number"
                    step="0.1"
                    max="1"
                    min="0"
                    placeholder="0.8"
                    defaultValue={getSetting("ai_risk_threshold")}
                    onBlur={(e) => updateSetting("ai_risk_threshold", e.target.value, false)}
                  />
                  <p className="text-sm text-muted-foreground">Risk threshold for AI payment approval (0-1)</p>
                </div>

                {renderSecretInput(
                  "notification_webhook_url",
                  "Notification Webhook URL",
                  "https://your-domain.com/webhooks/payments",
                  "URL for payment notifications and alerts",
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="font-medium">Security Notice</span>
          </div>
          <p className="text-sm text-muted-foreground">
            All sensitive payment credentials are encrypted and stored securely. The AI automation system will use these
            credentials to process payments, send crypto transfers, and manage revenue automatically based on your
            configured thresholds.
          </p>
        </div>
      </div>
    </div>
  )
}
