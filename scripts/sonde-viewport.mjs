/** SONDE VIEWPORT — dimensions vues par la page en émulation mobile. */
import { chromium } from '@playwright/test'
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome', args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] })
const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
await page.goto('http://localhost:3000/agence-web/tours?quality=high&pane=0', { waitUntil: 'networkidle' })
await page.waitForTimeout(1500)
console.log(await page.evaluate(() => ({ iw: innerWidth, cw: document.documentElement.clientWidth, sw: document.documentElement.scrollWidth, vv: visualViewport?.width, dpr: devicePixelRatio, canvas: [...document.querySelectorAll('canvas')].map((c) => [c.clientWidth, c.width]), meta: document.querySelector('meta[name=viewport]')?.content, large: [...document.querySelectorAll('body *')].filter((e) => e.getBoundingClientRect().right > 400).slice(0, 5).map((e) => e.tagName + '.' + String(e.className).slice(0, 40) + ' ' + Math.round(e.getBoundingClientRect().right)) })))
await browser.close()
