import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Users, HelpCircle, ExternalLink, Github, BookOpen } from "lucide-react"

export function CommunitySupport() {
  const supportChannels = [
    {
      title: "Discord Community",
      description: "Join 5,000+ developers building on BitnunEco",
      members: "5,247",
      status: "online",
      icon: MessageCircle,
      color: "text-purple-500",
      link: "#",
    },
    {
      title: "GitHub Discussions",
      description: "Technical discussions and feature requests",
      members: "1,892",
      status: "active",
      icon: Github,
      color: "text-gray-700",
      link: "#",
    },
    {
      title: "Documentation",
      description: "Comprehensive guides and API references",
      members: "Updated daily",
      status: "maintained",
      icon: BookOpen,
      color: "text-blue-500",
      link: "#",
    },
  ]

  const recentActivity = [
    {
      type: "question",
      title: "How to optimize mining rewards?",
      author: "dev_sarah",
      replies: 12,
      time: "2 hours ago",
    },
    {
      type: "announcement",
      title: "New AI API endpoints released",
      author: "BitnunEco Team",
      replies: 45,
      time: "1 day ago",
    },
    {
      type: "discussion",
      title: "Best practices for NFT metadata",
      author: "eco_builder",
      replies: 8,
      time: "2 days ago",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "maintained":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-500" />
          <span>Community & Support</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Support Channels */}
        <div className="space-y-3">
          {supportChannels.map((channel, index) => (
            <div key={index} className="border border-border rounded-lg p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-start space-x-2">
                  <channel.icon className={`w-5 h-5 ${channel.color} mt-0.5`} />
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{channel.title}</h4>
                    <p className="text-xs text-muted-foreground">{channel.description}</p>
                  </div>
                </div>
                <Badge className={getStatusColor(channel.status)} variant="outline">
                  {channel.status}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{channel.members} members</span>
                <Button variant="ghost" size="sm" asChild>
                  <a href={channel.link} className="flex items-center space-x-1">
                    <span>Join</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Recent Community Activity</h4>
          <div className="space-y-2">
            {recentActivity.map((activity, index) => (
              <div key={index} className="p-2 bg-muted rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-medium text-foreground text-sm truncate">{activity.title}</h5>
                    <p className="text-xs text-muted-foreground">by {activity.author}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-xs">
                      {activity.replies} replies
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-blue-900 mb-1">Need Direct Support?</h4>
              <p className="text-sm text-blue-800 mb-3">
                For technical issues or enterprise inquiries, create a support ticket.
              </p>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Create Support Ticket
              </Button>
            </div>
          </div>
        </div>

        {/* Response Times */}
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-lg font-bold text-foreground">&lt; 2 hours</p>
            <p className="text-xs text-muted-foreground">Community Response</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">&lt; 24 hours</p>
            <p className="text-xs text-muted-foreground">Support Ticket</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
