import { getAllCategories, getGuidesByCategory } from "@/lib/data/guides"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"
import { getTranslations } from "@/lib/utils/translations"
import type { SupportedLanguage } from "@/lib/utils/i18n"

// 按语言本地化页面标题与描述
export async function generateMetadata({ params }: { params: Promise<{ locale: SupportedLanguage }> }): Promise<Metadata> {
  const { locale } = await params
  const t = getTranslations(locale)
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = locale === 'en' ? `${baseUrl}/categories` : `${baseUrl}/${locale}/categories`
  
  return {
    title: t("category-title"),
    description: t("category-description"),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: t("category-title"),
      description: t("category-description"),
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: t("category-title"),
      description: t("category-description"),
    },
  }
}

interface PageProps {
  params: Promise<{ locale: SupportedLanguage }>
}

export default async function CategoriesPage({ params }: PageProps) {
  const { locale } = await params
  const t = getTranslations(locale)
  const categories = getAllCategories()
  const categoriesWithCounts = categories.map((category) => ({
    name: category,
    count: getGuidesByCategory(category).length,
    // 统一规则：空格转"-"，去掉"&"，避免生成不一致的多连字符
    slug: category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, ""),
  }))

  // 分类名称转翻译键（与导航保持一致）
  const getCategoryTranslationKey = (category: string): string => {
    return category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      <BreadcrumbNav customItems={[{ label: t("categories") }]} />
      <div className="px-4 pb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">{t("all-categories")}</h1>
            <p className="text-lg text-muted-foreground">{t("category-description")}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithCounts.map((category) => (
              <Link key={category.name} href={`/${locale}/category/${category.slug}`}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">{t(getCategoryTranslationKey(category.name) as any) || category.name}</CardTitle>
                      <Badge variant="secondary">{t("guides-count", { count: category.count })}</Badge>
                    </div>
                    <CardDescription>
                      {t("deletion")}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium">
                      {t("view-all")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
