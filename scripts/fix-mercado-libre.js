// Targeted fix: translate long Mercado Libre notes across locales and copy pt-BR -> pt
// This script scans sites_detailed.json for items whose base notes start with the
// "To cancel/delete your account, access the account deletion link..." paragraph
// and contains the warning section, then translates per-locale using the same
// pipeline as mt-notes.js. Additionally, it copies Brazilian Portuguese notes
// into generic pt when appropriate.

const fs = require('fs')
const path = require('path')

const SUPPORTED_LANGUAGES = ['zh','es','fr','de','it','pt','ru','tr','ja','ko']
const GOOGLE_LANG_MAP = {
  zh: 'zh-CN', es: 'es', fr: 'fr', de: 'de', it: 'it', pt: 'pt', ru: 'ru', tr: 'tr', ja: 'ja', ko: 'ko'
}

let googleTranslate
try { googleTranslate = require('@vitalets/google-translate-api') } catch (e) { googleTranslate = null }

const fetch = globalThis.fetch

const DATA_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.json')

function normalize(str) {
  return String(str || '')
    .replace(/<br\s*\/>|<br\s*><br\s*>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function withTimeout(promise, ms = 6000) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms)
    promise.then(v => { clearTimeout(id); resolve(v) }, e => { clearTimeout(id); reject(e) })
  })
}

async function translateViaGoogleEndpoint(text, toLang) {
  const q = encodeURIComponent(text)
  const tl = GOOGLE_LANG_MAP[toLang] || toLang
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${q}`
  const resp = await withTimeout(fetch(url))
  const json = await resp.json()
  const parts = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : []
  const out = normalize(parts.map(p => Array.isArray(p) ? p[0] : '').join(''))
  return out
}

async function translateText(text, toLang) {
  const normalized = normalize(text)
  if (!normalized) return ''

  // Provider 1: Google endpoint
  try {
    const out = await translateViaGoogleEndpoint(normalized, toLang)
    if (out && out !== normalized) return out
  } catch (e) {}

  // Provider 2: google-translate-api wrapper
  if (googleTranslate) {
    try {
      const res = await googleTranslate(normalized, { from: 'en', to: GOOGLE_LANG_MAP[toLang] || toLang, client: 'gtx' })
      const out = normalize(res?.text || '')
      if (out && out !== normalized) return out
    } catch (e) {}
  }

  // Provider 3: LibreTranslate
  if (typeof fetch === 'function') {
    try {
      const resp = await withTimeout(fetch('https://libretranslate.com/translate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: normalized, source: 'en', target: toLang })
      }))
      const json = await resp.json()
      const out = normalize(json?.translatedText || '')
      if (out && out !== normalized) return out
    } catch (e) {}
  }

  return ''
}

function isMercadoLibreLongParagraph(base) {
  const head = 'To cancel/delete your account, access the account deletion link specified above and log in to your account.'
  const hasHead = normalize(base).startsWith(normalize(head))
  const hasWarning = normalize(base).includes('Warning:') || normalize(base).includes('**Warning:**')
  return hasHead && hasWarning
}

async function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[fix-mercado-libre] sites_detailed.json not found at', DATA_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  let data
  try { data = JSON.parse(raw) } catch (e) {
    console.error('[fix-mercado-libre] Failed to parse JSON:', e.message)
    process.exit(1)
  }
  if (!Array.isArray(data)) {
    console.error('[fix-mercado-libre] Expected array data')
    process.exit(1)
  }

  let targeted = 0
  let applied = 0
  let copiedPt = 0
  for (const item of data) {
    const base = normalize(item.notes)
    if (!base) continue
    if (!isMercadoLibreLongParagraph(base)) continue
    targeted += 1

    // per-locale translation when current equals base or is empty
    for (const locale of SUPPORTED_LANGUAGES) {
      const key = `notes_${locale}`
      const current = normalize(item[key])
      if (!current || current === base) {
        const out = await translateText(base, locale)
        if (out) { item[key] = out; applied += 1 }
      }
    }

    // copy pt-BR -> pt when pt equals base/empty and pt-BR exists
    const ptBR = normalize(item['notes_pt-BR'])
    if (ptBR) {
      const currentPt = normalize(item['notes_pt'])
      if (!currentPt || currentPt === base) {
        item['notes_pt'] = ptBR
        copiedPt += 1
      }
    }
  }

  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  } catch (e) {
    console.error('[fix-mercado-libre] Failed to write JSON:', e.message)
    process.exit(1)
  }

  console.log('[fix-mercado-libre] Targeted items:', targeted)
  console.log('[fix-mercado-libre] Applied translations:', applied)
  console.log('[fix-mercado-libre] Copied pt-BR -> pt:', copiedPt)
  console.log('[fix-mercado-libre] Done.')
}

main()