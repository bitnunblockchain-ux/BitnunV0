"use client"

import { Button } from "@/components/ui/button"
import { Github, Twitter, Chrome, Facebook } from "lucide-react"

interface SocialLoginProps {
  onLogin?: (provider: string) => void
  className?: string
}

export function SocialLogin({ onLogin, className = "" }: SocialLoginProps) {
  const handleSocialLogin = (provider: string) => {
    onLogin?.(provider)
  }

  const providers = [
    {
      name: "Google",
      icon: Chrome,
      color: "hover:bg-red-500/10 hover:border-red-500/30",
      iconColor: "text-red-500",
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "hover:bg-blue-400/10 hover:border-blue-400/30",
      iconColor: "text-blue-400",
    },
    {
      name: "GitHub",
      icon: Github,
      color: "hover:bg-gray-400/10 hover:border-gray-400/30",
      iconColor: "text-gray-400",
    },
    {
      name: "Facebook",
      icon: Facebook,
      color: "hover:bg-blue-600/10 hover:border-blue-600/30",
      iconColor: "text-blue-600",
    },
  ]

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-primary/20" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {providers.map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            onClick={() => handleSocialLogin(provider.name.toLowerCase())}
            className={`glass-effect border-primary/20 transition-all duration-300 ${provider.color}`}
          >
            <provider.icon className={`w-4 h-4 mr-2 ${provider.iconColor}`} />
            {provider.name}
          </Button>
        ))}
      </div>
    </div>
  )
}
