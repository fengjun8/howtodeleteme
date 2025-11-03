import { buildLocaleSitemapXML } from "@/lib/seo/sitemap-generator"

export async function GET() {
  const body = buildLocaleSitemapXML('es')
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } })
}