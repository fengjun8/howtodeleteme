import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/contexts/language-context";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SupportedLanguage, getTranslations } from "@/lib/utils/i18n";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// 生成静态参数
export async function generateStaticParams() {
  return SUPPORTED_LANGUAGES.map((lang) => ({
    locale: lang.code,
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = SUPPORTED_LANGUAGES.some((lang) => lang.code === locale)
    ? (locale as SupportedLanguage)
    : DEFAULT_LANGUAGE;
  const t = getTranslations(validLocale);

  return {
    title: t('site-title'),
    description: t('site-description'),
    keywords: "delete account, remove profile, close account, deactivate, privacy, data protection",
    authors: [{ name: "HowToDelete Team" }],
    creator: "HowToDelete",
    publisher: "HowToDelete",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.guide'),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        SUPPORTED_LANGUAGES.map(lang => [lang.code, `/${lang.code}`])
      ),
    },
    openGraph: {
      title: t('site-title'),
      description: t('site-description'),
      url: `/${locale}`,
      siteName: "HowToDelete",
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t('site-title'),
      description: t('site-description'),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // 验证语言参数
  const isValidLocale = SUPPORTED_LANGUAGES.some(lang => lang.code === locale);
  
  if (!isValidLocale) {
    notFound();
  }

  return (
    <LanguageProvider initialLanguage={locale as SupportedLanguage}>
      {children}
    </LanguageProvider>
  );
}