"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  author_name: string
  published_at: string
  category: string
  read_time: number
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("blog_articles")
          .select("id, title, slug, excerpt, author_name, published_at, category, read_time")
          .eq("status", "published")
          .order("published_at", { ascending: false })

        if (error) throw error
        setBlogPosts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load blog posts")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <p className="text-red-400">Error loading blog posts: {error}</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-6">
            BitnunEco Blog
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mx-auto">
            Latest updates, insights, and stories from the sustainable blockchain revolution
          </p>
        </div>

        {blogPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-slate-400">No blog posts available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="interactive-card p-8 group cursor-pointer">
                <div className="mb-4">
                  <span className="inline-block bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-400 px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>

                <p className="text-slate-300 leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between text-sm text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      {post.author_name}
                    </span>
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.published_at).toLocaleDateString()}
                    </span>
                  </div>
                  <span>{post.read_time} min read</span>
                </div>

                <div className="flex items-center text-cyan-400 mt-4 group-hover:text-emerald-400 transition-colors">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-cyan-500 to-emerald-500 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
            Load More Posts
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
