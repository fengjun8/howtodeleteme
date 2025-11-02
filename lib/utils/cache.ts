// Simple in-memory cache for processed guides
let guidesCache: ReturnType<typeof import("../data/guides").processGuides> | null = null

export function getCachedGuides() {
  if (!guidesCache) {
    const { processGuides } = require("../data/guides")
    guidesCache = processGuides()
  }
  return guidesCache
}

export function clearGuidesCache() {
  guidesCache = null
}
