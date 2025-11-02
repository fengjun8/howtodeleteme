import type { ProcessedGuide } from "../types"

export function generateGuideStructuredData(guide: ProcessedGuide) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to Delete ${guide.name} Account`,
    description: guide.notes,
    step: [
      {
        "@type": "HowToStep",
        name: "Log into your account",
        text: `Log into your ${guide.name} account`,
        position: 1,
      },
      {
        "@type": "HowToStep",
        name: "Navigate to settings",
        text: "Navigate to account settings or privacy settings",
        position: 2,
      },
      {
        "@type": "HowToStep",
        name: "Find deletion option",
        text: "Find the account deletion or deactivation option",
        position: 3,
      },
      {
        "@type": "HowToStep",
        name: "Confirm deletion",
        text: "Follow the on-screen instructions to confirm deletion",
        position: 4,
      },
    ],
    url: guide.url,
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "USD",
      value: "0",
    },
    totalTime: getDurationByDifficulty(guide.difficulty),
  }
}

export function generateBreadcrumbStructuredData(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "howtodelete.me",
    description: "Step-by-step guides to permanently delete your online accounts",
    url: "https://howtodelete.me",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://howtodelete.me/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }
}

function getDurationByDifficulty(difficulty: string): string {
  switch (difficulty) {
    case "easy":
      return "PT5M" // 5 minutes
    case "medium":
      return "PT15M" // 15 minutes
    case "hard":
      return "PT30M" // 30 minutes
    case "impossible":
      return "PT1H" // 1 hour or more
    default:
      return "PT10M"
  }
}
