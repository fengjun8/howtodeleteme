import { notFound } from "next/navigation"
import { getGuidesByDifficulty } from "@/lib/data/guides"
import { DifficultyPageClient } from "@/components/difficulty-page-client"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import Link from "next/link"
import { Home } from "lucide-react"
import type { Metadata } from "next"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"
import { getTranslations } from "@/lib/utils/translations"

interface PageProps {
  params: Promise<{ difficulty: string; locale: string }>
}

export async function generateStaticParams() {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
    { difficulty: "limited-availability" },
    { difficulty: "impossible" },
  ]
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    description: "Simple process - Quick and direct deletion that can be completed in just a few clicks.",
  },
  medium: {
    label: "Medium",
    description: "Requires some additional steps - The deletion process needs some extra verification methods.",
  },
  hard: {
    label: "Hard",
    description: "Cannot be fully deleted, need to contact customer service - Complex process requiring support team contact.",
  },
  "limited-availability": {
    label: "Limited Availability",
    description: "Account deletion is only available in regions with privacy rights (GDPR, CCPA, etc.).",
  },
  impossible: {
    label: "Impossible",
    description: "Cannot be deleted - These accounts cannot be permanently removed from the platform.",
  },
}

import { getLanguageAlternates } from "@/lib/utils/seo"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { difficulty, locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]

  if (!config) {
    return { title: "Difficulty Not Found" }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/difficulty/${difficulty}` : `${baseUrl}/${locale}/difficulty/${difficulty}`

  // 使用本地化标签与描述
  const localizedLabel = t(difficulty as keyof import("@/lib/utils/translations").Translations)
  const descKeyMap: Record<string, keyof import("@/lib/utils/translations").Translations> = {
    easy: 'difficulty-easy-desc',
    medium: 'difficulty-medium-desc',
    hard: 'difficulty-hard-desc',
    'limited-availability': 'difficulty-limited-desc',
    impossible: 'difficulty-impossible-desc',
  }
  const localizedDesc = t(descKeyMap[difficulty] || 'difficulty-config-not-found')

  return {
    title: `${localizedLabel} - ${t('site-title')} | howtodelete.me`,
    description: localizedDesc,
    keywords: t('site-keywords'),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(`difficulty/${difficulty}`),
    },
    openGraph: {
      title: `${localizedLabel} - ${t('site-title')}`,
      description: localizedDesc,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${localizedLabel} - ${t('site-title')}`,
      description: localizedDesc,
    },
  }
}

export default async function DifficultyPage({ params }: PageProps) {
  const { difficulty } = await params
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]

  if (!config) {
    notFound()
  }

  // 注意：这里使用默认语言，因为服务器端组件无法直接访问客户端状态
  // 实际的语言处理将在客户端组件中进行
  const guides = getGuidesByDifficulty(difficulty, 'en')

  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <DifficultyPageClient guides={guides} difficulty={difficulty} />
      </div>
    </>
  )
}
