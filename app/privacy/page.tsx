import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-slate-300">Last updated: December 2024</p>
        </div>

        <div className="interactive-card p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
            <p className="text-slate-300 leading-relaxed">
              BitnunEco collects minimal information necessary to provide our blockchain services. This includes wallet
              addresses, transaction data, and usage analytics to improve platform performance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How We Use Information</h2>
            <ul className="text-slate-300 space-y-2">
              <li>• Provide and maintain blockchain services</li>
              <li>• Process transactions and mining rewards</li>
              <li>• Improve platform security and performance</li>
              <li>• Comply with legal and regulatory requirements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Security</h2>
            <p className="text-slate-300 leading-relaxed">
              We implement industry-standard security measures including encryption, secure storage, and regular
              security audits to protect your data and digital assets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-slate-300 leading-relaxed">
              For privacy-related questions, contact us at privacy@bitnuneco.com
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
