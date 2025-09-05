"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Shield, Plus, Copy, Eye, Trash2 } from "lucide-react"

export function APIManagement() {
  const apiKeys = [
    {
      name: "Production API Key",
      key: "btn_live_sk_1234567890abcdef",
      created: "Nov 15, 2024",
      lastUsed: "2 hours ago",
      requests: "1.2M",
      status: "active",
      permissions: ["read", "write", "admin"],
    },
    {
      name: "Development API Key",
      key: "btn_test_sk_abcdef1234567890",
      created: "Oct 28, 2024",
      lastUsed: "5 minutes ago",
      requests: "45K",
      status: "active",
      permissions: ["read", "write"],
    },
    {
      name: "Analytics API Key",
      key: "btn_analytics_sk_fedcba0987654321",
      created: "Nov 1, 2024",
      lastUsed: "1 day ago",
      requests: "890K",
      status: "active",
      permissions: ["read"],
    },
  ]

  const usageStats = [
    { endpoint: "/api/v1/wallet/balance", requests: "245K", avgResponse: "120ms", success: "99.8%" },
    { endpoint: "/api/v1/mining/status", requests: "189K", avgResponse: "85ms", success: "99.9%" },
    { endpoint: "/api/v1/nft/mint", requests: "67K", avgResponse: "340ms", success: "98.5%" },
    { endpoint: "/api/v1/trading/swap", requests: "123K", avgResponse: "280ms", success: "99.2%" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">API Management Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage your API keys, monitor usage, and track performance
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create API Key
        </Button>
      </div>

      <Tabs defaultValue="keys" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="keys">API Keys</TabsTrigger>
          <TabsTrigger value="usage">Usage Analytics</TabsTrigger>
          <TabsTrigger value="limits">Rate Limits</TabsTrigger>
        </TabsList>

        <TabsContent value="keys" className="space-y-4">
          <div className="grid gap-4">
            {apiKeys.map((apiKey, index) => (
              <Card
                key={index}
                className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{apiKey.name}</h3>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      >
                        {apiKey.status}
                      </Badge>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between">
                        <code className="text-sm font-mono text-gray-900 dark:text-white">
                          {apiKey.key.slice(0, 20)}...
                        </code>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Created</p>
                        <p className="font-medium text-gray-900 dark:text-white">{apiKey.created}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Last Used</p>
                        <p className="font-medium text-gray-900 dark:text-white">{apiKey.lastUsed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600 dark:text-gray-400">Requests</p>
                        <p className="font-medium text-gray-900 dark:text-white">{apiKey.requests}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mt-3">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Permissions:</span>
                      {apiKey.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Endpoint Usage</h3>
              <Button variant="outline" size="sm">
                <BarChart3 className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>

            <div className="space-y-4">
              {usageStats.map((stat, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                >
                  <div className="flex-1">
                    <code className="text-sm font-mono text-gray-900 dark:text-white">{stat.endpoint}</code>
                  </div>
                  <div className="grid grid-cols-3 gap-8 text-sm">
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400">Requests</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{stat.requests}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400">Avg Response</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{stat.avgResponse}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-600 dark:text-gray-400">Success Rate</p>
                      <p className="font-semibold text-green-600">{stat.success}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="limits" className="space-y-4">
          <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Rate Limiting Configuration</h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Free Tier</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">1,000 requests/hour</p>
                    <p className="text-gray-600 dark:text-gray-400">10 requests/second</p>
                    <p className="text-gray-600 dark:text-gray-400">Basic endpoints only</p>
                  </div>
                </div>

                <div className="p-4 border border-emerald-200 dark:border-emerald-700 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Pro Tier</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-600 dark:text-gray-400">100,000 requests/hour</p>
                    <p className="text-gray-600 dark:text-gray-400">1,000 requests/second</p>
                    <p className="text-gray-600 dark:text-gray-400">All endpoints available</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
