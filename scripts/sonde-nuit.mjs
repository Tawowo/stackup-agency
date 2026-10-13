/** SONDE NUIT — fait défiler une page jusqu'à un moment et lit la nuit (store et CSS). */
import { chromium } from '@playwright/test'
const [route, moment, w = '1440'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: Number(w), height: 900 } })
await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
for (const f of [0, 0.5, 1]) {
  const r = await page.evaluate(async ([m, f]) => {
    const el = document.querySelector(`[data-moment="${m}"]`)
    const top = el.getBoundingClientRect().top + window.scrollY
    const y = Math.round(top - window.innerHeight * (1 - f) * 0.5)
    window.__suLenis?.scrollTo(y, { immediate: true })
    window.scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 900))
    const items = [...document.querySelectorAll('[data-moment][data-nuit]')].map((e) => `${e.dataset.moment}:${e.dataset.nuit}@${Math.round(e.getBoundingClientRect().top + window.scrollY)}`)
    return { y, top, css: getComputedStyle(document.documentElement).getPropertyValue('--su-nuit'), items }
  }, [moment, f])
  console.log(f, JSON.stringify(r))
}
await browser.close()
