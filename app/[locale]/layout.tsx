import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LanguageProvider } from "@/contexts/language-context";
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, SupportedLanguage, getTranslations } from "@/lib/utils/i18n";
import { notFound } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// 已改为SSR与ISR策略，不再在布局层枚举静态参数，避免不兼容的段配置导出

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
      canonical: (process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me') + (validLocale === 'en' ? '/' : `/${validLocale}`),
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
      url: (process.env.NEXT_PUBLIC_BASE_URL || 'https://howtodelete.me') + (validLocale === 'en' ? '/' : `/${validLocale}`),
      siteName: "HowToDelete",
      locale: validLocale,
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
      <SiteHeader />
      {children}
      {/* 在语言布局中渲染页脚，确保与路由语言一致，避免水合差异 */}
      <SiteFooter />
    </LanguageProvider>
  );
}