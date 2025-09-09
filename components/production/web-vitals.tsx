"use client"

import { useEffect } from "react"
import { getCLS, getFID, getFCP, getLCP, getTTFB } from "web-vitals"

interface WebVitalsMetric {
  name: string
  value: number
  rating: "good" | "needs-improvement" | "poor"
  delta: number
  id: string
}

export function WebVitals() {
  useEffect(() => {
    const sendToAnalytics = (metric: WebVitalsMetric) => {
      // Send to your analytics service
      if (process.env.NODE_ENV === "production") {
        // Example: Send to Google Analytics
        if (typeof window !== "undefined" && (window as any).gtag) {
          ;(window as any).gtag("event", metric.name, {
            event_category: "Web Vitals",
            event_label: metric.id,
            value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
            non_interaction: true,
          })
        }
      }
    }

    // Measure Core Web Vitals
    getCLS(sendToAnalytics)
    getFID(sendToAnalytics)
    getFCP(sendToAnalytics)
    getLCP(sendToAnalytics)
    getTTFB(sendToAnalytics)
  }, [])

  return null
}
