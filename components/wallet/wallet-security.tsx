"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Shield, Key, Smartphone, AlertTriangle, CheckCircle } from "lucide-react"

export function WalletSecurity() {
  return (
    <div className="space-y-6">
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            Security Overview
          </CardTitle>
          <CardDescription>Your wallet security status and recommendations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Wallet Encrypted</h4>
              <p className="text-sm text-gray-600">AES-256 encryption</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h4 className="font-medium">Backup Created</h4>
              <p className="text-sm text-gray-600">Recovery phrase saved</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-medium">2FA Recommended</h4>
              <p className="text-sm text-gray-600">Enable for extra security</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-blue-600" />
              Recovery Phrase
            </CardTitle>
            <CardDescription>Backup and recovery options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">12-Word Recovery Phrase</h4>
              <p className="text-sm text-gray-600 mb-3">Your recovery phrase is safely encrypted and stored locally.</p>
              <Button variant="outline" className="w-full bg-transparent">
                View Recovery Phrase
              </Button>
            </div>

            <div className="space-y-2">
              <Button variant="outline" className="w-full bg-transparent">
                Download Backup
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Test Recovery
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-emerald-600" />
              Two-Factor Authentication
            </CardTitle>
            <CardDescription>Add an extra layer of security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">SMS Authentication</h4>
                <p className="text-sm text-gray-600">Receive codes via SMS</p>
              </div>
              <Badge variant="secondary">Not Enabled</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">Authenticator App</h4>
                <p className="text-sm text-gray-600">Use Google Authenticator</p>
              </div>
              <Badge variant="secondary">Not Enabled</Badge>
            </div>

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Enable 2FA</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
