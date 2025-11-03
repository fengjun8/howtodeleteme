import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('pt')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}