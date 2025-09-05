import { Navbar } from "@/components/navbar"
import { CreateNFTForm } from "@/components/marketplace/create-nft-form"

export default function CreateNFTPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create NFT</h1>
          <p className="text-muted-foreground">Mint your eco-themed digital artwork</p>
        </div>

        <CreateNFTForm />
      </main>
    </div>
  )
}
