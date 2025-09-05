"use client"

import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  keywords?: string[]
  image?: string
  url?: string
  type?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export function SEOHead({
  title = "BitnunEco - Next-Generation Blockchain Ecosystem",
  description = "Revolutionary browser-based blockchain platform with Action Mining, zero-energy consumption, and comprehensive Web3 features.",
  keywords = ["blockchain", "cryptocurrency", "sustainable", "Web3", "DeFi", "NFT"],
  image = "/og-image.png",
  url = "https://bitnuneco.vercel.app",
  type = "website",
  noIndex = false,
  canonicalUrl,
}: SEOHeadProps) {
  const fullTitle = title.includes("BitnunEco") ? title : `${title} | BitnunEco`
  const fullImageUrl = image.startsWith("http") ? image : `https://bitnuneco.vercel.app${image}`
  const canonical = canonicalUrl || url

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="BitnunEco" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:creator" content="@BitnunEco" />

      {/* Additional Meta */}
      <meta name="author" content="BitnunEco Team" />
      <meta name="publisher" content="BitnunEco" />
      <meta name="copyright" content="BitnunEco" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Structured Data for specific page types */}
      {type === "article" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: title,
              description: description,
              image: fullImageUrl,
              url: url,
              datePublished: new Date().toISOString(),
              author: {
                "@type": "Organization",
                name: "BitnunEco Team",
              },
              publisher: {
                "@type": "Organization",
                name: "BitnunEco",
                logo: {
                  "@type": "ImageObject",
                  url: "https://bitnuneco.vercel.app/logo.png",
                },
              },
            }),
          }}
        />
      )}
    </Head>
  )
}
