import { getPopularGuides } from "@/lib/data/guides"
import { PopularPageClient } from "@/components/popular-page-client"
import type { Metadata } from "next"
import { getTranslations } from "@/lib/utils/translations"

export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslations('en')
  const popularGuides = getPopularGuides()
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  return {
    title: t('popular-title'),
    description: t('popular-page-subtitle-count', { count: popularGuides.length }),
    alternates: {
      canonical: `${baseUrl}/popular`,
    },
    openGraph: {
      title: t('popular-title'),
      description: t('popular-page-subtitle-count', { count: popularGuides.length }),
      url: `${baseUrl}/popular`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t('popular-title'),
      description: t('popular-page-subtitle-count', { count: popularGuides.length }),
    },
  }
}

export default async function PopularPage() {
  const popularGuides = getPopularGuides()
  return <PopularPageClient locale={'en'} popularGuides={popularGuides} />
}