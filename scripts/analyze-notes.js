// Analyze unique base notes strings and their frequencies
const fs = require('fs')
const path = require('path')

const DATA_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.json')

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[analyze-notes] sites_detailed.json not found at', DATA_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  let data
  try {
    data = JSON.parse(raw)
  } catch (e) {
    console.error('[analyze-notes] Failed to parse JSON:', e.message)
    process.exit(1)
  }

  if (!Array.isArray(data)) {
    console.error('[analyze-notes] Expected an array of guides in JSON.')
    process.exit(1)
  }

  const freq = new Map()
  let withNotes = 0
  let emptyNotes = 0
  for (const item of data) {
    const base = typeof item.notes === 'string' ? item.notes.trim() : ''
    if (!base) { emptyNotes += 1; continue }
    withNotes += 1
    const key = base
    freq.set(key, (freq.get(key) || 0) + 1)
  }

  const sorted = Array.from(freq.entries()).sort((a,b) => b[1]-a[1])

  console.log('[analyze-notes] Items with notes:', withNotes)
  console.log('[analyze-notes] Items without notes:', emptyNotes)
  console.log('[analyze-notes] Unique notes count:', sorted.length)
  console.log('\nTop 50 notes:')
  for (let i = 0; i < Math.min(50, sorted.length); i++) {
    const [text, count] = sorted[i]
    console.log(`(${count}) ${text}`)
  }
}

main()