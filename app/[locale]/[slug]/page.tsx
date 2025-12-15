import { notFound } from "next/navigation"
import { getGuideBySlug, processGuides, getPopularGuides } from "@/lib/data/guides"
import { SUPPORTED_LANGUAGES, getLocalizedDifficulty } from "@/lib/utils/i18n"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"
import { getTranslations } from "@/lib/utils/translations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ShareButton } from "@/components/share-button"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { AlertTriangle, CheckCircle, Clock, Shield, Ban, Globe, Info, Trash2 } from "lucide-react"
import type { Metadata } from "next"
import dynamic from "next/dynamic"
import type { ProcessedGuide } from "@/lib/types"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

// 启用按需静态再生（ISR）：详情页缓存并在过期后后台再生成
// 详情页不导出 revalidate，热门页通过静态枚举预生成，其他页按需SSR生成

// 仅预生成热门指南详情页（所有支持语言），其它详情页按需生成
export async function generateStaticParams() {
  const locales = SUPPORTED_LANGUAGES.map(l => l.code)
  const params: { locale: string; slug: string }[] = []
  for (const locale of locales) {
    const popularGuides = getPopularGuides(undefined, locale as any)
    for (const guide of popularGuides) {
      params.push({ locale, slug: guide.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const guide = getGuideBySlug(slug, lang)
  const t = getTranslations(lang)

  if (!guide) {
    return {
      title: "Guide Not Found",
    }
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/${slug}` : `${baseUrl}/${locale}/${slug}`

  return {
    title: `${t('guide-title-template', { name: guide.name })} | howtodelete.me`,
    description: `${t('guide-description-template', { name: guide.name })} ${guide.notes}`,
    keywords: t('guide-keywords-template', { name: guide.name }),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t('guide-title-template', { name: guide.name }),
      description: `${t('guide-description-template', { name: guide.name })} ${guide.notes}`,
      type: "article",
      url: canonicalUrl,
    },
    twitter: {
      card: "summary",
      title: t('guide-title-template', { name: guide.name }),
      description: t('guide-description-template', { name: guide.name }),
    },
  }
}

const difficultyConfig = {
    easy: {
      label: "Easy",
      icon: CheckCircle,
      className: "bg-emerald-600 text-white border-emerald-600",
      description: "difficulty-easy-desc",
    },
    medium: {
      label: "Medium",
      icon: Clock,
      className: "bg-orange-600 text-white border-orange-600",
      description: "difficulty-medium-desc",
    },
    hard: {
      label: "Hard",
      icon: AlertTriangle,
      className: "bg-red-600 text-white border-red-600",
      description: "difficulty-hard-desc",
    },
    limited: {
      label: "Limited Availability",
      icon: Shield,
      className: "bg-purple-600 text-white border-purple-600",
      description: "difficulty-limited-desc",
    },
    impossible: {
      label: "Impossible",
      icon: Ban,
      className: "bg-black text-white border-black",
      description: "difficulty-impossible-desc",
    },
  }

// 映射数据中的难度值到 UI 配置的 key
const difficultyUiMap: Record<string, keyof typeof difficultyConfig> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  "limited-availability": "limited",
  impossible: "impossible",
}

const GuideLongContent = dynamic<
  {
    guide: ProcessedGuide
    sameCategoryGuides: ProcessedGuide[]
    sameDifficultyGuides: ProcessedGuide[]
  }
>(() => import("@/components/guide-long-content").then((mod) => mod.GuideLongContent))

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const guide = getGuideBySlug(slug, lang)
  const t = getTranslations(lang)

  if (!guide) {
    notFound()
  }

  // 热门指南已在构建期预生成；其它详情页按需生成并通过 ISR 缓存

  // Get all guides for recommendations (use locale for localized notes/difficulty label)
  const allGuides = processGuides(lang)
  
  // Get same category guides (excluding current guide), limit for performance
  const sameCategoryGuides = allGuides
    .filter(g => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 8)
  
  // Get same difficulty guides (excluding current guide), limit for performance
  const sameDifficultyGuides = allGuides
    .filter(g => g.difficulty === guide.difficulty && g.slug !== guide.slug)
    .slice(0, 8)

  const uiKey = difficultyUiMap[guide.difficulty] ?? "medium"
  const config = difficultyConfig[uiKey]
  const DifficultyIcon = config.icon
  const localizedDifficultyLabel = getLocalizedDifficulty(guide.difficulty, lang)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: t('guide-title-template', { name: guide.name }),
    description: guide.notes,
    step: [
      {
        "@type": "HowToStep",
        name: "Log into your account",
        text: `Log into your ${guide.name} account`,
      },
      {
        "@type": "HowToStep",
        name: "Navigate to settings",
        text: "Navigate to account settings or privacy settings",
      },
      {
        "@type": "HowToStep",
        name: "Find deletion option",
        text: "Find the account deletion or deactivation option",
      },
      {
        "@type": "HowToStep",
        name: "Confirm deletion",
        text: "Follow the on-screen instructions to confirm deletion",
      },
    ],
    url: guide.url,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        {/* Header */}
        <div className="space-y-6 mb-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-balance">
              {t('guide-title-template', { name: guide.name })}
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={config.className}>
              <DifficultyIcon className="mr-1 h-3 w-3" />
              {localizedDifficultyLabel}
            </Badge>
            <Badge variant="secondary">{guide.category}</Badge>
            {guide.popular && <Badge variant="default">{t('popular')}</Badge>}
          </div>

          {/* TL;DR Section */}
          <Card className="bg-emerald-50 border-emerald-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                {t('tldr-title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="font-medium">
                      {guide.difficulty === "impossible" 
                        ? t('tldr-cannot-delete', { name: guide.name }) 
                        : t('tldr-can-delete', { name: guide.name })}
                    </span>
                  </p>
                  <p className="text-sm text-muted-foreground ml-4">
                    {guide.notes}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2">
                  <Button 
                    asChild 
                    size="sm" 
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <a href="#deletion-process">
                      <Trash2 className="mr-1 h-4 w-4" />
                      {t('jump-to-process')}
                    </a>
                  </Button>
                  <FeedbackDialog 
                    guideTitle={guide.name}
                    guideUrl={`https://howtodelete.me/${guide.slug}`}
                  />
                  <ShareButton 
                    title={`${t('guide-title-template', { name: guide.name })} | howtodelete.me`}
                    url={`https://howtodelete.me/${guide.slug}`}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applicable Regions */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                {t('applicable-regions-title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {guide.difficulty === "limited-availability" ? (
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-medium">{t('applicable-regions-limited-title')}</span>
                  </p>
                  <p className="text-sm text-muted-foreground ml-4">
                    {t('applicable-regions-limited-desc')}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span className="font-medium">{t('applicable-regions-global-title')}</span>
                  </p>
                  <p className="text-sm text-muted-foreground ml-4">
                    {t('applicable-regions-global-desc')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Prerequisites Section */}
        <Card className="mb-6 bg-amber-50 border-amber-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Info className="h-5 w-5 text-amber-600" />
              {t('prerequisites-title')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                <div>
                  <p className="font-medium">{t('prereq-access-title')}</p>
                  <p className="text-sm text-muted-foreground">{t('prereq-access-desc', { name: guide.name })}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                <div>
                  <p className="font-medium">{t('prereq-email-title')}</p>
                  <p className="text-sm text-muted-foreground">{t('prereq-email-desc')}</p>
                </div>
              </div>
              {guide.difficulty === "hard" || guide.difficulty === "limited-availability" ? (
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-amber-500 rounded-full mt-2"></span>
                  <div>
                    <p className="font-medium">{t('prereq-verification-title')}</p>
                    <p className="text-sm text-muted-foreground">{t('prereq-verification-desc')}</p>
                  </div>
                </div>
              ) : null}
            </div>
          </CardContent>
        </Card>

        {guide.difficulty === "impossible" && (
          <Alert className="mb-6 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              {t('alert-impossible-desc')}
            </AlertDescription>
          </Alert>
        )}

        {guide.difficulty === "limited-availability" && (
          <Alert className="mb-6 border-purple-600">
            <Shield className="h-4 w-4" />
            <AlertDescription>
              {t('alert-limited-desc')}
            </AlertDescription>
          </Alert>
        )}

        <GuideLongContent
          guide={guide as ProcessedGuide}
          sameCategoryGuides={sameCategoryGuides as ProcessedGuide[]}
          sameDifficultyGuides={sameDifficultyGuides as ProcessedGuide[]}
        />


      </div>
    </>
  )
}
