/** SONDE TOP — la nuit (CSS) en haut de page et les frontières data-nuit, pour une largeur donnée. */
import { chromium } from '@playwright/test'
const [route, w = '390'] = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const mobile = Number(w) < 768
const ctx = await browser.newContext({ viewport: { width: Number(w), height: mobile ? 844 : 900 }, isMobile: mobile, hasTouch: mobile })
const page = await ctx.newPage()
await page.goto(`http://localhost:3000${route}?quality=high&pane=0`, { waitUntil: 'networkidle' })
await page.waitForTimeout(2500)
console.log(await page.evaluate(() => ({ nuit: getComputedStyle(document.documentElement).getPropertyValue('--su-nuit'), scrollY, items: [...document.querySelectorAll('[data-moment][data-nuit]')].map((e) => `${e.dataset.moment}:${e.dataset.nuit}@${Math.round(e.getBoundingClientRect().top + scrollY)}/${Math.round(e.getBoundingClientRect().height)}`), H: innerHeight, sh: document.documentElement.scrollHeight })))
await browser.close()
