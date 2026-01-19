import { Metadata } from "next"
import { SearchPageClient } from "@/components/search-page-client"
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

  return {
    title: `${t('search')} | howtodelete.me`,
    description: t('search-page-subtitle'),
    alternates: {
      canonical: `/${locale}/search`,
      languages: getLanguageAlternates('search'),
    },
  }
}

export default function SearchPage() {
  return <SearchPageClient />
}
