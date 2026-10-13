/**
 * Observation du PASSAGE dans un vrai navigateur.
 *
 * Capture la page d'accueil à des positions de défilement précises, en
 * laissant à chaque fois la scène se stabiliser. Relève aussi, à chaque
 * palier : l'état de scène actif, la valeur d'ambiance, la cadence, et les
 * couleurs effectivement calculées du fond et du texte.
 *
 * Ce n'est pas un test de présence : on vérifie ce qui est À L'ÉCRAN.
 *
 * Usage : node scripts/observer-passage.mjs [largeur]
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const CHROME =
  process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const LARGEUR = Number(process.argv[2] ?? process.env.LARGEUR ?? 1440)
const SORTIE = `docs/passage/${LARGEUR}`

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  mkdirSync(SORTIE, { recursive: true })

  const navigateur = await chromium.launch({
    executablePath: CHROME,
    args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--disable-gpu-sandbox'],
  })
  const ctx = await navigateur.newContext({
    viewport: { width: LARGEUR, height: LARGEUR < 700 ? 844 : 900 },
    ...(LARGEUR < 700 ? { isMobile: true, hasTouch: true, deviceScaleFactor: 2 } : {}),
  })
  const page = await ctx.newPage()

  const erreurs = []
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text()))
  page.on('pageerror', (e) => erreurs.push(`pageerror: ${e.message}`))

  await page.goto(`${BASE}/`, { waitUntil: 'networkidle', timeout: 60000 })
  // Consentement : le bandeau masque le bas de chaque capture.
  await page.evaluate(() => {
    try { localStorage.setItem('cookie-consent', 'accepted') } catch {}
  })
  await page.reload({ waitUntil: 'networkidle' })

  // Laisse l'ouverture se jouer entièrement.
  await dormir(4000)

  const hauteur = await page.evaluate(() => document.body.scrollHeight)
  const vue = await page.evaluate(() => window.innerHeight)
  console.log(`page : ${hauteur} px · fenêtre : ${vue} px · ${LARGEUR}px de large`)

  const releves = []
  const pas = 11

  for (let i = 0; i < pas; i++) {
    const cible = Math.round(((hauteur - vue) * i) / (pas - 1))
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), cible)
    // La scène lisse ses valeurs : il faut lui laisser atteindre sa cible.
    await dormir(1700)

    const m = await page.evaluate(() => {
      const racine = document.documentElement
      const nuit = Number(getComputedStyle(racine).getPropertyValue('--su-nuit')) || 0
      const corps = getComputedStyle(document.body)
      // Un titre visible à l'écran, pour mesurer le contraste réel.
      // Opacité EFFECTIVE : un élément dont un ancêtre est à 0 n'est pas
      // visible, et mesurer son contraste n'apprend rien. On remonte donc la
      // chaîne. Seuil à 0,05 : au-dessus, le texte se voit et doit tenir ses
      // ratios ; en dessous, il est signalé comme masqué, jamais ignoré en
      // silence.
      const opaciteEffective = (el) => {
        let o = 1
        for (let n = el; n && n !== document.documentElement; n = n.parentElement) {
          o *= Number(getComputedStyle(n).opacity)
          if (o < 0.001) break
        }
        return o
      }
      const titres = [...document.querySelectorAll('h1, h2, .su-seuil__mot')]
      const dansLaVue = titres.filter((t) => {
        const r = t.getBoundingClientRect()
        return r.top < window.innerHeight * 0.9 && r.bottom > window.innerHeight * 0.1
      })
      const masques = dansLaVue.filter((t) => opaciteEffective(t) <= 0.05).length
      const visible = dansLaVue.find((t) => opaciteEffective(t) > 0.05)
      return {
        y: Math.round(window.scrollY),
        nuit: Number(nuit.toFixed(3)),
        fond: corps.backgroundColor,
        titre: visible ? getComputedStyle(visible).color : null,
        texteTitre: visible ? (visible.textContent ?? '').trim().slice(0, 42) : null,
        canvas: document.querySelectorAll('.su-passage canvas').length,
        masques,
      }
    })

    const fichier = `${SORTIE}/${String(i).padStart(2, '0')}-y${m.y}.png`
    await page.screenshot({ path: fichier })
    releves.push({ ...m, fichier })
    process.stdout.write(
      `  ${String(i).padStart(2)} · y=${String(m.y).padStart(5)} · nuit=${m.nuit.toFixed(2)} · ${m.fond}\n`,
    )
  }

  // ── Contraste réel à chaque palier ────────────────────────────────────
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
  const lire = (css) => {
    const m = String(css).match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/)
    return m ? [+m[1], +m[2], +m[3]] : null
  }
  const lum = ([r, g, b]) => 0.2126 * lin(r / 255) + 0.7152 * lin(g / 255) + 0.0722 * lin(b / 255)
  const ratio = (a, b) => {
    const l1 = lum(a)
    const l2 = lum(b)
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
  }

  console.log('\n── contraste titre / fond à chaque palier ──')
  let pire = Infinity
  for (const r of releves) {
    if (!r.titre) continue
    const f = lire(r.fond)
    const t = lire(r.titre)
    if (!f || !t) continue
    const c = ratio(f, t)
    r.contraste = Math.round(c * 100) / 100
    pire = Math.min(pire, c)
    console.log(
      `  y=${String(r.y).padStart(5)} nuit=${r.nuit.toFixed(2)} → ${c.toFixed(2)}:1 ${c < 4.5 ? '⚠' : '✓'}  « ${r.texteTitre} »${r.masques ? ` (${r.masques} masqué·s)` : ''}`,
    )
  }
  console.log(`\n  pire contraste observé : ${pire === Infinity ? 'n/a' : pire.toFixed(2) + ':1'}`)

  console.log(`\nerreurs console : ${erreurs.length}`)
  erreurs.slice(0, 4).forEach((e) => console.log('   ', e.slice(0, 150)))

  writeFileSync(`${SORTIE}/releves.json`, JSON.stringify({ hauteur, releves, erreurs }, null, 2))
  console.log(`\n→ ${SORTIE}`)

  await navigateur.close()
}

main().catch((e) => {
  console.error('ÉCHEC :', e)
  process.exit(1)
})
