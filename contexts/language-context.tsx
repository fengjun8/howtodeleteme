"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SupportedLanguage, DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from '@/lib/utils/i18n'

interface LanguageContextType {
  currentLanguage: SupportedLanguage
  setLanguage: (language: SupportedLanguage) => void
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  initialLanguage?: SupportedLanguage
}

export function LanguageProvider({ children, initialLanguage }: LanguageProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>(
    initialLanguage || DEFAULT_LANGUAGE
  )
  const [isLoading, setIsLoading] = useState(true)

  // 从路径中检测当前语言
  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean)
    let detectedLanguage = DEFAULT_LANGUAGE
    
    if (pathSegments.length > 0 && pathSegments[0].length === 2) {
      const possibleLang = pathSegments[0]
      const supportedLang = SUPPORTED_LANGUAGES.find(lang => lang.code === possibleLang)
      if (supportedLang) {
        detectedLanguage = supportedLang.code
      }
    }
    
    setCurrentLanguage(detectedLanguage)
    setIsLoading(false)
  }, [pathname])

  // 也处理初始语言设置
  useEffect(() => {
    if (initialLanguage) {
      setCurrentLanguage(initialLanguage)
    }
  }, [initialLanguage])

  const setLanguage = (language: SupportedLanguage) => {
    // 拆分路径，只有在首段是受支持的语言代码时才移除它
    const segments = pathname.split('/').filter(Boolean)
    let pathWithoutLocale = pathname

    if (segments.length > 0) {
      const first = segments[0]
      const hasLangPrefix = SUPPORTED_LANGUAGES.some(lang => lang.code === first)
      if (hasLangPrefix) {
        const rest = segments.slice(1)
        pathWithoutLocale = rest.length > 0 ? `/${rest.join('/')}` : '/'
      }
    }

    // 确保路径以 / 开头
    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = `/${pathWithoutLocale}`
    }

    // 构建新的路径：英文不加前缀，其他语言加前缀
    const newPath = language === DEFAULT_LANGUAGE
      ? pathWithoutLocale
      : `/${language}${pathWithoutLocale}`

    // 立即更新状态并导航
    setCurrentLanguage(language)
    router.push(newPath)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, isLoading }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}