"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MessageSquare, Mail } from "lucide-react"
import { FeedbackDialog } from "@/components/feedback-dialog"
import { SuggestionDialog } from "@/components/suggestion-dialog"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { useTranslations } from "@/lib/utils/translations"

export function FeedbackPageContent() {
  const t = useTranslations()
  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{t('feedback-page-title')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('feedback-page-subtitle')}
            </p>
          </div>

          <Alert>
            <MessageSquare className="h-4 w-4" />
            <AlertDescription>
              {t('feedback-alert-desc')}
            </AlertDescription>
          </Alert>

          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  <CardTitle>{t('report-error-card-title')}</CardTitle>
                </div>
                <CardDescription>{t('report-error-card-desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('report-error-card-help')}
                </p>
                <FeedbackDialog 
                  guideTitle={t('general-feedback')} 
                  guideUrl={typeof window !== 'undefined' ? window.location.origin : 'https://howtodelete.me'} 
                />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-8 w-8 text-primary" />
                  <CardTitle>{t('suggest-feature-card-title')}</CardTitle>
                </div>
                <CardDescription>{t('suggest-feature-card-desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('suggest-feature-card-help')}
                </p>
                <SuggestionDialog />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('what-we-need')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                <li>{t('feedback-need-service-name')}</li>
                <li>{t('feedback-need-incorrect')}</li>
                <li>{t('feedback-need-current')}</li>
                <li>{t('feedback-need-screenshots')}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}