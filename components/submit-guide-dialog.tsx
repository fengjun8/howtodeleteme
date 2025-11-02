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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { FileText, Send } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from '@/lib/utils/i18n'

export function SubmitGuideDialog() {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: '',
    websiteUrl: '',
    deletionUrl: '',
    difficulty: '',
    category: '',
    steps: '',
    notes: '',
    submitterEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t('guide-submitted'),
          description: t('guide-submitted-desc'),
        })
        setOpen(false)
        setFormData({
          serviceName: '',
          websiteUrl: '',
          deletionUrl: '',
          difficulty: '',
          category: '',
          steps: '',
          notes: '',
          submitterEmail: ''
        })
      } else {
        throw new Error('Failed to submit guide')
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('guide-submit-error'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-600">
          <FileText className="mr-2 h-4 w-4" />
          {t('submit-new-guide')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('submit-new-guide-title')}</DialogTitle>
          <DialogDescription>
            {t('submit-new-guide-desc')}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceName">{t('service-name')} *</Label>
              <Input
                id="serviceName"
                placeholder={t('service-name-placeholder')}
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="websiteUrl">{t('website-url')} *</Label>
              <Input
                id="websiteUrl"
                placeholder="https://example.com"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="deletionUrl">{t('deletion-url')} *</Label>
            <Input
              id="deletionUrl"
              placeholder={t('deletion-url-placeholder')}
              value={formData.deletionUrl}
              onChange={(e) => setFormData({ ...formData, deletionUrl: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="difficulty">{t('difficulty')} *</Label>
              <Select value={formData.difficulty} onValueChange={(value) => setFormData({ ...formData, difficulty: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select-difficulty')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">{t('easy')}</SelectItem>
                  <SelectItem value="medium">{t('medium')}</SelectItem>
                  <SelectItem value="hard">{t('hard')}</SelectItem>
                  <SelectItem value="limited">{t('limited')}</SelectItem>
                  <SelectItem value="impossible">{t('impossible')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">{t('category')} *</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select-category')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="social-media">{t('social-media')}</SelectItem>
                  <SelectItem value="e-commerce">{t('e-commerce')}</SelectItem>
                  <SelectItem value="gaming">{t('gaming')}</SelectItem>
                  <SelectItem value="finance">{t('finance')}</SelectItem>
                  <SelectItem value="productivity">{t('productivity')}</SelectItem>
                  <SelectItem value="entertainment">{t('entertainment')}</SelectItem>
                  <SelectItem value="communication">{t('communication')}</SelectItem>
                  <SelectItem value="education">{t('education')}</SelectItem>
                  <SelectItem value="health">{t('health')}</SelectItem>
                  <SelectItem value="travel">{t('travel')}</SelectItem>
                  <SelectItem value="shopping">{t('shopping')}</SelectItem>
                  <SelectItem value="news">{t('news')}</SelectItem>
                  <SelectItem value="developer">{t('developer')}</SelectItem>
                  <SelectItem value="business">{t('business')}</SelectItem>
                  <SelectItem value="other">{t('other')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="steps">{t('step-by-step')} *</Label>
            <Textarea
              id="steps"
              placeholder={t('steps-placeholder')}
              value={formData.steps}
              onChange={(e) => setFormData({ ...formData, steps: e.target.value })}
              rows={4}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">{t('additional-notes')}</Label>
            <Textarea
              id="notes"
              placeholder={t('notes-placeholder')}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="submitterEmail">{t('your-email-optional')}</Label>
            <Input
              id="submitterEmail"
              type="email"
              placeholder={t('email-placeholder')}
              value={formData.submitterEmail}
              onChange={(e) => setFormData({ ...formData, submitterEmail: e.target.value })}
            />
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-black hover:bg-gray-800 text-white">
            {isSubmitting ? (
              t('submitting')
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                {t('submit-guide-btn')}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}