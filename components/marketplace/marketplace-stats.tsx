import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Activity, DollarSign } from "lucide-react"

export function MarketplaceStats() {
  const stats = [
    {
      title: "Floor Price",
      value: "12.5 BTN",
      change: "+5.2%",
      changeType: "positive" as const,
      icon: DollarSign,
    },
    {
      title: "24h Volume",
      value: "2,341 BTN",
      change: "+12.8%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
    {
      title: "Total Sales",
      value: "8,456",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: Activity,
    },
    {
      title: "Avg. Price",
      value: "45.7 BTN",
      change: "+8.4%",
      changeType: "positive" as const,
      icon: TrendingUp,
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="w-4 h-4 text-muted-foreground" />
              <span
                className={`text-xs font-medium ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}
              >
                {stat.change}
              </span>
            </div>
            <div>
              <p className="text-lg font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
