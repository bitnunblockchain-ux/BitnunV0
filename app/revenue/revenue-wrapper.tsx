"use client"

import dynamic from "next/dynamic"

const RevenueContent = dynamic(() => import("../../components/client-pages/revenue-content"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
    </div>
  ),
})

export default function RevenueWrapper() {
  return <RevenueContent />
}
