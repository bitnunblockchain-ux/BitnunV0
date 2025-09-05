"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"

const BtnTokenContent = dynamic(() => import("@/components/client-pages/btn-token-content"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function BtnTokenWrapper() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }
    >
      <BtnTokenContent />
    </Suspense>
  )
}
