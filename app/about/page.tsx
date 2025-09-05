import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            About BitnunEco
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Revolutionizing blockchain technology with sustainable, browser-native solutions
          </p>
        </div>

        <div className="space-y-12">
          <section className="interactive-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              BitnunEco is pioneering the next generation of blockchain technology with our revolutionary browser-native
              approach. We eliminate the environmental impact of traditional mining while providing comprehensive Web3
              functionality through innovative Action Mining technology.
            </p>
          </section>

          <section className="interactive-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Innovation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Action Mining</h3>
                <p className="text-slate-300">
                  Revolutionary mining system that rewards user interactions instead of energy consumption.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Browser-Native</h3>
                <p className="text-slate-300">
                  Complete blockchain functionality running entirely in web browsers with WASM technology.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Zero Energy</h3>
                <p className="text-slate-300">
                  Sustainable blockchain operations with zero environmental impact and carbon negativity.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Comprehensive Web3</h3>
                <p className="text-slate-300">
                  Full ecosystem including DeFi, NFTs, DAO governance, and cross-chain functionality.
                </p>
              </div>
            </div>
          </section>

          <section className="interactive-card p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Team</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Our team consists of blockchain pioneers, sustainability experts, and Web3 innovators dedicated to
              creating accessible, environmentally responsible blockchain technology that empowers users worldwide.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
