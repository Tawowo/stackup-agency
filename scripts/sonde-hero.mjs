/** SONDE HERO — uMorph, projection, pose et layout à plusieurs p. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto('http://localhost:3000/?quality=high&pane=0', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
for (const f of [0, 0.4, 1]) {
  const r = await page.evaluate(async (f) => {
    const el = document.querySelector('[data-moment="00"]')
    const b = el.getBoundingClientRect()
    const y = Math.round(b.top + scrollY + Math.max(0, b.height - innerHeight) * f)
    window.__suLenis?.scrollTo(y, { immediate: true }); scrollTo(0, y)
    await new Promise((r) => setTimeout(r, 1500))
    const e = window.__suEtat?.() ?? {}
    return { y, morph: window.__su?.u?.uMorph?.value, proj: e.projection, pose: e.pose, layout: e.layout, target: e.target, moment: e.moment, params: e.params && { flash: e.params.flash, retard: e.params.retard, arc: e.params.arc } }
  }, f)
  console.log(f, JSON.stringify(r))
}
await browser.close()
