import { ContributePageContent } from "@/components/contribute-page-content"
import type { Metadata } from "next"
import { getTranslations } from "@/lib/utils/translations"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"
import { Banner728Ad } from "@/components/ads"

interface PageProps {
  params: Promise<{ locale: string }>
}

import { getLanguageAlternates } from "@/lib/utils/seo"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/contribute` : `${baseUrl}/${locale}/contribute`

  return {
    title: `${t('contribute-page-title')} | howtodelete.me`,
    description: t('contribute-subtitle'),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates('contribute'),
    },
    openGraph: {
      title: `${t('contribute-page-title')} | howtodelete.me`,
      description: t('contribute-subtitle'),
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${t('contribute-page-title')} | howtodelete.me`,
      description: t('contribute-subtitle'),
    },
  }
}

export default async function ContributePage({ params }: PageProps) {
  return (
    <>
      <ContributePageContent />
      {/* 728 Banner Ad before footer - Contribute page */}
      <Banner728Ad />
    </>
  )
}
