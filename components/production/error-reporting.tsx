"use client"

import { useEffect } from "react"

interface ErrorInfo {
  message: string
  filename: string
  lineno: number
  colno: number
  error: Error
  timestamp: number
  userAgent: string
  url: string
}

export function ErrorReporting() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      // Send error to monitoring service
      if (process.env.NODE_ENV === "production") {
        // Example: Send to error tracking service
        fetch("/api/errors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(errorInfo),
        }).catch((err) => {
          console.error("[v0] Failed to report error:", err)
        })
      }

      console.error("[v0] Error captured:", errorInfo)
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorInfo = {
        message: "Unhandled Promise Rejection",
        reason: event.reason,
        timestamp: Date.now(),
        userAgent: navigator.userAgent,
        url: window.location.href,
      }

      if (process.env.NODE_ENV === "production") {
        fetch("/api/errors", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(errorInfo),
        }).catch((err) => {
          console.error("[v0] Failed to report promise rejection:", err)
        })
      }

      console.error("[v0] Promise rejection captured:", errorInfo)
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  return null
}
