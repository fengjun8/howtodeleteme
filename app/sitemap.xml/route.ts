import { SUPPORTED_LANGUAGES } from "@/lib/utils/i18n"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://howtodelete.me"

export async function GET() {
  const now = new Date().toISOString()
  const indexItems = SUPPORTED_LANGUAGES
    .map(({ code }) => `<sitemap><loc>${BASE_URL}/sitemap-${code}.xml</loc><lastmod>${now}</lastmod></sitemap>`) 
    .join('')

  const body = `<?xml version="1.0" encoding="UTF-8"?>` +
              `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
              `${indexItems}` +
              `</sitemapindex>`

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}