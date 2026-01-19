'use client'

import Link from "next/link"
import { useTranslations } from "@/lib/utils/translations"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedDifficulty, type SupportedLanguage } from "@/lib/utils/i18n"
import type { ProcessedGuide } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Mail,
  Calendar,
  Info,
  HelpCircle,
  Trash2,
  Send,
  Download,
  CreditCard,
  Users,
  FileText,
  Anchor,
} from "lucide-react"

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
    icon: Trash2,
    className: "bg-black text-white border-black",
    description: "difficulty-impossible-desc",
  },
}

const difficultyUiMap: Record<string, keyof typeof difficultyConfig> = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
  "limited-availability": "limited",
  impossible: "impossible",
}

interface GuideLongContentProps {
  guide: ProcessedGuide
  sameCategoryGuides: ProcessedGuide[]
  sameDifficultyGuides: ProcessedGuide[]
}

export function GuideLongContent({
  guide,
  sameCategoryGuides,
  sameDifficultyGuides,
}: GuideLongContentProps) {
  const t = useTranslations()
  const { currentLanguage } = useLanguage()
  const lang = (currentLanguage || "en") as SupportedLanguage
  const uiKey = difficultyUiMap[guide.difficulty] ?? "medium"
  const config = difficultyConfig[uiKey]
  const localizedDifficultyLabel = getLocalizedDifficulty(guide.difficulty, lang)
  const difficultyDesc =
    uiKey === "easy"
      ? t("difficulty-easy-desc")
      : uiKey === "medium"
      ? t("difficulty-medium-desc")
      : uiKey === "hard"
      ? t("difficulty-hard-desc")
      : uiKey === "limited"
      ? t("difficulty-limited-desc")
      : t("difficulty-impossible-desc")

  return (
    <>
      <div className="grid gap-6">
        <Card className="overflow-hidden min-w-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 break-words">
              <ExternalLink className="h-5 w-5 flex-shrink-0" />
              <span className="min-w-0 flex-1">{t("official-links-title")}</span>
            </CardTitle>
            <CardDescription className="break-words">{t("official-links-desc", { name: guide.name })}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {guide.url && (
              <div>
                <p className="text-sm font-medium mb-2 break-words">{t("official-links-primary")}</p>
                <Button asChild className="w-full justify-between bg-black hover:bg-gray-800 text-white h-auto py-2">
                  <a href={guide.url} target="_blank" rel="noopener noreferrer" className="flex items-center w-full">
                    <span className="truncate flex-1 min-w-0 text-left">{guide.url}</span>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                  </a>
                </Button>
              </div>
            )}

            {guide.email && (
              <div>
                <p className="text-sm font-medium mb-2 break-words">{t("official-links-email")}</p>
                <Button asChild variant="outline" className="w-full justify-between bg-transparent h-auto py-2">
                  <a href={`mailto:${guide.email}`} className="flex items-center w-full">
                    <span className="truncate flex-1 min-w-0 text-left">{guide.email}</span>
                    <ExternalLink className="ml-2 h-4 w-4 flex-shrink-0" />
                  </a>
                </Button>
              </div>
            )}

            {guide.domains && guide.domains.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">{t("official-links-domains")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {guide.domains.slice(0, 6).map((domain, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm text-muted-foreground bg-gray-50 p-2 rounded-md min-w-0"
                    >
                      <Anchor className="h-3 w-3 text-blue-500 flex-shrink-0" />
                      <span className="truncate min-w-0 flex-1">{domain}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card id="deletion-process" className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 shadow-lg overflow-hidden min-w-0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl flex items-center gap-3 break-words">
              <Trash2 className="h-6 w-6 text-red-600 flex-shrink-0" />
              <span className="min-w-0">{t("deletion-process-title")}</span>
            </CardTitle>
            <CardDescription className="text-base break-words">
              {t("deletion-process-expected")} <span className="font-semibold">{difficultyDesc}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {guide.notes && (
              <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  {t("deletion-notes-title")}
                </h4>
                <p className="text-sm text-red-700 break-words">{guide.notes}</p>
              </div>
            )}

            {guide.url && (
              <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  {t("quick-access-title")}
                </h4>
                <Button asChild className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <a href={guide.url} target="_blank" rel="noopener noreferrer">
                    {t("quick-access-btn", { name: guide.name })}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}

            {guide.difficulty === "hard" && guide.email && (
              <div className="bg-white/70 p-4 rounded-lg border border-red-100">
                <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  {t("email-support-title")}
                </h4>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-red-700">{t("email-address-label")}</label>
                    <p className="text-sm bg-gray-100 p-2 rounded font-mono break-all">{guide.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-red-700">{t("email-suggested-label")}</label>
                    <div className="text-sm bg-gray-100 p-3 rounded">
                      <p>{t("email-suggested-subject")}</p>
                      <br />
                      <p>{t("email-suggested-body", { name: guide.name })}</p>
                    </div>
                  </div>
                  <Button
                    asChild
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <a
                      href={`mailto:${guide.email}?subject=${encodeURIComponent(
                        t("email-subject"),
                      )}&body=${encodeURIComponent(t("email-suggested-body", { name: guide.name }))}`}
                    >
                      <Send className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate min-w-0">{t("email-send-btn")}</span>
                    </a>
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-white/70 p-4 rounded-lg border border-red-100">
              <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 flex-shrink-0" />
                {t("general-steps-title")}
              </h4>
              <ol className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span className="break-words">{t("general-step-1", { name: guide.name })}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span className="break-words">{t("general-step-2")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span className="break-words">{t("general-step-3")}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    4
                  </span>
                  <span className="break-words">{t("general-step-4")}</span>
                </li>
                {guide.difficulty === "medium" && (
                  <li className="flex items-start gap-2">
                    <span className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      !
                    </span>
                    <span className="text-orange-700 font-medium break-words">{t("general-step-note-medium")}</span>
                  </li>
                )}
                {guide.difficulty === "hard" && (
                  <li className="flex items-start gap-2">
                    <span className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      !
                    </span>
                    <span className="text-red-700 font-medium break-words">{t("general-step-note-hard")}</span>
                  </li>
                )}
                {guide.difficulty === "limited-availability" && (
                  <li className="flex items-start gap-2">
                    <span className="bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      !
                    </span>
                    <span className="text-purple-700 font-medium break-words">{t("general-step-note-limited")}</span>
                  </li>
                )}
                {guide.difficulty === "impossible" && (
                  <li className="flex items-start gap-2">
                    <span className="bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                      ⚠
                    </span>
                    <span className="text-zinc-900 font-semibold break-words">{t("alert-impossible-desc")}</span>
                  </li>
                )}
              </ol>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-50 border-slate-200 overflow-hidden min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 break-words">
              <Calendar className="h-5 w-5 text-slate-600 flex-shrink-0" />
              <span className="min-w-0 flex-1">{t("deletion-timeline-title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                <div className="min-w-0">
                  <p className="font-medium break-words">{t("timeline-immediate")}</p>
                  <p className="text-sm text-muted-foreground break-words">{t("timeline-immediate-desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                <div className="min-w-0">
                  <p className="font-medium break-words">{t("timeline-grace")}</p>
                  <p className="text-sm text-muted-foreground break-words">{t("timeline-grace-desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-slate-500 rounded-full mt-2 flex-shrink-0"></span>
                <div className="min-w-0">
                  <p className="font-medium break-words">{t("timeline-removal")}</p>
                  <p className="text-sm text-muted-foreground break-words">{t("timeline-removal-desc")}</p>
                </div>
              </div>
              <div className="bg-slate-100 p-3 rounded-lg">
                <p className="text-sm text-slate-700 break-words">{t("timeline-note")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden min-w-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 break-words">
              <Info className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span>{t("important-info-title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 break-words">
                <Download className="h-4 w-4 text-green-600 flex-shrink-0" />
                <span>{t("before-delete-title")}</span>
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-none ml-6">
                <li className="flex items-center gap-2">
                  <FileText className="h-3 w-3 text-blue-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("before-download-data")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3 text-orange-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("before-cancel-subs")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CreditCard className="h-3 w-3 text-red-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("before-remove-payment")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Users className="h-3 w-3 text-purple-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("before-inform-contacts")}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-sm flex items-center gap-2 break-words">
                <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0" />
                <span>{t("after-delete-title")}</span>
              </h3>
              <ul className="text-sm text-muted-foreground space-y-1 list-none ml-6">
                <li className="flex items-center gap-2">
                  <Clock className="h-3 w-3 text-blue-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("after-grace-period")}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-500 flex-shrink-0" />
                  <span className="break-words min-w-0">{t("after-data-retention")}</span>
                </li>
                <li className="break-words">{t("after-reuse-email")}</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200 overflow-hidden min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 break-words">
              <HelpCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <span className="min-w-0 flex-1">{t("troubleshooting-title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2 break-words">{t("troubleshoot-find-option")}</h4>
                <p className="text-sm text-muted-foreground break-words">{t("troubleshoot-find-option-desc")}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2 break-words">{t("troubleshoot-denied")}</h4>
                <p className="text-sm text-muted-foreground break-words">{t("troubleshoot-denied-desc")}</p>
              </div>
              <div>
                <h4 className="font-medium mb-2 break-words">{t("troubleshoot-still-accessible")}</h4>
                <p className="text-sm text-muted-foreground break-words">{t("troubleshoot-still-accessible-desc")}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200 overflow-hidden min-w-0">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2 break-words">
              <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="min-w-0 flex-1">{t("need-help-title")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground break-words">{t("need-help-intro", { name: guide.name })}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className="break-words min-w-0 flex-1">{t("need-help-contact-support", { name: guide.name })}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className="break-words min-w-0 flex-1">{t("need-help-help-center")}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                  <span className="break-words min-w-0 flex-1">{t("need-help-community")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {sameCategoryGuides.length > 0 && (
        <div className="mt-12">
          <Card className="overflow-hidden min-w-0">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2 break-words">
                <FileText className="h-5 w-5 flex-shrink-0" />
                <span className="min-w-0 flex-1">{t("reco-category-title", { category: guide.category })}</span>
              </CardTitle>
              <CardDescription className="break-words">{t("reco-category-desc", { category: guide.category })}</CardDescription>
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
                      href={
                        lang === "en" ? `/${relatedGuide.slug}` : `/${lang}/${relatedGuide.slug}`
                      }
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
                {t("reco-difficulty-title", { label: localizedDifficultyLabel })}
              </CardTitle>
              <CardDescription>{t("reco-difficulty-desc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sameDifficultyGuides.map((relatedGuide) => {
                  return (
                    <Link
                      key={relatedGuide.slug}
                      href={lang === "en" ? `/${relatedGuide.slug}` : `/${lang}/${relatedGuide.slug}`}
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
    </>
  )
}
