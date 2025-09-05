"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("BitnunEco Error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_50%)]" />
      <Card className="bg-slate-800/50 border-red-500/20 backdrop-blur-xl max-w-md w-full relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-red-400 text-2xl">System Error</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-slate-300">
            BitnunEco encountered an unexpected error. Our blockchain nodes are working to resolve this.
          </p>
          {process.env.NODE_ENV === "development" && (
            <details className="text-left text-sm text-slate-400 bg-slate-900/50 p-3 rounded">
              <summary className="cursor-pointer">Technical Details</summary>
              <pre className="mt-2 whitespace-pre-wrap text-xs">{error.message}</pre>
            </details>
          )}
          <div className="space-y-2">
            <Button
              onClick={reset}
              className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600"
            >
              Try Again
            </Button>
            <Button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = "/"
                }
              }}
              variant="outline"
              className="w-full border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
