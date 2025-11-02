import Link from "next/link"
import type { ProcessedGuide } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, ExternalLink } from "lucide-react"
import { memo } from "react"
import { useLanguage } from "@/contexts/language-context"
import { getLocalizedDifficulty } from "@/lib/utils/i18n"
import { useLocalizedLinks } from "@/hooks/use-localized-links"

interface GuideCardProps {
  guide: ProcessedGuide
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    badgeClassName: "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700",
    cardClassName: "bg-emerald-50 hover:bg-emerald-100 border-emerald-200",
  },
  medium: {
    label: "Medium",
    badgeClassName: "bg-orange-600 text-white border-orange-600 hover:bg-orange-700",
    cardClassName: "bg-orange-50 hover:bg-orange-100 border-orange-200",
  },
  hard: {
    label: "Hard",
    badgeClassName: "bg-red-600 text-white border-red-600 hover:bg-red-700",
    cardClassName: "bg-red-50 hover:bg-red-100 border-red-200",
  },
  limited: {
    label: "Limited",
    badgeClassName: "bg-[#B521CC] text-white border-[#B521CC] hover:bg-[#9c1daa]",
    cardClassName: "bg-[#B521CC]/10 hover:bg-[#B521CC]/15 border-[#B521CC]/30",
  },
  impossible: {
    label: "Impossible",
    badgeClassName: "bg-black text-white border-black hover:bg-zinc-800",
    cardClassName: "bg-zinc-100 hover:bg-zinc-200 border-zinc-300",
  },
}

export const GuideCard = memo(function GuideCard({ guide }: GuideCardProps) {
  const { currentLanguage } = useLanguage()
  const { localizedLink } = useLocalizedLinks()
  
  // Get localized difficulty label
  const localizedDifficultyLabel = getLocalizedDifficulty(guide.difficulty, currentLanguage)
  
  // Map difficulty to config key
  const difficultyKey = guide.difficulty === 'limited-availability' ? 'limited' : guide.difficulty
  const config = difficultyConfig[difficultyKey as keyof typeof difficultyConfig] || difficultyConfig.medium

  // Use localized notes if available, fallback to original notes
  const displayNotes = guide.localizedNotes || guide.notes

  return (
    <Link href={localizedLink(`/${guide.slug}`)} prefetch={false}>
      <Card className={`h-[220px] flex flex-col transition-all hover:shadow-lg ${config.cardClassName}`}>
        <CardHeader className="pb-3 flex-shrink-0">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg font-semibold leading-tight flex items-center gap-2">
              {guide.name}
              {guide.popular && <Star className="h-4 w-4 fill-amber-400 text-amber-400" />}
            </CardTitle>
            <Badge className={`text-xs font-medium flex-shrink-0 ${config.badgeClassName}`}>
              {localizedDifficultyLabel}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-between pt-0">
          <div className="space-y-3">
            <CardDescription className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {displayNotes}
            </CardDescription>

            <div className="flex flex-wrap gap-1">
              {guide.domains.slice(0, 2).map((domain) => (
                <span
                  key={domain}
                  className="inline-flex items-center gap-1 px-2 py-1 text-muted-foreground rounded text-xs border border-border"
                >
                  <ExternalLink className="h-3 w-3" />
                  {domain}
                </span>
              ))}
              {guide.domains.length > 2 && (
                <span className="inline-flex items-center px-2 py-1 text-muted-foreground rounded text-xs border border-border">
                  +{guide.domains.length - 2} more
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
})
