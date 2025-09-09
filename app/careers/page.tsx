import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Clock, Users, Briefcase } from "lucide-react"

export default function CareersPage() {
  const openPositions = [
    {
      title: "Senior Blockchain Developer",
      department: "Engineering",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Build the future of sustainable blockchain technology with our Action Mining platform.",
    },
    {
      title: "Web3 Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Create intuitive user experiences for our comprehensive DeFi and NFT ecosystem.",
    },
    {
      title: "DevOps Engineer",
      department: "Infrastructure",
      location: "Remote / San Francisco",
      type: "Full-time",
      description: "Scale our cloud infrastructure and development hub to support millions of users.",
    },
    {
      title: "Community Manager",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      description: "Build and engage our global community of developers and blockchain enthusiasts.",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            Join Our Team
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Help us build the future of sustainable blockchain technology and revolutionize Web3 development
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="interactive-card p-6 text-center">
            <Users className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Remote-First</h3>
            <p className="text-slate-300">Work from anywhere with flexible hours and global collaboration</p>
          </div>
          <div className="interactive-card p-6 text-center">
            <Briefcase className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Cutting-Edge Tech</h3>
            <p className="text-slate-300">Work with the latest blockchain, AI, and Web3 technologies</p>
          </div>
          <div className="interactive-card p-6 text-center">
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Growth Focused</h3>
            <p className="text-slate-300">Continuous learning opportunities and career advancement</p>
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-white mb-8">Open Positions</h2>
          {openPositions.map((position, index) => (
            <div key={index} className="interactive-card p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{position.title}</h3>
                  <div className="flex flex-wrap gap-4 text-slate-300">
                    <span className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {position.department}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {position.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {position.type}
                    </span>
                  </div>
                </div>
                <button className="mt-4 lg:mt-0 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                  Apply Now
                </button>
              </div>
              <p className="text-slate-300 leading-relaxed">{position.description}</p>
            </div>
          ))}
        </div>

        <div className="interactive-card p-8 mt-16 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Don't See Your Role?</h2>
          <p className="text-slate-300 mb-6">
            We're always looking for talented individuals to join our mission. Send us your resume and let us know how
            you'd like to contribute.
          </p>
          <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
            Send Resume
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
