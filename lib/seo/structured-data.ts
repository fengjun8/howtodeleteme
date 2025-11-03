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
    tool: [
      {
        "@type": "HowToTool",
        name: "Web Browser",
      },
      {
        "@type": "HowToTool", 
        name: "Internet Connection",
      },
    ],
    supply: [
      {
        "@type": "HowToSupply",
        name: "Account Credentials",
      },
    ],
    author: {
      "@type": "Organization",
      name: "HowToDelete",
      url: "https://howtodelete.me",
    },
    publisher: {
      "@type": "Organization",
      name: "HowToDelete",
      url: "https://howtodelete.me",
    },
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    inLanguage: "en",
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
    name: "HowToDelete",
    alternateName: "How to Delete",
    url: "https://howtodelete.me",
    description: "Comprehensive guides for deleting accounts from popular websites and services. Clear instructions, verified methods, and privacy-focused solutions.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://howtodelete.me/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "HowToDelete",
      url: "https://howtodelete.me",
    },
    inLanguage: ["en", "zh", "es", "fr", "de", "it", "pt", "ru", "tr", "ja", "ko"],
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HowToDelete",
    url: "https://howtodelete.me",
    logo: "https://howtodelete.me/placeholder-logo.svg",
    description: "We help users take control of their online presence by providing clear, verified guides for deleting accounts from popular websites and services.",
    foundingDate: "2024",
    knowsAbout: [
      "Account Deletion",
      "Privacy Rights",
      "Data Protection",
      "Digital Privacy",
      "Online Account Management",
    ],
    areaServed: "Worldwide",
    serviceType: "Educational Content",
  }
}

export function generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateCollectionPageStructuredData(
  name: string,
  description: string,
  url: string,
  items: ProcessedGuide[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "HowTo",
          name: `How to Delete ${item.name} Account`,
          url: item.url,
          description: item.notes,
        },
      })),
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://howtodelete.me",
        },
        {
          "@type": "ListItem",
          position: 2,
          name,
          item: url,
        },
      ],
    },
  }
}

function getDurationByDifficulty(difficulty: string): string {
  switch (difficulty?.toLowerCase()) {
    case "easy":
      return "PT5M"
    case "medium":
      return "PT15M"
    case "hard":
      return "PT30M"
    case "limited-availability":
      return "PT60M"
    case "impossible":
      return "PT0M"
    default:
      return "PT10M"
  }
}
