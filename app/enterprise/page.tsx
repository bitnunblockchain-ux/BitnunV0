"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building2, Shield, TrendingUp, AlertTriangle } from "lucide-react"
import { EnterpriseHeader } from "@/components/enterprise/enterprise-header"
import { MultiSigWallet } from "@/components/enterprise/multi-sig-wallet"
import { ComplianceTools } from "@/components/enterprise/compliance-tools"
import { RiskManagement } from "@/components/enterprise/risk-management"
import { InstitutionalTrading } from "@/components/enterprise/institutional-trading"

export default function EnterprisePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <EnterpriseHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="multisig">Multi-Sig</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="risk">Risk Management</TabsTrigger>
            <TabsTrigger value="trading">Institutional Trading</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total AUM</CardTitle>
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.4B</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Institutions</CardTitle>
                  <Building2 className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">847</div>
                  <p className="text-xs text-muted-foreground">+23 new this month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
                  <Shield className="h-4 w-4 text-emerald-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">98.7%</div>
                  <p className="text-xs text-muted-foreground">Excellent rating</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Low</div>
                  <p className="text-xs text-muted-foreground">All systems normal</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Institutional Activity</CardTitle>
                  <CardDescription>Latest transactions and operations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { institution: "Goldman Sachs", action: "Large BTN Purchase", amount: "$50M", status: "Completed" },
                    {
                      institution: "JPMorgan Chase",
                      action: "Liquidity Provision",
                      amount: "$25M",
                      status: "Processing",
                    },
                    { institution: "BlackRock", action: "Staking Delegation", amount: "$100M", status: "Completed" },
                    { institution: "Fidelity", action: "Cross-Chain Bridge", amount: "$15M", status: "Pending" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.institution}</p>
                        <p className="text-sm text-gray-600">{activity.action}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{activity.amount}</p>
                        <Badge
                          variant={
                            activity.status === "Completed"
                              ? "default"
                              : activity.status === "Processing"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Regulatory Updates</CardTitle>
                  <CardDescription>Latest compliance and regulatory news</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { title: "SEC Approves New DeFi Guidelines", date: "2024-01-15", status: "Action Required" },
                    { title: "EU MiCA Regulation Implementation", date: "2024-01-10", status: "Compliant" },
                    { title: "CFTC Updates on Digital Assets", date: "2024-01-08", status: "Under Review" },
                    { title: "Basel III Crypto Requirements", date: "2024-01-05", status: "Compliant" },
                  ].map((update, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{update.title}</p>
                        <p className="text-sm text-gray-600">{update.date}</p>
                      </div>
                      <Badge
                        variant={
                          update.status === "Compliant"
                            ? "default"
                            : update.status === "Action Required"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {update.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="multisig">
            <MultiSigWallet />
          </TabsContent>

          <TabsContent value="compliance">
            <ComplianceTools />
          </TabsContent>

          <TabsContent value="risk">
            <RiskManagement />
          </TabsContent>

          <TabsContent value="trading">
            <InstitutionalTrading />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
