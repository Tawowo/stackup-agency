/** SONDE RENDU — deux captures à 6 px d'écart : un artefact de compositeur disparaît, un vrai défaut reste. */
import { chromium } from '@playwright/test'
const [route, moment, frac, sortie, css = ''] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
await page.goto(`http://localhost:3000${route}?quality=high&pane=0`, { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
const aller = async (dy) => page.evaluate(async ([m, f, dy]) => {
  const el = document.querySelector(`[data-moment="${m}"]`)
  const b = el.getBoundingClientRect()
  const y = Math.round(b.top + scrollY + Math.max(0, b.height - innerHeight) * Number(f)) + dy
  window.__suLenis?.scrollTo(y, { immediate: true }); scrollTo(0, y)
  await new Promise((r) => setTimeout(r, 1500))
  window.__suSettle?.(60)
}, [moment, frac, dy])
if (css) await page.addStyleTag({ content: css })
await aller(0)
await aller(6)
await page.screenshot({ path: sortie })
if (process.env.ELEM) await page.locator(process.env.ELEM).first().screenshot({ path: sortie.replace('.png', '-elem.png') })
if (process.env.EVAL) console.log(JSON.stringify(await page.evaluate(process.env.EVAL)))
await browser.close()
