"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, Search, MessageCircle, Mail, Book } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "What is BitnunEco and how does it work?",
          answer:
            "BitnunEco is a revolutionary blockchain platform that enables browser-based mining through user interactions. Unlike traditional mining that requires expensive hardware, our Action Mining technology rewards users for engaging with the platform - clicking, browsing, and participating in eco-friendly activities.",
        },
        {
          question: "How do I start mining BTN tokens?",
          answer:
            "Simply visit our platform and start interacting! Mining begins automatically when you browse pages, complete actions, or participate in eco-challenges. No downloads, installations, or special hardware required - everything runs directly in your browser.",
        },
        {
          question: "Is BitnunEco really free to use?",
          answer:
            "Yes! BitnunEco is completely free with no hidden costs, subscriptions, or hardware requirements. You can start earning BTN tokens immediately just by using the platform. We believe in making blockchain technology accessible to everyone.",
        },
      ],
    },
    {
      category: "Mining & Rewards",
      questions: [
        {
          question: "What is Action Mining?",
          answer:
            "Action Mining is our innovative approach where users earn BTN tokens through platform interactions instead of computational work. Every click, page visit, form submission, and eco-action contributes to the network while earning you rewards.",
        },
        {
          question: "How are mining rewards calculated?",
          answer:
            "Rewards are calculated based on your activity level, interaction quality, and participation in eco-challenges. Our AI system uses Proof-of-Action consensus to fairly distribute rewards, with bonuses for VR/AR participation and sustainable actions.",
        },
        {
          question: "Can I mine on multiple devices?",
          answer:
            "Our cross-reality mining system syncs your progress across desktop, mobile AR, and VR devices. You can seamlessly switch between platforms while maintaining continuous mining progress and earning multiplier bonuses.",
        },
      ],
    },
    {
      category: "NFT Marketplace",
      questions: [
        {
          question: "How do I create and sell NFTs?",
          answer:
            "Visit our NFT Marketplace and click 'Create NFT'. Upload your eco-themed artwork, set your price and royalties, then mint directly on our platform. All NFTs are created locally with zero gas fees, making it accessible for all creators.",
        },
        {
          question: "What types of NFTs can I create?",
          answer:
            "We focus on eco-themed NFTs including nature photography, renewable energy art, conservation projects, and sustainability-focused digital artwork. All NFTs should align with our environmental mission and community values.",
        },
        {
          question: "How do creator royalties work?",
          answer:
            "Creators can set royalty percentages (typically 5-15%) that they earn on all secondary sales. Royalties are automatically distributed in BTN tokens whenever your NFT is resold, providing ongoing passive income.",
        },
      ],
    },
    {
      category: "Wallet & Security",
      questions: [
        {
          question: "How secure is my BTN wallet?",
          answer:
            "Your wallet uses bank-grade AES-256 encryption with local key storage. We never store your private keys on our servers. Additionally, you can enable 2FA and create encrypted backups for maximum security.",
        },
        {
          question: "What if I lose access to my wallet?",
          answer:
            "During wallet creation, you receive a 12-word recovery phrase. This phrase can restore your wallet on any device. Keep it secure and never share it with anyone. We also recommend creating encrypted backups.",
        },
        {
          question: "Are there transaction fees?",
          answer:
            "No! All BTN transactions are completely free thanks to our local smart contract execution. Send, receive, and trade BTN tokens without any gas fees or hidden charges.",
        },
      ],
    },
    {
      category: "AR/VR & Metaverse",
      questions: [
        {
          question: "What devices support AR/VR features?",
          answer:
            "Our platform supports WebXR-compatible VR headsets, AR-enabled smartphones, and desktop browsers. You can mine in virtual forests, underwater realms, and futuristic cities with enhanced reward multipliers.",
        },
        {
          question: "Do I need special equipment for VR mining?",
          answer:
            "While VR headsets provide the most immersive experience with higher reward multipliers, you can access all features through desktop browsers. AR features work on most modern smartphones with camera access.",
        },
        {
          question: "Can I create my own virtual mining space?",
          answer:
            "Yes! Use our Space Builder tools to design custom 3D mining environments. Set entry fees, revenue sharing, and integrate NFTs. Successful spaces can generate passive income through user visits and activities.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <HelpCircle className="h-16 w-16 text-emerald-200" />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-balance">Frequently Asked Questions</h1>
              <p className="text-xl md:text-2xl text-emerald-100 max-w-3xl mx-auto text-balance">
                Find answers to common questions about BitnunEco platform, mining, and features
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search FAQ..."
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Quick Links */}
        <Card className="border-emerald-200">
          <CardHeader>
            <CardTitle>Need More Help?</CardTitle>
            <CardDescription>Additional resources and support options</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <MessageCircle className="h-6 w-6 text-blue-600" />
                <span>Join Discord</span>
                <span className="text-xs text-gray-600">Community support</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Mail className="h-6 w-6 text-emerald-600" />
                <span>Contact Support</span>
                <span className="text-xs text-gray-600">Direct assistance</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent">
                <Book className="h-6 w-6 text-teal-600" />
                <span>Documentation</span>
                <span className="text-xs text-gray-600">Technical guides</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Sections */}
        {faqCategories.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="border-emerald-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {category.category}
                <Badge variant="outline">{category.questions.length} questions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.questions.map((faq, questionIndex) => (
                  <AccordionItem key={questionIndex} value={`item-${categoryIndex}-${questionIndex}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  )
}
