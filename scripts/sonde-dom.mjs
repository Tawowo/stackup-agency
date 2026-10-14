/** SONDE DOM — boîtes d'éléments (sélecteurs en argument) à un scroll donné. */
import { chromium } from '@playwright/test'
const [route, moment, frac, ...sels] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`http://localhost:3000${route}?quality=high&pane=0`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const r = await page.evaluate(async ([m, f, sels]) => {
  const el = document.querySelector(`[data-moment="${m}"]`)
  const b = el.getBoundingClientRect()
  const y = Math.round(b.top + scrollY + Math.max(0, b.height - innerHeight) * Number(f))
  window.__suLenis?.scrollTo(y, { immediate: true }); scrollTo(0, y)
  await new Promise((r) => setTimeout(r, 1200))
  const st = document.querySelector('.mq-chantier')?.getBoundingClientRect()
  const hors = st ? [...document.querySelectorAll('.mq-chantier *')].filter((e) => e.getBoundingClientRect().bottom > st.bottom + 4 && e.getBoundingClientRect().height > 20).slice(0, 8).map((e) => e.tagName + '.' + String(e.className).slice(0, 40) + ' ' + Math.round(e.getBoundingClientRect().bottom)) : []
  window.__hors = hors.concat(document.elementsFromPoint(1100, 730).slice(0, 6).map((e) => 'PT ' + e.tagName + '.' + String(e.className).slice(0, 40) + ' ' + JSON.stringify(e.getBoundingClientRect().toJSON ? [Math.round(e.getBoundingClientRect().top), Math.round(e.getBoundingClientRect().height)] : '')))
  return [['hors', [JSON.stringify(window.__hors)]], ...sels.map((s) => [s, [...document.querySelectorAll(s)].slice(0, 6).map((e) => { const r = e.getBoundingClientRect(); return [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)].join(',') })])]
}, [moment, frac, sels])
for (const [s, v] of r) console.log(s, v.join(' | '))
await browser.close()
