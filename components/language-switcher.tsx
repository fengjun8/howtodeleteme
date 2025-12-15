"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { SUPPORTED_LANGUAGES, SupportedLanguage } from "@/lib/utils/i18n"

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { currentLanguage, setLanguage, isLoading } = useLanguage()

  // 获取当前语言的显示信息
  const currentLangInfo = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLanguage)
  const displayCode = currentLangInfo?.code.toUpperCase() || 'EN'

  const handleLanguageChange = (langCode: SupportedLanguage) => {
    setLanguage(langCode)
    setIsOpen(false)
  }

  if (isLoading) {
    return (
      <Button 
        variant="ghost" 
        size="sm" 
        className="gap-2 text-white hover:text-red-500 hover:bg-black/50"
        disabled
      >
        <Globe className="h-4 w-4" />
        <span className="hidden md:inline">...</span>
      </Button>
    )
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="gap-2 text-white hover:text-red-500 hover:bg-black/50"
          aria-label="Change language"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden md:inline">{displayCode}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48"
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <DropdownMenuItem 
            key={lang.code} 
            className="cursor-pointer"
            onClick={() => handleLanguageChange(lang.code)}
          >
            <span className="mr-2">{lang.flag}</span>
            <span className="flex-1">{lang.name}</span>
            {currentLanguage === lang.code && (
              <span className="ml-2 text-green-600">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
