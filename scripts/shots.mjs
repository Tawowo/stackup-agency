/**
 * CAPTURES PLAYWRIGHT — `npm run shots [--route=/lab] [--etat=logo]`.
 * Démarre le serveur si besoin, prend chaque état aux deux largeurs, avec et
 * sans mouvement réduit. Les fichiers sont ensuite OUVERTS et LUS (règle 2) et
 * commentés dans docs/qa/rapport.json — ce script ne fait que les produire.
 */
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'
import { spawn } from 'node:child_process'
import { ROUTES } from './shots.config.ts'
import { compresser } from './compresser-png.mjs'

const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1]
const seulRoute = arg('route')
const seulEtat = arg('etat')

const TAILLES = [
  { nom: '1440', viewport: { width: 1440, height: 900 }, mobile: false },
  { nom: '390', viewport: { width: 390, height: 844 }, mobile: true, deviceScaleFactor: 2 },
]

async function serveurPret() {
  try {
    const r = await fetch(BASE)
    return r.ok
  } catch {
    return false
  }
}

async function demarrer() {
  if (await serveurPret()) return null
  const p = spawn('npx', ['next', 'dev'], { stdio: 'ignore', detached: false })
  for (let i = 0; i < 90; i++) {
    await new Promise((r) => setTimeout(r, 1000))
    if (await serveurPret()) return p
  }
  p.kill()
  throw new Error('serveur injoignable')
}

export async function capturer({ route, dossier, etats }, browser, filtreEtat) {
  const sorties = []
  for (const etat of etats) {
    if (filtreEtat && etat.nom !== filtreEtat) continue
    for (const taille of TAILLES) {
      if (etat.largeurs && !etat.largeurs.includes(Number(taille.nom))) continue
      for (const rm of [false, true]) {
        if (rm && etat.sansRm) continue
        const ctx = await browser.newContext({
          viewport: taille.viewport,
          deviceScaleFactor: taille.deviceScaleFactor ?? 1,
          isMobile: taille.mobile,
          hasTouch: taille.mobile,
          reducedMotion: rm ? 'reduce' : 'no-preference',
        })
        const page = await ctx.newPage()
        const url = `${BASE}${route}${etat.query ? `?${etat.query}` : ''}`
        await page.goto(url, { waitUntil: 'networkidle' })
        await page.waitForSelector('html[data-su-ready="1"]', { timeout: 20000 }).catch(() => {})
        if (etat.scroll !== undefined) {
          await page.evaluate((frac) => {
            const el = document.querySelector('[data-moment="00"]')
            const dist = el ? el.getBoundingClientRect().height - window.innerHeight : window.innerHeight
            const y = Math.round(dist * frac)
            const lenis = window.__suLenis
            if (lenis) lenis.scrollTo(y, { immediate: true })
            window.scrollTo(0, y)
          }, etat.scroll)
          await page.waitForTimeout(900)
        }
        if (etat.action === 'menu') {
          await page.locator('.su-nav__menu').click()
        }
        if (etat.action === 'drag') {
          const box = await page.locator('[data-su-frame]').boundingBox()
          const cx = box.x + box.width / 2
          const cy = box.y + box.height / 2
          await page.mouse.move(cx - 120, cy)
          await page.mouse.down()
          for (let i = 1; i <= 12; i++) await page.mouse.move(cx - 120 + i * 20, cy + i * 2, { steps: 2 })
          await page.mouse.up()
          await page.waitForTimeout(150)
        }
        if (etat.attente) await page.waitForTimeout(etat.attente)
        const dir = `docs/qa/shots/${dossier}`
        mkdirSync(dir, { recursive: true })
        const fichier = `${dir}/${etat.nom}-${taille.nom}${rm ? '-rm' : ''}.png`
        await page.screenshot({ path: fichier, fullPage: false })
        await compresser(fichier)
        sorties.push({ fichier, route, etat: etat.nom, largeur: Number(taille.nom), rm })
        console.log('✓', fichier)
        await ctx.close()
      }
    }
  }
  return sorties
}

async function main() {
  const serveur = await demarrer()
  const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
  try {
    for (const r of ROUTES) {
      if (seulRoute && r.route !== seulRoute) continue
      await capturer(r, browser, seulEtat)
    }
  } finally {
    await browser.close()
    serveur?.kill()
  }
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((e) => {
  console.error(e)
  process.exit(1)
})
