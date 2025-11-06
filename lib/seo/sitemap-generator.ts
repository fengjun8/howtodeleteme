import { processGuides, getAllCategories } from "@/lib/data/guides"
import type { SupportedLanguage } from "@/lib/utils/i18n"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://howtodelete.me"

 function encodeCategorySlug(category: string) {
   // 与分类页、路由保持一致：空格转"-"，去掉"&"，不做额外URL编码
   return category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
 }

export function buildLocaleSitemapXML(locale: SupportedLanguage) {
  // 使用英文作为数据源来生成 slug 与列表，保持与现有路由一致
  const guides = processGuides('en')
  const categories = getAllCategories()
  const prefix = locale === 'en' ? '' : `/${locale}`

  const urls: string[] = []

  // 静态页面
  const staticPaths = [
    '',
    '/popular',
    '/categories',
    '/search',
    '/about',
    '/contribute',
    '/privacy',
    '/terms',
    '/feedback',
  ]
  staticPaths.forEach(path => urls.push(`${BASE_URL}${prefix}${path}`))

  // 分类页面
  categories.forEach(category => {
    const encoded = encodeCategorySlug(category)
    urls.push(`${BASE_URL}${prefix}/category/${encoded}`)
  })

  // 难度页面
  const difficulties = ["easy", "medium", "hard", "limited-availability", "impossible"]
  difficulties.forEach(diff => urls.push(`${BASE_URL}${prefix}/difficulty/${diff}`))

  // 指南详情页
  guides.forEach(guide => urls.push(`${BASE_URL}${prefix}/${guide.slug}`))

  // 组装 XML（保守使用最小字段，避免体积膨胀）
  const urlset = urls.map(u => `<url><loc>${u}</loc></url>`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>` +
         `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
         `${urlset}` +
         `</urlset>`
}