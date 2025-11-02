'use client'

import { Button } from "@/components/ui/button"
import { Share2 } from "lucide-react"

interface ShareButtonProps {
  title: string
  url: string
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        url: url
      });
    } else {
      navigator.clipboard.writeText(url);
      // You could add a toast notification here
    }
  }

  return (
    <Button 
      size="sm" 
      variant="outline"
      onClick={handleShare}
    >
      <Share2 className="mr-1 h-4 w-4" />
      Share Guide
    </Button>
  )
}