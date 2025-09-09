import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Handshake, Building2, Globe, Zap } from "lucide-react"

export default function PartnershipsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Partnerships</h1>
            <p className="text-xl text-muted-foreground">
              Building the future of Web3 together with strategic partners worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="glass-effect p-8 rounded-xl text-center">
              <Building2 className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-muted-foreground">Custom blockchain solutions for large organizations</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Global</h3>
              <p className="text-muted-foreground">Worldwide network of technology and business partners</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-muted-foreground">Cutting-edge research and development collaborations</p>
            </div>

            <div className="glass-effect p-8 rounded-xl text-center">
              <Handshake className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Strategic</h3>
              <p className="text-muted-foreground">Long-term partnerships driving mutual growth</p>
            </div>
          </div>

          <div className="glass-effect p-12 rounded-xl text-center">
            <h2 className="text-4xl font-bold mb-6">Become a Partner</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Join our ecosystem of innovative partners and help shape the future of blockchain technology. We offer
              various partnership opportunities tailored to your business needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-neon">Apply for Partnership</button>
              <button className="btn-outline">Learn More</button>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl font-bold mb-4">Partnership Inquiries</h3>
            <p className="text-muted-foreground mb-4">Ready to explore partnership opportunities?</p>
            <p className="text-lg font-semibold">partnerships@bitnun.org</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
