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
import { Users, Send } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { useTranslations } from '@/lib/utils/i18n'

export function UpdateGuideDialog() {
  const t = useTranslations()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    serviceName: '',
    currentGuideUrl: '',
    issueType: '',
    description: '',
    newInformation: '',
    sourceUrl: '',
    submitterEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/update-guide', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast({
          title: t('update-submitted'),
          description: t('update-submitted-desc'),
        })
        setOpen(false)
        setFormData({
          serviceName: '',
          currentGuideUrl: '',
          issueType: '',
          description: '',
          newInformation: '',
          sourceUrl: '',
          submitterEmail: ''
        })
      } else {
        throw new Error('Failed to submit update')
      }
    } catch (error) {
      toast({
        title: t('error'),
        description: t('update-error'),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-orange-100 hover:bg-orange-200 text-orange-800 border border-orange-600">
          <Users className="mr-2 h-4 w-4" />
          {t('update-guide')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t('update-guide-title')}</DialogTitle>
          <DialogDescription>
            {t('update-guide-desc')}
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
              <Label htmlFor="currentGuideUrl">{t('current-guide-url')} *</Label>
              <Input
                id="currentGuideUrl"
                placeholder={t('current-guide-url-placeholder')}
                value={formData.currentGuideUrl}
                onChange={(e) => setFormData({ ...formData, currentGuideUrl: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="issueType">{t('issue-type')} *</Label>
            <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
              <SelectTrigger>
                <SelectValue placeholder={t('select-issue-type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="outdated">{t('outdated-info')}</SelectItem>
                <SelectItem value="incorrect">{t('incorrect-info')}</SelectItem>
                <SelectItem value="missing">{t('missing-steps')}</SelectItem>
                <SelectItem value="broken-link">{t('broken-link')}</SelectItem>
                <SelectItem value="other">{t('other')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('issue-description')} *</Label>
            <Textarea
              id="description"
              placeholder={t('issue-description-placeholder')}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newInformation">{t('new-information')}</Label>
            <Textarea
              id="newInformation"
              placeholder={t('new-information-placeholder')}
              value={formData.newInformation}
              onChange={(e) => setFormData({ ...formData, newInformation: e.target.value })}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sourceUrl">{t('source-url')}</Label>
            <Input
              id="sourceUrl"
              placeholder={t('source-url-placeholder')}
              value={formData.sourceUrl}
              onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
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
                {t('submit-update-btn')}
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}