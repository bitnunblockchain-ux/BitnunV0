import { Navbar } from "@/components/navbar"
import { MarketplaceHeader } from "@/components/marketplace/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace/marketplace-filters"
import { NFTGrid } from "@/components/marketplace/nft-grid"
import { MarketplaceStats } from "@/components/marketplace/marketplace-stats"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MarketplaceHeader />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <MarketplaceFilters />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <MarketplaceStats />
            <NFTGrid />
          </div>
        </div>
      </main>
    </div>
  )
}
