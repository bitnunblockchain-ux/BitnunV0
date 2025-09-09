export default function AnalyticsDashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real-time insights and comprehensive analytics for the BitnunEco ecosystem
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Total Value Locked</h3>
            <p className="text-2xl font-bold text-primary">$24.7M</p>
            <p className="text-sm text-accent">+12.5% (24h)</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Daily Transactions</h3>
            <p className="text-2xl font-bold text-primary">15,432</p>
            <p className="text-sm text-accent">+8.3% (24h)</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Active Users</h3>
            <p className="text-2xl font-bold text-primary">8,947</p>
            <p className="text-sm text-accent">+15.2% (24h)</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-sm text-muted-foreground mb-2">Network Fee</h3>
            <p className="text-2xl font-bold text-primary">0.001 BTN</p>
            <p className="text-sm text-red-400">-5.1% (24h)</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">TVL Over Time</h3>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart: Total Value Locked Trend</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Transaction Volume</h3>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Chart: Daily Transaction Volume</p>
            </div>
          </div>
        </div>

        {/* Protocol Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Top Tokens</h3>
            <div className="space-y-3">
              {[
                { name: "BTN", volume: "$2.4M", change: "+12.5%" },
                { name: "ETH", volume: "$1.8M", change: "+8.3%" },
                { name: "USDC", volume: "$1.2M", change: "+3.1%" },
                { name: "BTC", volume: "$980K", change: "-2.4%" },
              ].map((token, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium">{token.name}</span>
                  <div className="text-right">
                    <p className="text-sm">{token.volume}</p>
                    <p className={`text-xs ${token.change.startsWith("+") ? "text-accent" : "text-red-400"}`}>
                      {token.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Network Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Block Height</span>
                <span>2,847,392</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Block Time</span>
                <span>2.1s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validators</span>
                <span>127</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network Hash Rate</span>
                <span>847 TH/s</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">DeFi Protocols</h3>
            <div className="space-y-3">
              {[
                { name: "Staking", tvl: "$8.4M", apy: "18.5%" },
                { name: "Lending", tvl: "$6.2M", apy: "12.3%" },
                { name: "DEX", tvl: "$4.8M", apy: "24.7%" },
                { name: "Yield Farming", tvl: "$3.1M", apy: "31.2%" },
              ].map((protocol, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium">{protocol.name}</span>
                  <div className="text-right">
                    <p className="text-sm">{protocol.tvl}</p>
                    <p className="text-xs text-accent">{protocol.apy} APY</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-primary">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-muted-foreground">Hash</th>
                  <th className="text-left py-3 text-muted-foreground">Type</th>
                  <th className="text-left py-3 text-muted-foreground">Amount</th>
                  <th className="text-left py-3 text-muted-foreground">Fee</th>
                  <th className="text-left py-3 text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(5)].map((_, i) => (
                  <tr key={i} className="border-b border-border">
                    <td className="py-3 font-mono text-sm text-accent">
                      0x{Math.random().toString(16).substr(2, 8)}...
                    </td>
                    <td className="py-3">Transfer</td>
                    <td className="py-3">{(Math.random() * 1000).toFixed(2)} BTN</td>
                    <td className="py-3">0.001 BTN</td>
                    <td className="py-3 text-muted-foreground">{i + 1}m ago</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
