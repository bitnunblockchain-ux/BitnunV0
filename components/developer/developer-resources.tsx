import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ExternalLink, FileText, Video, Code, Lightbulb } from "lucide-react"

export function DeveloperResources() {
  const resources = [
    {
      title: "SDK Downloads",
      items: [
        { name: "JavaScript SDK", version: "v2.1.0", downloads: "15.4k", icon: Code },
        { name: "Python SDK", version: "v1.8.2", downloads: "8.7k", icon: Code },
        { name: "Go SDK", version: "v1.5.1", downloads: "3.2k", icon: Code },
      ],
    },
    {
      title: "Documentation",
      items: [
        { name: "API Reference", version: "Latest", downloads: "Updated daily", icon: FileText },
        { name: "Integration Guide", version: "v3.0", downloads: "Comprehensive", icon: FileText },
        { name: "Best Practices", version: "v2.1", downloads: "Essential", icon: Lightbulb },
      ],
    },
    {
      title: "Video Tutorials",
      items: [
        { name: "Getting Started", version: "15 min", downloads: "Beginner", icon: Video },
        { name: "Advanced Mining", version: "25 min", downloads: "Intermediate", icon: Video },
        { name: "AI Integration", version: "20 min", downloads: "Advanced", icon: Video },
      ],
    },
  ]

  const sampleProjects = [
    {
      title: "Eco Mining Dashboard",
      description: "React dashboard for monitoring mining operations",
      language: "TypeScript",
      stars: 234,
    },
    {
      title: "NFT Marketplace Clone",
      description: "Full-featured marketplace built with BitnunEco APIs",
      language: "Next.js",
      stars: 189,
    },
    {
      title: "Carbon Credit Tracker",
      description: "Track and trade carbon credits on the blockchain",
      language: "Python",
      stars: 156,
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5 text-green-500" />
          <span>Developer Resources</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Resource Categories */}
        {resources.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h4 className="font-medium text-foreground mb-3">{category.title}</h4>
            <div className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-2 bg-muted rounded-lg">
                  <div className="flex items-center space-x-2">
                    <item.icon className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.version}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.downloads}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Sample Projects */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Sample Projects</h4>
          <div className="space-y-3">
            {sampleProjects.map((project, index) => (
              <div key={index} className="border border-border rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-foreground text-sm">{project.title}</h5>
                    <p className="text-xs text-muted-foreground">{project.description}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    ⭐ {project.stars}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {project.language}
                  </Badge>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <FileText className="w-4 h-4 mr-2" />
            Changelog
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Code className="w-4 h-4 mr-2" />
            Examples
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
