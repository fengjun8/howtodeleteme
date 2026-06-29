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
          gtag('config', 'G-E3WNLZWW6G');
        `}
      </Script>
    </>
  )
}

export function AdsterraGlobal() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true') {
    return null
  }

  return (
    <>
      {/* Popunder */}
      <script src="https://pl30120013.effectivecpmnetwork.com/f2/d7/08/f2d70846109fec374b8c8cac076e194c.js"></script>
      {/* Social Bar */}
      <script src="https://pl30120017.effectivecpmnetwork.com/cf/66/da/cf66dabecf1c543c2c8ed47ffefdd066.js"></script>
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
