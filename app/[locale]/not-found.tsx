"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/search-bar"
import { AlertCircle } from 'lucide-react'
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useTranslations } from "@/lib/utils/translations"

export default function NotFound() {
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()

  return (
    <div className="py-16 max-w-[1280px] mx-auto px-4">
      <div className="mx-auto max-w-2xl text-center space-y-6">
        <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground" />
        <h1 className="text-4xl font-bold tracking-tight">{t('not-found-title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t('not-found-desc')}
        </p>
        <div className="pt-4">
          <SearchBar />
        </div>
        <div className="flex gap-4 justify-center pt-4">
          <Button asChild className="bg-black hover:bg-black/90 text-white">
            <Link href={localizedLink("/")}>{t('go-home')}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={localizedLink("/popular")}>{t('view-popular-guides')}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}