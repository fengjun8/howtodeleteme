"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Shield, Clock, CheckCircle } from "lucide-react"
import { useTranslations } from "@/lib/utils/translations"

export function AboutPageContent() {
  const t = useTranslations()
  return (
    <div className="max-w-[1280px] mx-auto">
      <BreadcrumbNav customItems={[{ label: t('about') }]} />
      <div className="px-4 pb-8">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{t('about-page-title')}</h1>
            <p className="text-xl text-muted-foreground">{t('about-intro')}</p>
          </div>

          <div className="prose prose-sm max-w-none">
            <h2 className="text-2xl font-bold mt-8 mb-4">{t('our-mission-title')}</h2>
            <p className="text-muted-foreground">{t('our-mission-desc')}</p>

            <h2 className="text-2xl font-bold mt-8 mb-4">{t('why-built-title')}</h2>
            <p className="text-muted-foreground">{t('why-built-desc')}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 mt-8">
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{t('trust-verified-title')}</CardTitle>
                <CardDescription>{t('trust-verified-desc')}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{t('trust-updated-title')}</CardTitle>
                <CardDescription>{t('trust-updated-desc')}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-primary mb-2" />
                <CardTitle>{t('trust-no-tricks-title')}</CardTitle>
                <CardDescription>{t('trust-no-tricks-desc')}</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>{t('how-rate-difficulty-title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-emerald-700">{t('easy')}</h3>
                <p className="text-sm text-muted-foreground">{t('difficulty-easy-desc')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-amber-700">{t('medium')}</h3>
                <p className="text-sm text-muted-foreground">{t('difficulty-medium-desc')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-rose-700">{t('hard')}</h3>
                <p className="text-sm text-muted-foreground">{t('difficulty-hard-desc')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-purple-700">{t('limited')}</h3>
                <p className="text-sm text-muted-foreground">{t('difficulty-limited-desc')}</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-slate-900">{t('impossible')}</h3>
                <p className="text-sm text-muted-foreground">{t('difficulty-impossible-desc')}</p>
              </div>
            </CardContent>
          </Card>

          <div className="prose prose-sm max-w-none mt-8">
            <h2 className="text-2xl font-bold mb-4">{t('data-sources-title')}</h2>
            <p className="text-muted-foreground">{t('data-sources-desc')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}