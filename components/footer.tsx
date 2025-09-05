import Link from "next/link"
import { Github, Twitter, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative bg-slate-900/95 backdrop-blur-sm border-t border-slate-800/50">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-emerald-900/10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                BitnunEco
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Revolutionary browser-based blockchain ecosystem with Action Mining technology. Building the sustainable
              future of Web3 with zero-energy consumption and comprehensive DeFi features.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://twitter.com/bitnuneco"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://github.com/bitnuneco"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/bitnuneco"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com/@bitnuneco"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/marketplace" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  NFT Marketplace
                </Link>
              </li>
              <li>
                <Link href="/trading" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  DeFi Trading
                </Link>
              </li>
              <li>
                <Link href="/governance" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  DAO Governance
                </Link>
              </li>
              <li>
                <Link href="/staking" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Staking Pools
                </Link>
              </li>
              <li>
                <Link href="/bridge" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Cross-Chain Bridge
                </Link>
              </li>
              <li>
                <Link href="/metaverse" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Metaverse
                </Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="text-white font-semibold mb-4">Developers</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/developer" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/sdk" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  SDK & APIs
                </Link>
              </li>
              <li>
                <Link href="/contracts" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Smart Contracts
                </Link>
              </li>
              <li>
                <Link href="/opensource" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Open Source
                </Link>
              </li>
              <li>
                <Link href="/cloud" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  BitnunCloud
                </Link>
              </li>
              <li>
                <Link href="/status" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  System Status
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/partnerships" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Partnerships
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-slate-800/50 mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">contact@bitnuneco.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-cyan-400" />
              <span className="text-slate-300">San Francisco, CA</span>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-6">
              <Link href="/privacy" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Cookie Policy
              </Link>
              <Link href="/security" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Security
              </Link>
              <Link href="/compliance" className="text-slate-400 hover:text-cyan-400 transition-colors text-sm">
                Compliance
              </Link>
            </div>
            <p className="text-slate-500 text-sm">© 2024 BitnunEco. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
