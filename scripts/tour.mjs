/**
 * TOUR — chaque route du sitemap ouverte une fois (1440, repli 2D pour la vitesse) :
 * statut, erreurs console, page vide, débordement horizontal ; une vignette par route
 * dans docs/qa/tour/ (ignoré par git). Sortie : docs/qa/tour.json.
 */
import { chromium } from '@playwright/test'
import { mkdirSync, writeFileSync } from 'node:fs'
const BASE = process.env.SHOTS_BASE ?? 'http://localhost:3000'
const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const routes = [...xml.matchAll(/<loc>https:\/\/stackup-agency\.fr([^<]*)<\/loc>/g)].map((m) => m[1] || '/')
mkdirSync('docs/qa/tour', { recursive: true })
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
const resultats = []
for (const r of routes) {
  const page = await ctx.newPage()
  const erreurs = []
  page.on('console', (m) => m.type() === 'error' && erreurs.push(m.text().slice(0, 200)))
  page.on('pageerror', (e) => erreurs.push('pageerror ' + e.message.slice(0, 200)))
  const rep = await page.goto(`${BASE}${r}${r.includes('?') ? '&' : '?'}webgl=0`, { waitUntil: 'load', timeout: 120000 }).catch((e) => null)
  await page.waitForTimeout(500)
  const etat = await page.evaluate(() => ({ texte: document.querySelector('main')?.innerText.trim().length ?? 0, deborde: document.documentElement.scrollWidth > innerWidth + 1, h1: document.querySelectorAll('h1').length })).catch(() => ({ texte: 0, deborde: false, h1: 0 }))
  await page.screenshot({ path: `docs/qa/tour/${r.replace(/\W+/g, '_') || 'accueil'}.jpg`, type: 'jpeg', quality: 50 }).catch(() => {})
  const ok = rep?.status() === 200 && !erreurs.length && etat.texte > 200 && !etat.deborde && etat.h1 === 1
  resultats.push({ route: r, statut: rep?.status() ?? 0, ...etat, erreurs, ok })
  if (!ok) console.log('✗', r, rep?.status(), JSON.stringify(etat), erreurs.join(' | '))
  await page.close()
}
await browser.close()
writeFileSync('docs/qa/tour.json', JSON.stringify({ date: new Date().toISOString(), total: resultats.length, ko: resultats.filter((x) => !x.ok).length, resultats }, null, 1))
console.log(`${resultats.length} routes, ${resultats.filter((x) => !x.ok).length} en défaut`)
