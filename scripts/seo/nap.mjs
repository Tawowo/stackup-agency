/**
 * COHÉRENCE NAP — nom, téléphone, e-mail, adresse identiques partout (pages, JSON-LD, llms.txt).
 * Charge les pages du sitemap, relève tout numéro de téléphone français, toute adresse e-mail et toute mention « Tours » comme adresse,
 * et signale ce qui diffère de src/config/site.ts. Code de sortie ≠ 0 au moindre écart.
 * Usage : node scripts/seo/nap.mjs [http://localhost:3100]   (serveur de production lancé)
 */
const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const ORIGINE = 'https://stackup-agency.fr'
const TEL = '0764020898'
const EMAIL = 'contact@stackup-agency.fr'
const erreurs = []

const index = await (await fetch(`${BASE}/sitemap.xml`)).text()
const chemins = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const x = await (await fetch(m[1].replace(ORIGINE, BASE))).text()
  for (const b of x.matchAll(/<loc>([^<]+)<\/loc>/g)) chemins.push(new URL(b[1]).pathname || '/')
}
chemins.push('/llms.txt', '/llms-full.txt')
const texte = (h) => h.replace(/<script(?![^>]*ld\+json)[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ')
for (let i = 0; i < chemins.length; i += 10) {
  await Promise.all(
    chemins.slice(i, i + 10).map(async (c) => {
      const r = await fetch(BASE + c)
      if (r.status !== 200) return
      const t = texte(await r.text())
      for (const m of t.matchAll(/(?:\+33|0033|\b0)\s?[1-9](?:[\s.-]?\d{2}){4}\b/g)) {
        const n = m[0].replace(/\D/g, '').replace(/^(33|0033)/, '0')
        if (n !== TEL) erreurs.push(`${c} — téléphone différent : « ${m[0]} »`)
      }
      for (const m of t.matchAll(/[\w.+-]+@stackup-agency\.fr/gi)) if (m[0].toLowerCase() !== EMAIL) erreurs.push(`${c} — e-mail différent : « ${m[0]} »`)
      if (/(?:rue|avenue|boulevard|place)[^.]{0,60}\b37000\s+Tours/i.test(t)) erreurs.push(`${c} — adresse à Tours (le siège est à Savigné-sur-Lathan)`)
      if (/(?:nos|notre|mon)\s+(?:bureaux?|locaux|agence)\s+(?:à|de)\s+Tours/i.test(t)) erreurs.push(`${c} — local revendiqué à Tours`)
    }),
  )
}
console.log(`${chemins.length} URL contrôlées · ${erreurs.length} écart(s) NAP`)
for (const e of [...new Set(erreurs)].slice(0, 60)) console.log('✗', e)
process.exit(erreurs.length ? 1 : 0)
