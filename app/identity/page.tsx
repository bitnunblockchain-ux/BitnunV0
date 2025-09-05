"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IdentityHeader } from "@/components/identity/identity-header"
import { IdentityProfile } from "@/components/identity/identity-profile"
import { ReputationScore } from "@/components/identity/reputation-score"
import { VerificationCenter } from "@/components/identity/verification-center"
import { CredentialWallet } from "@/components/identity/credential-wallet"
import { PrivacySettings } from "@/components/identity/privacy-settings"

export default function IdentityPage() {
  const [activeTab, setActiveTab] = useState("profile")

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <IdentityHeader />

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="reputation">Reputation</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="credentials">Credentials</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <IdentityProfile />
          </TabsContent>

          <TabsContent value="reputation">
            <ReputationScore />
          </TabsContent>

          <TabsContent value="verification">
            <VerificationCenter />
          </TabsContent>

          <TabsContent value="credentials">
            <CredentialWallet />
          </TabsContent>

          <TabsContent value="privacy">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Identity Analytics</CardTitle>
                <CardDescription>Insights into your identity usage and reputation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Advanced analytics dashboard coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
