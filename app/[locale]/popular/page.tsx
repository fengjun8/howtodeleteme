import { getPopularGuides } from "@/lib/data/guides"
import { PopularPageClient } from "@/components/popular-page-client"
import type { Metadata } from "next"
import { getTranslations } from "@/lib/utils/translations"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)
  const popularGuides = getPopularGuides(undefined, lang)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/popular` : `${baseUrl}/${locale}/popular`

  return {
    title: t('popular-title'),
    description: t('popular-page-subtitle-count', { count: popularGuides.length }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t('popular-title'),
      description: t('popular-page-subtitle-count', { count: popularGuides.length }),
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t('popular-title'),
      description: t('popular-page-subtitle-count', { count: popularGuides.length }),
    },
  }
}

export default async function PopularPage({ params }: PageProps) {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const popularGuides = getPopularGuides(undefined, lang)

  return <PopularPageClient locale={lang} popularGuides={popularGuides} />
}
