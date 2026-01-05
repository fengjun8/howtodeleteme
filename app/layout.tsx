import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, getTranslations } from "@/lib/utils/i18n";
import { FloatingButtons } from "@/components/floating-buttons";
import { GoogleAnalytics, GoogleAdsense } from "@/components/analytics";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

// 生成元数据 - 使用当前语言的翻译
export async function generateMetadata(): Promise<Metadata> {
  const t = getTranslations(DEFAULT_LANGUAGE);

  return {
    title: t('site-title'),
    description: t('site-description'),
    keywords: t('site-keywords'),
    authors: [{ name: "HowToDelete Team" }],
    creator: "HowToDelete",
    publisher: "HowToDelete",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me'),
    alternates: {
      canonical: (process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me') + '/',
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map(lang => [
          lang.code,
          (process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me') + (lang.code === 'en' ? '/' : `/${lang.code}`)
        ])
      ),
    },
    openGraph: {
      title: t('site-title'),
      description: t('site-description'),
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me') + '/',
      siteName: "HowToDelete",
      locale: DEFAULT_LANGUAGE,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('site-title'),
      description: t('site-description'),
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={DEFAULT_LANGUAGE}>
      <head>
        <script data-cfasync="false" src="https://cmp.gatekeeperconsent.com/min.js"></script>
        <script data-cfasync="false" src="https://the.gatekeeperconsent.com/cmp.min.js"></script>
        <script async src="//www.ezojs.com/ezoic/sa.min.js"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.ezstandalone = window.ezstandalone || {};
              ezstandalone.cmd = ezstandalone.cmd || [];
            `,
          }}
        />
        <GoogleAnalytics />
        <GoogleAdsense />
      </head>
      <body className={inter.className}>
        <LanguageProvider initialLanguage={DEFAULT_LANGUAGE}>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <div className="max-w-[1280px] mx-auto w-full px-4 pb-8">
              <div id="ezoic-pub-ad-placeholder-103"></div>
            </div>
            <FloatingButtons />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
