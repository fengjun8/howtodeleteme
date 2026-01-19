import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './i18n'

export function getLanguageAlternates(path: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'
  
  // Normalize path to remove leading slash
  const cleanPath = path.startsWith('/') ? path.substring(1) : path
  
  const languages: Record<string, string> = {}
  
  SUPPORTED_LANGUAGES.forEach(lang => {
    if (lang.code === DEFAULT_LANGUAGE) {
        languages[lang.code] = `${baseUrl}/${cleanPath}`
    } else {
        languages[lang.code] = `${baseUrl}/${lang.code}${cleanPath ? '/' + cleanPath : ''}`
    }
  })
  
  // Add x-default pointing to the default language version
  languages['x-default'] = `${baseUrl}/${cleanPath}`
  
  return languages
}
