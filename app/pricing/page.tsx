"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star, Zap, Crown, Diamond } from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  price_monthly: number
  price_yearly: number
  features: string[]
  limits: Record<string, number>
  is_active: boolean
}

interface MembershipTier {
  id: string
  name: string
  slug: string
  required_volume: number
  fee_discount_percent: number
  benefits: string[]
  color: string
}

export default function PricingPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [tiers, setTiers] = useState<MembershipTier[]>([])
  const [isYearly, setIsYearly] = useState(false)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter()

  useEffect(() => {
    fetchPricingData()
  }, [])

  const fetchPricingData = async () => {
    try {
      const [plansResponse, tiersResponse] = await Promise.all([
        supabase.from("subscription_plans").select("*").eq("is_active", true).order("price_monthly"),
        supabase.from("membership_tiers").select("*").order("required_volume"),
      ])

      if (plansResponse.data) setPlans(plansResponse.data)
      if (tiersResponse.data) setTiers(tiersResponse.data)
    } catch (error) {
      console.error("Error fetching pricing data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = async (planSlug: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login?redirect=/pricing")
        return
      }

      // Redirect to payment processing
      router.push(`/checkout?plan=${planSlug}&billing=${isYearly ? "yearly" : "monthly"}`)
    } catch (error) {
      console.error("Error initiating subscription:", error)
    }
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return <Zap className="h-6 w-6" />
      case "pro":
        return <Star className="h-6 w-6" />
      case "enterprise":
        return <Crown className="h-6 w-6" />
      default:
        return <Zap className="h-6 w-6" />
    }
  }

  const getTierIcon = (tierName: string) => {
    switch (tierName.toLowerCase()) {
      case "silver":
        return <Star className="h-5 w-5" />
      case "gold":
        return <Crown className="h-5 w-5" />
      case "diamond":
        return <Diamond className="h-5 w-5" />
      default:
        return <Star className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Market-Leading <span className="text-primary">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The most competitive rates in the industry. Start free, scale as you grow, with the lowest fees and
              highest value for your blockchain operations.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`text-sm ${!isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge variant="secondary" className="ml-2">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Subscription Plans</h2>
          <p className="text-muted-foreground">Choose the perfect plan for your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative ${plan.slug === "pro" ? "border-primary shadow-lg scale-105" : ""}`}
            >
              {plan.slug === "pro" && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-8">
                <div className="flex justify-center mb-4">{getPlanIcon(plan.name)}</div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm">
                  {plan.slug === "free" && "Perfect for getting started"}
                  {plan.slug === "pro" && "Best for growing businesses"}
                  {plan.slug === "enterprise" && "For large organizations"}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? (plan.price_yearly / 12).toFixed(0) : plan.price_monthly.toFixed(0)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                  {isYearly && plan.price_yearly > 0 && (
                    <div className="text-sm text-muted-foreground">Billed annually (${plan.price_yearly}/year)</div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSubscribe(plan.slug)}
                  className={`w-full ${plan.slug === "pro" ? "bg-primary hover:bg-primary/90" : ""}`}
                  variant={plan.slug === "free" ? "outline" : "default"}
                >
                  {plan.slug === "free" ? "Get Started Free" : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Membership Tiers */}
      <div className="bg-muted/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">VIP Membership Tiers</h2>
            <p className="text-muted-foreground">Unlock exclusive benefits based on your trading volume</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card key={tier.id} className="text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full`} style={{ backgroundColor: tier.color + "20" }}>
                      {getTierIcon(tier.name)}
                    </div>
                  </div>
                  <CardTitle className="text-xl" style={{ color: tier.color }}>
                    {tier.name} Member
                  </CardTitle>
                  <CardDescription>${tier.required_volume.toLocaleString()}+ monthly volume</CardDescription>
                  <div className="mt-2">
                    <Badge variant="secondary">{tier.fee_discount_percent}% Fee Discount</Badge>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <Check className="h-3 w-3 text-primary flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Transparent Fee Structure</h2>
          <p className="text-muted-foreground">Industry-leading low fees with no hidden costs</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Crypto Trading</CardTitle>
              <div className="text-2xl font-bold text-primary">0.05%</div>
              <CardDescription>Lower than Binance (0.1%)</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Spot Trading</CardTitle>
              <div className="text-2xl font-bold text-primary">0.04%</div>
              <CardDescription>Competitive maker/taker</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">API Calls</CardTitle>
              <div className="text-2xl font-bold text-primary">$0.001</div>
              <CardDescription>Per API request</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-lg">Withdrawals</CardTitle>
              <div className="text-2xl font-bold text-primary">$2-5</div>
              <CardDescription>Crypto/Fiat withdrawals</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      {/* Pay-as-you-go */}
      <div className="bg-primary/5 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Pay-as-you-go Credits</h2>
          <p className="text-muted-foreground mb-8">
            No subscription? No problem. Buy credits and pay only for what you use.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Starter Pack</CardTitle>
                <div className="text-2xl font-bold">$10</div>
                <CardDescription>1,000 credits</CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-primary">
              <CardHeader className="text-center">
                <CardTitle>Value Pack</CardTitle>
                <div className="text-2xl font-bold">$45</div>
                <CardDescription>5,000 credits (10% bonus)</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader className="text-center">
                <CardTitle>Power Pack</CardTitle>
                <div className="text-2xl font-bold">$180</div>
                <CardDescription>25,000 credits (25% bonus)</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Button size="lg" onClick={() => router.push("/credits")}>
            Buy Credits Now
          </Button>
        </div>
      </div>
    </div>
  )
}
