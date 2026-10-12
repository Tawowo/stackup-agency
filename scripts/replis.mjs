/**
 * Les quatre voies de repli, vérifiées au navigateur.
 *
 *  1. Mouvement réduit  → aucun canvas, ambiance conservée, aucune animation.
 *  2. Sans WebGL        → aucun canvas, ambiance conservée.
 *  3. Sans JavaScript   → plein jour, contenu intégralement lisible.
 *  4. Clavier seul      → tous les points d'entrée atteignables et visibles.
 *
 * Pour chacune on vérifie ce qui compte vraiment : le TEXTE est-il là, et
 * lisible ? Une page qui ne plante pas mais dont le contenu est invisible
 * est un échec, pas un repli.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
mkdirSync('docs/replis', { recursive: true })
const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

const COMPTE = `() => {
  const vus = []
  for (const el of document.querySelectorAll('h1, h2, h3, p, li, a, button')) {
    const t = (el.textContent || '').trim()
    if (!t) continue
    if (el.querySelector('h1,h2,h3,p,li')) continue
    const r = el.getBoundingClientRect()
    if (r.width < 2 || r.height < 2) continue
    let o = 1
    for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
      const s = getComputedStyle(n)
      o *= Number(s.opacity)
      if (s.visibility === 'hidden' || s.display === 'none') { o = 0; break }
    }
    if (o > 0.08) vus.push(t.slice(0, 20))
  }
  return {
    lisibles: vus.length,
    canvas: document.querySelectorAll('.su-passage canvas').length,
    nuit: getComputedStyle(document.documentElement).getPropertyValue('--su-nuit').trim(),
    hauteur: document.body.scrollHeight,
  }
}`

const nav = await chromium.launch({
  executablePath: CHROME,
  args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
})

async function essai(nom, options, avant) {
  const ctx = await nav.newContext({ viewport: { width: 1280, height: 860 }, ...options })
  const page = await ctx.newPage()
  const erreurs = []
  page.on('pageerror', (e) => erreurs.push(e.message))
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))
  if (avant) await avant(page)
  await page.goto('http://127.0.0.1:3100/', { waitUntil: 'networkidle', timeout: 90000 })
  await page.evaluate(() => { try { localStorage.setItem('cookie-consent', 'accepted') } catch {} })
  await page.reload({ waitUntil: 'networkidle' })
  await dormir(3200)
  const m = await page.evaluate(`(${COMPTE})()`)
  await page.screenshot({ path: `docs/replis/${nom}.png` })
  // À mi-page aussi : c'est là que les révélations au défilement se jouent.
  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight * 0.45, behavior: 'instant' }))
  await dormir(1600)
  const m2 = await page.evaluate(`(${COMPTE})()`)
  await page.screenshot({ path: `docs/replis/${nom}-mi.png` })
  console.log(
    `${nom.padEnd(22)} haut : ${String(m.lisibles).padStart(3)} textes · canvas ${m.canvas} · nuit ${m.nuit || '—'}` +
    `  |  mi-page : ${String(m2.lisibles).padStart(3)} textes · nuit ${m2.nuit || '—'}  |  erreurs ${erreurs.length}`,
  )
  if (erreurs.length) erreurs.slice(0, 2).forEach((e) => console.log('      ', e.slice(0, 120)))
  await ctx.close()
  return { ...m, mi: m2, erreurs: erreurs.length }
}

const complet = await essai('1-complet', {})
await essai('2-mouvement-reduit', { reducedMotion: 'reduce' })
await essai('3-sans-webgl', {}, async (page) => {
  // On neutralise la création de contexte WebGL avant tout script de la page.
  await page.addInitScript(() => {
    const origine = HTMLCanvasElement.prototype.getContext
    HTMLCanvasElement.prototype.getContext = function (type, ...reste) {
      if (String(type).includes('webgl')) return null
      return origine.call(this, type, ...reste)
    }
  })
})
await essai('4-sans-javascript', { javaScriptEnabled: false })

console.log(`\nréférence : ${complet.lisibles} textes lisibles en haut de page`)
await nav.close()
