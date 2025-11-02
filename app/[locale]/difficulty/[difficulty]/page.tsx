import { notFound } from "next/navigation"
import { getGuidesByDifficulty } from "@/lib/data/guides"
import { DifficultyPageClient } from "@/components/difficulty-page-client"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import Link from "next/link"
import { Home } from "lucide-react"
import type { Metadata } from "next"

interface PageProps {
  params: Promise<{ difficulty: string }>
}

export async function generateStaticParams() {
  return [
    { difficulty: "easy" },
    { difficulty: "medium" },
    { difficulty: "hard" },
    { difficulty: "limited-availability" },
    { difficulty: "impossible" },
  ]
}

const difficultyConfig = {
  easy: {
    label: "Easy",
    description: "Simple process - Quick and direct deletion that can be completed in just a few clicks.",
  },
  medium: {
    label: "Medium",
    description: "Requires some additional steps - The deletion process needs some extra verification methods.",
  },
  hard: {
    label: "Hard",
    description: "Cannot be fully deleted, need to contact customer service - Complex process requiring support team contact.",
  },
  "limited-availability": {
    label: "Limited Availability",
    description: "Account deletion is only available in regions with privacy rights (GDPR, CCPA, etc.).",
  },
  impossible: {
    label: "Impossible",
    description: "Cannot be deleted - These accounts cannot be permanently removed from the platform.",
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { difficulty } = await params
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]

  if (!config) {
    return { title: "Difficulty Not Found" }
  }

  return {
    title: `${config.label} Account Deletions | howtodelete.me`,
    description: `${config.description} Browse all ${difficulty} difficulty account deletion guides.`,
  }
}

export default async function DifficultyPage({ params }: PageProps) {
  const { difficulty } = await params
  const config = difficultyConfig[difficulty as keyof typeof difficultyConfig]

  if (!config) {
    notFound()
  }

  // 注意：这里使用默认语言，因为服务器端组件无法直接访问客户端状态
  // 实际的语言处理将在客户端组件中进行
  const guides = getGuidesByDifficulty(difficulty, 'en')

  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <DifficultyPageClient guides={guides} difficulty={difficulty} />
      </div>
    </>
  )
}
