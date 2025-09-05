import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ErrorBoundary } from "@/components/error-boundary"
import ClientDashboard from "@/components/client-dashboard"

export default function Dashboard() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.1),transparent_50%)]" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <Navbar />

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-12 text-center">
            <div className="inline-block">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4 animate-shimmer bg-[length:200%_100%]">
                Welcome to BitnunEco
              </h1>
              <div className="h-1 w-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full shadow-lg shadow-cyan-500/50" />
            </div>
            <p className="text-slate-300 text-xl mt-6 font-medium">
              Your next-generation sustainable blockchain ecosystem
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse delay-200" />
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-400" />
              </div>
            </div>
          </div>

          <ClientDashboard />

          <div className="fixed bottom-8 right-8 z-50">
            <div className="relative group">
              <button className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full shadow-lg shadow-cyan-500/50 animate-float flex items-center justify-center text-white font-bold text-xl hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300 group-hover:scale-110">
                ⚡
              </button>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse flex items-center justify-center text-xs font-bold text-white shadow-lg">
                3
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-ping"></div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ErrorBoundary>
  )
}
