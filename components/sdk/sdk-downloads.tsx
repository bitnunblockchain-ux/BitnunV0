"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, Star, GitBranch } from "lucide-react"

export function SDKDownloads() {
  const sdkPackages = [
    {
      name: "BitnunEco JavaScript SDK",
      language: "JavaScript/TypeScript",
      version: "v2.1.0",
      size: "2.4 MB",
      downloads: "125K",
      description: "Complete SDK for web applications with TypeScript support",
      features: ["Wallet Integration", "Mining API", "NFT Support", "DeFi Tools"],
      npmPackage: "@bitnuneco/sdk",
      github: "bitnuneco/javascript-sdk",
    },
    {
      name: "BitnunEco Python SDK",
      language: "Python",
      version: "v2.0.8",
      size: "1.8 MB",
      downloads: "89K",
      description: "Comprehensive Python library for backend integrations",
      features: ["Blockchain API", "Data Analytics", "Smart Contracts", "Mining Pool"],
      npmPackage: "bitnuneco-sdk",
      github: "bitnuneco/python-sdk",
    },
    {
      name: "BitnunEco Go SDK",
      language: "Go",
      version: "v1.9.2",
      size: "3.1 MB",
      downloads: "45K",
      description: "High-performance Go library for enterprise applications",
      features: ["P2P Networking", "WASM Integration", "Consensus", "Performance"],
      npmPackage: "github.com/bitnuneco/go-sdk",
      github: "bitnuneco/go-sdk",
    },
    {
      name: "BitnunEco Rust SDK",
      language: "Rust",
      version: "v1.5.4",
      size: "2.7 MB",
      downloads: "32K",
      description: "Native Rust implementation for WASM and system-level integration",
      features: ["WASM Nodes", "Zero-Copy", "Memory Safety", "Cross-Platform"],
      npmPackage: "bitnuneco-rust",
      github: "bitnuneco/rust-sdk",
    },
    {
      name: "BitnunEco Mobile SDK",
      language: "React Native/Flutter",
      version: "v1.8.1",
      size: "4.2 MB",
      downloads: "67K",
      description: "Cross-platform mobile SDK for iOS and Android applications",
      features: ["Mobile Wallet", "Biometric Auth", "Push Notifications", "Offline Mode"],
      npmPackage: "@bitnuneco/mobile-sdk",
      github: "bitnuneco/mobile-sdk",
    },
    {
      name: "BitnunEco Unity SDK",
      language: "C#/Unity",
      version: "v1.3.0",
      size: "5.8 MB",
      downloads: "28K",
      description: "Game development SDK for Unity with metaverse integration",
      features: ["Game Assets", "Virtual Economy", "AR/VR Support", "Multiplayer"],
      npmPackage: "BitnunEco.Unity",
      github: "bitnuneco/unity-sdk",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">SDK Downloads</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Choose your preferred programming language and get started
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <GitBranch className="h-4 w-4 mr-2" />
          View All Repositories
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sdkPackages.map((sdk, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{sdk.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{sdk.description}</p>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                {sdk.language}
              </Badge>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Version</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{sdk.version}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Size</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{sdk.size}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Downloads</p>
                  <div className="flex items-center gap-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{sdk.downloads}</p>
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">Key Features</p>
                <div className="flex flex-wrap gap-1">
                  {sdk.features.map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Install Command</p>
                <code className="text-sm font-mono text-gray-900 dark:text-white">
                  {sdk.language.includes("JavaScript")
                    ? `npm install ${sdk.npmPackage}`
                    : sdk.language === "Python"
                      ? `pip install ${sdk.npmPackage}`
                      : sdk.language === "Go"
                        ? `go get ${sdk.npmPackage}`
                        : sdk.language === "Rust"
                          ? `cargo add ${sdk.npmPackage}`
                          : sdk.language.includes("React Native")
                            ? `npm install ${sdk.npmPackage}`
                            : `Install via Unity Package Manager`}
                </code>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
