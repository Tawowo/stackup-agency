/** SONDE — lit la position et la progression d'un moment après un saut de scroll (diagnostic). */
import { chromium } from '@playwright/test'
const CHROMIUM = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
const ARGS = ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist']
const moment = process.argv[2] ?? '03'
const frac = Number(process.argv[3] ?? '0.5')
const browser = await chromium.launch({ executablePath: CHROMIUM, args: ARGS })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`http://localhost:3000/?quality=high`, { waitUntil: 'networkidle' })
await page.waitForSelector('html[data-su-ready="1"]')
const lire = async (etape) => {
  const r = await page.evaluate((m) => {
    const el = document.querySelector(`[data-moment="${m}"]`)
    const rect = el.getBoundingClientRect()
    const piste = document.querySelector('.su-pel__piste')
    return { scrollY: window.scrollY, top: rect.top + window.scrollY, height: rect.height, doc: document.documentElement.scrollHeight, pisteX: piste ? getComputedStyle(piste).transform : null, compteur: document.querySelector('.su-pel__compteur')?.textContent }
  }, moment)
  console.log(etape, JSON.stringify(r))
}
await lire('chargé')
const aller = async (f) => {
  await page.evaluate(([f, m]) => {
    const el = document.querySelector(`[data-moment="${m}"]`)
    const r = el.getBoundingClientRect()
    const top = r.top + window.scrollY
    const dist = Math.max(0, r.height - window.innerHeight)
    const y = Math.round(top + dist * f)
    window.__suLenis?.scrollTo(y, { immediate: true })
    window.scrollTo(0, y)
  }, [f, moment])
}
await aller(0)
await page.waitForTimeout(400)
await lire('après aller(0)')
await aller(frac)
await page.waitForTimeout(300)
await lire('après aller(frac) +300ms')
await page.waitForTimeout(900)
await lire('+900ms')
await page.waitForTimeout(2400)
await lire('+2400ms')
await browser.close()
