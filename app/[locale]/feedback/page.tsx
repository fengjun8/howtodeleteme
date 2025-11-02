import { FeedbackPageContent } from "@/components/feedback-page-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Feedback and Suggest | howtodelete.me",
  description: "Submit feedback or report issues with our guides.",
}

export default function FeedbackPage() {
  return <FeedbackPageContent />
}
