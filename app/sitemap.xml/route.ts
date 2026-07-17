import { SUPPORTED_LANGUAGES } from "@/lib/utils/i18n"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://howtodelete.me"
const INDEXED_LANGUAGES = SUPPORTED_LANGUAGES.filter(l => l.code === 'en' || l.code === 'zh')

export async function GET() {
  const now = new Date().toISOString()
  const indexItems = INDEXED_LANGUAGES
    .map(({ code }) => `<sitemap><loc>${BASE_URL}/sitemap-${code}.xml</loc><lastmod>${now}</lastmod></sitemap>`) 
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>` +
              `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
              `${indexItems}` +
              `</sitemapindex>`

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}
