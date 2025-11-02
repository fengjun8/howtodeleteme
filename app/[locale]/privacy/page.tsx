import type { Metadata } from "next"
import { BreadcrumbNav } from "@/components/breadcrumb-nav"

export const metadata: Metadata = {
  title: "Privacy Policy | howtodelete.me",
  description: "Our privacy policy and data practices.",
}

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbNav />
      <div className="py-8 max-w-[1280px] mx-auto px-4">
        <div className="space-y-6">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="prose prose-sm max-w-none space-y-6">
              <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
              <p className="text-sm text-muted-foreground">Last updated: November 1, 2025</p>

              <section>
                <h2 className="text-2xl font-bold mb-3">Our Commitment</h2>
                <p className="text-muted-foreground mb-4">
                  At howtodelete.me, we are committed to protecting your privacy.
                </p>
                <p className="text-muted-foreground mb-4">
                  We believe in practicing what we preach — just as we help you learn how to delete online accounts elsewhere, we minimize the amount of data collected on our own site.
                </p>
                <p className="text-muted-foreground">
                  Our mission is to make account deletion transparent and accessible — without tracking, profiling, or monetizing your personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Data We Don't Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We respect your privacy by design.
                </p>
                <p className="text-muted-foreground mb-3">We do not:</p>
                <ul className="list-none space-y-2 text-muted-foreground mb-4">
                  <li>❌ Require user accounts or registration</li>
                  <li>❌ Collect names, email addresses, or other personal identifiers</li>
                  <li>❌ Use tracking cookies or advertising pixels</li>
                  <li>❌ Sell, rent, or share any personal data</li>
                  <li>❌ Track users across websites</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  You can browse our entire website anonymously.
                </p>
                <p className="text-muted-foreground">
                  We also do not embed third-party trackers (e.g., Google Analytics, Facebook Pixel) that can identify you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Technical Information We May Process</h2>
                <p className="text-muted-foreground mb-4">
                  Like most websites, our servers automatically receive minimal technical information to ensure site security and performance.
                </p>
                <p className="text-muted-foreground mb-3">This may include:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>IP address (anonymized and temporarily logged for security)</li>
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>Referring URL</li>
                  <li>Date and time of access</li>
                  <li>Page load performance data</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  This information is used solely for system administration and abuse prevention, and is retained only as long as necessary for those legitimate purposes.
                </p>
                <p className="text-muted-foreground">
                  We never use this information to personally identify visitors.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Cookies and Local Storage</h2>
                <p className="text-muted-foreground mb-4">
                  We currently use only essential cookies (if any) required for multilingual functionality and page rendering.
                </p>
                <p className="text-muted-foreground mb-4">
                  We do not use analytics cookies, advertising cookies, or any form of user profiling.
                </p>
                <p className="text-muted-foreground">
                  You can disable cookies entirely in your browser settings and still access all features of this website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">External Links</h2>
                <p className="text-muted-foreground mb-4">
                  Our content includes links to external websites — typically the official help or support pages of the services you want to delete accounts from.
                </p>
                <p className="text-muted-foreground mb-3">Please note that:</p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>We do not control those external sites.</li>
                  <li>Their privacy policies, terms, and data practices may differ from ours.</li>
                  <li>We recommend reviewing each site's own privacy policy before providing personal data.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">User Feedback and Contact</h2>
                <p className="text-muted-foreground mb-4">
                  If you contact us via our feedback form or by email, we will process your message only for the purpose of responding to your inquiry.
                </p>
                <p className="text-muted-foreground mb-4">
                  We will not add your email address to any mailing list, share it, or use it for marketing.
                </p>
                <p className="text-muted-foreground mb-4">
                  You can reach us at:
                </p>
                <p className="text-muted-foreground mb-4">
                  📧 service@howtodelete.me
                </p>
                <p className="text-muted-foreground">
                  We typically retain feedback messages for up to 90 days, after which they are securely deleted.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Your Privacy Rights</h2>
                <p className="text-muted-foreground mb-3">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Access, correct, or delete any personal data you voluntarily provided (e.g., feedback emails)</li>
                  <li>Restrict or object to certain types of processing</li>
                  <li>Lodge a complaint with your local data protection authority</li>
                </ul>
                <p className="text-muted-foreground mb-4">
                  We are happy to assist with any privacy-related request.
                </p>
                <p className="text-muted-foreground">
                  Please email us at service@howtodelete.me with "Privacy Request" in the subject line.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Legal Basis for Processing (for EU/EEA users)</h2>
                <p className="text-muted-foreground mb-3">
                  Under the General Data Protection Regulation (GDPR), we process minimal data (such as IP logs) only under these legal bases:
                </p>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground mb-4">
                  <li>Legitimate Interests: to secure and maintain our website</li>
                  <li>Legal Obligation: when required to comply with applicable law or court orders</li>
                </ul>
                <p className="text-muted-foreground">
                  We do not engage in profiling, targeted advertising, or cross-site tracking.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain server logs for a maximum of 30 days for the purpose of detecting and preventing abuse, after which the data is automatically deleted.
                </p>
                <p className="text-muted-foreground mb-4">
                  Email communications are retained only as long as needed to respond to user inquiries.
                </p>
                <p className="text-muted-foreground">
                  We do not maintain long-term archives or backups containing personal data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Children's Privacy</h2>
                <p className="text-muted-foreground mb-4">
                  This website is not directed toward children under the age of 13 (or under 16 in the EU).
                </p>
                <p className="text-muted-foreground mb-4">
                  We do not knowingly collect any personal information from minors.
                </p>
                <p className="text-muted-foreground">
                  If you believe a child has provided us information, please contact service@howtodelete.me, and we will promptly delete it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Changes to This Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy from time to time to reflect new features, legal requirements, or improvements in transparency.
                </p>
                <p className="text-muted-foreground mb-4">
                  All changes will be posted on this page with a revised "Last updated" date.
                </p>
                <p className="text-muted-foreground">
                  If changes are significant, we may post a notice on the homepage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Contact</h2>
                <p className="text-muted-foreground mb-3">
                  For any questions, concerns, or privacy requests, please contact:
                </p>
                <div className="text-muted-foreground mb-4">
                  <p className="mb-2">howtodelete.me Privacy Team</p>
                  <p className="mb-2">📧 Email: service@howtodelete.me</p>
                  <p>🌐 Website: https://howtodelete.me</p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-3">Summary</h2>
                <p className="text-muted-foreground mb-4">
                  We don't collect data.
                </p>
                <p className="text-muted-foreground mb-4">
                  We don't sell data.
                </p>
                <p className="text-muted-foreground mb-4">
                  We don't track you.
                </p>
                <p className="text-muted-foreground">
                  We just help you take back your privacy — one account at a time. 🧭
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
