"use client"

export function NativeBannerAd() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true') {
    return null
  }

  return (
    <div className="my-6 rounded-lg border border-emerald-200 bg-emerald-50 p-4 flex justify-center w-full overflow-hidden min-h-[100px]">
      <div id="container-49cea55cbb8438714863d6ebac757595" className="w-full"></div>
      <div dangerouslySetInnerHTML={{ __html: `
        <script async data-cfasync="false" src="https://pl30120015.effectivecpmnetwork.com/49cea55cbb8438714863d6ebac757595/invoke.js"></script>
      `}} />
    </div>
  )
}

export function Banner728Ad() {
  if (process.env.NEXT_PUBLIC_ENABLE_ADS !== 'true') {
    return null
  }

  return (
    <div className="my-8 flex justify-center w-full overflow-hidden min-h-[90px]">
      <div dangerouslySetInnerHTML={{ __html: `
        <script type="text/javascript">
          atOptions = {
            'key' : '3a2e5eabb5d25b584a9ab980aa4c5510',
            'format' : 'iframe',
            'height' : 90,
            'width' : 728,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/3a2e5eabb5d25b584a9ab980aa4c5510/invoke.js"></script>
      `}} />
    </div>
  )
}
