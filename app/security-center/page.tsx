export default function SecurityCenterPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Security Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced security features and monitoring tools to protect your assets and ensure network integrity
          </p>
        </div>

        {/* Security Status */}
        <div className="bg-card border border-border rounded-lg p-6 mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-primary">Network Security Status</h2>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              <span className="text-accent font-semibold">All Systems Operational</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">99.9%</p>
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">0</p>
              <p className="text-sm text-muted-foreground">Security Incidents</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">127</p>
              <p className="text-sm text-muted-foreground">Active Validators</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">$24.7M</p>
              <p className="text-sm text-muted-foreground">Assets Secured</p>
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Multi-Signature Wallets",
              description: "Enhanced security with multi-signature wallet support",
              features: ["2-of-3 signatures", "Hardware wallet support", "Time-locked transactions"],
              status: "Active",
            },
            {
              title: "Smart Contract Audits",
              description: "Regular security audits by leading firms",
              features: ["Quarterly audits", "Bug bounty program", "Formal verification"],
              status: "Active",
            },
            {
              title: "Real-time Monitoring",
              description: "24/7 network monitoring and threat detection",
              features: ["Anomaly detection", "Automated alerts", "Incident response"],
              status: "Active",
            },
            {
              title: "Insurance Coverage",
              description: "Protocol insurance for user protection",
              features: ["$10M coverage", "Smart contract risks", "Validator slashing"],
              status: "Active",
            },
            {
              title: "Decentralized Governance",
              description: "Community-driven security decisions",
              features: ["Emergency proposals", "Security council", "Transparent voting"],
              status: "Active",
            },
            {
              title: "Zero-Knowledge Proofs",
              description: "Privacy-preserving transaction verification",
              features: ["zk-SNARKs", "Private transactions", "Scalable verification"],
              status: "Coming Soon",
            },
          ].map((feature, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    feature.status === "Active" ? "bg-accent/20 text-accent" : "bg-muted/20 text-muted-foreground"
                  }`}
                >
                  {feature.status}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <ul className="space-y-1">
                {feature.features.map((item, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Security Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Recent Security Events</h3>
            <div className="space-y-4">
              {[
                { type: "Info", message: "Routine security audit completed", time: "2 hours ago" },
                { type: "Success", message: "Validator set updated successfully", time: "6 hours ago" },
                { type: "Info", message: "Network upgrade deployed", time: "1 day ago" },
                { type: "Success", message: "Bug bounty reward distributed", time: "2 days ago" },
              ].map((event, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${event.type === "Success" ? "bg-accent" : "bg-primary"}`}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm">{event.message}</p>
                    <p className="text-xs text-muted-foreground">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Security Best Practices</h3>
            <div className="space-y-4">
              {[
                "Enable 2FA on all accounts",
                "Use hardware wallets for large amounts",
                "Verify smart contract addresses",
                "Keep software updated",
                "Never share private keys",
                "Use official websites only",
              ].map((practice, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent text-xs">✓</span>
                  </div>
                  <p className="text-sm">{practice}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report Security Issue */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Report Security Issue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Issue Type</label>
              <select className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2">
                <option>Smart Contract Vulnerability</option>
                <option>Network Security Issue</option>
                <option>UI/UX Security Flaw</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Severity Level</label>
              <select className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2">
                <option>Critical</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full bg-muted/20 border border-border rounded-lg px-3 py-2 h-32"
                placeholder="Detailed description of the security issue"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold">
                Submit Security Report
              </button>
              <p className="text-sm text-muted-foreground mt-2">
                All reports are encrypted and handled by our security team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
