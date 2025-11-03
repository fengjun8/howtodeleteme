import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('zh')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}