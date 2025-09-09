export default function CommunityGovernancePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Community Governance
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Shape the future of BitnunEco through decentralized governance. Vote on proposals and participate in
            community decisions
          </p>
        </div>

        {/* Governance Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Total Voters</h3>
            <p className="text-3xl font-bold text-accent">3,247</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Active Proposals</h3>
            <p className="text-3xl font-bold text-accent">12</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Voting Power</h3>
            <p className="text-3xl font-bold text-accent">8.4M</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <h3 className="text-lg font-semibold mb-2 text-primary">Passed Proposals</h3>
            <p className="text-3xl font-bold text-accent">89</p>
          </div>
        </div>

        {/* Active Proposals */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-primary">Active Proposals</h2>
          <div className="space-y-6">
            {[
              {
                id: "BIP-001",
                title: "Increase Staking Rewards by 2%",
                description: "Proposal to increase staking rewards across all pools to maintain competitiveness",
                status: "Active",
                votes: { for: 2847, against: 432 },
                timeLeft: "3 days",
                quorum: "75%",
              },
              {
                id: "BIP-002",
                title: "Add New Trading Pair: BTN/USDT",
                description: "Community request to add BTN/USDT trading pair to increase liquidity",
                status: "Active",
                votes: { for: 1923, against: 156 },
                timeLeft: "5 days",
                quorum: "68%",
              },
              {
                id: "BIP-003",
                title: "Treasury Allocation for Marketing",
                description: "Allocate 500K BTN from treasury for Q1 marketing initiatives",
                status: "Active",
                votes: { for: 1456, against: 892 },
                timeLeft: "1 day",
                quorum: "45%",
              },
            ].map((proposal, i) => (
              <div key={i} className="bg-card border border-border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-1">{proposal.title}</h3>
                    <p className="text-sm text-accent">{proposal.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-accent/20 text-accent px-2 py-1 rounded text-sm font-semibold">
                      {proposal.status}
                    </span>
                    <p className="text-sm text-muted-foreground mt-1">{proposal.timeLeft} left</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">{proposal.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">For</p>
                    <p className="text-lg font-semibold text-accent">{proposal.votes.for.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Against</p>
                    <p className="text-lg font-semibold text-red-400">{proposal.votes.against.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted/20 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground">Quorum</p>
                    <p className="text-lg font-semibold text-primary">{proposal.quorum}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 bg-accent text-accent-foreground py-2 rounded-lg font-semibold">
                    Vote For
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold">Vote Against</button>
                  <button className="px-6 bg-muted text-muted-foreground py-2 rounded-lg">Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Create Proposal */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Create New Proposal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Proposal Title</label>
              <input
                type="text"
                className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2"
                placeholder="Enter proposal title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2">
                <option>Treasury</option>
                <option>Protocol</option>
                <option>Governance</option>
                <option>Community</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 h-32"
                placeholder="Detailed description of your proposal"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Submit Proposal
              </button>
              <p className="text-sm text-muted-foreground mt-2">Requires 1000 BTN tokens to submit a proposal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
