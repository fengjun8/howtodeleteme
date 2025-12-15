import Script from 'next/script'

export function GoogleAnalytics() {
  if (process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
    return null
  }

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-E3WNLZWW6G"
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-E3WNLZWW6G', {
            page_title: document.title,
            page_location: window.location.href
          });
        `}
      </Script>
    </>
  )
}

export function GoogleAdsense() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true') {
    return null
  }

  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0512548983771003"
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  )
}
