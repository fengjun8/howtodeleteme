import { Metadata } from "next"
import { SearchPageClient } from "@/components/search-page-client"
import { getTranslations } from "@/lib/utils/translations"

const t = getTranslations('en')

export const metadata: Metadata = {
  title: `${t('search')} | howtodelete.me`,
  description: t('search-page-subtitle'),
  alternates: {
    canonical: "/search",
  },
}

export default function SearchPage() {
  return <SearchPageClient />
}
