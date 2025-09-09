import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Download, Calendar } from "lucide-react"

export default function PressPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-6">Press Kit</h1>
            <p className="text-xl text-muted-foreground">
              Media resources and company information for journalists and partners
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="glass-effect p-8 rounded-xl">
              <Download className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Brand Assets</h3>
              <p className="text-muted-foreground mb-6">Download our logos, brand guidelines, and visual assets</p>
              <button className="btn-outline">Download Assets</button>
            </div>

            <div className="glass-effect p-8 rounded-xl">
              <Calendar className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Press Releases</h3>
              <p className="text-muted-foreground mb-6">Latest announcements and company news</p>
              <button className="btn-outline">View Releases</button>
            </div>
          </div>

          <div className="glass-effect p-8 rounded-xl mb-16">
            <h2 className="text-3xl font-bold mb-8">Company Facts</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4">About BitnunEco</h3>
                <p className="text-muted-foreground mb-4">
                  BitnunEco is a revolutionary blockchain platform that combines sustainable Action Mining technology
                  with comprehensive Web3 development tools and DeFi features.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Founded: 2024</li>
                  <li>• Headquarters: San Francisco, CA</li>
                  <li>• Industry: Blockchain Technology</li>
                  <li>• Focus: Sustainable Web3 Infrastructure</li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Key Metrics</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• $2.1B+ Total Value Locked</li>
                  <li>• 150K+ Active Developers</li>
                  <li>• 99.9% Platform Uptime</li>
                  <li>• 24/7 AI Assistant Support</li>
                  <li>• Carbon Neutral Operations</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6">Media Contact</h2>
            <p className="text-muted-foreground mb-4">For press inquiries and media requests, please contact:</p>
            <p className="text-lg font-semibold">press@bitnun.org</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
