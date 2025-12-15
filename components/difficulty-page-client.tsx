"use client"

import { useState, useMemo, useEffect } from "react"
import { GuideCard } from "@/components/guide-card"
import { Badge } from "@/components/ui/badge"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination"
import { ProcessedGuide } from "@/lib/types"
import { CheckCircle, Clock, AlertTriangle, Shield, Ban } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { getGuidesByDifficulty } from "@/lib/data/guides"
import { useTranslations } from "@/lib/utils/translations"

interface DifficultyPageClientProps {
  guides: ProcessedGuide[]
  difficulty: string
}

const ITEMS_PER_PAGE = 40

const difficultyConfig = {
  easy: {
    label: "easy",
    icon: CheckCircle,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
    description: "difficulty-easy-desc",
  },
  medium: {
    label: "medium",
    icon: Clock,
    className: "bg-orange-50 text-orange-700 border-orange-200",
    description: "difficulty-medium-desc",
  },
  hard: {
    label: "hard",
    icon: AlertTriangle,
    className: "bg-red-50 text-red-700 border-red-200",
    description: "difficulty-hard-desc",
  },
  "limited-availability": {
    label: "limited",
    icon: Shield,
    className: "bg-[#B521CC]/10 text-[#B521CC] border-[#B521CC]/30",
    description: "difficulty-limited-desc",
  },
  impossible: {
    label: "impossible",
    icon: Ban,
    className: "bg-zinc-100 text-zinc-900 border-zinc-300",
    description: "difficulty-impossible-desc",
  },
}

export function DifficultyPageClient({ guides: initialGuides, difficulty }: DifficultyPageClientProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const { currentLanguage } = useLanguage()
  const [guides, setGuides] = useState<ProcessedGuide[]>(initialGuides)
  const t = useTranslations()

  // 当语言改变时重新获取数据
  useEffect(() => {
    const localizedGuides = getGuidesByDifficulty(difficulty, currentLanguage)
    setGuides(localizedGuides)
  }, [currentLanguage, difficulty])
  
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]
  const DifficultyIcon = config?.icon || CheckCircle
  
  const totalPages = Math.ceil(guides.length / ITEMS_PER_PAGE)
  
  const paginatedGuides = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return guides.slice(startIndex, endIndex)
  }, [guides, currentPage])

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }
    } else {
      items.push(
        <PaginationItem key={1}>
          <PaginationLink
            onClick={() => setCurrentPage(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      )

      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => setCurrentPage(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return items
  }

  if (!config) {
    return <div>{t('difficulty-config-not-found')}</div>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <DifficultyIcon className="h-10 w-10" />
          <h1 className="text-4xl font-bold tracking-tight">{t(config.label as any)} {t('deletion')}</h1>
          <Badge variant="secondary" className="text-base">
            {guides.length} {t('guides')}
          </Badge>
        </div>
        <p className="text-lg text-muted-foreground max-w-3xl">{t(config.description as any)}</p>
      </div>

      {paginatedGuides.length > 0 ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className={`cursor-pointer ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                  
                  {renderPaginationItems()}
                  
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      className={`cursor-pointer ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{t('no-guides-in-difficulty')}</p>
        </div>
      )}
    </div>
  )
}
