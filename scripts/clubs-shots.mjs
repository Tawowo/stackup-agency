/**
 * CAPTURES DE L'OFFRE « CLUBS DE TENNIS » — chaque page du catalogue, pleine page, en 390 et 1440 px (et 768 px pour
 * la grande page, les tarifs, le simulateur et la démo), en JPEG, dans docs/offre-clubs/screenshots/.
 * La page est parcourue de haut en bas avant la capture (la lumière nuit / ivoire suit le défilement).
 * Usage : node --experimental-strip-types --no-warnings scripts/clubs-shots.mjs [http://localhost:3100]
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { CATALOGUE_CLUBS } from '../src/data/offre-clubs/catalogue.ts'

const BASE = process.argv.find((a) => a.startsWith('http')) ?? 'http://localhost:3100'
const DOSSIER = 'docs/offre-clubs/screenshots'
const PRINCIPALES = ['/clubs-de-tennis', '/clubs-de-tennis/tarifs', '/clubs-de-tennis/simulateur', '/clubs-de-tennis/demo']
mkdirSync(DOSSIER, { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] })
const nom = (c) => c.replace(/^\//, '').replace(/\//g, '--') || 'accueil'
let n = 0
for (const p of CATALOGUE_CLUBS) {
  for (const largeur of PRINCIPALES.includes(p.chemin) ? [390, 768, 1440] : [390, 1440]) {
    const page = await browser.newPage({ viewport: { width: largeur, height: largeur < 500 ? 844 : 900 }, isMobile: largeur < 500, hasTouch: largeur < 1000 })
    await page.goto(BASE + p.chemin + (p.chemin.includes('desinscription') ? '?email=bureau@club.example' : ''), { waitUntil: 'networkidle', timeout: 120000 })
    await page.waitForTimeout(800)
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 50))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(700)
    await page.screenshot({ path: `${DOSSIER}/${nom(p.chemin)}-${largeur}.jpg`, fullPage: true, type: 'jpeg', quality: 55 })
    await page.close()
    n++
  }
}
await browser.close()
console.log(`${n} captures → ${DOSSIER}`)
