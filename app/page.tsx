import { processGuides, getPopularGuides, getAllCategories } from "@/lib/data/guides"
import { HomePageClient } from "@/components/home-page-client"
import { DEFAULT_LANGUAGE } from "@/lib/utils/i18n"

// 使用SSR按需生成（不配置 revalidate）

export default function HomePage() {
  // 使用默认语言获取初始数据
  const popularGuides = getPopularGuides(20, 'en')
  const allGuides = processGuides('en')
  const categories = getAllCategories()

  const categorizedGuides: Record<string, typeof allGuides> = categories.reduce(
    (acc, category) => {
      const guides = allGuides.filter((g) => g.category === category).slice(0, 4)
      if (guides.length > 0) {
        acc[category] = guides
      }
      return acc
    },
    {} as Record<string, typeof allGuides>,
  )

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "howtodelete.me",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en",
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I delete my online accounts?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Visit the specific guide for the service you want to delete. Each guide provides direct links to official deletion pages and step-by-step instructions.",
        },
      },
      {
        "@type": "Question",
        name: "Are these deletion guides official?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, all our guides link directly to official help pages and deletion forms provided by the services themselves.",
        },
      },
      {
        "@type": "Question",
        name: "Is account deletion permanent?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "In most cases, yes. However, some services have a grace period before permanent deletion. Always backup important data before deleting accounts.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <HomePageClient 
        initialPopularGuides={popularGuides}
        categories={categories}
        initialCategorizedGuides={categorizedGuides}
        initialLanguage={DEFAULT_LANGUAGE}
      />
    </>
  )
}
