export const runtime = 'edge'
export const revalidate = 3600

const ADS_TXT_URL = 'https://srv.adstxtmanager.com/19390/howtodelete.me'

export async function GET() {
  try {
    const upstream = await fetch(ADS_TXT_URL, {
      headers: { accept: 'text/plain,*/*' },
      next: { revalidate },
    })

    if (!upstream.ok) {
      return new Response('', {
        status: 502,
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      })
    }

    const text = await upstream.text()

    return new Response(text, {
      status: 200,
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    })
  } catch {
    return new Response('', {
      status: 502,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }
}

