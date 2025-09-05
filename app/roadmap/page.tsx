import { Navbar } from "@/components/navbar"
import { RoadmapHeader } from "@/components/roadmap/roadmap-header"
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"
import { RoadmapStats } from "@/components/roadmap/roadmap-stats"

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RoadmapHeader />
        <RoadmapStats />
        <RoadmapTimeline />
      </main>
    </div>
  )
}
