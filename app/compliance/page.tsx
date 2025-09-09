import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, CheckCircle, FileText, Globe } from "lucide-react"

export default function CompliancePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Compliance</h1>
            <p className="text-xl text-muted-foreground">
              Committed to the highest standards of regulatory compliance and security
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="glass-effect p-8 rounded-xl text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Security</h3>
              <p className="text-muted-foreground">SOC 2 Type II certified security controls</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">GDPR</h3>
              <p className="text-muted-foreground">Full compliance with European data protection</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">AML/KYC</h3>
              <p className="text-muted-foreground">Anti-money laundering and identity verification</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Global</h3>
              <p className="text-muted-foreground">Compliance with international regulations</p>
            </div>
          </div>

          <div className="glass-effect p-12 rounded-xl mb-16">
            <h2 className="text-3xl font-bold mb-8">Regulatory Framework</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">Financial Compliance</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• FinCEN registration and compliance</li>
                  <li>• SEC regulatory framework adherence</li>
                  <li>• CFTC commodity regulations</li>
                  <li>• State money transmitter licenses</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Data Protection</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• GDPR compliance for EU users</li>
                  <li>• CCPA compliance for California residents</li>
                  <li>• ISO 27001 information security</li>
                  <li>• Regular third-party audits</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Compliance Contact</h2>
            <p className="text-muted-foreground mb-4">For compliance-related inquiries and regulatory matters:</p>
            <p className="text-lg font-semibold">compliance@bitnun.org</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
