import { Navbar } from "@/components/navbar"
import { GamificationHeader } from "@/components/gamification/gamification-header"
import { UserProgress } from "@/components/gamification/user-progress"
import { Achievements } from "@/components/gamification/achievements"
import { Leaderboard } from "@/components/gamification/leaderboard"
import { EcoChallenges } from "@/components/gamification/eco-challenges"
import { RewardsPanel } from "@/components/gamification/rewards-panel"

export default function GamificationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <GamificationHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <UserProgress />
            <Achievements />
            <EcoChallenges />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Leaderboard />
            <RewardsPanel />
          </div>
        </div>
      </main>
    </div>
  )
}
