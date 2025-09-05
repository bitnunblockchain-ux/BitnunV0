import dynamic from "next/dynamic"

const AnalyticsClient = dynamic(() => import("@/components/client-pages/analytics-client"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-cyan-400"></div>
    </div>
  ),
})

export default function AnalyticsPage() {
  return <AnalyticsClient />
}
