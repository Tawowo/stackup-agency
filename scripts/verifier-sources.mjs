/**
 * TOUTE SOURCE CITÉE RÉPOND-ELLE ?
 *
 * Pourquoi ce script existe : la section « Le juste prix » citait un article
 * du site à l'appui de sa comparaison de coûts, et le lien rendait 404. Rien
 * ne l'avait signalé — le build passait, le lint passait, la page s'affichait
 * parfaitement. L'article existait bien dans le dépôt, mais sa date de
 * publication était dans le futur, donc il n'était pas servi.
 *
 * Citer une source qui ne résout pas est pire que ne pas en citer : le
 * lecteur qui va vérifier trouve une page d'erreur, et c'est toute la
 * comparaison qui devient douteuse. Le dossier n'autorise les comparaisons de
 * prix QUE sourcées (§15.3) ; une source morte annule l'autorisation.
 *
 * Ce que le script fait : il relève tous les liens internes écrits en dur
 * dans les composants — ceux qui servent de référence, pas la navigation —
 * et vérifie que chacun répond 200. Les dates de publication bougent, les
 * articles sont renommés : sans vérification, personne ne s'en aperçoit.
 *
 * Usage : node scripts/verifier-sources.mjs [base]
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

const BASE = process.argv[2] ?? 'http://localhost:3100'

/** Les dossiers où un lien écrit en dur est une CITATION, pas une nav. */
const RACINES = ['src/components', 'src/app', 'src/data', 'src/lib']

function fichiers(dir) {
  const out = []
  for (const e of readdirSync(dir)) {
    const p = join(dir, e)
    if (statSync(p).isDirectory()) out.push(...fichiers(p))
    else if (/\.(tsx?|ts)$/.test(e)) out.push(p)
  }
  return out
}

const liens = new Map() // url → Set de fichiers
for (const racine of RACINES) {
  for (const f of fichiers(racine)) {
    const texte = readFileSync(f, 'utf8')
    /* On ne retient que /blog/… et /solutions/… : ce sont les deux familles
       citées comme référence. Les liens de navigation (/tarifs, /contact)
       sont couverts par le crawl de liens, qui a son propre script. */
    for (const m of texte.matchAll(/['"`](\/(?:blog|solutions)\/[a-z0-9-]+)['"`]/g)) {
      if (!liens.has(m[1])) liens.set(m[1], new Set())
      liens.get(m[1]).add(f)
    }
  }
}

console.log(`${liens.size} source(s) citée(s) en dur dans le code\n`)

let morts = 0
for (const [url, fs] of [...liens].sort()) {
  let code = 0
  try {
    const r = await fetch(BASE + url, { redirect: 'follow' })
    code = r.status
  } catch {
    code = 0
  }
  const ok = code === 200
  if (!ok) {
    morts++
    console.log(`✗ ${code || 'injoignable'}  ${url}`)
    for (const f of fs) console.log(`        cité par ${f}`)
  }
}

if (morts === 0) {
  console.log('✓ toutes les sources citées répondent')
} else {
  console.log(`\n✗ ${morts} source(s) citée(s) ne répond(ent) pas`)
}
process.exit(morts === 0 ? 0 : 1)
