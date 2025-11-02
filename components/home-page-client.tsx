"use client"

import { useState, useEffect } from "react"
import { SearchBar } from "@/components/search-bar"
import { GuideCard } from "@/components/guide-card"
import { Button } from "@/components/ui/button"
import { processGuides, getPopularGuides, getAllCategories } from "@/lib/data/guides"
import { ProcessedGuide } from "@/lib/types"
import { useLanguage } from "@/contexts/language-context"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import Link from "next/link"
import { ArrowRight, Shield, CheckCircle, Clock } from "lucide-react"
import { useTranslations } from "@/lib/utils/translations"

interface HomePageClientProps {
  initialPopularGuides: ProcessedGuide[]
  initialAllGuides: ProcessedGuide[]
  categories: string[]
}

export function HomePageClient({ 
  initialPopularGuides, 
  initialAllGuides, 
  categories 
}: HomePageClientProps) {
  const { currentLanguage } = useLanguage()
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
  const [popularGuides, setPopularGuides] = useState<ProcessedGuide[]>(initialPopularGuides)
  const [allGuides, setAllGuides] = useState<ProcessedGuide[]>(initialAllGuides)

  // 当语言改变时重新获取数据
  useEffect(() => {
    const localizedPopularGuides = getPopularGuides(20, currentLanguage)
    const localizedAllGuides = processGuides(currentLanguage)
    setPopularGuides(localizedPopularGuides)
    setAllGuides(localizedAllGuides)
  }, [currentLanguage])

  // Sort categories to put "Other" at the end
  const sortedCategories = categories.sort((a, b) => {
    if (a === "Other") return 1
    if (b === "Other") return -1
    return 0
  })

  // Get guides from each category with different limits
  const categorizedGuides = sortedCategories.reduce(
    (acc, category) => {
      const limit = 8 // All categories show 8 cards (popular is handled separately)
      const guides = allGuides.filter((g) => g.category === category).slice(0, limit)
      if (guides.length > 0) {
        acc[category] = guides
      }
      return acc
    },
    {} as Record<string, ProcessedGuide[]>,
  )

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
                <SearchBar />
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="flex flex-col items-center gap-2 text-center">
                <Shield className="h-8 w-8 text-blue-400" />
                <h3 className="font-semibold text-white">{t('trust-verified-title')}</h3>
                <p className="text-sm text-blue-200">{t('trust-verified-desc')}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <Clock className="h-8 w-8 text-blue-400" />
                <h3 className="font-semibold text-white">{t('trust-updated-title')}</h3>
                <p className="text-sm text-blue-200">{t('trust-updated-desc')}</p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <CheckCircle className="h-8 w-8 text-blue-400" />
                <h3 className="font-semibold text-white">{t('trust-no-tricks-title')}</h3>
                <p className="text-sm text-blue-200">{t('trust-no-tricks-desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-[1280px] px-4">
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

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popularGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          </div>
        </section>

        {/* Categories Sections */}
        {Object.entries(categorizedGuides).map(([category, guides]) => (
          <section key={category} className="py-12 border-t">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">{category}</h2>
                  <p className="text-muted-foreground text-sm mt-1">
                    {t('category-delete-from').replace('{category}', t(category.toLowerCase() as any) || category.toLowerCase())}
                  </p>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={localizedLink(`/category/${category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`)}>
                    {t('view-all')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {guides.map((guide) => (
                  <GuideCard key={guide.id} guide={guide} />
                ))}
              </div>
            </div>
          </section>
        ))}
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
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}