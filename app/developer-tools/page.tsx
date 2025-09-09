export default function DeveloperToolsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Developer Tools
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Build the future of decentralized applications with our comprehensive developer toolkit and APIs
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-card border border-border rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold mb-4 text-primary">Quick Start</h2>
          <div className="bg-muted/20 rounded-lg p-4 mb-4">
            <code className="text-accent">npm install @bitnun/sdk</code>
          </div>
          <p className="text-muted-foreground">
            Get started with our SDK in minutes. Full documentation and examples included.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "REST API",
              description: "Complete REST API for blockchain interactions",
              features: ["Real-time data", "WebSocket support", "Rate limiting"],
              status: "Live",
            },
            {
              title: "Smart Contracts",
              description: "Deploy and interact with smart contracts",
              features: ["Solidity support", "Gas optimization", "Security audits"],
              status: "Beta",
            },
            {
              title: "SDK Libraries",
              description: "Official SDKs for popular languages",
              features: ["JavaScript/TypeScript", "Python", "Go"],
              status: "Live",
            },
            {
              title: "Testing Suite",
              description: "Comprehensive testing tools for dApps",
              features: ["Unit testing", "Integration tests", "Mock blockchain"],
              status: "Live",
            },
            {
              title: "Analytics API",
              description: "Detailed analytics and metrics",
              features: ["Transaction data", "User metrics", "Performance stats"],
              status: "Live",
            },
            {
              title: "Wallet Connect",
              description: "Easy wallet integration for dApps",
              features: ["Multi-wallet support", "Mobile friendly", "Secure connections"],
              status: "Coming Soon",
            },
          ].map((tool, i) => (
            <div key={i} className="bg-card border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-primary">{tool.title}</h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    tool.status === "Live"
                      ? "bg-accent/20 text-accent"
                      : tool.status === "Beta"
                        ? "bg-primary/20 text-primary"
                        : "bg-muted/20 text-muted-foreground"
                  }`}
                >
                  {tool.status}
                </span>
              </div>
              <p className="text-muted-foreground mb-4">{tool.description}</p>
              <ul className="space-y-1 mb-4">
                {tool.features.map((feature, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1 h-1 bg-accent rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                View Docs
              </button>
            </div>
          ))}
        </div>

        {/* Code Examples */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">JavaScript Example</h3>
            <div className="bg-muted/20 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-accent">
                {`import { BitnunSDK } from '@bitnun/sdk';

const sdk = new BitnunSDK({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Get account balance
const balance = await sdk.getBalance(address);

// Send transaction
const tx = await sdk.sendTransaction({
  to: recipient,
  amount: '1.5',
  token: 'BTN'
});`}
              </pre>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 text-primary">Python Example</h3>
            <div className="bg-muted/20 rounded-lg p-4 overflow-x-auto">
              <pre className="text-sm text-accent">
                {`from bitnun import BitnunSDK

sdk = BitnunSDK(
    api_key="your-api-key",
    network="mainnet"
)

# Get account balance
balance = sdk.get_balance(address)

# Send transaction
tx = sdk.send_transaction(
    to=recipient,
    amount="1.5",
    token="BTN"
)`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
