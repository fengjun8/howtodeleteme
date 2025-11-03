import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('de')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}