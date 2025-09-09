export default function StakingRewardsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Staking Rewards
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Earn passive income by staking your tokens. Secure the network and get rewarded with competitive APY rates
          </p>
        </div>

        {/* Staking Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Total Staked</h3>
            <p className="text-3xl font-bold text-accent">$12.4M</p>
            <p className="text-sm text-muted-foreground mt-2">Across all pools</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Average APY</h3>
            <p className="text-3xl font-bold text-accent">18.5%</p>
            <p className="text-sm text-muted-foreground mt-2">Annual percentage yield</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Active Stakers</h3>
            <p className="text-3xl font-bold text-accent">2,847</p>
            <p className="text-sm text-muted-foreground mt-2">Community members</p>
          </div>
        </div>

        {/* Staking Pools */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Available Staking Pools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "BTN Token", apy: "22.5%", tvl: "$4.2M", duration: "30 days" },
              { name: "ETH Pool", apy: "15.8%", tvl: "$3.1M", duration: "60 days" },
              { name: "USDC Stable", apy: "8.2%", tvl: "$2.8M", duration: "7 days" },
              { name: "BTC Pool", apy: "12.4%", tvl: "$1.9M", duration: "90 days" },
              { name: "SOL Pool", apy: "19.3%", tvl: "$1.4M", duration: "45 days" },
              { name: "AVAX Pool", apy: "16.7%", tvl: "$980K", duration: "30 days" },
            ].map((pool, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-primary">{pool.name}</h3>
                  <span className="bg-accent/20 text-accent px-2 py-1 rounded text-sm font-semibold">{pool.apy}</span>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">TVL:</span>
                    <span>{pool.tvl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span>{pool.duration}</span>
                  </div>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Stake Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* My Staking */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">My Staking Positions</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground">Pool</th>
                  <th className="text-left py-3 text-muted-foreground">Staked Amount</th>
                  <th className="text-left py-3 text-muted-foreground">Rewards Earned</th>
                  <th className="text-left py-3 text-muted-foreground">Status</th>
                  <th className="text-left py-3 text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3">BTN Token</td>
                  <td className="py-3">1,250 BTN</td>
                  <td className="py-3 text-accent">+45.2 BTN</td>
                  <td className="py-3">
                    <span className="bg-primary/20 text-primary px-2 py-1 rounded text-sm">Active</span>
                  </td>
                  <td className="py-3">
                    <button className="text-accent hover:text-accent/80">Claim</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
