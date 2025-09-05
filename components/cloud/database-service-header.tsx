"use client"

import { Database, Globe, Shield, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function DatabaseServiceHeader() {
  return (
    <div className="text-center space-y-6 mb-8">
      <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-full border border-blue-500/30 backdrop-blur-sm">
        <Database className="w-8 h-8 text-blue-400" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          BitnunCloud Database
        </h1>
      </div>

      <p className="text-xl text-slate-300 max-w-4xl mx-auto">
        Enterprise-grade decentralized database service powered by WASM nodes with global distribution, zero downtime,
        and blockchain-native security
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {[
          {
            icon: Globe,
            title: "Global Distribution",
            description: "Distributed across 50+ regions worldwide",
          },
          {
            icon: Shield,
            title: "Blockchain Security",
            description: "Cryptographic data integrity and access control",
          },
          {
            icon: Zap,
            title: "Sub-10ms Latency",
            description: "Edge-optimized query processing",
          },
          {
            icon: Database,
            title: "Multi-Engine Support",
            description: "PostgreSQL, MongoDB, Redis, and more",
          },
        ].map((feature, index) => (
          <Card
            key={index}
            className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border-slate-700/30 backdrop-blur-sm"
          >
            <CardContent className="p-4 text-center">
              <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-semibold text-white mb-1">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
