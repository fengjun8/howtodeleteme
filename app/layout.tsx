import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
// SiteFooter 改由各语言布局渲染，避免水合阶段语言不一致
import { LanguageProvider } from "@/contexts/language-context";
import { DEFAULT_LANGUAGE, SupportedLanguage, SUPPORTED_LANGUAGES, getTranslations } from "@/lib/utils/i18n";
import { headers } from "next/headers";
import { FloatingButtons } from "@/components/floating-buttons";
import { GoogleAnalytics, GoogleAdsense } from "@/components/analytics";

const inter = Inter({ subsets: ["latin"] });

// 从请求中获取当前语言
async function getCurrentLanguage(): Promise<SupportedLanguage> {
  const headersList = await headers();
  const currentLanguage = headersList.get('x-current-language');
  
  if (currentLanguage && SUPPORTED_LANGUAGES.some(lang => lang.code === currentLanguage)) {
    return currentLanguage as SupportedLanguage;
  }
  
  return DEFAULT_LANGUAGE;
}

// 生成元数据 - 使用当前语言的翻译
export async function generateMetadata(): Promise<Metadata> {
  const currentLanguage = await getCurrentLanguage();
  const t = getTranslations(currentLanguage);

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
      locale: currentLanguage,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('site-title'),
      description: t('site-description'),
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentLanguage = await getCurrentLanguage();
  
  return (
    <html lang={currentLanguage}>
      <head>
        <GoogleAnalytics />
        <GoogleAdsense />
      </head>
      <body className={inter.className}>
        <LanguageProvider initialLanguage={currentLanguage}>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <FloatingButtons />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
