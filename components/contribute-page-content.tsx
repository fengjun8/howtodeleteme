"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { SubmitGuideDialog } from "@/components/submit-guide-dialog"
import { UpdateGuideDialog } from "@/components/update-guide-dialog"
import { GitBranch, FileText, Users } from "lucide-react"
import { useTranslations } from "@/lib/utils/translations"

export function ContributePageContent() {
  const t = useTranslations()
  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{t('contribute')}</h1>
            <p className="text-lg text-muted-foreground">
              {t('contribute-subtitle')}
            </p>
          </div>

          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground">
              {t('contribute-intro')}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <FileText className="h-8 w-8 text-primary" />
                  <CardTitle>{t('submit-new-guide')}</CardTitle>
                </div>
                <CardDescription>{t('submit-guide-desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('submit-guide-desc')}
                </p>
                <SubmitGuideDialog />
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>{t('update-existing-guide')}</CardTitle>
                </div>
                <CardDescription>{t('update-guide-desc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {t('update-guide-desc')}
                </p>
                <UpdateGuideDialog />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <GitBranch className="h-8 w-8 text-primary" />
                  <CardTitle>{t('improve-code-title')}</CardTitle>
                </div>
                <CardDescription>{t('technical-contributions')}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {t('developers-contribute-desc')}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>{t('contribution-guidelines')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">{t('what-we-accept-title')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>{t('accept-official-links')}</li>
                  <li>{t('accept-verified-steps')}</li>
                  <li>{t('accept-updates')}</li>
                  <li>{t('accept-difficulty-ratings')}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">{t('quality-standards-title')}</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>{t('standard-official-sources')}</li>
                  <li>{t('standard-clear-accurate')}</li>
                  <li>{t('standard-include-warnings')}</li>
                  <li>{t('standard-test-process')}</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}