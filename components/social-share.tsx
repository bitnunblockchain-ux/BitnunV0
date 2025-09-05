"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Twitter, Facebook, Linkedin, Share2, Copy, Check, Send } from "lucide-react"

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  hashtags?: string[]
  className?: string
}

export function SocialShare({
  url = typeof window !== "undefined" ? window.location.href : "",
  title = "Check out BitnunEco - Next-Generation Blockchain Ecosystem",
  description = "Revolutionary browser-based blockchain platform with Action Mining and comprehensive Web3 features",
  hashtags = ["BitnunEco", "Blockchain", "Web3", "DeFi", "Sustainable"],
  className = "",
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedDescription = encodeURIComponent(description)
  const hashtagString = hashtags.map((tag) => `#${tag}`).join(" ")

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${hashtags.join(",")}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400")
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url,
        })
      } catch (err) {
        console.error("Error sharing:", err)
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  return (
    <div className={`relative ${className}`}>
      <Button
        onClick={handleNativeShare}
        variant="outline"
        size="sm"
        className="glass-effect border-primary/20 hover:bg-primary/10 transition-all duration-300 bg-transparent"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 glass-effect border border-primary/20 rounded-xl p-4 shadow-2xl z-50">
          <h3 className="text-sm font-semibold text-foreground mb-3">Share this</h3>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Button
              onClick={() => handleShare("twitter")}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300"
            >
              <Twitter className="w-4 h-4 text-blue-400" />
              <span className="text-xs">Twitter</span>
            </Button>

            <Button
              onClick={() => handleShare("facebook")}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-blue-600/10 hover:border-blue-600/30 transition-all duration-300"
            >
              <Facebook className="w-4 h-4 text-blue-600" />
              <span className="text-xs">Facebook</span>
            </Button>

            <Button
              onClick={() => handleShare("linkedin")}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-blue-700/10 hover:border-blue-700/30 transition-all duration-300"
            >
              <Linkedin className="w-4 h-4 text-blue-700" />
              <span className="text-xs">LinkedIn</span>
            </Button>

            <Button
              onClick={() => handleShare("telegram")}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <Send className="w-4 h-4 text-cyan-500" />
              <span className="text-xs">Telegram</span>
            </Button>
          </div>

          <div className="border-t border-primary/20 pt-3">
            <Button
              onClick={copyToClipboard}
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center space-x-2 hover:bg-primary/10 transition-all duration-300 bg-transparent"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-xs">Copy Link</span>
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
