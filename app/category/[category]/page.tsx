import { Metadata } from "next"
import { notFound } from "next/navigation"
import { getAllCategories, getGuidesByCategory } from "@/lib/data/guides"
import { CategoryPageClient } from "@/components/category-page-client"

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const categories = getAllCategories()
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, ""),
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params
  
  // 反向转换slug到分类名称
  const categories = getAllCategories()
  const normalizeSlug = (s: string) => s.replace(/-{2,}/g, "--")
  const categoryName = categories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "") === normalizeSlug(category)
  ) || category.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  
  return {
    title: `${categoryName} - Account Deletion Guides`,
    description: `View all account deletion guides in the ${categoryName} category`,
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
