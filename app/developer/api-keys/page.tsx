"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Key, Plus, Copy, Trash2, Eye, EyeOff, BarChart3 } from "lucide-react"

interface ApiKey {
  id: string
  key_name: string
  api_key: string
  permissions: string[]
  rate_limit: number
  is_active: boolean
  last_used_at: string | null
  created_at: string
  expires_at: string | null
}

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set())
  const [newKey, setNewKey] = useState({
    key_name: "",
    permissions: [] as string[],
    rate_limit: 1000,
    expires_at: "",
  })

  const availablePermissions = [
    { id: "read", label: "Read Access", description: "View blockchain data and account information" },
    { id: "write", label: "Write Access", description: "Submit transactions and interact with contracts" },
    { id: "admin", label: "Admin Access", description: "Manage account settings and API keys" },
    { id: "analytics", label: "Analytics", description: "Access detailed analytics and metrics" },
  ]

  useEffect(() => {
    fetchApiKeys()
  }, [])

  const fetchApiKeys = async () => {
    const supabase = createClient()
    setIsLoading(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from("api_keys")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setApiKeys(data || [])
    } catch (error) {
      console.error("Error fetching API keys:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const generateApiKey = () => {
    return `btn_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
  }

  const createApiKey = async () => {
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) return

      const apiKey = generateApiKey()
      const apiSecret = `btn_secret_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`

      const { error } = await supabase.from("api_keys").insert({
        user_id: user.id,
        key_name: newKey.key_name,
        api_key: apiKey,
        api_secret: apiSecret,
        permissions: newKey.permissions,
        rate_limit: newKey.rate_limit,
        expires_at: newKey.expires_at || null,
      })

      if (error) throw error

      setShowCreateDialog(false)
      setNewKey({ key_name: "", permissions: [], rate_limit: 1000, expires_at: "" })
      fetchApiKeys()
    } catch (error) {
      console.error("Error creating API key:", error)
    }
  }

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys)
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId)
    } else {
      newVisible.add(keyId)
    }
    setVisibleKeys(newVisible)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const deleteApiKey = async (keyId: string) => {
    const supabase = createClient()

    try {
      const { error } = await supabase.from("api_keys").delete().eq("id", keyId)

      if (error) throw error
      fetchApiKeys()
    } catch (error) {
      console.error("Error deleting API key:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">API Keys</h1>
            <p className="text-gray-400 mt-1">Manage your API keys and access permissions</p>
          </div>
          <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Create API Key
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Create New API Key</DialogTitle>
                <DialogDescription className="text-gray-400">
                  Generate a new API key with specific permissions and rate limits
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="key_name" className="text-gray-300">
                    Key Name
                  </Label>
                  <Input
                    id="key_name"
                    value={newKey.key_name}
                    onChange={(e) => setNewKey({ ...newKey, key_name: e.target.value })}
                    className="bg-gray-700/50 border-gray-600 text-white"
                    placeholder="My API Key"
                  />
                </div>

                <div>
                  <Label className="text-gray-300">Permissions</Label>
                  <div className="space-y-2 mt-2">
                    {availablePermissions.map((permission) => (
                      <div key={permission.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={newKey.permissions.includes(permission.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewKey({
                                ...newKey,
                                permissions: [...newKey.permissions, permission.id],
                              })
                            } else {
                              setNewKey({
                                ...newKey,
                                permissions: newKey.permissions.filter((p) => p !== permission.id),
                              })
                            }
                          }}
                        />
                        <div>
                          <label htmlFor={permission.id} className="text-sm font-medium text-white">
                            {permission.label}
                          </label>
                          <p className="text-xs text-gray-400">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="rate_limit" className="text-gray-300">
                    Rate Limit (requests/hour)
                  </Label>
                  <Select
                    value={newKey.rate_limit.toString()}
                    onValueChange={(value) => setNewKey({ ...newKey, rate_limit: Number.parseInt(value) })}
                  >
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="100">100 requests/hour</SelectItem>
                      <SelectItem value="1000">1,000 requests/hour</SelectItem>
                      <SelectItem value="10000">10,000 requests/hour</SelectItem>
                      <SelectItem value="100000">100,000 requests/hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="expires_at" className="text-gray-300">
                    Expiration Date (Optional)
                  </Label>
                  <Input
                    id="expires_at"
                    type="date"
                    value={newKey.expires_at}
                    onChange={(e) => setNewKey({ ...newKey, expires_at: e.target.value })}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>

                <Button onClick={createApiKey} className="w-full bg-primary hover:bg-primary/90">
                  Create API Key
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* API Keys List */}
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Key className="h-5 w-5" />
              Your API Keys
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage and monitor your API keys. Keep your keys secure and never share them publicly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-8">
                <Key className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">No API keys found. Create your first API key to get started.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">API Key</TableHead>
                    <TableHead className="text-gray-300">Permissions</TableHead>
                    <TableHead className="text-gray-300">Rate Limit</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Last Used</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id} className="border-gray-700">
                      <TableCell className="text-white font-medium">{key.key_name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <code className="text-sm bg-gray-700/50 px-2 py-1 rounded">
                            {visibleKeys.has(key.id) ? key.api_key : "btn_" + "•".repeat(20)}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => toggleKeyVisibility(key.id)}
                            className="h-6 w-6 p-0"
                          >
                            {visibleKeys.has(key.id) ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(key.api_key)}
                            className="h-6 w-6 p-0"
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {key.permissions.map((permission) => (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{key.rate_limit.toLocaleString()}/hr</TableCell>
                      <TableCell>
                        <Badge variant={key.is_active ? "default" : "secondary"}>
                          {key.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-400">
                        {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : "Never"}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="border-gray-600 bg-transparent">
                            <BarChart3 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => deleteApiKey(key.id)}
                            className="border-red-600 text-red-400 hover:bg-red-600/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Total Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">12,847</p>
              <p className="text-sm text-gray-400">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-400">99.2%</p>
              <p className="text-sm text-gray-400">Last 30 days</p>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Avg Response Time</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-blue-400">145ms</p>
              <p className="text-sm text-gray-400">Global average</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
