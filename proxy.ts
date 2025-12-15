import { NextRequest, NextResponse } from 'next/server'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SupportedLanguage } from '@/lib/utils/i18n'

function isSupportedLanguage(locale: string): locale is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === locale)
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathSegments = pathname.split('/').filter(Boolean)

  let currentLanguage: SupportedLanguage = DEFAULT_LANGUAGE
  let hasLanguagePrefix = false
  
  if (pathSegments.length > 0 && isSupportedLanguage(pathSegments[0])) {
    currentLanguage = pathSegments[0] as SupportedLanguage
    hasLanguagePrefix = true
  }

  if (hasLanguagePrefix && currentLanguage !== DEFAULT_LANGUAGE) {
    const response = NextResponse.next()
    response.headers.set('x-current-language', currentLanguage)
    return response
  }

  if (hasLanguagePrefix && currentLanguage === DEFAULT_LANGUAGE) {
    const pathWithoutLocale = '/' + pathSegments.slice(1).join('/')
    const response = NextResponse.redirect(new URL(pathWithoutLocale || '/', request.url))
    response.headers.set('x-current-language', DEFAULT_LANGUAGE)
    return response
  }

  const rewrittenUrl = new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url)
  const response = NextResponse.rewrite(rewrittenUrl)
  response.headers.set('x-current-language', DEFAULT_LANGUAGE)
  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
}

