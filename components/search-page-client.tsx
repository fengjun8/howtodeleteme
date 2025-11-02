"use client"

import { searchGuides } from "@/lib/data/guides"
import { GuideCard } from "@/components/guide-card"
import { SearchBar } from "@/components/search-bar"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { Search } from 'lucide-react'
import Link from "next/link"
import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useLanguage } from "@/contexts/language-context"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useTranslations } from "@/lib/utils/translations"

const ITEMS_PER_PAGE = 40

export function SearchPageClient() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ""
  const [currentPage, setCurrentPage] = useState(1)
  const { currentLanguage } = useLanguage()
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
  
  // Reset to page 1 when query changes
  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  const results = useMemo(() => {
    return query ? searchGuides(query, currentLanguage) : []
  }, [query, currentLanguage])

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE)
  
  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return results.slice(startIndex, endIndex)
  }, [results, currentPage])

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

  const getResultsRangeText = () => {
    if (results.length === 0) return ""
    const start = (currentPage - 1) * ITEMS_PER_PAGE + 1
    const end = Math.min(currentPage * ITEMS_PER_PAGE, results.length)
    return t('search-range')
      .replace('{start}', String(start))
      .replace('{end}', String(end))
      .replace('{total}', String(results.length))
  }

  const popularSearchTerms = [
    "Facebook", "Google", "Twitter", "Instagram", "LinkedIn", 
    "TikTok", "Snapchat", "WhatsApp", "Telegram", "Discord"
  ]

  return (
    <>
      <BreadcrumbNav />
      <div className="max-w-[1280px] mx-auto px-4 py-8">
      <div className="w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">{t('search-page-title')}</h1>
          <p className="text-lg text-muted-foreground mb-6">
            {t('search-page-subtitle')}
          </p>
          <SearchBar />
        </div>

        {!query ? (
          <div className="space-y-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">{t('search-start-title')}</h2>
              <p className="text-muted-foreground mb-6">
                {t('search-start-desc')}
              </p>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h3 className="font-semibold mb-3">{t('search-tips-title')}</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>{t('search-tip-1')}</li>
                <li>{t('search-tip-2')}</li>
                <li>{t('search-tip-3')}</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">{t('popular-searches-title')}</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearchTerms.map((term) => (
                  <Link
                    key={term}
                    href={localizedLink(`/search?q=${encodeURIComponent(term)}`)}
                    className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-sm transition-colors"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {t('search-results-for').replace('{query}', query)}
              </p>
              {totalPages > 1 && (
                <p className="text-sm text-muted-foreground">
                  {getResultsRangeText()}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedResults.map((guide) => (
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
          </div>
        ) : (
          <Alert>
            <Search className="h-4 w-4" />
            <AlertDescription>
              {t('search-no-results')
                .replace('{query}', query)
                .replace('{browseLink}',
                  `<a href="${localizedLink('/categories')}" class="underline">${t('browse-all-categories')}</a>`
                )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
    </>
  )
}