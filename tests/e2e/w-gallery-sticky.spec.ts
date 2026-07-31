import { test, expect } from '@playwright/test'
import path from 'path'
import fs from 'fs'

test('W2 — galerie sticky : épinglage top=0, transform progresse, 3 positions', async ({ page, isMobile }) => {
  if (isMobile) {
    test.skip(true, 'Galerie sticky desktop uniquement (lg:block)')
  }

  // Charger d'abord la page pour setter sessionStorage, puis recharger
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
  await page.evaluate(() => sessionStorage.setItem('preloader-shown', '1'))
  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(800)

  // Localiser le wrapper (hauteur (N+1)*100vh) et la scène sticky
  const wrapper = page.locator('#realisations section.lg\\:block').first()
  const scene   = page.locator('#realisations section.lg\\:block > div.sticky').first()

  await wrapper.waitFor({ state: 'visible', timeout: 5000 })

  const wBox = await wrapper.boundingBox()
  expect(wBox, 'wrapper trouvé').not.toBeNull()
  if (!wBox) return

  const vh = page.viewportSize()?.height ?? 900

  // Vérifier que le wrapper a bien la bonne hauteur (7 × 100vh pour 6 panneaux)
  expect(wBox.height, 'wrapper height ≥ 6×vh').toBeGreaterThan(5 * vh)

  // Tableau des positions : 25 %, 50 %, 75 % dans le wrapper
  const positions = [0.25, 0.50, 0.75]
  const transforms: string[] = []
  let prevTranslate = 0

  const screenshotDir = path.join('tests/e2e/screenshots')
  fs.mkdirSync(screenshotDir, { recursive: true })

  for (const frac of positions) {
    // wBox.y est relatif au viewport à scroll=0 = position absolue de départ du wrapper
    const scrollY = Math.round(wBox.y + frac * wBox.height - vh / 2)
    // behavior:'instant' évite que scroll-behavior:smooth biaise la mesure
    await page.evaluate((y) => window.scrollTo({ top: y, behavior: 'instant' }), scrollY)
    await page.waitForTimeout(300)

    // 1. La scène sticky est épinglée : son top === 0
    const sceneTop = await scene.evaluate(el => el.getBoundingClientRect().top)
    expect(Math.abs(sceneTop), `scène épinglée @ ${frac * 100}% (top=${sceneTop.toFixed(1)})`).toBeLessThan(2)

    // 2. Le track progresse (translateX de plus en plus négatif)
    const transform = await page.evaluate(() => {
      const track = document.querySelector('#realisations .lg\\:block .flex.h-full') as HTMLElement
      return track ? track.style.transform : ''
    })
    expect(transform, `transform non vide @ ${frac * 100}%`).not.toBe('')
    expect(transform, `transform non initiale @ ${frac * 100}%`).not.toBe('translateX(0vw)')
    transforms.push(transform)

    // Extraire la valeur numérique de translateX (ex: "translateX(-123.4vw)" → -123.4)
    const match = transform.match(/translateX\(([-\d.]+)vw\)/)
    if (match) {
      const translate = parseFloat(match[1])
      if (frac > 0.25) {
        expect(translate, `translateX plus négatif @ ${frac * 100}%`).toBeLessThan(prevTranslate)
      }
      prevTranslate = translate
    }

    // 3. Capture d'écran
    await page.screenshot({ path: path.join(screenshotDir, `sticky-${Math.round(frac * 100)}pct.png`) })
  }

  // Résumé console
  console.log('Transforms aux positions 25/50/75 :', transforms.join(' | '))
})

test('W2 — pas de défilement horizontal (home, tarifs, blog)', async ({ page }) => {
  const PAGES = [
    'http://localhost:3000',
    'http://localhost:3000/tarifs',
    'http://localhost:3000/blog',
  ]

  for (const url of PAGES) {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(500)

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth)
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth)
    expect(scrollWidth, `pas de scroll horizontal sur ${url}`).toBeLessThanOrEqual(clientWidth + 1)
  }
})

test('W2 — re-pass V2.b navigation retour 2 cycles', async ({ page }) => {
  for (let cycle = 1; cycle <= 2; cycle++) {
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1000)

    const h1opacity = await page.locator('h1').first().evaluate(el => parseFloat(getComputedStyle(el).opacity))
    expect(h1opacity, `Cycle ${cycle}: H1 opacity`).toBeGreaterThanOrEqual(0.9)

    const body = await page.content()
    expect(body, `Cycle ${cycle}: prix 449`).toContain('449')

    await page.goto('http://localhost:3000/tarifs', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(800)
    const tarifBody = await page.content()
    expect(tarifBody, `Cycle ${cycle}: prix 29`).toContain('29')

    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1000)

    const body2 = await page.content()
    expect(body2, `Cycle ${cycle} retour: prix 449`).toContain('449')
    expect(body2, `Cycle ${cycle} retour: Performance`).toContain('Performance')

    const h1After = await page.locator('h1').first().evaluate(el => parseFloat(getComputedStyle(el).opacity))
    expect(h1After, `Cycle ${cycle} retour: H1 opacity`).toBeGreaterThanOrEqual(0.9)
  }
})
