import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Cpu, Zap, TrendingUp } from "lucide-react"

export default function AIServicesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <Brain className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                BitnunCloud AI/ML
              </h1>
              <p className="text-slate-400 text-lg">Decentralized Machine Learning Platform</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-slate-800/50 border-purple-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Models</p>
                    <p className="text-2xl font-bold text-purple-400">2,847</p>
                  </div>
                  <Brain className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-blue-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">GPU Nodes</p>
                    <p className="text-2xl font-bold text-blue-400">1,456</p>
                  </div>
                  <Cpu className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-green-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Inferences/sec</p>
                    <p className="text-2xl font-bold text-green-400">94.2K</p>
                  </div>
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-orange-500/20 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Cost Savings</p>
                    <p className="text-2xl font-bold text-orange-400">78%</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-orange-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="models" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="models" className="data-[state=active]:bg-purple-600">
              Models
            </TabsTrigger>
            <TabsTrigger value="training" className="data-[state=active]:bg-blue-600">
              Training
            </TabsTrigger>
            <TabsTrigger value="inference" className="data-[state=active]:bg-green-600">
              Inference
            </TabsTrigger>
            <TabsTrigger value="automl" className="data-[state=active]:bg-orange-600">
              AutoML
            </TabsTrigger>
            <TabsTrigger value="marketplace" className="data-[state=active]:bg-pink-600">
              Marketplace
            </TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-purple-400">Model Management</CardTitle>
                  <CardDescription>Deploy and manage your ML models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">GPT-4 Fine-tuned</p>
                        <p className="text-sm text-slate-400">Language Model</p>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">YOLO v8 Custom</p>
                        <p className="text-sm text-slate-400">Object Detection</p>
                      </div>
                      <Badge className="bg-blue-600">Training</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">ResNet-50 Enhanced</p>
                        <p className="text-sm text-slate-400">Image Classification</p>
                      </div>
                      <Badge className="bg-green-600">Active</Badge>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                    Deploy New Model
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Resource Allocation</CardTitle>
                  <CardDescription>GPU/TPU cluster management</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">GPU Utilization</span>
                        <span className="text-sm text-blue-400">87%</span>
                      </div>
                      <Progress value={87} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Memory Usage</span>
                        <span className="text-sm text-green-400">64%</span>
                      </div>
                      <Progress value={64} className="h-2 bg-slate-700" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Network I/O</span>
                        <span className="text-sm text-orange-400">45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-slate-700" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10 bg-transparent"
                    >
                      Scale Up
                    </Button>
                    <Button
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                    >
                      Scale Down
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="training" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Training Jobs</CardTitle>
                  <CardDescription>Monitor active training processes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Transformer Fine-tuning</p>
                        <Badge className="bg-blue-600">Running</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Progress</span>
                        <span className="text-sm text-blue-400">73%</span>
                      </div>
                      <Progress value={73} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">ETA: 2h 15m</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">CNN Training</p>
                        <Badge className="bg-orange-600">Queued</Badge>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-slate-400">Progress</span>
                        <span className="text-sm text-slate-400">0%</span>
                      </div>
                      <Progress value={0} className="h-2 bg-slate-700" />
                      <p className="text-xs text-slate-500 mt-2">Waiting for resources</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Training Metrics</CardTitle>
                  <CardDescription>Real-time performance monitoring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">0.0234</p>
                      <p className="text-sm text-slate-400">Loss</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">94.7%</p>
                      <p className="text-sm text-slate-400">Accuracy</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">847</p>
                      <p className="text-sm text-slate-400">Epoch</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">2.3s</p>
                      <p className="text-sm text-slate-400">Step Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="inference" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Inference Endpoints</CardTitle>
                  <CardDescription>API endpoints for model serving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">text-generation-v1</p>
                        <Badge className="bg-green-600">Live</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">https://api.bitnun.cloud/v1/generate</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Requests: 45.2K/day</span>
                        <span>Latency: 23ms</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">image-classify-v2</p>
                        <Badge className="bg-green-600">Live</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">https://api.bitnun.cloud/v2/classify</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Requests: 12.8K/day</span>
                        <span>Latency: 15ms</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Create Endpoint
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400">Performance Analytics</CardTitle>
                  <CardDescription>Real-time inference metrics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-green-400">18ms</p>
                      <p className="text-sm text-slate-400">Avg Latency</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-400">99.9%</p>
                      <p className="text-sm text-slate-400">Uptime</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-purple-400">1.2M</p>
                      <p className="text-sm text-slate-400">Requests/day</p>
                    </div>
                    <div className="text-center p-3 bg-slate-700/50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-400">$0.003</p>
                      <p className="text-sm text-slate-400">Cost/1K req</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="automl" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-orange-400">AutoML Pipelines</CardTitle>
                  <CardDescription>Automated machine learning workflows</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Customer Churn Prediction</p>
                        <Badge className="bg-green-600">Complete</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Best Model: XGBoost (94.2% accuracy)</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Training Time: 2h 34m</span>
                        <span>Models Tested: 47</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Fraud Detection</p>
                        <Badge className="bg-blue-600">Running</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Current Best: Random Forest (91.8%)</p>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Progress: 67%</span>
                        <span>Models Tested: 23/35</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                    Start AutoML Job
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Model Recommendations</CardTitle>
                  <CardDescription>AI-powered model suggestions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-green-500">
                      <p className="font-medium text-white mb-1">Recommended: Transformer</p>
                      <p className="text-sm text-slate-400 mb-2">For your text classification task</p>
                      <p className="text-xs text-green-400">Expected accuracy: 96.3%</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-blue-500">
                      <p className="font-medium text-white mb-1">Alternative: LSTM</p>
                      <p className="text-sm text-slate-400 mb-2">Faster training, lower accuracy</p>
                      <p className="text-xs text-blue-400">Expected accuracy: 89.7%</p>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg border-l-4 border-purple-500">
                      <p className="font-medium text-white mb-1">Budget Option: Naive Bayes</p>
                      <p className="text-sm text-slate-400 mb-2">Minimal compute requirements</p>
                      <p className="text-xs text-purple-400">Expected accuracy: 82.1%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-pink-400">Featured Models</CardTitle>
                  <CardDescription>Popular pre-trained models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">GPT-4 Turbo</p>
                        <Badge className="bg-gold-600">Premium</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Advanced language model</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">$0.02/1K tokens</span>
                        <span className="text-slate-500">⭐ 4.9</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">DALL-E 3</p>
                        <Badge className="bg-purple-600">Popular</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Image generation model</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">$0.04/image</span>
                        <span className="text-slate-500">⭐ 4.8</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-blue-400">Community Models</CardTitle>
                  <CardDescription>Open source contributions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Llama 2 70B</p>
                        <Badge className="bg-green-600">Free</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Open source LLM</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">Free</span>
                        <span className="text-slate-500">⭐ 4.6</span>
                      </div>
                    </div>
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Stable Diffusion XL</p>
                        <Badge className="bg-green-600">Free</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Image generation</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">Free</span>
                        <span className="text-slate-500">⭐ 4.7</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-green-400">Your Models</CardTitle>
                  <CardDescription>Published models</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium text-white">Custom Classifier</p>
                        <Badge className="bg-blue-600">Published</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">Text classification</p>
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">47 downloads</span>
                        <span className="text-slate-500">⭐ 4.3</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Publish Model
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
