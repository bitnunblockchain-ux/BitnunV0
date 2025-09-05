import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-slate-300">Last updated: December 2024</p>
        </div>

        <div className="interactive-card p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Acceptance of Terms</h2>
            <p className="text-slate-300 leading-relaxed">
              By accessing and using BitnunEco platform, you accept and agree to be bound by the terms and provision of
              this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Platform Services</h2>
            <p className="text-slate-300 leading-relaxed">
              BitnunEco provides blockchain services including but not limited to: Action Mining, BTN token
              transactions, NFT marketplace, DeFi trading, and DAO governance features.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
            <ul className="text-slate-300 space-y-2">
              <li>• Maintain security of your wallet and private keys</li>
              <li>• Comply with applicable laws and regulations</li>
              <li>• Use platform services responsibly and ethically</li>
              <li>• Report security vulnerabilities or suspicious activities</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Risk Disclosure</h2>
            <p className="text-slate-300 leading-relaxed">
              Cryptocurrency and blockchain activities involve risks. Users should understand these risks and only
              participate with funds they can afford to lose.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
