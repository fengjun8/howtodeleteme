export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function makeSlug(name: string): string {
  const normalized = normalizeName(name)
  return `delete-${normalized}-account`
}
