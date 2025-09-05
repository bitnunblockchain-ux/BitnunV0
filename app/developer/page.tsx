import { Navbar } from "@/components/navbar"
import { DeveloperHeader } from "@/components/developer/developer-header"
import { APIStats } from "@/components/developer/api-stats"
import { QuickStart } from "@/components/developer/quick-start"
import { APIDocumentation } from "@/components/developer/api-documentation"
import { CommunitySupport } from "@/components/developer/community-support"
import { DeveloperResources } from "@/components/developer/developer-resources"

export default function DeveloperPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DeveloperHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <QuickStart />
            <APIDocumentation />
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <APIStats />
            <CommunitySupport />
            <DeveloperResources />
          </div>
        </div>
      </main>
    </div>
  )
}
