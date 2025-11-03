"use client"

import Link from "next/link"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useTranslations } from "@/lib/utils/translations"

export function SiteFooter() {
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-zinc-800 bg-black text-white">
      <div className="mx-auto max-w-[1280px] px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t('about')}</h3>
            <p className="text-sm text-zinc-400">{t('footer-about-desc')}</p>
            <Link href={localizedLink("/about")} className="text-sm text-zinc-400 hover:text-red-500 block">
              {t('learn-more')}
            </Link>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t('resources')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={localizedLink("/popular")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('popular-guides')}
                </Link>
              </li>
              <li>
                <Link href={localizedLink("/categories")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('all-categories')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t('legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={localizedLink("/privacy")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('privacy-policy')}
                </Link>
              </li>
              <li>
                <Link href={localizedLink("/terms")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('terms-of-service')}
                </Link>
              </li>
              <li>
                <Link href={localizedLink("/disclaimer")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('disclaimer')}
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white">{t('contact')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={localizedLink("/feedback")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('submit-feedback')}
                </Link>
              </li>
              <li>
                <Link href={localizedLink("/contribute")} className="text-zinc-400 hover:text-red-500 transition-colors">
                  {t('contribute')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-400">
          <p>
            {(() => {
              const siteName = 'howtodelete.me'
              const homeHref = localizedLink("/")
              const copyright = String(t('footer-copyright', { year }))
              const tagline = t('footer-tagline')
              // 统一输出：始终在年份前加版权符号，并将域名替换为超链接
              // 同时移除翻译文本中可能已出现的年份与域名，避免重复
              const yearStr = String(year)
              let remaining = copyright
              // 去除可能存在的 "©2025" 或 "2025"
              remaining = remaining.replace(`©${yearStr}`, '')
              remaining = remaining.replace(yearStr, '')
              // 去除站点名本身（后续使用链接替代）
              remaining = remaining.replace(siteName, '').trim()

              return (
                <>
                  ©{year} <Link href={homeHref} className="text-zinc-300 hover:text-red-500">{siteName}</Link>
                  {remaining ? ` ${remaining}` : ''} {tagline}
                </>
              )
            })()}
          </p>
          <p className="mt-2">{t('footer-disclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
