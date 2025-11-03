// Translate auto-filled notes_{locale} that still equal the base English notes
// Skips entries where notes_{locale} is already localized (i.e., differs from base)

const fs = require('fs')
const path = require('path')

const SUPPORTED_LANGUAGES = ['zh','es','fr','de','it','pt','ru','tr','ja','ko']
const DATA_PATH = path.join(__dirname, '..', 'lib', 'data', 'sites_detailed.json')

// Normalization helper
function normalize(str) {
  return String(str || '')
    .replace(/<br\s*\/>|<br\s*><br\s*>/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// Translation dictionary keyed by normalized English base notes
const DICT = {
  [normalize('Account deletion requires contacting Customer Support.')]: {
    zh: '删除账户需要联系客户支持。',
    es: 'La eliminación de la cuenta requiere contactar al soporte al cliente.',
    fr: 'La suppression du compte nécessite de contacter le support client.',
    de: 'Die Kontolöschung erfordert die Kontaktaufnahme mit dem Kundensupport.',
    it: 'L’eliminazione dell’account richiede contattare l’assistenza clienti.',
    pt: 'A exclusão da conta requer entrar em contato com o suporte ao cliente.',
    ru: 'Для удаления аккаунта необходимо связаться со службой поддержки.',
    tr: 'Hesabın silinmesi için müşteri hizmetleriyle iletişime geçmek gerekir.',
    ja: 'アカウント削除にはカスタマーサポートへの連絡が必要です。',
    ko: '계정을 삭제하려면 고객 지원에 연락해야 합니다。'.replace('。','.'), // keep ASCII period if preferred
  },
  [normalize('To cancel/delete your account, access the account deletion link specified above and log in to your account.')]: {
    zh: '要取消/删除你的账户，请访问上方指定的账户删除链接并登录你的账户。',
    es: 'Para cancelar/eliminar tu cuenta, accede al enlace de eliminación de cuenta indicado arriba e inicia sesión en tu cuenta.',
    fr: 'Pour annuler/supprimer votre compte, accédez au lien de suppression de compte indiqué ci-dessus et connectez-vous à votre compte.',
    de: 'Um Ihr Konto zu kündigen/löschen, rufen Sie den oben angegebenen Link zur Kontolöschung auf und melden Sie sich in Ihrem Konto an.',
    it: 'Per annullare/eliminare il tuo account, accedi al link di eliminazione dell’account indicato sopra e accedi al tuo account.',
    pt: 'Para cancelar/excluir sua conta, acesse o link de exclusão de conta indicado acima e faça login na sua conta.',
    ru: 'Чтобы отменить/удалить свою учетную запись, перейдите по указанной выше ссылке удаления учетной записи и войдите в свою учетную запись.',
    tr: 'Hesabınızı iptal/silmek için, yukarıda belirtilen hesap silme bağlantısına erişin ve hesabınıza giriş yapın.',
    ja: 'アカウントを解約/削除するには、上記のアカウント削除リンクにアクセスして、自分のアカウントにログインしてください。',
    ko: '계정을 취소/삭제하려면 위에 지정된 계정 삭제 링크에 접속한 뒤 계정에 로그인하세요.'
  },
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('[translate-notes] sites_detailed.json not found at', DATA_PATH)
    process.exit(1)
  }

  const raw = fs.readFileSync(DATA_PATH, 'utf-8')
  let data
  try {
    data = JSON.parse(raw)
  } catch (e) {
    console.error('[translate-notes] Failed to parse JSON:', e.message)
    process.exit(1)
  }

  if (!Array.isArray(data)) {
    console.error('[translate-notes] Expected an array of guides in JSON.')
    process.exit(1)
  }

  const stats = {
    total: data.length,
    candidates: 0,
    translatedPerLocale: Object.fromEntries(SUPPORTED_LANGUAGES.map(l => [l, 0])),
    skippedAlreadyLocalized: 0,
    skippedNoBase: 0,
    skippedNoDict: 0,
  }

  for (const item of data) {
    const base = normalize(item.notes)
    if (!base) { stats.skippedNoBase += 1; continue }

    const dictEntry = DICT[base]
    if (!dictEntry) { stats.skippedNoDict += 1; continue }
    stats.candidates += 1

    for (const locale of SUPPORTED_LANGUAGES) {
      const key = `notes_${locale}`
      const current = normalize(item[key])
      // Translate only if it matches base (i.e., still English copy) or empty
      if (!current || current === base) {
        const translated = dictEntry[locale]
        if (translated) {
          item[key] = translated
          stats.translatedPerLocale[locale] += 1
        }
      } else {
        stats.skippedAlreadyLocalized += 1
      }
    }
  }

  try {
    const output = JSON.stringify(data, null, 2) + '\n'
    fs.writeFileSync(DATA_PATH, output, 'utf-8')
  } catch (e) {
    console.error('[translate-notes] Failed to write updated JSON:', e.message)
    process.exit(1)
  }

  console.log('[translate-notes] Summary:')
  console.log('  Total items:', stats.total)
  console.log('  Candidates with dict entry:', stats.candidates)
  console.log('  Skipped (no base notes):', stats.skippedNoBase)
  console.log('  Skipped (no dict for base):', stats.skippedNoDict)
  console.log('  Skipped (already localized):', stats.skippedAlreadyLocalized)
  console.log('  Translated per locale:')
  for (const l of SUPPORTED_LANGUAGES) {
    console.log(`    ${l}: +${stats.translatedPerLocale[l]}`)
  }

  console.log('\n[translate-notes] Done.')
}

main()