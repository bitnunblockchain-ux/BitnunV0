"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Zap, Clock, AlertCircle } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  memoryUsage: number
  networkRequests: number
  errors: number
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    networkRequests: 0,
    errors: 0,
  })

  useEffect(() => {
    // Measure page load performance
    const measurePerformance = () => {
      if (typeof window !== "undefined" && "performance" in window) {
        const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart
        const renderTime = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart

        // Memory usage (if available)
        const memoryInfo = (performance as any).memory
        const memoryUsage = memoryInfo ? memoryInfo.usedJSHeapSize / 1024 / 1024 : 0

        // Network requests
        const resources = performance.getEntriesByType("resource")
        const networkRequests = resources.length

        setMetrics({
          loadTime: Math.round(loadTime),
          renderTime: Math.round(renderTime),
          memoryUsage: Math.round(memoryUsage * 100) / 100,
          networkRequests,
          errors: 0, // This would be tracked by error boundary
        })
      }
    }

    // Measure after component mount
    setTimeout(measurePerformance, 1000)

    // Track errors
    const errorHandler = (event: ErrorEvent) => {
      setMetrics((prev) => ({ ...prev, errors: prev.errors + 1 }))
      console.error("[v0] Performance Monitor - Error detected:", event.error)
    }

    window.addEventListener("error", errorHandler)
    return () => window.removeEventListener("error", errorHandler)
  }, [])

  const getPerformanceStatus = (metric: keyof PerformanceMetrics, value: number) => {
    const thresholds = {
      loadTime: { good: 1000, warning: 3000 },
      renderTime: { good: 500, warning: 1500 },
      memoryUsage: { good: 50, warning: 100 },
      networkRequests: { good: 20, warning: 50 },
      errors: { good: 0, warning: 3 },
    }

    const threshold = thresholds[metric]
    if (value <= threshold.good) return "good"
    if (value <= threshold.warning) return "warning"
    return "critical"
  }

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      good: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      critical: "bg-red-500/20 text-red-400 border-red-500/30",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  if (process.env.NODE_ENV !== "development") return null

  return (
    <Card className="fixed bottom-4 right-4 w-80 bg-slate-900/95 border-slate-700 backdrop-blur-sm z-50">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Activity className="w-4 h-4" />
          Performance Monitor
        </CardTitle>
        <CardDescription className="text-xs">Real-time performance metrics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Load Time
            </span>
            <div className="flex items-center gap-1">
              <span>{metrics.loadTime}ms</span>
              <StatusBadge status={getPerformanceStatus("loadTime", metrics.loadTime)} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Render Time
            </span>
            <div className="flex items-center gap-1">
              <span>{metrics.renderTime}ms</span>
              <StatusBadge status={getPerformanceStatus("renderTime", metrics.renderTime)} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Memory</span>
            <div className="flex items-center gap-1">
              <span>{metrics.memoryUsage}MB</span>
              <StatusBadge status={getPerformanceStatus("memoryUsage", metrics.memoryUsage)} />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span>Requests</span>
            <div className="flex items-center gap-1">
              <span>{metrics.networkRequests}</span>
              <StatusBadge status={getPerformanceStatus("networkRequests", metrics.networkRequests)} />
            </div>
          </div>

          {metrics.errors > 0 && (
            <div className="col-span-2 flex items-center justify-between">
              <span className="flex items-center gap-1 text-red-400">
                <AlertCircle className="w-3 h-3" />
                Errors
              </span>
              <div className="flex items-center gap-1">
                <span>{metrics.errors}</span>
                <StatusBadge status={getPerformanceStatus("errors", metrics.errors)} />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
