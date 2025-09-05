"use client"

import dynamic from "next/dynamic"

const AutomationContent = dynamic(() => import("./automation-content"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-emerald-900/20 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
        <p className="text-emerald-600 font-medium">Loading Automation Dashboard...</p>
      </div>
    </div>
  ),
})

export default function AutomationWrapper() {
  return <AutomationContent />
}
