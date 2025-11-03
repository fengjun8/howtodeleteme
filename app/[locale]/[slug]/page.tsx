import { notFound } from "next/navigation"
import { getGuideBySlug, processGuides } from "@/lib/data/guides"
import { SUPPORTED_LANGUAGES } from "@/lib/utils/i18n"
import { getLocalizedDifficulty, isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"
import { getTranslations } from "@/lib/utils/translations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { ShareButton } from "@/components/share-button"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { ExternalLink, AlertTriangle, CheckCircle, Clock, Shield, Ban, Home, Globe, Mail, Calendar, Info, HelpCircle, ArrowLeft, Trash2, Send, Download, CreditCard, Users, FileText, Flag, Anchor } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  const guides = processGuides()
  const locales = SUPPORTED_LANGUAGES.map(lang => lang.code)

  const params = [] as { locale: string; slug: string }[]
  for (const locale of locales) {
    for (const guide of guides) {
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

export default async function GuidePage({ params }: PageProps) {
  const { locale, slug } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const guide = getGuideBySlug(slug, lang)
  const t = getTranslations(lang)

  if (!guide) {
    notFound()
  }

  // Get all guides for recommendations (use locale for localized notes/difficulty label)
  const allGuides = processGuides(lang)
  
  // Get same category guides (excluding current guide)
  const sameCategoryGuides = allGuides
    .filter(g => g.category === guide.category && g.slug !== guide.slug)
    .slice(0, 12)
  
  // Get same difficulty guides (excluding current guide)
  const sameDifficultyGuides = allGuides
    .filter(g => g.difficulty === guide.difficulty && g.slug !== guide.slug)
    .slice(0, 12)

  const uiKey = difficultyUiMap[guide.difficulty] ?? "medium"
  const config = difficultyConfig[uiKey]
  const DifficultyIcon = config.icon
  const difficultyDesc = uiKey === 'easy'
    ? t('difficulty-easy-desc')
    : uiKey === 'medium'
    ? t('difficulty-medium-desc')
    : uiKey === 'hard'
    ? t('difficulty-hard-desc')
    : uiKey === 'limited'
    ? t('difficulty-limited-desc')
    : t('difficulty-impossible-desc')
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
              {getLocalizedDifficulty(guide.difficulty, lang)}
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

        {/* Main Content */}
        <div className="grid gap-6">
          {/* Official Links */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ExternalLink className="h-5 w-5" />
                {t('official-links-title')}
              </CardTitle>
              <CardDescription>{t('official-links-desc', { name: guide.name })}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {guide.url && (
                <div>
                  <p className="text-sm font-medium mb-2">{t('official-links-primary')}</p>
                  <Button asChild className="w-full justify-between bg-black hover:bg-gray-800 text-white">
                    <a href={guide.url} target="_blank" rel="noopener noreferrer">
                      <span className="truncate">{guide.url}</span>
                      <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              )}

              {guide.email && (
                <div>
                  <p className="text-sm font-medium mb-2">{t('official-links-email')}</p>
                  <Button asChild variant="outline" className="w-full justify-between bg-transparent">
                    <a href={`mailto:${guide.email}`}>
                      <span className="truncate">{guide.email}</span>
                      <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                    </a>
                  </Button>
                </div>
              )}

              {guide.domains && guide.domains.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">{t('official-links-domains')}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {guide.domains.slice(0, 6).map((domain, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 p-2 rounded-md">
                        <Anchor className="h-3 w-3 text-blue-500 flex-shrink-0" />
                        <span className="truncate">{domain}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Deletion Steps */}
          <Card id="deletion-process" className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl flex items-center gap-3">
                <Trash2 className="h-6 w-6 text-red-600" />
                {t('deletion-process-title')}
              </CardTitle>
              <CardDescription className="text-base">
                {t('deletion-process-expected')} <span className="font-semibold">{difficultyDesc}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notes from JSON */}
              {guide.notes && (
                <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                    <Info className="h-4 w-4" />
                    {t('deletion-notes-title')}
                  </h4>
                  <p className="text-sm text-red-700">{guide.notes}</p>
                </div>
              )}

              {/* Quick Access URL */}
              {guide.url && (
                <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {t('quick-access-title')}
                  </h4>
                  <Button 
                    asChild 
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    <a href={guide.url} target="_blank" rel="noopener noreferrer">
                      {t('quick-access-btn', { name: guide.name })}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}

              {/* Email for Hard difficulty */}
              {guide.difficulty === "hard" && guide.email && (
                <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                  <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {t('email-support-title')}
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-red-700">{t('email-address-label')}</label>
                      <p className="text-sm bg-gray-100 p-2 rounded font-mono">{guide.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-red-700">{t('email-suggested-label')}</label>
                      <div className="text-sm bg-gray-100 p-3 rounded">
                        <p>{t('email-suggested-subject')}</p>
                        <br />
                        <p>{t('email-suggested-body', { name: guide.name })}</p>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <a href={`mailto:${guide.email}?subject=${encodeURIComponent(t('email-subject'))}&body=${encodeURIComponent(t('email-suggested-body', { name: guide.name }))}`}>
                        <Send className="mr-2 h-4 w-4" />
                        {t('email-send-btn')}
                      </a>
                    </Button>
                  </div>
                </div>
              )}

              {/* General Steps */}
              <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  {t('general-steps-title')}
                </h4>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <span>{t('general-step-1', { name: guide.name })}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <span>{t('general-step-2')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <span>{t('general-step-3')}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">4</span>
                    <span>{t('general-step-4')}</span>
                  </li>
                  {guide.difficulty === "medium" && (
                    <li className="flex items-start gap-2">
                      <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                      <span className="text-orange-700 font-medium">{t('general-step-note-medium')}</span>
                    </li>
                  )}
                  {guide.difficulty === "hard" && (
                    <li className="flex items-start gap-2">
                      <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                      <span className="text-red-700 font-medium">{t('general-step-note-hard')}</span>
                    </li>
                  )}
                  {guide.difficulty === "limited-availability" && (
                    <li className="flex items-start gap-2">
                      <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">!</span>
                      <span className="text-purple-700 font-medium">{t('general-step-note-limited')}</span>
                    </li>
                  )}
                  {guide.difficulty === "impossible" && (
                    <li className="flex items-start gap-2">
                      <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5">⚠</span>
                      <span className="text-zinc-900 font-semibold">
                        {t('alert-impossible-desc')}
                      </span>
                    </li>
                  )}
                </ol>
              </div>
            </CardContent>
          </Card>

          {/* Deletion Cycle */}
          <Card className="bg-slate-50 border-slate-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-600" />
                {t('deletion-timeline-title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-2"></span>
                  <div>
                    <p className="font-medium">{t('timeline-immediate')}</p>
                    <p className="text-sm text-muted-foreground">{t('timeline-immediate-desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-2"></span>
                  <div>
                    <p className="font-medium">{t('timeline-grace')}</p>
                    <p className="text-sm text-muted-foreground">{t('timeline-grace-desc')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-slate-500 rounded-full mt-2"></span>
                  <div>
                    <p className="font-medium">{t('timeline-removal')}</p>
                    <p className="text-sm text-muted-foreground">{t('timeline-removal-desc')}</p>
                  </div>
                </div>
                <div className="bg-slate-100 p-3 rounded-lg">
                  <p className="text-sm text-slate-700">
                    {t('timeline-note')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                {t('important-info-title')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <Download className="h-4 w-4 text-green-600" />
                  {t('before-delete-title')}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-none ml-6">
                  <li className="flex items-center gap-2">
                    <FileText className="h-3 w-3 text-blue-500" />
                    {t('before-download-data')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-orange-500" />
                    {t('before-cancel-subs')}
                  </li>
                  <li className="flex items-center gap-2">
                    <CreditCard className="h-3 w-3 text-red-500" />
                    {t('before-remove-payment')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-purple-500" />
                    {t('before-inform-contacts')}
                  </li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  {t('after-delete-title')}
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-none ml-6">
                  <li className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-blue-500" />
                    {t('after-grace-period')}
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="h-3 w-3 text-green-500" />
                    {t('after-data-retention')}
                  </li>
                  <li>{t('after-reuse-email')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Troubleshooting */}
          <Card className="bg-red-50 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-red-600" />
                {t('troubleshooting-title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">{t('troubleshoot-find-option')}</h4>
                  <p className="text-sm text-muted-foreground">{t('troubleshoot-find-option-desc')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t('troubleshoot-denied')}</h4>
                  <p className="text-sm text-muted-foreground">{t('troubleshoot-denied-desc')}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">{t('troubleshoot-still-accessible')}</h4>
                  <p className="text-sm text-muted-foreground">{t('troubleshoot-still-accessible-desc')}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Need Help */}
          <Card className="bg-blue-50 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-600" />
                {t('need-help-title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">{t('need-help-intro', { name: guide.name })}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{t('need-help-contact-support', { name: guide.name })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{t('need-help-help-center')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span>{t('need-help-community')}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations Section */}
        {sameCategoryGuides.length > 0 && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {t('reco-category-title', { category: guide.category })}
                </CardTitle>
                <CardDescription>
                  {t('reco-category-desc', { category: guide.category })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sameCategoryGuides.map((relatedGuide) => {
                    const relatedUiKey = difficultyUiMap[relatedGuide.difficulty] ?? "medium"
                    const relatedConfig = difficultyConfig[relatedUiKey]
                    const RelatedIcon = relatedConfig.icon
                    return (
                      <Link
                        key={relatedGuide.slug}
                        href={locale === 'en' ? `/${relatedGuide.slug}` : `/${locale}/${relatedGuide.slug}`}
                        className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sm line-clamp-2">{relatedGuide.name}</h3>
                          <Badge className={`ml-2 ${relatedConfig.className} text-xs`}>
                            <RelatedIcon className="mr-1 h-3 w-3" />
                            {getLocalizedDifficulty(relatedGuide.difficulty, lang)}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {relatedGuide.notes}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {sameDifficultyGuides.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  {config.icon && <config.icon className="h-5 w-5" />}
                  {t('reco-difficulty-title', { label: localizedDifficultyLabel })}
                </CardTitle>
                <CardDescription>
                  {t('reco-difficulty-desc')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {sameDifficultyGuides.map((relatedGuide) => {
                    return (
                      <Link
                        key={relatedGuide.slug}
                        href={locale === 'en' ? `/${relatedGuide.slug}` : `/${locale}/${relatedGuide.slug}`}
                        className="block p-4 border rounded-lg hover:shadow-md transition-shadow bg-white hover:bg-gray-50"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium text-sm line-clamp-2">{relatedGuide.name}</h3>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {relatedGuide.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {relatedGuide.notes}
                        </p>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        )}


      </div>
    </>
  )
}
