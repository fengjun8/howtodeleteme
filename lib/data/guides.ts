import guidesData from "./sites_detailed.json"
import type { DeleteGuide, ProcessedGuide } from "../types"
import { makeSlug } from "../utils/slug"
import { categorizeGuide } from "../utils/categories"
import { getLocalizedField, getLocalizedDifficulty, getLocalizedEmailSubject, getLocalizedEmailBody, type SupportedLanguage } from "../utils/i18n"

// Popular sites list (top 200 most known services)
const POPULAR_SITES = new Set([
  "Facebook",
  "Instagram",
  "Twitter",
  "TikTok",
  "Snapchat",
  "LinkedIn",
  "Reddit",
  "Pinterest",
  "YouTube",
  "WhatsApp",
  "Telegram",
  "Discord",
  "Twitch",
  "Amazon",
  "eBay",
  "Etsy",
  "PayPal",
  "Venmo",
  "Cash App",
  "Google",
  "Microsoft",
  "Apple",
  "iCloud",
  "Dropbox",
  "OneDrive",
  "Netflix",
  "Spotify",
  "Hulu",
  "Disney+",
  "HBO Max",
  "Steam",
  "Epic Games",
  "Xbox",
  "PlayStation",
  "Nintendo",
  "Uber",
  "Lyft",
  "DoorDash",
  "Airbnb",
  "Booking.com",
  "Expedia",
  "Zoom",
  "Slack",
  "Microsoft Teams",
  "Skype",
  "Adobe",
  "Canva",
  "Figma",
  "GitHub",
  "GitLab",
  "Stack Overflow",
  "Medium",
  "WordPress",
  "Tumblr",
  "Blogger",
  "Wix",
  "Squarespace",
  "Shopify",
  "WooCommerce",
  "Stripe",
  "Square",
  "QuickBooks",
  "Salesforce",
  "HubSpot",
  "Mailchimp",
  "Constant Contact",
  "SurveyMonkey",
  "Typeform",
  "Grammarly",
  "Duolingo",
  "Coursera",
  "Udemy",
  "Khan Academy",
  "Codecademy",
  "Tinder",
  "Bumble",
  "Hinge",
  "Match.com",
  "eHarmony",
  "OkCupid",
  "Yelp",
  "TripAdvisor",
  "Foursquare",
  "Glassdoor",
  "Indeed",
  "Monster",
  "Craigslist",
  "OfferUp",
  "Mercari",
  "Poshmark",
  "Depop",
  "Vinted",
  "Robinhood",
  "Coinbase",
  "Binance",
  "Kraken",
  "Gemini",
  "Webull",
  "Mint",
  "Credit Karma",
  "NerdWallet",
  "Personal Capital",
  "YNAB",
  "LastPass",
  "1Password",
  "Dashlane",
  "Bitwarden",
  "NordVPN",
  "ExpressVPN",
  "Evernote",
  "Notion",
  "Trello",
  "Asana",
  "Monday.com",
  "ClickUp",
  "Calendly",
  "Doodle",
  "Google Calendar",
  "Outlook",
  "Yahoo Mail",
  "ProtonMail",
  "Gmail",
  "iMessage",
  "Signal",
  "Viber",
  "WeChat",
  "Line",
  "KakaoTalk",
  "Weibo",
  "Douyin",
  "Bilibili",
  "Xiaohongshu",
  "Taobao",
  "JD.com",
  "Alipay",
  "Patreon",
  "OnlyFans",
  "Substack",
  "Ko-fi",
  "Buy Me a Coffee",
  "Goodreads",
  "Audible",
  "Kindle",
  "Apple Books",
  "Google Play Books",
  "Strava",
  "MyFitnessPal",
  "Fitbit",
  "Peloton",
  "Nike Run Club",
  "Headspace",
  "Calm",
  "Meditation",
  "BetterHelp",
  "Talkspace",
  "Venmo",
  "Zelle",
  "Western Union",
  "MoneyGram",
  "TransferWise",
  "Wise",
  "Revolut",
  "N26",
  "Chime",
  "Varo",
  "Current",
  "Dave",
  "SoFi",
  "Ally Bank",
  "Marcus",
  "Discover",
  "Capital One",
  "Chase",
  "Bank of America",
  "Wells Fargo",
  "Citi",
  "US Bank",
  "American Express",
  "Visa",
  "Mastercard",
  "Discover Card",
  "Target",
  "Walmart",
  "Best Buy",
  "Home Depot",
  "Lowes",
  "Costco",
  "Sams Club",
  "BJs",
  "Kroger",
  "Safeway",
  "Whole Foods",
  "Instacart",
  "Shipt",
  "Postmates",
  "Grubhub",
  "Seamless",
  "OpenTable",
  "Resy",
  "Yelp Reservations",
  "Eventbrite",
  "Ticketmaster",
  "StubHub",
  "SeatGeek",
  "Vivid Seats",
  "Fandango",
  "MoviePass",
])

let processedGuidesCache: ProcessedGuide[] | null = null

export function processGuides(language: SupportedLanguage = 'en'): ProcessedGuide[] {
  // Return cached version if available and language is English (default)
  if (processedGuidesCache && language === 'en') {
    return processedGuidesCache
  }

  const processedGuides = (guidesData as DeleteGuide[]).map((guide, index) => {
    const slug = makeSlug(guide.name)
    const category = categorizeGuide(guide)
    const popular = POPULAR_SITES.has(guide.name)

    // Get localized fields
    const localizedNotes = getLocalizedField(guide, 'notes', language)
    const localizedDifficulty = guide.difficulty // Keep original for filtering
    const localizedDifficultyLabel = getLocalizedDifficulty(guide.difficulty, language)
    const localizedEmailSubject = guide.email_subject ? getLocalizedEmailSubject(guide, language) : undefined
    const localizedEmailBody = guide.email_body ? getLocalizedEmailBody(guide, language) : undefined

    return {
      ...guide,
      id: `guide-${index}`,
      slug,
      category,
      popular,
      // Add localized fields
      localizedNotes,
      localizedDifficulty: localizedDifficultyLabel,
      localizedEmailSubject,
      localizedEmailBody,
      // Keep original fields for compatibility
      notes: localizedNotes || guide.notes,
      email_subject: localizedEmailSubject || guide.email_subject,
      email_body: localizedEmailBody || guide.email_body,
    }
  })

  // Reclassify small categories: any category with < 10 guides becomes "Other"
  const SMALL_CATEGORY_THRESHOLD = 10
  const categoryCounts = new Map<string, number>()

  // Count categories before reclassification
  for (const guide of processedGuides) {
    const key = guide.category
    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1)
  }

  const normalizedGuides = processedGuides.map((guide) => {
    const currentCategory = guide.category
    // Never reclassify guides already in Other
    if (currentCategory.toLowerCase() === 'other') return guide

    const count = categoryCounts.get(currentCategory) || 0
    if (count > 0 && count < SMALL_CATEGORY_THRESHOLD) {
      return { ...guide, category: 'Other' }
    }
    return guide
  })

  // Only cache English version to avoid memory issues
  if (language === 'en') {
    processedGuidesCache = normalizedGuides
  }
  return normalizedGuides
}

export function getGuideBySlug(slug: string, language: SupportedLanguage = 'en'): ProcessedGuide | undefined {
  const guides = processGuides(language)
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesByCategory(category: string, language: SupportedLanguage = 'en'): ProcessedGuide[] {
  const guides = processGuides(language)
  return guides.filter((guide) => guide.category === category)
}

export function getPopularGuides(limit?: number, language: SupportedLanguage = 'en'): ProcessedGuide[] {
  const guides = processGuides(language)
  const popular = guides.filter((guide) => guide.popular)
  return limit ? popular.slice(0, limit) : popular
}

export function getGuidesByDifficulty(difficulty: string, language: SupportedLanguage = 'en'): ProcessedGuide[] {
  const guides = processGuides(language)
  
  // Map URL difficulty to data difficulty
  const difficultyMap: Record<string, string> = {
    'limited-availability': 'limited',
    'easy': 'easy',
    'medium': 'medium', 
    'hard': 'hard',
    'impossible': 'impossible'
  }
  
  const actualDifficulty = difficultyMap[difficulty] || difficulty
  return guides.filter((guide) => guide.difficulty === actualDifficulty)
}

export function searchGuides(query: string, language: SupportedLanguage = 'en'): ProcessedGuide[] {
  const guides = processGuides(language)
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery) return []

  // Split query into words for better matching
  const queryWords = lowerQuery.split(/\s+/)

  return guides
    .map((guide) => {
      let score = 0
      const guideName = guide.name.toLowerCase()
      const guideDomains = guide.domains.map(d => d.toLowerCase())
      
      // Exact name match gets highest score
      if (guideName === lowerQuery) {
        score += 100
      }
      // Name starts with query
      else if (guideName.startsWith(lowerQuery)) {
        score += 80
      }
      // Name contains query (only for queries longer than 3 characters to avoid false matches)
      else if (lowerQuery.length > 3 && guideName.includes(lowerQuery)) {
        score += 60
      }
      
      // Domain matching - more precise
      guideDomains.forEach(domain => {
        // Exact domain match
        if (domain === lowerQuery || domain === `${lowerQuery}.com` || domain === `www.${lowerQuery}.com`) {
          score += 70
        }
        // Domain starts with query (e.g., "facebook" matches "facebook.com")
        else if (domain.startsWith(lowerQuery) || domain.startsWith(`www.${lowerQuery}`)) {
          score += 50
        }
        // Clean domain name matching (remove www and common TLDs)
        else {
          const cleanDomain = domain.replace(/^www\./, '').replace(/\.(com|org|net|io|co\.uk|ca|eu)$/, '')
          if (cleanDomain === lowerQuery || cleanDomain.startsWith(lowerQuery)) {
            score += 40
          }
        }
      })
      
      // Word-based matching for multi-word queries (more restrictive)
      if (queryWords.length > 1) {
        queryWords.forEach(word => {
          if (word.length > 3) { // Increase minimum word length to avoid false matches
            // Only match whole words in names
            const nameWords = guideName.split(/\s+/)
            if (nameWords.some(nameWord => nameWord === word || nameWord.startsWith(word))) {
              score += 20
            }
            
            // For domains, only match if it's a significant part
            guideDomains.forEach(domain => {
              const cleanDomain = domain.replace(/^www\./, '').replace(/\.(com|org|net|io|co\.uk|ca|eu)$/, '')
              if (cleanDomain === word || cleanDomain.startsWith(word)) {
                score += 15
              }
            })
          }
        })
      }
      
      // Boost popular guides slightly
      if (guide.popular) {
        score += 5
      }
      
      return { guide, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ guide }) => guide)
}

// Get search suggestions based on popular sites and categories
export function getSearchSuggestions(query: string): string[] {
  const guides = processGuides()
  const lowerQuery = query.toLowerCase().trim()
  
  if (!lowerQuery || lowerQuery.length < 2) return []
  
  const suggestions = new Set<string>()
  
  // Add matching guide names
  guides.forEach(guide => {
    if (guide.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(guide.name)
    }
    
    // Add matching domains (clean them up)
    guide.domains.forEach(domain => {
      if (domain.toLowerCase().includes(lowerQuery)) {
        // Clean domain (remove www, .com etc for display)
        const cleanDomain = domain.replace(/^www\./, '').replace(/\.(com|org|net|io|co\.uk)$/, '')
        if (cleanDomain.length > 2) {
          suggestions.add(cleanDomain)
        }
      }
    })
  })
  
  // Limit to 8 suggestions and prioritize popular ones
  return Array.from(suggestions)
    .slice(0, 8)
    .sort((a, b) => {
      const aIsPopular = POPULAR_SITES.has(a)
      const bIsPopular = POPULAR_SITES.has(b)
      if (aIsPopular && !bIsPopular) return -1
      if (!aIsPopular && bIsPopular) return 1
      return a.localeCompare(b)
    })
}

let categoriesCache: string[] | null = null

export function getAllCategories(): string[] {
  if (categoriesCache) {
    return categoriesCache
  }

  const guides = processGuides()
  const categories = new Set(guides.map((guide) => guide.category))
  categoriesCache = Array.from(categories).sort()

  return categoriesCache
}
