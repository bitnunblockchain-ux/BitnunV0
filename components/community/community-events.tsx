"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users, Clock, Plus, ExternalLink } from "lucide-react"

export function CommunityEvents() {
  const events = [
    {
      title: "BitnunEco Developer Workshop",
      description: "Learn how to build sustainable dApps on BitnunEco with hands-on coding sessions",
      date: "Dec 20, 2024",
      time: "2:00 PM UTC",
      location: "Virtual Event",
      type: "Workshop",
      attendees: 156,
      maxAttendees: 200,
      status: "Open",
      organizer: "BitnunEco Team",
      tags: ["Development", "Education", "Virtual"],
    },
    {
      title: "Sustainable Blockchain Summit 2024",
      description: "Join industry leaders discussing the future of sustainable blockchain technology",
      date: "Jan 15, 2025",
      time: "9:00 AM UTC",
      location: "San Francisco, CA",
      type: "Conference",
      attendees: 847,
      maxAttendees: 1000,
      status: "Open",
      organizer: "GreenTech Alliance",
      tags: ["Conference", "Sustainability", "In-Person"],
    },
    {
      title: "Community AMA with Founders",
      description: "Ask anything session with BitnunEco founders and core team members",
      date: "Dec 18, 2024",
      time: "6:00 PM UTC",
      location: "Discord Voice Chat",
      type: "AMA",
      attendees: 234,
      maxAttendees: 500,
      status: "Open",
      organizer: "Community Team",
      tags: ["AMA", "Community", "Virtual"],
    },
    {
      title: "NFT Art Contest Judging",
      description: "Community voting for the best eco-themed NFT artworks",
      date: "Dec 25, 2024",
      time: "All Day",
      location: "BitnunEco Platform",
      type: "Contest",
      attendees: 567,
      maxAttendees: null,
      status: "Open",
      organizer: "Art Community",
      tags: ["Contest", "NFT", "Art"],
    },
    {
      title: "Mining Optimization Hackathon",
      description: "48-hour hackathon to develop innovative mining optimization solutions",
      date: "Jan 5-7, 2025",
      time: "48 Hours",
      location: "Virtual Event",
      type: "Hackathon",
      attendees: 89,
      maxAttendees: 150,
      status: "Registration",
      organizer: "Developer Community",
      tags: ["Hackathon", "Mining", "Competition"],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Community Events</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Join upcoming events and connect with the BitnunEco community
          </p>
        </div>
        <Button className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <Card
            key={index}
            className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-800"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{event.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{event.description}</p>
              </div>
              <Badge
                variant="secondary"
                className={`text-xs ${
                  event.status === "Open"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                }`}
              >
                {event.status}
              </Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="h-4 w-4" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Users className="h-4 w-4" />
                <span>
                  {event.attendees} attendees
                  {event.maxAttendees && ` / ${event.maxAttendees} max`}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 mb-4">
              {event.tags.map((tag, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">by {event.organizer}</span>
              <div className="flex gap-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  {event.status === "Open" ? "Join Event" : "Register"}
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
