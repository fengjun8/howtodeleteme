import type { MetadataRoute } from "next"
import { processGuides, getAllCategories } from "@/lib/data/guides"
import { SUPPORTED_LANGUAGES } from "@/lib/utils/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://howtodelete.me"
  const guides = processGuides()
  const categories = getAllCategories()
  const locales = SUPPORTED_LANGUAGES.map(lang => lang.code)

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 为每种语言生成页面
  locales.forEach(locale => {
    const localePrefix = `/${locale}`

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
      {
        url: `${baseUrl}${localePrefix}`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 1,
      },
      {
        url: `${baseUrl}${localePrefix}/popular`,
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.9,
      },
      {
        url: `${baseUrl}${localePrefix}/categories`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: `${baseUrl}${localePrefix}/about`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.5,
      },
      {
        url: `${baseUrl}${localePrefix}/privacy`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/terms`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.3,
      },
      {
        url: `${baseUrl}${localePrefix}/feedback`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.4,
      },
      {
        url: `${baseUrl}${localePrefix}/contribute`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.4,
      },
    ]

    // Category pages
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}${localePrefix}/category/${category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))

    // Difficulty pages
    const difficultyPages: MetadataRoute.Sitemap = ["easy", "medium", "hard", "limited-availability", "impossible"].map((difficulty) => ({
      url: `${baseUrl}${localePrefix}/difficulty/${difficulty}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    // Guide pages - prioritize popular guides
    const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
      url: `${baseUrl}${localePrefix}/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: guide.popular ? 0.9 : 0.7,
    }))

    sitemapEntries.push(...staticPages, ...categoryPages, ...difficultyPages, ...guidePages)
  })

  return sitemapEntries
}
