const fs = require('fs')
const path = require('path')
const CACHE_PATH = path.join(__dirname, '..', 'lib', 'data', 'notes_translation_cache.json')
const base = 'To cancel/delete your account, access the account deletion link specified above and log in to your account.'
const langs = ['zh','es','fr','de','it','pt','ru','tr','ja','ko']

if (!fs.existsSync(CACHE_PATH)) {
  console.error('Cache file not found:', CACHE_PATH)
  process.exit(1)
}

const cache = JSON.parse(fs.readFileSync(CACHE_PATH, 'utf-8'))
const row = cache[base] || {}
for (const l of langs) {
  console.log(`${l}: ${row[l] || ''}`)
}