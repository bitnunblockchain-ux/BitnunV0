"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle, Shield, FileText, Camera, Globe } from "lucide-react"

export function VerificationCenter() {
  const verificationLevels = [
    {
      level: "Basic",
      completed: true,
      requirements: ["Email verification", "Phone verification"],
      benefits: ["Basic trading", "Community access"],
      progress: 100,
    },
    {
      level: "Standard",
      completed: true,
      requirements: ["Government ID", "Address proof", "Selfie verification"],
      benefits: ["Higher limits", "Reduced fees", "Priority support"],
      progress: 100,
    },
    {
      level: "Premium",
      completed: false,
      requirements: ["Income verification", "Source of funds", "Enhanced due diligence"],
      benefits: ["Institutional features", "Lowest fees", "VIP support"],
      progress: 60,
    },
    {
      level: "Institutional",
      completed: false,
      requirements: ["Corporate documents", "Compliance review", "AML screening"],
      benefits: ["Enterprise tools", "Custom solutions", "Dedicated manager"],
      progress: 0,
    },
  ]

  const verificationSteps = [
    { step: "Email Verification", status: "completed", icon: CheckCircle, color: "text-emerald-600" },
    { step: "Phone Verification", status: "completed", icon: CheckCircle, color: "text-emerald-600" },
    { step: "Identity Document", status: "completed", icon: CheckCircle, color: "text-emerald-600" },
    { step: "Address Verification", status: "completed", icon: CheckCircle, color: "text-emerald-600" },
    { step: "Biometric Verification", status: "completed", icon: CheckCircle, color: "text-emerald-600" },
    { step: "Income Verification", status: "pending", icon: Clock, color: "text-yellow-600" },
    { step: "Source of Funds", status: "pending", icon: AlertCircle, color: "text-gray-400" },
    { step: "Enhanced Screening", status: "pending", icon: AlertCircle, color: "text-gray-400" },
  ]

  const complianceStatus = [
    { requirement: "KYC Compliance", status: "Complete", lastUpdate: "2024-01-15", nextReview: "2025-01-15" },
    { requirement: "AML Screening", status: "Complete", lastUpdate: "2024-01-20", nextReview: "2024-07-20" },
    { requirement: "Sanctions Check", status: "Complete", lastUpdate: "2024-01-25", nextReview: "2024-04-25" },
    { requirement: "PEP Screening", status: "Complete", lastUpdate: "2024-01-28", nextReview: "2024-07-28" },
  ]

  return (
    <div className="space-y-6">
      {/* Verification Levels */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {verificationLevels.map((level) => (
          <Card key={level.level} className={level.completed ? "border-emerald-200 bg-emerald-50" : ""}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between text-sm">
                {level.level} Level
                {level.completed && <CheckCircle className="h-4 w-4 text-emerald-600" />}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Progress value={level.progress} className="h-2" />
              <div className="space-y-1">
                <p className="text-xs font-medium">Requirements:</p>
                {level.requirements.map((req, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    • {req}
                  </p>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-medium">Benefits:</p>
                {level.benefits.map((benefit, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    • {benefit}
                  </p>
                ))}
              </div>
              {!level.completed && (
                <Button size="sm" className="w-full">
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-emerald-600" />
              Verification Progress
            </CardTitle>
            <CardDescription>Complete these steps to increase your verification level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {verificationSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <step.icon className={`h-5 w-5 ${step.color}`} />
                  <span className="font-medium">{step.step}</span>
                </div>
                <Badge
                  variant={
                    step.status === "completed" ? "default" : step.status === "pending" ? "secondary" : "outline"
                  }
                >
                  {step.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Compliance Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-emerald-600" />
              Compliance Status
            </CardTitle>
            <CardDescription>Your regulatory compliance and screening status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {complianceStatus.map((item, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{item.requirement}</span>
                  <Badge variant="default">{item.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <p>Last Update: {item.lastUpdate}</p>
                  </div>
                  <div>
                    <p>Next Review: {item.nextReview}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Document Upload */}
      <Card>
        <CardHeader>
          <CardTitle>Document Upload Center</CardTitle>
          <CardDescription>Upload required documents for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium mb-2">Income Documents</h3>
              <p className="text-sm text-gray-600 mb-4">Upload tax returns, pay stubs, or bank statements</p>
              <Button variant="outline" size="sm">
                Upload Files
              </Button>
            </div>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Camera className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium mb-2">Proof of Address</h3>
              <p className="text-sm text-gray-600 mb-4">Utility bill, bank statement, or lease agreement</p>
              <Button variant="outline" size="sm">
                Upload Files
              </Button>
            </div>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center">
              <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="font-medium mb-2">Source of Funds</h3>
              <p className="text-sm text-gray-600 mb-4">Documentation showing origin of your funds</p>
              <Button variant="outline" size="sm">
                Upload Files
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
