export default function TradingHubPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Trading Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced trading platform with real-time market data, professional charts, and lightning-fast execution
          </p>
        </div>

        {/* Trading Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Order Book */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Order Book</h3>
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-red-400">{(0.00234 + i * 0.00001).toFixed(5)}</span>
                  <span className="text-muted-foreground">{(Math.random() * 1000).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Trading Chart */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Price Chart</h3>
            <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">TradingView Chart Integration</p>
            </div>
          </div>

          {/* Trade Panel */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Place Order</h3>
            <div className="space-y-4">
              <div className="flex gap-2">
                <button className="flex-1 bg-primary text-primary-foreground py-2 rounded-lg">Buy</button>
                <button className="flex-1 bg-muted text-muted-foreground py-2 rounded-lg">Sell</button>
              </div>
              <input
                type="number"
                placeholder="Amount"
                className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2"
              />
              <input
                type="number"
                placeholder="Price"
                className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2"
              />
              <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold">
                Execute Trade
              </button>
            </div>
          </div>
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h4 className="text-sm text-muted-foreground mb-2">24h Volume</h4>
            <p className="text-2xl font-bold text-primary">$2.4M</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h4 className="text-sm text-muted-foreground mb-2">Active Pairs</h4>
            <p className="text-2xl font-bold text-accent">156</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h4 className="text-sm text-muted-foreground mb-2">Total Trades</h4>
            <p className="text-2xl font-bold text-primary">8,432</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h4 className="text-sm text-muted-foreground mb-2">Avg. Speed</h4>
            <p className="text-2xl font-bold text-accent">0.3s</p>
          </div>
        </div>
      </div>
    </div>
  )
}
