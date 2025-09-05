"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, ExternalLink, Play } from "lucide-react"

export function CodeExamples() {
  const examples = {
    javascript: {
      wallet: `import { BitnunEco } from '@bitnuneco/sdk';

const bitnun = new BitnunEco({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Get wallet balance
const balance = await bitnun.wallet.getBalance('BTN');
console.log(\`Balance: \${balance} BTN\`);

// Send transaction
const tx = await bitnun.wallet.send({
  to: '0x742d35Cc6634C0532925a3b8D4e2C4e2C4e2C4e2',
  amount: '10.5',
  token: 'BTN'
});`,
      mining: `// Start mining
const miningSession = await bitnun.mining.start({
  algorithm: 'action-mining',
  intensity: 'medium'
});

// Monitor mining status
bitnun.mining.onStatusChange((status) => {
  console.log('Mining status:', status);
  console.log('Hash rate:', status.hashRate);
  console.log('Rewards earned:', status.rewards);
});`,
      nft: `// Mint NFT
const nft = await bitnun.nft.mint({
  name: 'Eco Warrior #1',
  description: 'Sustainable digital collectible',
  image: 'ipfs://QmHash...',
  attributes: [
    { trait_type: 'Rarity', value: 'Legendary' },
    { trait_type: 'Carbon Offset', value: '100kg CO2' }
  ]
});

console.log('NFT minted:', nft.tokenId);`,
    },
    python: {
      wallet: `from bitnuneco import BitnunEco

# Initialize client
client = BitnunEco(api_key='your-api-key', network='mainnet')

# Get wallet balance
balance = client.wallet.get_balance('BTN')
print(f"Balance: {balance} BTN")

# Send transaction
tx = client.wallet.send(
    to='0x742d35Cc6634C0532925a3b8D4e2C4e2C4e2C4e2',
    amount='10.5',
    token='BTN'
)
print(f"Transaction hash: {tx.hash}")`,
      mining: `# Start mining with Python
mining_session = client.mining.start(
    algorithm='action-mining',
    intensity='high'
)

# Monitor mining rewards
def on_reward(reward):
    print(f"Reward earned: {reward.amount} BTN")
    print(f"Action type: {reward.action_type}")

client.mining.on_reward(on_reward)`,
      analytics: `# Get mining analytics
stats = client.analytics.get_mining_stats(
    period='24h',
    metrics=['hash_rate', 'rewards', 'efficiency']
)

print(f"Average hash rate: {stats.avg_hash_rate}")
print(f"Total rewards: {stats.total_rewards}")
print(f"Mining efficiency: {stats.efficiency}%")`,
    },
    rust: {
      wallet: `use bitnuneco::{BitnunEco, Network};

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let client = BitnunEco::new("your-api-key", Network::Mainnet)?;
    
    // Get wallet balance
    let balance = client.wallet().get_balance("BTN").await?;
    println!("Balance: {} BTN", balance);
    
    // Send transaction
    let tx = client.wallet().send(
        "0x742d35Cc6634C0532925a3b8D4e2C4e2C4e2C4e2",
        "10.5",
        "BTN"
    ).await?;
    
    println!("Transaction: {}", tx.hash);
    Ok(())
}`,
      wasm: `use bitnuneco_wasm::{WasmNode, MiningConfig};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct BitnunNode {
    node: WasmNode,
}

#[wasm_bindgen]
impl BitnunNode {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        let config = MiningConfig::default();
        let node = WasmNode::new(config);
        Self { node }
    }
    
    #[wasm_bindgen]
    pub async fn start_mining(&mut self) -> Result<(), JsValue> {
        self.node.start_mining().await
            .map_err(|e| JsValue::from_str(&e.to_string()))
    }
}`,
      consensus: `use bitnuneco::consensus::{ProofOfAction, ActionValidator};

// Validate user action for mining rewards
let validator = ActionValidator::new();
let action = UserAction {
    action_type: ActionType::PageView,
    timestamp: SystemTime::now(),
    user_id: "user123",
    metadata: json!({"page": "/dashboard", "duration": 45})
};

let proof = validator.validate_action(action).await?;
if proof.is_valid() {
    let reward = proof.calculate_reward();
    println!("Action validated! Reward: {} BTN", reward);
}`,
    },
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Code Examples & Tutorials</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Ready-to-use code snippets for common BitnunEco integrations
          </p>
        </div>
        <Button variant="outline">
          <ExternalLink className="h-4 w-4 mr-2" />
          View Full Documentation
        </Button>
      </div>

      <Tabs defaultValue="javascript" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="javascript">JavaScript/TypeScript</TabsTrigger>
          <TabsTrigger value="python">Python</TabsTrigger>
          <TabsTrigger value="rust">Rust/WASM</TabsTrigger>
        </TabsList>

        {Object.entries(examples).map(([language, languageExamples]) => (
          <TabsContent key={language} value={language} className="space-y-4">
            {Object.entries(languageExamples).map(([category, code]) => (
              <Card
                key={category}
                className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                      {category} Integration
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                    >
                      {language}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Run
                    </Button>
                  </div>
                </div>

                <div className="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100">
                    <code>{code}</code>
                  </pre>
                </div>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
