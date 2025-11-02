import { ContributePageContent } from "@/components/contribute-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contribute | howtodelete.me",
  description: "Learn how to contribute to howtodelete.me.",
}

export default function ContributePage() {
  return <ContributePageContent />
}
