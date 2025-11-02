import { NextRequest, NextResponse } from 'next/server'
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SupportedLanguage } from '@/lib/utils/i18n'

// 检查是否为支持的语言
function isSupportedLanguage(locale: string): locale is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === locale)
}

// 获取首选语言 - 只从URL路径获取，不进行自动语言检测
function getLocale(request: NextRequest): SupportedLanguage {
  // 只检查URL路径中的语言，不进行自动语言检测
  const pathname = request.nextUrl.pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  
  if (pathSegments.length > 0 && isSupportedLanguage(pathSegments[0])) {
    return pathSegments[0] as SupportedLanguage
  }

  // 对于没有语言前缀的路径，始终返回默认语言
  return DEFAULT_LANGUAGE
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const pathSegments = pathname.split('/').filter(Boolean)

  // 确定当前语言
  let currentLanguage: SupportedLanguage = DEFAULT_LANGUAGE
  let hasLanguagePrefix = false
  
  if (pathSegments.length > 0 && isSupportedLanguage(pathSegments[0])) {
    currentLanguage = pathSegments[0] as SupportedLanguage
    hasLanguagePrefix = true
  }

  // 如果路径已经包含非默认语言前缀，保持不变，但添加语言头部
  if (hasLanguagePrefix && currentLanguage !== DEFAULT_LANGUAGE) {
    const response = NextResponse.next()
    response.headers.set('x-current-language', currentLanguage)
    return response
  }

  // 如果路径包含默认语言前缀（/en/...），重定向到无前缀版本，保持英文为默认语言的规范 URL
  if (hasLanguagePrefix && currentLanguage === DEFAULT_LANGUAGE) {
    const pathWithoutLocale = '/' + pathSegments.slice(1).join('/')
    const response = NextResponse.redirect(new URL(pathWithoutLocale || '/', request.url))
    response.headers.set('x-current-language', DEFAULT_LANGUAGE)
    return response
  }

  // 对于没有语言前缀的路径，内部重写到 /en/... 以匹配路由结构，但不改变浏览器地址
  const rewrittenUrl = new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url)
  const response = NextResponse.rewrite(rewrittenUrl)
  response.headers.set('x-current-language', DEFAULT_LANGUAGE)
  return response
}

export const config = {
  // 匹配所有路径，除了API路由、静态文件等
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|robots.txt|sitemap.xml).*)',
  ],
}