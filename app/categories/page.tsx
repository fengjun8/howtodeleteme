import { getAllCategories, getGuidesByCategory } from "@/lib/data/guides"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Metadata } from "next"

// 使用SSR按需生成（不配置 revalidate）

export const metadata: Metadata = {
  title: "All Categories | howtodelete.me",
  description:
    "Browse account deletion guides organized by category. Find guides for social media, shopping, streaming, and more.",
}

export default function CategoriesPage() {
  const categories = getAllCategories()
  const categoriesWithCounts = categories.map((category) => ({
    name: category,
    count: getGuidesByCategory(category).length,
    slug: category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, ""),
  }))

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  const jsonLdCollection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Categories",
    url: `${baseUrl}/categories`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: categoriesWithCounts.map((category, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: category.name,
        url: `${baseUrl}/category/${category.slug}`,
      })),
    },
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdCollection) }} />
      <BreadcrumbNav customItems={[{ label: "Categories" }]} />
      <div className="px-4 pb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">All Categories</h1>
            <p className="text-lg text-muted-foreground">
              Browse {categories.length} categories with thousands of account deletion guides
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categoriesWithCounts.map((category) => (
              <Link key={category.name} href={`/category/${category.slug}`}>
                <Card className="transition-all hover:shadow-md hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-xl">{category.name}</CardTitle>
                      <Badge variant="secondary">{category.count}</Badge>
                    </div>
                    <CardDescription>
                      {category.count} guide{category.count !== 1 ? "s" : ""} available
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary font-medium">
                      View guides
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
