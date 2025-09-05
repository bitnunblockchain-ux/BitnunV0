"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  HardDrive,
  Globe,
  Upload,
  Download,
  Folder,
  FileIcon,
  ImageIcon,
  Video,
  Plus,
  Settings,
  BarChart3,
  Shield,
  Zap,
  Clock,
} from "lucide-react"

export default function StorageServicePage() {
  const [buckets, setBuckets] = useState([
    {
      id: "bucket_001",
      name: "production-assets",
      region: "Global",
      files: 12450,
      size: "2.4 TB",
      bandwidth: "156 GB/day",
      requests: 890000,
      created: "2023-01-15",
      status: "active",
    },
    {
      id: "bucket_002",
      name: "user-uploads",
      region: "Multi-Region",
      files: 45230,
      size: "8.7 TB",
      bandwidth: "423 GB/day",
      requests: 2340000,
      created: "2023-02-20",
      status: "active",
    },
  ])

  const [files, setFiles] = useState([
    {
      id: "file_001",
      name: "hero-banner.jpg",
      type: "image",
      size: "2.4 MB",
      modified: "2 hours ago",
      downloads: 15420,
      cdn: true,
    },
    {
      id: "file_002",
      name: "product-demo.mp4",
      type: "video",
      size: "45.2 MB",
      modified: "1 day ago",
      downloads: 8930,
      cdn: true,
    },
    {
      id: "file_003",
      name: "user-data.json",
      type: "data",
      size: "156 KB",
      modified: "3 hours ago",
      downloads: 234,
      cdn: false,
    },
  ])

  const [metrics, setMetrics] = useState({
    totalStorage: "45.2 TB",
    totalFiles: 2.4e6,
    totalBandwidth: "12.4 TB/day",
    cacheHitRate: "94.2%",
    globalNodes: 1240,
    avgLatency: "28ms",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-600/20 to-green-600/20 rounded-full border border-emerald-500/30 backdrop-blur-sm">
            <HardDrive className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
              BitnunCloud Storage
            </h1>
          </div>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Decentralized object storage and global CDN powered by WASM nodes with instant edge delivery
          </p>
        </div>

        {/* Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: "Total Storage", value: metrics.totalStorage, icon: HardDrive, color: "emerald" },
            { label: "Files", value: `${(metrics.totalFiles / 1e6).toFixed(1)}M`, icon: FileIcon, color: "blue" },
            { label: "Bandwidth", value: metrics.totalBandwidth, icon: Globe, color: "purple" },
            { label: "Cache Hit Rate", value: metrics.cacheHitRate, icon: Zap, color: "yellow" },
            { label: "Edge Nodes", value: metrics.globalNodes, icon: Globe, color: "cyan" },
            { label: "Avg Latency", value: metrics.avgLatency, icon: Clock, color: "green" },
          ].map((metric, index) => (
            <Card
              key={index}
              className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg bg-gradient-to-r from-${metric.color}-600/20 to-${metric.color}-500/20`}
                  >
                    <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">{metric.label}</p>
                    <p className="text-lg font-bold text-white">{metric.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="buckets" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="buckets" className="data-[state=active]:bg-emerald-600">
              Buckets
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-emerald-600">
              Files
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-emerald-600">
              Upload
            </TabsTrigger>
            <TabsTrigger value="cdn" className="data-[state=active]:bg-emerald-600">
              CDN
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-emerald-600">
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buckets" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Storage Buckets</h2>
              <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Bucket
              </Button>
            </div>

            <div className="grid gap-4">
              {buckets.map((bucket) => (
                <Card
                  key={bucket.id}
                  className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm hover:border-emerald-500/50 transition-all duration-300"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-white flex items-center gap-2">
                          <Folder className="w-5 h-5 text-emerald-400" />
                          {bucket.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {bucket.region} • Created {bucket.created}
                        </CardDescription>
                      </div>
                      <Badge
                        variant={bucket.status === "active" ? "default" : "secondary"}
                        className={bucket.status === "active" ? "bg-green-600" : ""}
                      >
                        {bucket.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-slate-400">Files</p>
                        <p className="text-white font-semibold">{bucket.files.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Size</p>
                        <p className="text-white font-semibold">{bucket.size}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Bandwidth</p>
                        <p className="text-white font-semibold">{bucket.bandwidth}</p>
                      </div>
                      <div>
                        <p className="text-slate-400">Requests</p>
                        <p className="text-white font-semibold">{bucket.requests.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Settings className="w-4 h-4 mr-1" />
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <Shield className="w-4 h-4 mr-1" />
                        Permissions
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      >
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Analytics
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">File Manager</h2>
              <div className="flex gap-2">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="grid gap-2">
              {files.map((file) => (
                <Card
                  key={file.id}
                  className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border-slate-700/30 backdrop-blur-sm hover:border-emerald-500/30 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {file.type === "image" && <ImageIcon className="w-5 h-5 text-blue-400" />}
                        {file.type === "video" && <Video className="w-5 h-5 text-purple-400" />}
                        {file.type === "data" && <FileIcon className="w-5 h-5 text-green-400" />}
                        <div>
                          <p className="text-white font-medium">{file.name}</p>
                          <p className="text-sm text-slate-400">
                            {file.size} • Modified {file.modified} • {file.downloads.toLocaleString()} downloads
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {file.cdn && (
                          <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-400">
                            CDN
                          </Badge>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upload" className="space-y-6">
            <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Upload Files</CardTitle>
                <CardDescription className="text-slate-400">
                  Upload files to your storage buckets with automatic CDN distribution
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="bucket-select" className="text-slate-300">
                    Select Bucket
                  </Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Choose bucket" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production-assets">production-assets</SelectItem>
                      <SelectItem value="user-uploads">user-uploads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">Drag and drop files here, or click to browse</p>
                  <p className="text-sm text-slate-500">Supports images, videos, documents up to 5GB</p>
                  <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700">
                    Browse Files
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Upload Options</Label>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2 text-slate-300">
                        <input type="checkbox" className="rounded" defaultChecked />
                        <span>Enable CDN distribution</span>
                      </label>
                      <label className="flex items-center space-x-2 text-slate-300">
                        <input type="checkbox" className="rounded" />
                        <span>Compress images</span>
                      </label>
                      <label className="flex items-center space-x-2 text-slate-300">
                        <input type="checkbox" className="rounded" />
                        <span>Generate thumbnails</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Access Control</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select access level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public Read</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="authenticated">Authenticated Users</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cdn" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">CDN Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Cache Hit Rate</span>
                      <span className="text-emerald-400 font-semibold">94.2%</span>
                    </div>
                    <Progress value={94.2} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Global Latency</span>
                      <span className="text-blue-400 font-semibold">28ms avg</span>
                    </div>
                    <Progress value={72} className="h-2" />

                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Bandwidth Saved</span>
                      <span className="text-purple-400 font-semibold">8.4 TB/day</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Edge Locations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Active Nodes</span>
                      <span className="text-green-400 font-semibold">1,240</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Regions Covered</span>
                      <span className="text-blue-400 font-semibold">85</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total Requests</span>
                      <span className="text-purple-400 font-semibold">45.2M/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Data Transferred</span>
                      <span className="text-yellow-400 font-semibold">12.4 TB/day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Storage Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Storage Growth</span>
                      <span className="text-emerald-400 font-semibold">+12.4% this month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">File Uploads</span>
                      <span className="text-blue-400 font-semibold">156K/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Download Requests</span>
                      <span className="text-purple-400 font-semibold">2.4M/day</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">API Calls</span>
                      <span className="text-yellow-400 font-semibold">890K/day</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border-slate-700/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Cost Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Storage Costs</span>
                      <span className="text-green-400 font-semibold">-23% vs traditional</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Bandwidth Costs</span>
                      <span className="text-green-400 font-semibold">-45% vs traditional</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Total Savings</span>
                      <span className="text-emerald-400 font-semibold">$12,450/month</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">ROI</span>
                      <span className="text-blue-400 font-semibold">340%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
