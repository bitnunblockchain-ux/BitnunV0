"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp } from "lucide-react"

export function InstitutionalTrading() {
  const tradingStats = [
    { name: "Daily Volume", value: "$125M", change: "+8.5%", trend: "up" },
    { name: "Active Orders", value: "1,247", change: "+12", trend: "up" },
    { name: "Avg. Trade Size", value: "$2.4M", change: "-3.2%", trend: "down" },
    { name: "Success Rate", value: "94.7%", change: "+1.1%", trend: "up" },
  ]

  const largeOrders = [
    {
      id: "ORD-001",
      type: "Buy",
      asset: "BTN",
      amount: "500,000",
      price: "$2.15",
      status: "Partial Fill",
      filled: "65%",
    },
    { id: "ORD-002", type: "Sell", asset: "BTN", amount: "250,000", price: "$2.18", status: "Open", filled: "0%" },
    { id: "ORD-003", type: "Buy", asset: "BTN", amount: "1,000,000", price: "$2.12", status: "Filled", filled: "100%" },
    {
      id: "ORD-004",
      type: "Sell",
      asset: "BTN",
      amount: "750,000",
      price: "$2.20",
      status: "Partial Fill",
      filled: "45%",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tradingStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <TrendingUp className={`h-4 w-4 ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change} from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Institutional Order Entry</CardTitle>
            <CardDescription>Place large block orders with advanced execution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderType">Order Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market">Market Order</SelectItem>
                    <SelectItem value="limit">Limit Order</SelectItem>
                    <SelectItem value="twap">TWAP</SelectItem>
                    <SelectItem value="vwap">VWAP</SelectItem>
                    <SelectItem value="iceberg">Iceberg</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="asset">Asset</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btn">BTN Token</SelectItem>
                    <SelectItem value="eth">Ethereum</SelectItem>
                    <SelectItem value="btc">Bitcoin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input id="quantity" placeholder="0.00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (USD)</Label>
                <Input id="price" placeholder="0.00" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="execution">Execution Strategy</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aggressive">Aggressive</SelectItem>
                  <SelectItem value="passive">Passive</SelectItem>
                  <SelectItem value="balanced">Balanced</SelectItem>
                  <SelectItem value="stealth">Stealth</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Place Buy Order</Button>
              <Button variant="outline" className="flex-1 bg-transparent">
                Place Sell Order
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Large Block Orders</CardTitle>
            <CardDescription>Monitor institutional-size order execution</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {largeOrders.map((order) => (
              <div key={order.id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant={order.type === "Buy" ? "default" : "secondary"}>{order.type}</Badge>
                    <span className="font-mono text-sm">{order.id}</span>
                  </div>
                  <Badge
                    variant={
                      order.status === "Filled" ? "default" : order.status === "Partial Fill" ? "secondary" : "outline"
                    }
                  >
                    {order.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Asset: {order.asset}</p>
                    <p className="text-gray-600">Amount: {order.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Price: {order.price}</p>
                    <p className="text-gray-600">Filled: {order.filled}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
