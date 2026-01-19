import { FeedbackPageContent } from "@/components/feedback-page-content"
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
  const canonicalUrl = lang === 'en' ? `${baseUrl}/feedback` : `${baseUrl}/${locale}/feedback`

  return {
    title: `${t('feedback')} | howtodelete.me`,
    description: `${t('feedback-subtitle')} - Submit feedback or report issues with our guides.`,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates('feedback'),
    },
    openGraph: {
      title: `${t('feedback')} | howtodelete.me`,
      description: `${t('feedback-subtitle')} - Submit feedback or report issues with our guides.`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${t('feedback')} | howtodelete.me`,
      description: `${t('feedback-subtitle')} - Submit feedback or report issues with our guides.`,
    },
  }
}

export default function FeedbackPage() {
  return <FeedbackPageContent />
}
