import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllCategories, getGuidesByCategory } from "@/lib/data/guides"
import { CategoryPageClient } from "@/components/category-page-client"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"
import { getTranslations } from "@/lib/utils/translations"

export const dynamic = 'force-dynamic'

interface PageProps {
  params: Promise<{ category: string; locale: string }>
}

// 取消静态枚举，改为按需SSR渲染，避免构建期大量页面生成

import { getLanguageAlternates } from "@/lib/utils/seo"

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)
  
  // 反向转换slug到分类名称
  const categories = getAllCategories()
  const normalizeSlug = (s: string) => s.replace(/-{2,}/g, "--")
  const categoryName = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === normalizeSlug(category)
  ) || category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  const slugKey = normalizeSlug(category)
  const localizedCategoryName = t(slugKey as any) || categoryName
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const canonicalUrl = lang === 'en' ? `${baseUrl}/category/${category}` : `${baseUrl}/${locale}/category/${category}`
  
  return {
    title: `${localizedCategoryName} ${t('account-deletion-guides')} | howtodelete.me`,
    description: `${t('category')}: ${localizedCategoryName} — ${t('site-description')}`,
    keywords: `${t('site-keywords')}, ${localizedCategoryName}`,
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(`category/${category}`),
    },
    openGraph: {
      title: `${localizedCategoryName} ${t('account-deletion-guides')} | howtodelete.me`,
      description: `${t('category')}: ${localizedCategoryName} — ${t('site-description')}`,
      url: canonicalUrl,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${localizedCategoryName} ${t('account-deletion-guides')} | howtodelete.me`,
      description: `${t('category')}: ${localizedCategoryName} — ${t('site-description')}`,
    },
  }
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  
  // 反向转换slug到分类名称
  const categories = getAllCategories()
  const normalizeSlug = (s: string) => s.replace(/-{2,}/g, "--")
  const categoryName = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === normalizeSlug(category)
  ) || category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  
  // 注意：这里使用默认语言，因为服务器端组件无法直接访问客户端状态
  // 实际的语言处理将在客户端组件中进行
  const guides = getGuidesByCategory(categoryName, 'en')
  
  if (guides.length === 0) {
    notFound()
  }

  return <CategoryPageClient guides={guides} categoryName={categoryName} />
}
