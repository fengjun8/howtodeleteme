import { AboutPageContent } from "@/components/about-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | howtodelete.me",
  description: "Learn about howtodelete.me and our mission to help you take control of your online presence.",
}

export default function AboutPage() {
  return <AboutPageContent />
}
