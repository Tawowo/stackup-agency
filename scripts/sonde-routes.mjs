/** SONDE — ouvre une liste de routes, rapporte statut HTTP, erreurs console et page vide. */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const routes = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
let ko = 0
for (const r of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  const erreurs = []
  page.on('console', (m) => { if (m.type() === 'error' && !/favicon|404 \(Not Found\)/.test(m.text())) erreurs.push(m.text().slice(0, 220)) })
  page.on('pageerror', (e) => erreurs.push('pageerror ' + e.message.slice(0, 220)))
  const rep = await page.goto(`http://localhost:3000${r}`, { waitUntil: 'networkidle', timeout: 90000 }).catch((e) => ({ status: () => 'ERR ' + e.message.slice(0, 80) }))
  await page.waitForTimeout(1200)
  const texte = await page.evaluate(() => document.querySelector('main')?.innerText.trim().length ?? 0).catch(() => 0)
  const st = rep?.status?.()
  const ok = st === 200 && !erreurs.length && texte > 200
  if (!ok) ko++
  console.log(`${ok ? '✓' : '✗'} ${st} ${r} · texte ${texte}${erreurs.length ? '\n   ' + erreurs.join('\n   ') : ''}`)
  await page.close()
}
await browser.close()
console.log(ko ? `${ko} route(s) en défaut` : 'toutes les routes OK')
