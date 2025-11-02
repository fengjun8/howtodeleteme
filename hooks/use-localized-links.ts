"use client"

import { useLanguage } from '@/contexts/language-context'
import { DEFAULT_LANGUAGE } from '@/lib/utils/i18n'

export function useLocalizedLinks() {
  const { currentLanguage } = useLanguage()

  const localizedLink = (path: string) => {
    // 确保路径以 / 开头
    const normalizedPath = path.startsWith('/') ? path : `/${path}`
    // 英文为默认语言，不添加语言前缀；其他语言添加前缀
    if (currentLanguage === DEFAULT_LANGUAGE) {
      return normalizedPath
    }
    return `/${currentLanguage}${normalizedPath}`
  }

  return { localizedLink, currentLanguage }
}