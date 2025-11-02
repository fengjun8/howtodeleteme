import { Metadata } from "next"
import { SearchPageClient } from "@/components/search-page-client"

export const metadata: Metadata = {
  title: "搜索删除指南 | howtodelete.me",
  description: "搜索数千个网站和服务的账户删除指南。",
}

export default function SearchPage() {
  return <SearchPageClient />
}
