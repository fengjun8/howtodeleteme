import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"
import { getTranslations } from "@/lib/utils/translations"
import { isSupportedLanguage, type SupportedLanguage } from "@/lib/utils/i18n"

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)

  return {
    title: `${t('contact-us')} | howtodelete.me`,
    description: "Get in touch with the howtodelete.me team for questions, suggestions, or feedback.",
  }
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params
  const lang = isSupportedLanguage(locale) ? (locale as SupportedLanguage) : 'en'
  const t = getTranslations(lang)

  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="prose prose-sm max-w-none space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">{t('contact-us')}</h1>
              
              <section>
                <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
                <p className="text-muted-foreground mb-4">
                  We welcome your questions, suggestions, and feedback. Whether you've found an error in one of our guides, want to suggest a new service for us to cover, or have questions about account deletion, we're here to help.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Email Support</h2>
                <p className="text-muted-foreground mb-4">
                  For all inquiries, please email us at:
                </p>
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200 inline-block">
                  <p className="text-lg font-mono font-bold text-slate-900">
                    service@howtodelete.me
                  </p>
                </div>
                <p className="text-muted-foreground mt-4 italic text-xs">
                  We typically respond within 24-48 hours.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Feedback Form</h2>
                <p className="text-muted-foreground mb-4">
                  You can also use our dedicated <a href={`/${locale}/feedback`} className="text-blue-600 hover:underline">Feedback Form</a> to report specific issues with a guide.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contribute</h2>
                <p className="text-muted-foreground mb-4">
                  Want to help others reclaim their privacy? Check out our <a href={`/${locale}/contribute`} className="text-blue-600 hover:underline">Contribution Guide</a> to learn how you can submit new deletion instructions.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
