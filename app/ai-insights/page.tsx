import { Navbar } from "@/components/navbar"
import { AIInsightsHeader } from "@/components/ai/ai-insights-header"
import { FraudDetection } from "@/components/ai/fraud-detection"
import { PredictiveAnalytics } from "@/components/ai/predictive-analytics"
import { RewardOptimization } from "@/components/ai/reward-optimization"
import { ProofOfAction } from "@/components/ai/proof-of-action"
import { AIRecommendations } from "@/components/ai/ai-recommendations"

export default function AIInsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AIInsightsHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <PredictiveAnalytics />
            <FraudDetection />
            <ProofOfAction />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <RewardOptimization />
            <AIRecommendations />
          </div>
        </div>
      </main>
    </div>
  )
}
