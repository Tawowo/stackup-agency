/**
 * INDEXNOW — prévient Bing, Yandex et les moteurs compatibles qu'une liste d'URL a changé (Google ne l'utilise pas :
 * pour Google, le sitemap et la Search Console restent la voie).
 * À LANCER À LA MAIN, UNE FOIS LE SITE EN LIGNE (la clé doit être servie à https://stackup-agency.fr/<clé>.txt) :
 *   node scripts/indexnow.mjs            → affiche les URL qui seraient envoyées (aucun envoi)
 *   node scripts/indexnow.mjs --envoyer  → envoie la liste (jusqu'à 10 000 URL par requête)
 * Le script ne lance jamais d'envoi sans `--envoyer` : envoyer des URL est une publication.
 */
import fs from 'node:fs'
import path from 'node:path'

const HOTE = 'stackup-agency.fr'
const cle = fs.readdirSync(path.resolve(import.meta.dirname, '../public')).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.slice(0, -4)
if (!cle) throw new Error('clé IndexNow introuvable dans public/')
const index = await (await fetch(process.env.BASE ? `${process.env.BASE}/sitemap.xml` : `https://${HOTE}/sitemap.xml`)).text()
const urls = []
for (const m of index.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const x = await (await fetch(process.env.BASE ? m[1].replace(`https://${HOTE}`, process.env.BASE) : m[1])).text()
  for (const u of x.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(u[1])
}
console.log(`${urls.length} URL · clé ${cle}`)
if (!process.argv.includes('--envoyer')) {
  console.log('Simulation : aucun envoi. Relancez avec --envoyer une fois le site en ligne.')
  process.exit(0)
}
const r = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOTE, key: cle, keyLocation: `https://${HOTE}/${cle}.txt`, urlList: urls.slice(0, 10000) }),
})
console.log('Réponse IndexNow :', r.status, r.statusText)
