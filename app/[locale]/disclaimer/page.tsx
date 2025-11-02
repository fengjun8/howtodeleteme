import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Disclaimer | howtodelete.me",
  description: "Disclaimer and legal information for howtodelete.me.",
}

export default function DisclaimerPage() {
  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="prose prose-sm max-w-none space-y-6">
              <h1 className="text-4xl font-bold tracking-tight mb-6">⚖️ Disclaimer</h1>
              
              <p className="text-sm text-muted-foreground mb-8">Last updated: November 1, 2025</p>

              <section>
                <h2 className="text-2xl font-bold mb-3">1. Informational Purpose Only</h2>
                <p className="text-muted-foreground mb-4">
                  All content on howtodelete.me is provided for general informational and educational purposes.
                </p>
                <p className="text-muted-foreground mb-4">
                  We explain the steps to delete or deactivate online accounts based on publicly available information.
                </p>
                <p className="text-muted-foreground">
                  We do not offer or facilitate direct account deletion services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">2. No Warranties or Guarantees</h2>
                <p className="text-muted-foreground mb-4">
                  We make no warranties, express or implied, regarding the accuracy, completeness, or reliability of our content.
                </p>
                <p className="text-muted-foreground mb-4">
                  Third-party services may change their policies, procedures, or interfaces without notice.
                </p>
                <p className="text-muted-foreground">
                  Information provided may become outdated or inaccurate over time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">3. User Responsibility</h2>
                <p className="text-muted-foreground mb-4">
                  Users are solely responsible for verifying information with official sources before taking any action.
                </p>
                <p className="text-muted-foreground mb-4">
                  You should always check the official help pages or contact customer support of the relevant service.
                </p>
                <p className="text-muted-foreground">
                  Any actions taken based on our guides are at your own risk and discretion.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">4. No Liability</h2>
                <p className="text-muted-foreground mb-4">
                  howtodelete.me and its contributors shall not be liable for any direct, indirect, incidental, or consequential damages.
                </p>
                <p className="text-muted-foreground mb-4">
                  This includes but is not limited to data loss, account recovery issues, or inability to delete accounts.
                </p>
                <p className="text-muted-foreground">
                  We are not responsible for any consequences resulting from the use of our information.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">5. Third-Party Services</h2>
                <p className="text-muted-foreground mb-4">
                  We are not affiliated with, endorsed by, or connected to any of the companies or services mentioned on our site.
                </p>
                <p className="text-muted-foreground mb-4">
                  All trademarks, logos, and company names belong to their respective owners.
                </p>
                <p className="text-muted-foreground">
                  We do not have control over third-party websites or their content, policies, or practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">6. External Links</h2>
                <p className="text-muted-foreground mb-4">
                  Our site may contain links to external websites for reference purposes.
                </p>
                <p className="text-muted-foreground mb-4">
                  We are not responsible for the content, privacy policies, or practices of these external sites.
                </p>
                <p className="text-muted-foreground">
                  Clicking on external links is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">7. Changes and Updates</h2>
                <p className="text-muted-foreground mb-4">
                  This disclaimer may be updated from time to time without prior notice.
                </p>
                <p className="text-muted-foreground mb-4">
                  Continued use of our site constitutes acceptance of any changes to this disclaimer.
                </p>
                <p className="text-muted-foreground">
                  Please review this page periodically for any updates.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">8. Contact Information</h2>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this disclaimer, please contact us at: <strong>service@howtodelete.me</strong>
                </p>
                <p className="text-muted-foreground mb-4">
                  We welcome feedback and suggestions for improving our content.
                </p>
                <p className="text-muted-foreground">
                  We guide you — you stay in control.
                  Always confirm steps with the official website. ✅
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}