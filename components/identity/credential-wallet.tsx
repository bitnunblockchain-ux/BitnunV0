"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Shield, Briefcase, GraduationCap, Share, Download } from "lucide-react"

export function CredentialWallet() {
  const credentials = [
    {
      id: "cred-001",
      title: "Verified Trader",
      issuer: "BitnunEco Platform",
      type: "Trading Certification",
      issued: "2024-01-15",
      expires: "2025-01-15",
      status: "Active",
      icon: Award,
      color: "text-emerald-600",
    },
    {
      id: "cred-002",
      title: "KYC Verified",
      issuer: "Compliance Authority",
      type: "Identity Verification",
      issued: "2024-01-10",
      expires: "Never",
      status: "Active",
      icon: Shield,
      color: "text-blue-600",
    },
    {
      id: "cred-003",
      title: "Accredited Investor",
      issuer: "Financial Regulator",
      type: "Investment Qualification",
      issued: "2024-01-05",
      expires: "2025-12-31",
      status: "Active",
      icon: Briefcase,
      color: "text-purple-600",
    },
    {
      id: "cred-004",
      title: "DeFi Expert",
      issuer: "Blockchain Institute",
      type: "Professional Certification",
      issued: "2023-12-20",
      expires: "2025-12-20",
      status: "Active",
      icon: GraduationCap,
      color: "text-orange-600",
    },
  ]

  const verifiableCredentials = [
    {
      name: "Professional Trading License",
      issuer: "Financial Markets Authority",
      status: "Available",
      description: "Certified professional trader qualification",
    },
    {
      name: "Blockchain Developer Certificate",
      issuer: "Tech Certification Board",
      status: "Available",
      description: "Verified blockchain development skills",
    },
    {
      name: "ESG Compliance Certificate",
      issuer: "Sustainability Council",
      status: "Pending",
      description: "Environmental and social governance certification",
    },
  ]

  const sharedCredentials = [
    {
      platform: "LinkedIn",
      credential: "Verified Trader",
      shared: "2024-01-20",
      views: 247,
    },
    {
      platform: "Twitter",
      credential: "DeFi Expert",
      shared: "2024-01-18",
      views: 156,
    },
    {
      platform: "GitHub",
      credential: "Blockchain Developer",
      shared: "2024-01-15",
      views: 89,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Credential Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Credentials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-emerald-600">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-gray-500">Currently valid</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Shared</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-gray-500">Publicly visible</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Verifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">492</div>
            <p className="text-xs text-gray-500">Times verified</p>
          </CardContent>
        </Card>
      </div>

      {/* My Credentials */}
      <Card>
        <CardHeader>
          <CardTitle>My Credentials</CardTitle>
          <CardDescription>Your verified credentials and certifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {credentials.map((credential) => (
              <div key={credential.id} className="p-4 border rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <credential.icon className={`h-8 w-8 ${credential.color}`} />
                    <div>
                      <h3 className="font-medium">{credential.title}</h3>
                      <p className="text-sm text-gray-600">{credential.issuer}</p>
                    </div>
                  </div>
                  <Badge variant="default">{credential.status}</Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span>{credential.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Issued:</span>
                    <span>{credential.issued}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Expires:</span>
                    <span>{credential.expires}</span>
                  </div>
                </div>
                <div className="flex space-x-2 mt-3">
                  <Button size="sm" variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Available Credentials</CardTitle>
            <CardDescription>New credentials you can apply for</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verifiableCredentials.map((credential, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{credential.name}</h4>
                  <Badge variant={credential.status === "Available" ? "default" : "secondary"}>
                    {credential.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-2">{credential.description}</p>
                <p className="text-xs text-gray-500 mb-3">Issued by: {credential.issuer}</p>
                <Button size="sm" disabled={credential.status === "Pending"}>
                  {credential.status === "Available" ? "Apply Now" : "Pending Review"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Shared Credentials */}
        <Card>
          <CardHeader>
            <CardTitle>Shared Credentials</CardTitle>
            <CardDescription>Credentials shared on external platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {sharedCredentials.map((shared, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium">{shared.credential}</h4>
                    <p className="text-sm text-gray-600">on {shared.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{shared.views} views</p>
                    <p className="text-xs text-gray-500">{shared.shared}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">
                  Manage Sharing
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
