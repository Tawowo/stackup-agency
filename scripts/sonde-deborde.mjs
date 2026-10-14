/** SONDE DÉBORDEMENT — liste les éléments qui dépassent la largeur de la page. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
for (const r of process.argv.slice(2)) {
  const page = await browser.newPage({ viewport: { width: Number(process.env.L ?? 1440), height: 900 } })
  await page.goto(`http://localhost:3000${r}?webgl=0`, { waitUntil: 'load' })
  await page.waitForTimeout(800)
  console.log(r, await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: innerWidth, fautifs: [...document.querySelectorAll('main *')].filter((e) => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 4).map((e) => e.tagName + '.' + String(e.className).slice(0, 30) + ' ' + Math.round(e.getBoundingClientRect().right)) })))
  await page.close()
}
await browser.close()
