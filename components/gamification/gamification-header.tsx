import { Trophy, Star, Zap, Leaf } from "lucide-react"

export function GamificationHeader() {
  const userStats = {
    level: 12,
    ecoScore: 2847,
    rank: 156,
    totalAchievements: 23,
  }

  return (
    <div className="mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Gamification Hub</h1>
          <p className="text-muted-foreground">Track your eco-impact and earn rewards</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Star className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Level</p>
              <p className="font-semibold text-foreground">{userStats.level}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
              <Leaf className="w-4 h-4 text-secondary-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Eco Score</p>
              <p className="font-semibold text-foreground">{userStats.ecoScore.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Trophy className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">#{userStats.rank}</p>
          <p className="text-sm text-muted-foreground">Global Rank</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Star className="w-6 h-6 text-blue-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{userStats.totalAchievements}</p>
          <p className="text-sm text-muted-foreground">Achievements</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Zap className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">1,247</p>
          <p className="text-sm text-muted-foreground">BTN Earned</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-4 text-center">
          <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">89</p>
          <p className="text-sm text-muted-foreground">Eco Actions</p>
        </div>
      </div>
    </div>
  )
}
