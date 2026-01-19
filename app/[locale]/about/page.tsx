import { AboutPageContent } from "@/components/about-page-content"
import type { Metadata } from "next"
import { getTranslations } from "@/lib/utils/translations"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"

interface PageProps {
  params: Promise<{ locale: string }>
}

import { getLanguageAlternates } from "@/lib/utils/seo"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/about` : `${baseUrl}/${locale}/about`

  return {
    title: t('about-title'),
    description: t('about-description'),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates('about'),
    },
    openGraph: {
      title: t('about-title'),
      description: t('about-description'),
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t('about-title'),
      description: t('about-description'),
    },
  }
}

export default async function AboutPage({ params }: PageProps) {
  return <AboutPageContent />
}
