"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Home } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useTranslations } from "@/lib/utils/translations"

interface BreadcrumbNavProps {
  customItems?: Array<{
    label: string
    href?: string
  }>
}

export function BreadcrumbNav({ customItems }: BreadcrumbNavProps) {
  const pathname = usePathname()
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
  
  // Don't show breadcrumbs on home page
  if (pathname === "/" || pathname.match(/^\/[a-z]{2}$/)) {
    return null
  }

  const pathSegments = pathname.split("/").filter(Boolean)
  
  // Remove language code from segments if present
  const cleanSegments = pathSegments[0].length === 2 && pathSegments[0].match(/^[a-z]{2}$/) 
    ? pathSegments.slice(1) 
    : pathSegments
  
  // Generate breadcrumb items based on path or use custom items
  const breadcrumbItems = customItems || cleanSegments.map((segment, index) => {
    const href = "/" + cleanSegments.slice(0, index + 1).join("/")
    const label = formatSegmentLabel(segment, t)
    
    return {
      label,
      href: index === cleanSegments.length - 1 ? undefined : href
    }
  })

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={localizedLink("/")} className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                {t('home')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                {item.href ? (
                  <BreadcrumbLink asChild>
                    <Link href={localizedLink(item.href)}>{item.label}</Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

function formatSegmentLabel(segment: string, t: (key: string) => string): string {
  // Handle special cases
  const labelMap: Record<string, string> = {
    "categories": t('categories'),
    "category": t('categories'),
    "search": t('search'),
    "popular": t('popular'),
    "difficulty": t('difficulty'),
    "about": t('about'),
    "contribute": t('contribute'),
    "feedback": t('feedback'),
    "privacy": t('privacy-policy'),
    "terms": t('terms-of-service'),
    "social-media": t('social-media'),
    "e-commerce": t('e-commerce'),
    "gaming": t('gaming'),
    "finance": t('finance'),
    "productivity": t('productivity'),
    "entertainment": t('entertainment'),
    "communication": t('communication'),
    "education": t('education'),
    "health": t('health'),
    "travel": t('travel'),
    "shopping": t('shopping'),
    "news": t('news'),
    "developer": t('developer'),
    "business": t('business'),
    "other": t('other'),
    "easy": t('easy'),
    "medium": t('medium'),
    "hard": t('hard'),
    "limited-availability": t('limited'),
    "impossible": t('impossible')
  }
  
  return labelMap[segment] || decodeURIComponent(segment).replace(/-/g, " ")
}