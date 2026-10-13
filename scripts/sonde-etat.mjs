/** SONDE ÉTAT — fait défiler jusqu'à un moment (fraction) et lit des clés de l'état de scène. */
import { chromium } from '@playwright/test'
const [route, moment, frac = '0', w = '390', ...cles] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(w) < 768 ? 844 : 900 } })
await page.goto(`http://localhost:3000${route}`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const r = await page.evaluate(async ([m, f, cles]) => {
  const el = document.querySelector(`[data-moment="${m}"]`)
  const r = el.getBoundingClientRect()
  const y = Math.round(r.top + window.scrollY + Math.max(0, r.height - innerHeight) * Number(f))
  window.__suLenis?.scrollTo(y, { immediate: true })
  window.scrollTo(0, y)
  await new Promise((r) => setTimeout(r, 1200))
  const e = window.__suEtat?.() ?? {}
  return { y, scrollY: window.scrollY, ...Object.fromEntries(cles.map((k) => [k, e[k]])) }
}, [moment, frac, cles])
console.log(JSON.stringify(r))
await browser.close()
