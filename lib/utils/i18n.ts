/**
 * 国际化工具函数
 * 支持动态语言切换和本地化字段获取
 */

// 支持的语言列表
export const SUPPORTED_LANGUAGES = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pt", name: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
] as const

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code']

// 默认语言
export const DEFAULT_LANGUAGE: SupportedLanguage = 'en'

// 难度级别的多语言配置
export const DIFFICULTY_TRANSLATIONS = {
  easy: {
    en: "Easy",
    zh: "简单",
    es: "Fácil", 
    fr: "Facile",
    de: "Einfach",
    it: "Facile",
    pt: "Fácil",
    ru: "Легко",
    tr: "Kolay",
    ja: "簡単",
    ko: "쉬움"
  },
  medium: {
    en: "Medium",
    zh: "中等",
    es: "Medio",
    fr: "Moyen", 
    de: "Mittel",
    it: "Medio",
    pt: "Médio",
    ru: "Средне",
    tr: "Orta",
    ja: "普通",
    ko: "보통"
  },
  hard: {
    en: "Hard",
    zh: "困难",
    es: "Difícil",
    fr: "Difficile",
    de: "Schwer", 
    it: "Difficile",
    pt: "Difícil",
    ru: "Сложно",
    tr: "Zor",
    ja: "困難",
    ko: "어려움"
  },
  limited: {
    en: "Limited",
    zh: "有限",
    es: "Limitado",
    fr: "Limité",
    de: "Begrenzt",
    it: "Limitato", 
    pt: "Limitado",
    ru: "Ограничено",
    tr: "Sınırlı",
    ja: "制限",
    ko: "제한됨"
  },
  impossible: {
    en: "Impossible",
    zh: "不可能",
    es: "Imposible",
    fr: "Impossible",
    de: "Unmöglich",
    it: "Impossibile",
    pt: "Impossível", 
    ru: "Невозможно",
    tr: "İmkansız",
    ja: "不可能",
    ko: "불가능"
  }
} as const

export type DifficultyLevel = keyof typeof DIFFICULTY_TRANSLATIONS

/**
 * 获取本地化字段值
 * @param item 数据对象
 * @param field 字段名
 * @param locale 语言代码
 * @returns 本地化的字段值，如果不存在则返回默认值
 */
export function getLocalizedField(item: any, field: string, locale: SupportedLanguage): string {
  if (!item || !field) return ''
  
  // 如果是默认语言，直接返回原字段
  if (locale === DEFAULT_LANGUAGE) {
    return item[field] || ''
  }
  
  // 尝试获取本地化字段
  const localizedKey = `${field}_${locale}`
  const localizedValue = item[localizedKey]
  
  // 如果本地化字段存在且不为空，返回本地化值
  if (localizedValue && localizedValue.trim()) {
    return localizedValue
  }
  
  // 否则返回默认字段值
  return item[field] || ''
}

/**
 * 获取本地化的难度标签
 * @param difficulty 难度级别
 * @param locale 语言代码
 * @returns 本地化的难度标签
 */
export function getLocalizedDifficulty(difficulty: string, locale: SupportedLanguage): string {
  const difficultyKey = difficulty === 'limited-availability' ? 'limited' : difficulty as DifficultyLevel
  const translations = DIFFICULTY_TRANSLATIONS[difficultyKey]
  return translations?.[locale] || translations?.en || difficulty
}

/**
 * 获取本地化邮件主题
 * @param item 数据对象
 * @param locale 语言代码
 * @returns 本地化的邮件主题
 */
export function getLocalizedEmailSubject(item: any, locale: SupportedLanguage): string {
  return getLocalizedField(item, 'email_subject', locale)
}

/**
 * 获取本地化邮件内容
 * @param item 数据对象
 * @param locale 语言代码
 * @returns 本地化的邮件内容
 */
export function getLocalizedEmailBody(item: any, locale: SupportedLanguage): string {
  return getLocalizedField(item, 'email_body', locale)
}

/**
 * 检查语言代码是否受支持
 * @param locale 语言代码
 * @returns 是否受支持
 */
export function isSupportedLanguage(locale: string): locale is SupportedLanguage {
  return SUPPORTED_LANGUAGES.some(lang => lang.code === locale)
}

/**
 * 获取浏览器首选语言
 * @returns 支持的语言代码，如果不支持则返回默认语言
 */
export function getBrowserLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  
  const browserLang = navigator.language.split('-')[0]
  return isSupportedLanguage(browserLang) ? browserLang : DEFAULT_LANGUAGE
}

/**
 * 从localStorage获取保存的语言设置
 * @returns 保存的语言代码，如果没有则返回浏览器语言
 */
export function getSavedLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE
  
  try {
    const saved = localStorage.getItem('preferred-language')
    if (saved && isSupportedLanguage(saved)) {
      return saved
    }
  } catch (error) {
    console.warn('Failed to get saved language:', error)
  }
  
  return getBrowserLanguage()
}

/**
 * 保存语言设置到localStorage
 * @param locale 语言代码
 */
export function saveLanguage(locale: SupportedLanguage): void {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem('preferred-language', locale)
  } catch (error) {
    console.warn('Failed to save language:', error)
  }
}

// 统一导出翻译工具，供组件从 i18n 引入
export { useTranslations, getTranslations } from './translations'