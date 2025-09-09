import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckCircle, AlertCircle, Clock, Activity } from "lucide-react"

export default function StatusPage() {
  const services = [
    { name: "Blockchain Network", status: "operational", uptime: "99.98%" },
    { name: "Action Mining", status: "operational", uptime: "99.95%" },
    { name: "Development Hub", status: "operational", uptime: "99.92%" },
    { name: "NFT Marketplace", status: "operational", uptime: "99.89%" },
    { name: "DeFi Trading", status: "operational", uptime: "99.94%" },
    { name: "API Services", status: "maintenance", uptime: "99.87%" },
    { name: "Cloud IDE", status: "operational", uptime: "99.91%" },
    { name: "Multi-Node Network", status: "operational", uptime: "99.96%" },
  ]

  const incidents = [
    {
      title: "Scheduled API Maintenance",
      status: "ongoing",
      time: "2 hours ago",
      description: "Routine maintenance to improve API performance and reliability.",
    },
    {
      title: "Minor Trading Delays Resolved",
      status: "resolved",
      time: "1 day ago",
      description: "Brief delays in DeFi trading have been resolved. All systems operating normally.",
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="w-5 h-5 text-emerald-400" />
      case "maintenance":
        return <Clock className="w-5 h-5 text-yellow-400" />
      case "degraded":
        return <AlertCircle className="w-5 h-5 text-orange-400" />
      default:
        return <AlertCircle className="w-5 h-5 text-red-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational":
        return "text-emerald-400"
      case "maintenance":
        return "text-yellow-400"
      case "degraded":
        return "text-orange-400"
      default:
        return "text-red-400"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            System Status
          </h1>
          <p className="text-xl text-slate-300">Real-time status of BitnunEco platform services</p>
        </div>

        {/* Overall Status */}
        <div className="interactive-card p-8 mb-8">
          <div className="flex items-center justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-emerald-400 mr-4" />
            <div>
              <h2 className="text-3xl font-bold text-white">All Systems Operational</h2>
              <p className="text-slate-300">Platform is running smoothly with 99.94% uptime</p>
            </div>
          </div>
        </div>

        {/* Service Status */}
        <div className="interactive-card p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Activity className="w-6 h-6 mr-3 text-cyan-400" />
            Service Status
          </h2>
          <div className="space-y-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(service.status)}
                  <span className="text-white font-medium ml-3">{service.name}</span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-slate-300 text-sm">{service.uptime} uptime</span>
                  <span className={`font-medium capitalize ${getStatusColor(service.status)}`}>{service.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Incidents */}
        <div className="interactive-card p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Incidents</h2>
          <div className="space-y-4">
            {incidents.map((incident, index) => (
              <div key={index} className="p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-medium">{incident.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400 text-sm">{incident.time}</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        incident.status === "resolved"
                          ? "bg-emerald-500/20 text-emerald-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>
                <p className="text-slate-300 text-sm">{incident.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
