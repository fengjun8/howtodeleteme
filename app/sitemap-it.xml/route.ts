import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('it')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}