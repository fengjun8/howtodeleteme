'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp, MessageSquare } from 'lucide-react'
import { useLocalizedLinks } from '@/hooks/use-localized-links'
import Link from 'next/link'

export function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false)
  const { localizedLink } = useLocalizedLinks()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* 反馈按钮 */}
      <Button
        asChild
        size="icon"
        className="h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <Link href={localizedLink("/feedback")}>
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Feedback</span>
        </Link>
      </Button>
      
      {/* 返回顶部按钮 */}
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-12 w-12 rounded-full bg-gray-600 hover:bg-gray-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
      >
        <ArrowUp className="h-5 w-5" />
        <span className="sr-only">Back to top</span>
      </Button>
    </div>
  )
}