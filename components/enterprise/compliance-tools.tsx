"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { FileText, AlertTriangle, Download, Eye } from "lucide-react"

export function ComplianceTools() {
  const complianceMetrics = [
    { name: "KYC Completion", value: 98.5, status: "excellent" },
    { name: "AML Screening", value: 99.2, status: "excellent" },
    { name: "Transaction Monitoring", value: 97.8, status: "good" },
    { name: "Regulatory Reporting", value: 100, status: "excellent" },
  ]

  const reports = [
    { name: "Monthly AML Report", date: "2024-01-31", status: "Ready", size: "2.4 MB" },
    { name: "KYC Compliance Summary", date: "2024-01-31", status: "Ready", size: "1.8 MB" },
    { name: "Transaction Monitoring Report", date: "2024-01-31", status: "Processing", size: "3.2 MB" },
    { name: "Regulatory Filing", date: "2024-01-30", status: "Submitted", size: "1.1 MB" },
  ]

  const alerts = [
    {
      type: "High Risk Transaction",
      severity: "high",
      time: "2 hours ago",
      description: "Large transaction flagged for review",
    },
    {
      type: "KYC Update Required",
      severity: "medium",
      time: "1 day ago",
      description: "Customer documentation needs renewal",
    },
    {
      type: "Regulatory Change",
      severity: "low",
      time: "3 days ago",
      description: "New compliance guidelines published",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {complianceMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-2xl font-bold">{metric.value}%</div>
                <Progress value={metric.value} className="h-2" />
                <Badge variant={metric.status === "excellent" ? "default" : "secondary"}>{metric.status}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-emerald-600" />
              Compliance Reports
            </CardTitle>
            <CardDescription>Generated compliance and regulatory reports</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{report.name}</p>
                  <p className="text-sm text-gray-600">
                    {report.date} • {report.size}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      report.status === "Ready" ? "default" : report.status === "Processing" ? "secondary" : "outline"
                    }
                  >
                    {report.status}
                  </Badge>
                  {report.status === "Ready" && (
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
              Compliance Alerts
            </CardTitle>
            <CardDescription>Recent compliance notifications and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">{alert.type}</p>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        alert.severity === "high"
                          ? "destructive"
                          : alert.severity === "medium"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-sm text-gray-500">{alert.time}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                <Button size="sm" variant="outline">
                  <Eye className="h-4 w-4 mr-2" />
                  Review
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
