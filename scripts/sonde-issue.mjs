/** SONDE — lit le texte de l'overlay « Issue » de Next (dev) après un scroll complet. */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const logs = []
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`[${m.type()}] ${m.text().slice(0, 500)}`) })
page.on('pageerror', (e) => logs.push('[pageerror] ' + e.message.slice(0, 500)))
await page.goto('http://localhost:3000/?quality=high', { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]', { timeout: 30000 }).catch(() => {})
for (const m of ['01', '03', '05', '07', '09']) {
  await page.evaluate((mm) => { const el = document.querySelector(`[data-moment="${mm}"]`); const y = el.getBoundingClientRect().top + window.scrollY; window.__suLenis?.scrollTo(y, { immediate: true }); window.scrollTo(0, y) }, m)
  await page.waitForTimeout(600)
}
await page.waitForTimeout(1500)
const badge = await page.evaluate(() => { const p = document.querySelector('nextjs-portal'); const sr = p?.shadowRoot; return sr ? (sr.textContent || '').slice(0, 300) : 'pas de portal' })
console.log('portal:', badge)
console.log(logs.filter((l) => !l.includes('404') && !l.includes('THREE.Clock')).join('\n') || 'console propre')
await browser.close()
