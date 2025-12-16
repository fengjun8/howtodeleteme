"use client"

import Link from "next/link"
import { useState } from "react"
import { Trash2, Home, FolderTree, BarChart3, Star, Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLocalizedLinks } from "@/hooks/use-localized-links"
import { useLanguage } from "@/contexts/language-context"
import { useTranslations } from "@/lib/utils/translations"

interface SiteHeaderProps {
  categories: string[]
}

export function SiteHeader({ categories }: SiteHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { localizedLink } = useLocalizedLinks()
  const t = useTranslations()

  // 将分类名称转换为翻译键
  const getCategoryTranslationKey = (category: string): string => {
    // 统一规则：空格转"-"，去掉"&"
    return category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")
  }

  // 获取分类的翻译文本
  const getCategoryDisplayName = (category: string): string => {
    const key = getCategoryTranslationKey(category)
    return t(key as any) || category
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-black">
      <div className="mx-auto max-w-[1280px] px-4 flex h-16 items-center justify-between">
        <Link
          href={localizedLink("/")}
          className="flex items-center gap-2 font-bold text-xl text-white hover:text-red-500 transition-colors"
        >
          <Trash2 className="h-6 w-6" />
          <span>
            howto<span className="text-red-500">delete</span>.me
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex" viewport={false}>
          <NavigationMenuList className="gap-1">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={localizedLink("/")} className="nav-link group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-red-500 hover:bg-black/50 focus:text-red-500 focus:outline-none flex-row">
                  <Home className="nav-icon mr-2 h-4 w-4 text-white flex-shrink-0" />
                  <span>{t('home')}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-trigger group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-red-500 hover:bg-black/50 focus:text-red-500 focus:outline-none data-[state=open]:text-red-500 data-[state=open]:bg-black/50">
                <FolderTree className="nav-icon mr-2 h-4 w-4 text-white flex-shrink-0" />
                {t('categories')}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="left-1/2 transform -translate-x-1/2">
                <ul className="grid w-[600px] gap-2 p-4 md:w-[720px] md:grid-cols-3 bg-zinc-900">
                  {categories.map((category) => (
                    <li key={category}>
                      <Link
                        href={localizedLink(`/category/${category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`)}
                        className="block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                      >
                        <div className="text-sm font-medium leading-none">{getCategoryDisplayName(category)}</div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="nav-trigger group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-red-500 hover:bg-black/50 focus:text-red-500 focus:outline-none data-[state=open]:text-red-500 data-[state=open]:bg-black/50">
                <BarChart3 className="nav-icon mr-2 h-4 w-4 text-white flex-shrink-0" />
                {t('difficulty')}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-3 p-4 bg-zinc-900">
                  <li>
                    <Link
                      href={localizedLink("/difficulty/easy")}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                    >
                      <div className="text-sm font-medium">{t('easy')}</div>
                       <p className="text-xs text-zinc-400">{t('simple-process')}</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedLink("/difficulty/medium")}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                    >
                      <div className="text-sm font-medium">{t('medium')}</div>
                       <p className="text-xs text-zinc-400">{t('some-extra-steps')}</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedLink("/difficulty/hard")}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                    >
                      <div className="text-sm font-medium">{t('hard')}</div>
                       <p className="text-xs text-zinc-400">{t('contact-support')}</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedLink("/difficulty/limited-availability")}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                    >
                      <div className="text-sm font-medium">{t('limited')}</div>
                       <p className="text-xs text-zinc-400">{t('privacy-rights-only')}</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={localizedLink("/difficulty/impossible")}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-red-500 text-white"
                    >
                      <div className="text-sm font-medium">{t('impossible')}</div>
                       <p className="text-xs text-zinc-400">{t('cannot-be-deleted')}</p>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href={localizedLink("/popular")} className="nav-link group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-white transition-colors hover:text-red-500 hover:bg-black/50 focus:text-red-500 focus:outline-none flex-row">
                  <Star className="nav-icon mr-2 h-4 w-4 text-white flex-shrink-0" />
                  <span>{t('popular')}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:text-red-500 hover:bg-black/50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-zinc-900 border-zinc-800">
              <SheetHeader>
                <SheetTitle className="text-white text-left">{t('navigation')}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <Link
                  href={localizedLink("/")}
                  className="flex items-center gap-3 px-3 py-2 text-white hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  {t('home')}
                </Link>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 text-white font-medium">
                    <FolderTree className="h-5 w-5" />
                    {t('categories')}
                  </div>
                  <div className="pl-8 space-y-1">
                    {categories.map((category) => (
                      <Link
                        key={category}
                        href={localizedLink(`/category/${category.toLowerCase().replace(/\s+/g, "-").replace(/&/g, "")}`)}
                        className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {getCategoryDisplayName(category)}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-3 px-3 py-2 text-white font-medium">
                    <BarChart3 className="h-5 w-5" />
                    {t('difficulty')}
                  </div>
                  <div className="pl-8 space-y-1">
                    <Link
                      href={localizedLink("/difficulty/easy")}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('easy')}
                    </Link>
                    <Link
                      href={localizedLink("/difficulty/medium")}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('medium')}
                    </Link>
                    <Link
                      href={localizedLink("/difficulty/hard")}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('hard')}
                    </Link>
                    <Link
                      href={localizedLink("/difficulty/limited-availability")}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('limited')}
                    </Link>
                    <Link
                      href={localizedLink("/difficulty/impossible")}
                      className="block px-3 py-2 text-sm text-zinc-300 hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('impossible')}
                    </Link>
                  </div>
                </div>

                <Link
                  href={localizedLink("/popular")}
                  className="flex items-center gap-3 px-3 py-2 text-white hover:text-red-500 hover:bg-zinc-800 rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Star className="h-5 w-5" />
                  {t('popular')}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Language Switcher */}
        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  )
}
