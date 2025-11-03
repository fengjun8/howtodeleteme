import Head from 'next/head'

export function PreloadResources() {
  return (
    <Head>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* DNS prefetch for external domains */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      
      {/* Preconnect to critical third-party origins */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Prefetch likely next pages */}
      <link rel="prefetch" href="/popular" />
      <link rel="prefetch" href="/categories" />
      <link rel="prefetch" href="/search" />
      
      {/* Resource hints for better performance */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta name="format-detection" content="telephone=no" />
      
      {/* Optimize for mobile */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Theme color for mobile browsers */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Preload critical CSS */}
      <link rel="preload" href="/styles/critical.css" as="style" />
    </Head>
  )
}