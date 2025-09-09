import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle } from "lucide-react"

export default function SecurityPage() {
  const securityFeatures = [
    {
      icon: <Lock className="w-8 h-8 text-cyan-400" />,
      title: "End-to-End Encryption",
      description: "All data is encrypted using AES-256 encryption with keys stored locally on your device.",
    },
    {
      icon: <Shield className="w-8 h-8 text-emerald-400" />,
      title: "Multi-Signature Security",
      description: "Critical operations require multiple signatures to prevent unauthorized access.",
    },
    {
      icon: <Eye className="w-8 h-8 text-blue-400" />,
      title: "Zero-Knowledge Architecture",
      description: "We never store your private keys or sensitive data on our servers.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      title: "Regular Security Audits",
      description: "Independent security firms regularly audit our smart contracts and infrastructure.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Security & Trust
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Your security is our top priority. Learn about our comprehensive security measures and best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {securityFeatures.map((feature, index) => (
            <div key={index} className="interactive-card p-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{feature.icon}</div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="interactive-card p-8 mb-8">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
            <AlertTriangle className="w-8 h-8 mr-3 text-yellow-400" />
            Security Best Practices
          </h2>
          <div className="space-y-4 text-slate-300">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Never share your private keys or recovery phrases with anyone</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Enable two-factor authentication (2FA) on your account</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Keep your recovery phrase in a secure, offline location</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Verify all transaction details before confirming</p>
            </div>
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <p>Report suspicious activities immediately to our security team</p>
            </div>
          </div>
        </div>

        <div className="interactive-card p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Report Security Issues</h2>
          <p className="text-slate-300 mb-6">
            Found a security vulnerability? We appreciate responsible disclosure and offer rewards for valid reports.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
            Report Vulnerability
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
