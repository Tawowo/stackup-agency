/**
 * Mesure du MONOLITHE dans un vrai navigateur.
 *
 * Ce script n'interprète rien : il lit les valeurs que la scène publie
 * elle-même sur `window.__SU_LAB`, capture des images à des instants précis
 * de l'animation, et relève les erreurs console. Tout ce qu'il affiche a été
 * produit par une exécution réelle.
 */
import { chromium } from 'playwright'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://127.0.0.1:3100'
const SORTIE = 'docs/lab'
mkdirSync(SORTIE, { recursive: true })

const dormir = (ms) => new Promise((r) => setTimeout(r, ms))

async function main() {
  const navigateur = await chromium.launch({
    // Le Chromium complet du conteneur, et non le « headless shell » que
    // Playwright cherche par défaut : seul le binaire complet expose WebGL.
    executablePath: process.env.CHROME_PATH ?? '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: [
      // Sans ces drapeaux, Chromium headless refuse WebGL dans ce conteneur
      // (pas de GPU). SwiftShader fournit un rendu logiciel : les mesures sont
      // donc un plancher très pessimiste, ce qui est précisé dans le rapport.
      '--use-gl=swiftshader',
      '--enable-unsafe-swiftshader',
      '--disable-gpu-sandbox',
    ],
  })

  const resultats = { captures: [], erreurs: [], releves: [], webglActif: null }

  // ---------- 1. Scène au banc de mesure ----------
  const page = await navigateur.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('console', (m) => {
    if (m.type() === 'error') resultats.erreurs.push(`[lab] ${m.text()}`)
  })
  page.on('pageerror', (e) => resultats.erreurs.push(`[lab][pageerror] ${e.message}`))

  await page.goto(`${BASE}/lab`, { waitUntil: 'networkidle' })

  // Le diagnostic affiché par la page dit si WebGL a réellement démarré.
  const diagnostic = await page
    .locator('[data-diagnostic]').textContent()
    .catch(() => null)
  resultats.webglActif = diagnostic?.trim() ?? 'inconnu'

  // Captures aux instants clés de l'assemblage (la scène dure 1,8 s).
  const instants = [250, 600, 1100, 1900, 3200]
  let precedent = 0
  for (const t of instants) {
    await dormir(t - precedent)
    precedent = t
    const fichier = `${SORTIE}/monolithe-assemblage-${String(t).padStart(4, '0')}ms.png`
    await page.locator('.su-scene').first().screenshot({ path: fichier })
    resultats.captures.push(fichier)
  }

  // Relevés pendant 6 s de régime établi, avec captures du balayage.
  // La bande de lumière fait un tour en ~11,8 s : capturer toutes les 2,5 s
  // la montre à des hauteurs différentes de la pile.
  for (let i = 0; i < 12; i++) {
    await dormir(500)
    const r = await page.evaluate(() => window.__SU_LAB ?? null)
    if (r) resultats.releves.push(r)
    if (i % 5 === 4) {
      const fichier = `${SORTIE}/monolithe-balayage-${i}.png`
      await page.locator('.su-scene').first().screenshot({ path: fichier })
      resultats.captures.push(fichier)
    }
  }

  // Désassemblage : on pousse le curseur et on capture.
  for (const valeur of [0.3, 0.6, 1]) {
    await page.locator('input[type=range]').fill(String(valeur))
    await dormir(500)
    const fichier = `${SORTIE}/monolithe-desassemblage-${String(valeur).replace('.', '')}.png`
    await page.locator('.su-scene').first().screenshot({ path: fichier })
    resultats.captures.push(fichier)
  }

  // ---------- 2. Vérification de la libération des ressources ----------
  // On quitte la page puis on revient 6 fois. Si la scène ne libérait pas son
  // contexte, le plafond du navigateur (~16) serait atteint et la création
  // finirait par échouer — le diagnostic changerait.
  let diagnosticApresCycles = null
  for (let i = 0; i < 6; i++) {
    await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded' })
    await page.goto(`${BASE}/lab`, { waitUntil: 'networkidle' })
    await dormir(400)
    diagnosticApresCycles = await page
      .locator('[data-diagnostic]').textContent()
      .catch(() => null)
  }
  resultats.diagnosticApres6Cycles = diagnosticApresCycles?.trim() ?? 'inconnu'

  // ---------- 3. Mouvement réduit : la scène doit refuser de démarrer ----------
  const pageReduite = await navigateur.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
  })
  await pageReduite.goto(`${BASE}/lab`, { waitUntil: 'networkidle' })
  await dormir(1200)
  resultats.diagnosticMouvementReduit = (
    await pageReduite.locator('[data-diagnostic]').textContent().catch(() => null)
  )?.trim()
  resultats.canvasEnMouvementReduit = await pageReduite.locator('.su-scene canvas').count()
  await pageReduite.close()

  await navigateur.close()

  writeFileSync(`${SORTIE}/mesures.json`, JSON.stringify(resultats, null, 2))

  // ---------- Rapport console ----------
  console.log('\n═══ MESURES DU MONOLITHE ═══\n')
  console.log('Diagnostic scène      :', resultats.webglActif)
  console.log('Après 6 montages      :', resultats.diagnosticApres6Cycles)
  console.log('En mouvement réduit   :', resultats.diagnosticMouvementReduit)
  console.log('Canvas si mvt réduit  :', resultats.canvasEnMouvementReduit, '(doit être 0)')
  console.log('Erreurs console       :', resultats.erreurs.length)
  if (resultats.erreurs.length) resultats.erreurs.slice(0, 5).forEach((e) => console.log('   ', e))

  if (resultats.releves.length) {
    const temps = resultats.releves.map((r) => r.tempsTrame)
    const moy = temps.reduce((a, b) => a + b, 0) / temps.length
    console.log('\nRelevés (' + resultats.releves.length + ' échantillons) :')
    console.log('  palier final        :', resultats.releves.at(-1).palier)
    console.log('  instances           :', resultats.releves.at(-1).instances)
    console.log('  temps de trame moy. :', moy.toFixed(2), 'ms')
    console.log('  min / max           :', Math.min(...temps).toFixed(2), '/', Math.max(...temps).toFixed(2), 'ms')
    console.log('  cadence équivalente :', Math.round(1000 / moy), 'fps')
    console.log('  paliers traversés   :', [...new Set(resultats.releves.map((r) => r.palier))].join(' → '))
  } else {
    console.log('\nAucun relevé — la scène n’a pas démarré.')
  }

  console.log('\nCaptures :', resultats.captures.length, '→', SORTIE)
}

main().catch((e) => {
  console.error('ÉCHEC DU BANC :', e)
  process.exit(1)
})
