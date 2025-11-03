// Batch fill missing localized notes fields in sites_detailed.json
// Languages are aligned with lib/utils/i18n.ts (excluding 'en')

const fs = require('fs')
const path = require('path')

const SUPPORTED_LANGUAGES = ['zh','es','fr','de','it','pt','ru','tr','ja','ko']

const DATA_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.json')
const BACKUP_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.backup.json')

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[fill-missing-notes] sites_detailed.json not found at', DATA_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  let data
  try {
    data = JSON.parse(raw)
  } catch (e) {
    console.error('[fill-missing-notes] Failed to parse JSON:', e.message)
    process.exit(1)
  }

  if (!Array.isArray(data)) {
    console.error('[fill-missing-notes] Expected an array of guides in JSON.')
    process.exit(1)
  }

  // Create backup
  try {
    fs.writeFileSync(BACKUP_PATH, raw, 'utf-8')
    console.log('[fill-missing-notes] Backup created at', BACKUP_PATH)
  } catch (e) {
    console.warn('[fill-missing-notes] Failed to create backup:', e.message)
  }

  const stats = {
    total: data.length,
    processed: 0,
    withBaseNotes: 0,
    addedPerLocale: Object.fromEntries(SUPPORTED_LANGUAGES.map(l => [l, 0])),
    alreadyLocalizedPerLocale: Object.fromEntries(SUPPORTED_LANGUAGES.map(l => [l, 0])),
    emptyBaseNotes: 0,
  }

  const updated = data.map((item, idx) => {
    stats.processed += 1
    const base = typeof item.notes === 'string' ? item.notes.trim() : ''
    if (base) stats.withBaseNotes += 1
    else stats.emptyBaseNotes += 1

    SUPPORTED_LANGUAGES.forEach(locale => {
      const key = `notes_${locale}`
      const existing = typeof item[key] === 'string' ? item[key].trim() : ''

      if (existing) {
        stats.alreadyLocalizedPerLocale[locale] += 1
        return
      }

      // Fill only if we have a base note
      if (base) {
        item[key] = base
        stats.addedPerLocale[locale] += 1
      }
    })

    return item
  })

  // Write back
  try {
    const output = JSON.stringify(updated, null, 2) + '\n'
    fs.writeFileSync(DATA_PATH, output, 'utf-8')
  } catch (e) {
    console.error('[fill-missing-notes] Failed to write updated JSON:', e.message)
    process.exit(1)
  }

  console.log('[fill-missing-notes] Summary:')
  console.log('  Total items:', stats.total)
  console.log('  Processed:', stats.processed)
  console.log('  Items with base notes:', stats.withBaseNotes)
  console.log('  Items with empty/missing base notes:', stats.emptyBaseNotes)
  console.log('  Added per locale:')
  for (const l of SUPPORTED_LANGUAGES) {
    console.log(`    ${l}: +${stats.addedPerLocale[l]}`)
  }
  console.log('  Already localized per locale:')
  for (const l of SUPPORTED_LANGUAGES) {
    console.log(`    ${l}: ${stats.alreadyLocalizedPerLocale[l]}`)
  }

  console.log('\n[fill-missing-notes] Done.')
}

main()