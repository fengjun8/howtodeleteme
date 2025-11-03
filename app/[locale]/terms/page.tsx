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
    title: `${t('terms-of-service')} | howtodelete.me`,
    description: `${t('terms-of-service')} for using howtodelete.me.`,
    alternates: {
      canonical: `/${locale}/terms`,
    },
  }
}

export default function TermsPage() {
  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="prose prose-sm max-w-none space-y-6">
              <h1 className="text-4xl font-bold tracking-tight mb-6">🧾 Terms of Service</h1>
              
              <p className="text-sm text-muted-foreground mb-8">Last updated: November 1, 2025</p>

              <section>
                <h2 className="text-2xl font-bold mb-3">1. Introduction</h2>
                <p className="text-muted-foreground mb-4">
                  Welcome to howtodelete.me ("we," "our," or "us").
                </p>
                <p className="text-muted-foreground mb-4">
                  By accessing or using this website, you agree to these Terms of Use and our Privacy Policy.
                </p>
                <p className="text-muted-foreground mb-4">
                  If you do not agree, please discontinue use of the site.
                </p>
                <p className="text-muted-foreground">
                  These terms may be updated periodically, and continued use constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">2. Service Description</h2>
                <p className="text-muted-foreground mb-4">
                  howtodelete.me provides educational guides and information about deleting or deactivating online accounts.
                </p>
                <p className="text-muted-foreground mb-4">
                  We compile publicly available information to help users understand account deletion processes.
                </p>
                <p className="text-muted-foreground">
                  We do not provide direct account deletion services or act on behalf of users.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">3. User Responsibilities</h2>
                <p className="text-muted-foreground mb-4">
                  Users are responsible for verifying information with official sources before taking action.
                </p>
                <p className="text-muted-foreground mb-4">
                  You must comply with the terms of service of third-party platforms when deleting accounts.
                </p>
                <p className="text-muted-foreground">
                  Users should exercise caution and understand the consequences of account deletion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">4. Information Accuracy</h2>
                <p className="text-muted-foreground mb-4">
                  We strive to provide accurate and up-to-date information.
                </p>
                <p className="text-muted-foreground mb-4">
                  However, third-party services may change their policies and procedures without notice.
                </p>
                <p className="text-muted-foreground">
                  We cannot guarantee the accuracy or completeness of all information provided.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">5. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  howtodelete.me is not liable for any consequences resulting from the use of our guides.
                </p>
                <p className="text-muted-foreground mb-4">
                  Users act at their own risk when following account deletion procedures.
                </p>
                <p className="text-muted-foreground">
                  We are not responsible for data loss, account recovery issues, or other complications.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">6. Intellectual Property</h2>
                <p className="text-muted-foreground mb-4">
                  The content on howtodelete.me is provided for educational purposes.
                </p>
                <p className="text-muted-foreground mb-4">
                  Users may share and reference our guides with proper attribution.
                </p>
                <p className="text-muted-foreground">
                  Commercial use or redistribution requires explicit permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">7. Privacy and Data</h2>
                <p className="text-muted-foreground mb-4">
                  We collect minimal data and respect user privacy.
                </p>
                <p className="text-muted-foreground mb-4">
                  Please refer to our Privacy Policy for detailed information about data practices.
                </p>
                <p className="text-muted-foreground">
                  We do not sell, share, or monetize user data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">8. Contact and Support</h2>
                <p className="text-muted-foreground mb-4">
                  For questions or concerns, contact us at: <strong>service@howtodelete.me</strong>
                </p>
                <p className="text-muted-foreground mb-4">
                  We welcome feedback and suggestions for improving our guides.
                </p>
                <p className="text-muted-foreground">
                  Response times may vary, but we aim to address inquiries promptly.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">9. Final Notes</h2>
                <p className="text-muted-foreground mb-4">
                  These terms are effective as of the date listed above.
                </p>
                <p className="text-muted-foreground mb-4">
                  Changes to these terms will be posted on this page.
                </p>
                <p className="text-muted-foreground">
                  We help you understand how to delete your accounts — but we never do it for you.
                  Use our content responsibly, verify official sources, and stay in control of your privacy. 🔒
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
