"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search-bar"
import { GuideCard } from "@/components/guide-card"
import { Button } from "@/components/ui/button"
import { ProcessedGuide } from "@/lib/types"
import { useLanguage } from "@/contexts/language-context"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import Link from "next/link"
import { ArrowRight, Shield, CheckCircle, Clock, AlertTriangle, Ban } from "lucide-react"
import { useTranslations } from "@/lib/utils/translations"
import type { SupportedLanguage } from "@/lib/utils/i18n"
import { NativeBannerAd } from "@/components/ads"

interface HomePageClientProps {
  initialPopularGuides: ProcessedGuide[]
  categories: string[]
  initialCategorizedGuides: Record<string, ProcessedGuide[]>
  initialLanguage: SupportedLanguage
  difficultyCounts: Record<string, number>
  categoryCounts: Record<string, number>
}

export function HomePageClient({ 
  initialPopularGuides, 
  categories,
  initialCategorizedGuides,
  difficultyCounts,
  categoryCounts,
}: HomePageClientProps) {
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
  const [popularGuides] = useState<ProcessedGuide[]>(initialPopularGuides)
  const [categorizedGuides] = useState<Record<string, ProcessedGuide[]>>(initialCategorizedGuides)

  // 分类名称转翻译键（保持与其他页面一致）
  const getCategoryTranslationKey = (category: string): string => {
    return category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  }

  // Sort categories to put "Other" at the end
  const sortedCategories = categories.slice().sort((a, b) => {
    if (a === "Other") return 1
    if (b === "Other") return -1
    return 0
  })

  return (
    <div className="flex flex-col">
      <section className="relative w-full border-b">
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-slate-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-20">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-balance text-white">
                {t('home-hero-title')}
              </h1>
              <p className="text-lg text-blue-100 text-balance">
                {t('home-hero-subtitle')}
              </p>
              <div className="flex justify-center pt-4">
                <SearchBar variant="dark" />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="h-8 w-8 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">{t('trust-verified-title')}</h2>
                <p className="text-sm text-blue-200">{t('trust-verified-desc')}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Clock className="h-8 w-8 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">{t('trust-updated-title')}</h2>
                <p className="text-sm text-blue-200">{t('trust-updated-desc')}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <CheckCircle className="h-8 w-8 text-blue-400" />
                <h2 className="text-lg font-semibold text-white">{t('trust-no-tricks-title')}</h2>
                <p className="text-sm text-blue-200">{t('trust-no-tricks-desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-4">
        {/* Native Banner Ad */}
        <NativeBannerAd />

        {/* Popular Guides Section */}
        <section className="py-12">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{t('popular-guides')}</h2>
                <p className="text-muted-foreground mt-1">{t('popular-subtitle')}</p>
              </div>
              <Button variant="outline" asChild>
                <Link href={localizedLink("/popular")}>
                  {t('view-all')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 border-t">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold tracking-tight">{t("browse-categories")}</h2>
                <p className="text-muted-foreground mt-1">{t("browse-categories-desc")}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {sortedCategories.map((category) => {
                const count = categoryCounts[category] ?? 0
                const catSlug = category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
                return (
                  <Link
                    key={category}
                    href={localizedLink(`/category/${catSlug}`)}
                    className="group flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:shadow-md hover:bg-accent transition-all text-center min-h-[100px]"
                  >
                    <span className="text-lg font-medium leading-tight group-hover:text-accent-foreground">{t(getCategoryTranslationKey(category) as any) || category}</span>
                    <span className="text-sm text-muted-foreground group-hover:text-accent-foreground mt-1">{count} {t("guides")}</span>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Difficulty Grid */}
        <section className="py-12 border-t">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">{t("browse-difficulty")}</h2>
              <p className="text-muted-foreground mt-1">{t("browse-difficulty-desc")}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
              {[
                { slug: "easy", labelKey: "easy", icon: CheckCircle },
                { slug: "medium", labelKey: "medium", icon: Clock },
                { slug: "hard", labelKey: "hard", icon: AlertTriangle },
                { slug: "limited-availability", labelKey: "limited", icon: Shield },
                { slug: "impossible", labelKey: "impossible", icon: Ban },
              ].map((diff) => (
                <Link
                  key={diff.slug}
                  href={localizedLink(`/difficulty/${diff.slug}`)}
                  className="group flex flex-col items-center justify-center p-4 rounded-lg border bg-card hover:shadow-md hover:bg-accent transition-all text-center min-h-[120px]"
                >
                  <diff.icon className="h-6 w-6 mb-2 text-muted-foreground group-hover:text-accent-foreground" />
                  <span className="text-sm font-medium group-hover:text-accent-foreground">{t(diff.labelKey as any)}</span>
                  <span className="text-xs text-muted-foreground group-hover:text-accent-foreground mt-1">{difficultyCounts[diff.slug] ?? 0} {t("guides")}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="relative w-full border-t">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950">
          <div className="mx-auto max-w-[1280px] px-4 py-12 md:py-16">
            <div className="mx-auto max-w-2xl text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-white">{t('home-cta-title')}</h2>
              <p className="text-blue-100">
                {t('home-cta-desc')}
              </p>
              <div className="flex justify-center pt-4">
                <SearchBar variant="dark" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
