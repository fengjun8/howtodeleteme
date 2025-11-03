import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('ru')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}