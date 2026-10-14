/** SANS JS — chaque route passée s'ouvre JavaScript coupé : texte présent, rien de masqué (opacité / clip). */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
for (const r of process.argv.slice(2)) {
  const page = await ctx.newPage()
  await page.goto(`http://localhost:3000${r}`, { waitUntil: 'load', timeout: 120000 })
  await page.waitForTimeout(2500)
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1500)
  const e = await page.evaluate(() => {
    const caches = []
    for (const el of document.querySelectorAll('main h1, main h2, main h3, main p, main li, main a, main button')) {
      const cs = getComputedStyle(el)
      const rect = el.getBoundingClientRect()
      const clip = cs.clipPath && cs.clipPath !== 'none' && /inset\((?:[^)]*100%)/.test(cs.clipPath)
      if (el.innerText?.trim() && (Number(cs.opacity) < 0.1 || cs.visibility === 'hidden' || clip || rect.width === 0)) caches.push(el.tagName + ' ' + el.innerText.trim().slice(0, 40) + ' [' + (clip ? cs.clipPath : cs.opacity + '/' + cs.visibility + '/' + rect.width) + ']')
    }
    return { texte: document.querySelector('main')?.innerText.length ?? 0, caches: caches.slice(0, 6), n: caches.length }
  })
  console.log(e.n ? '✗' : '✓', r, 'texte', e.texte, e.n ? `${e.n} masqués : ${e.caches.join(' ; ')}` : '')
  await page.close()
}
await browser.close()
