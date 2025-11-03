// Machine translate notes_{locale} for all guides and locales
// Strategy: translate unique English base notes once per locale, cache results, then apply to all items
// Dependencies: @vitalets/google-translate-api, node-fetch, p-limit

const fs = require('fs')
const path = require('path')
const pLimit = (require('p-limit').default || require('p-limit'))

let googleTranslate
try {
  googleTranslate = require('@vitalets/google-translate-api')
} catch (e) {
  googleTranslate = null
}

const fetch = globalThis.fetch

const SUPPORTED_LANGUAGES = ['zh','es','fr','de','it','pt','ru','tr','ja','ko']
const GOOGLE_LANG_MAP = {
  zh: 'zh-CN', es: 'es', fr: 'fr', de: 'de', it: 'it', pt: 'pt', ru: 'ru', tr: 'tr', ja: 'ja', ko: 'ko'
}
const DATA_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.json')
const BACKUP_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.mt.backup.json')
const CACHE_PATH = path.join(__dirname, '..', 'lib', 'data', 'notes_translation_cache.json')

function normalize(str) {
  return String(str || '')
    .replace(/<br\s*\/>|<br\s*><br\s*>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

async function translateViaGoogleEndpoint(text, toLang) {
  const q = encodeURIComponent(text)
  const tl = GOOGLE_LANG_MAP[toLang] || toLang
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${q}`
  const resp = await withTimeout(fetch(url))
  const json = await resp.json()
  // Response structure: [[[translatedText, originalText, null, null, ...]], ...]
  const parts = Array.isArray(json) && Array.isArray(json[0]) ? json[0] : []
  const out = normalize(parts.map(p => Array.isArray(p) ? p[0] : '').join(''))
  return out
}

async function translateText(text, toLang) {
  const normalized = normalize(text)
  if (!normalized) return ''

  // Provider 1: Google endpoint (unauthenticated)
  try {
    const out = await translateViaGoogleEndpoint(normalized, toLang)
    if (out && out !== normalized) return out
  } catch (e) {}

  // Provider 2: Google translate API wrapper
  if (googleTranslate) {
    try {
      const res = await googleTranslate(normalized, { from: 'en', to: GOOGLE_LANG_MAP[toLang] || toLang, client: 'gtx' })
      const out = normalize(res?.text || '')
      if (out && out !== normalized) return out
    } catch (e) {
      // fall through
    }
  }

  // Fallback: LibreTranslate public endpoint (may be rate-limited)
  if (typeof fetch === 'function') {
    try {
      const resp = await withTimeout(fetch('https://libretranslate.com/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ q: normalized, source: 'en', target: toLang })
      }))
      const json = await resp.json()
      const out = normalize(json?.translatedText || '')
      if (out && out !== normalized) return out
    } catch (e) {
      // fall through
    }
  }

  // If all providers fail or return identical text, signal failure
  return ''
}

async function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[mt-notes] sites_detailed.json not found at', DATA_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  let data
  try {
    data = JSON.parse(raw)
  } catch (e) {
    console.error('[mt-notes] Failed to parse JSON:', e.message)
    process.exit(1)
  }
  if (!Array.isArray(data)) {
    console.error('[mt-notes] Expected an array of guides in JSON.')
    process.exit(1)
  }

  // Backup
  try { fs.writeFileSync(BACKUP_PATH, raw, 'utf-8'); console.log('[mt-notes] Backup created at', BACKUP_PATH) } catch {}

  // Build set of unique base notes
  const baseNotesSet = new Set()
  let withBase = 0
  let emptyBase = 0
  for (const item of data) {
    const base = normalize(item.notes)
    if (!base) { emptyBase += 1; continue }
    withBase += 1
    baseNotesSet.add(base)
  }

  const baseNotes = Array.from(baseNotesSet)
  console.log('[mt-notes] Unique base notes:', baseNotes.length, 'items with base notes:', withBase, 'empty:', emptyBase)

  // Load cache
  let cache = {}
  if (fs.existsSync(CACHE_PATH)) {
    try { cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8')) } catch {}
  }
  cache = cache || {}

  // Ensure cache structure
  for (const b of baseNotes) {
    cache[b] = cache[b] || {}
  }

  // Translate base notes per locale
  const limit = pLimit(2) // small concurrency to reduce rate limiting
  for (const locale of SUPPORTED_LANGUAGES) {
    console.log(`[mt-notes] Translating base notes to ${locale} ...`)
    let processed = 0
    const tasks = baseNotes.map(b => limit(async () => {
      const cached = cache[b]?.[locale]
      // Retranslate if cached is missing or equals base (无效翻译)
      if (!cached || cached === b) {
        const out = await translateText(b, locale)
        cache[b] = cache[b] || {}
        cache[b][locale] = out
      }
      processed += 1
      if (processed % 100 === 0) {
        console.log(`[mt-notes] ${locale} progress: ${processed}/${baseNotes.length}`)
        try { fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf-8') } catch {}
      }
    }))
    await Promise.all(tasks)
    // Persist intermediate cache
    try { fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2) + '\n', 'utf-8') } catch {}
    console.log(`[mt-notes] Completed locale ${locale}`)
  }

  // Apply translations back to data
  let applied = 0
  let skippedAlreadyLocalized = 0
  for (const item of data) {
    const base = normalize(item.notes)
    if (!base) continue
    for (const locale of SUPPORTED_LANGUAGES) {
      const key = `notes_${locale}`
      const current = normalize(item[key])
      const translated = normalize(cache[base]?.[locale])
      // Apply if missing or equals base English
      if (!current || current === base) {
        if (translated) {
          item[key] = translated
          applied += 1
        }
      } else {
        skippedAlreadyLocalized += 1
      }
    }
    // Special case: copy pt-BR into pt when appropriate
    const ptBR = normalize(item['notes_pt-BR'])
    if (ptBR) {
      const keyPt = 'notes_pt'
      const currentPt = normalize(item[keyPt])
      if (!currentPt || currentPt === base) {
        item[keyPt] = ptBR
        applied += 1
      }
    }
  }

  // Write updated data
  try {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2) + '\n', 'utf-8')
  } catch (e) {
    console.error('[mt-notes] Failed to write updated JSON:', e.message)
    process.exit(1)
  }

  console.log('[mt-notes] Applied translations:', applied, 'Skipped (already localized):', skippedAlreadyLocalized)
  console.log('[mt-notes] Done.')
}

main()
function withTimeout(promise, ms = 6000) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => reject(new Error('timeout')), ms)
    promise.then(v => { clearTimeout(id); resolve(v) }, e => { clearTimeout(id); reject(e) })
  })
}