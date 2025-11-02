"use client"

import Link from "next/link"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useTranslations } from "@/lib/utils/translations"

export function SiteFooter() {
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()
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
          <p>{t('footer-tagline')}</p>
          <p className="mt-2">{t('footer-disclaimer')}</p>
        </div>
      </div>
    </footer>
  )
}
