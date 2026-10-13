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
        if (!route.startsWith('/api/')) await page.waitForSelector('html[data-su-ready="1"]', { timeout: 20000 }).catch(() => {})
        if (etat.avant !== undefined) {
          // Approche : le haut du moment est encore à (1 − avant) × viewport sous le bord supérieur.
          await page.evaluate(([moment, avant]) => {
            const el = document.querySelector(`[data-moment="${moment}"]`)
            const top = el.getBoundingClientRect().top + window.scrollY
            const y = Math.round(top - window.innerHeight * (1 - avant))
            window.__suLenis?.scrollTo(y, { immediate: true })
            window.scrollTo(0, y)
          }, [etat.moment ?? '01', etat.avant])
          await page.waitForTimeout(600)
          await page.evaluate(() => window.__suSettle?.(150))
        }
        if (etat.scroll !== undefined) {
          // Deux temps : on s'approche (les ScrollTriggers se déclenchent dans l'ordre), puis on se cale.
          const aller = async (frac, moment) => {
            await page.evaluate(([frac, moment]) => {
              const el = document.querySelector(`[data-moment="${moment}"]`)
              const r = el ? el.getBoundingClientRect() : { top: 0, height: window.innerHeight }
              const top = r.top + window.scrollY
              const dist = Math.max(0, r.height - window.innerHeight)
              const y = frac > 1 ? document.documentElement.scrollHeight : Math.round(top + dist * frac)
              const lenis = window.__suLenis
              if (lenis) lenis.scrollTo(y, { immediate: true })
              window.scrollTo(0, y)
            }, [frac, moment])
          }
          const moment = etat.moment ?? '00'
          if (moment !== '00') {
            await aller(0, moment)
            await page.waitForTimeout(400)
          }
          if (etat.depuis !== undefined) {
            await aller(etat.depuis, moment)
            await page.waitForTimeout(2200)
          }
          await aller(etat.scroll, moment)
          if (etat.depuis === undefined) await page.waitForTimeout(900)
          // L'état qu'un visiteur à 60 i/s verrait : la simulation avance sans rendre.
          if (etat.depuis === undefined) await page.evaluate(() => window.__suSettle?.(150))
        }
        if (etat.piste !== undefined && taille.mobile) {
          await page.evaluate((k) => {
            const piste = document.querySelector('.su-pel__piste')
            if (piste) piste.scrollLeft = k * piste.clientWidth
          }, etat.piste)
          if (etat.depuis === undefined) await page.waitForTimeout(600)
        }
        if (etat.action === 'torche' || etat.action === 'clic-plaque') {
          // La torche : le pointeur se pose en bas à droite de la scène (sur le sol) ; ou clique une plaque.
          const { width, height } = taille.viewport
          const cible = etat.action === 'torche' ? [width * 0.6, height * 0.8] : [width * 0.5, height * 0.62]
          await page.mouse.move(cible[0] - 60, cible[1] - 60)
          await page.mouse.move(cible[0], cible[1], { steps: 8 })
          if (etat.action === 'clic-plaque') {
            await page.mouse.down()
            await page.mouse.up()
          }
          await page.waitForTimeout(300)
          await page.evaluate(() => window.__suSettle?.(90))
        }
        const settleApres = !!etat.action && etat.action !== 'torche' && etat.action !== 'clic-plaque' && etat.nom !== '02-transition'
        if (etat.action === 'touche3') await page.keyboard.press('3')
        if (etat.action?.startsWith('noeud')) await page.locator('.su-mac__noeud').nth(Number(etat.action.slice(5)) - 1).click()
        if (etat.action === 'focus-offre2') await page.locator('.su-prix__offre').nth(1).focus()
        if (etat.action?.startsWith('conf-')) {
          await page.locator('.su-conf__type').nth(1).click()
          if (etat.action !== 'conf-type') {
            const cases = page.locator('[data-temps="2"] .su-conf__case input')
            for (let k = 0; k < 3; k++) await cases.nth(k).check()
          }
          if (etat.action === 'conf-options') {
            await page.locator('input[name="maintenance"]').nth(2).check()
            await page.locator('input[name="redaction"]').nth(1).check()
          }
        }
        if (etat.action === 'ctc-vide') await page.locator('.su-ctc__form button[type="submit"]').click()
        if (etat.action === 'ctc-remplir') {
          await page.fill('#su-ctc-prenom', 'Camille')
          await page.fill('#su-ctc-nom', 'Durand')
          await page.fill('#su-ctc-entreprise', 'Menuiserie Durand')
          await page.fill('#su-ctc-email', 'camille@exemple.fr')
          await page.locator('input[name="rgpd"]').check()
          await page.locator('#su-ctc-prenom').focus()
        }
        if (etat.action?.startsWith('onglet')) {
          const k = Number(etat.action.slice(6))
          await page.locator('.su-off__onglet').nth(k - 1).click()
        }
        if (etat.action === 'menu') {
          await page.locator('.su-nav__menu').click()
        }
        if (etat.action === 'drag') {
          const box = await page.locator('[data-su-frame]').first().boundingBox()
          const cx = box.x + box.width / 2
          const cy = box.y + box.height / 2
          await page.mouse.move(cx - 120, cy)
          await page.mouse.down()
          for (let i = 1; i <= 12; i++) await page.mouse.move(cx - 120 + i * 20, cy + i * 2, { steps: 2 })
          await page.mouse.up()
          await page.waitForTimeout(150)
        }
        if (etat.attente) await page.waitForTimeout(etat.attente)
        // Après un geste : l'état final qu'un visiteur à 60 i/s verrait (tweens de scène avancés sans rendre).
        if (settleApres) await page.evaluate(() => window.__suSettle?.(150))
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
