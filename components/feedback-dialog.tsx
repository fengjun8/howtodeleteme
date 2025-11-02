'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { AlertTriangle, Send } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from '@/lib/utils/translations'

interface FeedbackDialogProps {
  guideTitle: string
  guideUrl: string
}

export function FeedbackDialog({ guideTitle, guideUrl }: FeedbackDialogProps) {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    subject: `${t('feedback-for')}: ${guideTitle}`,
    message: '',
    url: guideUrl
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t('feedback-submitted'),
          description: t('feedback-submitted-desc'),
          className: "bg-green-50 border-green-200 text-green-800",
        })
        setOpen(false)
        setFormData({
          email: '',
          subject: `${t('feedback-for')}: ${guideTitle}`,
          message: '',
          url: guideUrl
        })
      } else {
        throw new Error('Failed to submit feedback')
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('feedback-error'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-green-100 hover:bg-green-200 text-green-800 border border-green-600">
          <AlertTriangle className="mr-2 h-4 w-4" />
          {t('report-error')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('report-issue')}</DialogTitle>
          <DialogDescription>
            {t('report-issue-desc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('your-email-optional')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('email-placeholder')}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subject">{t('subject')}</Label>
            <Input
              id="subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">{t('guide-url')}</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
              readOnly
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">{t('your-feedback')}</Label>
            <Textarea
              id="message"
              placeholder={t('feedback-placeholder')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              {t('cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting} className="bg-black hover:bg-gray-800 text-white">
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  {t('submitting')}
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  {t('submit-feedback-btn')}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}