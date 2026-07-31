import { test, expect } from '@playwright/test'

test('V2.b — navigation retour 2 cycles: prix et sections visibles', async ({ page }) => {
  for (let cycle = 1; cycle <= 2; cycle++) {
    // Home
    await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(1500)

    // H1 visible
    const h1 = page.locator('h1').first()
    const h1opacity = await h1.evaluate(el => parseFloat(getComputedStyle(el).opacity))
    expect(h1opacity, `Cycle ${cycle}: H1 opacity`).toBeGreaterThanOrEqual(0.9)

    // 7 cartes services avec prix
    const cards = page.locator('a[href^="/services/"]')
    const cardCount = await cards.count()
    expect(cardCount, `Cycle ${cycle}: 7 cartes services`).toBeGreaterThanOrEqual(7)

    // Prix dans les cartes
    const body = await page.content()
    expect(body, `Cycle ${cycle}: prix 449`).toContain('449')

    // Naviguer vers tarifs
    await page.click('a[href="/tarifs"]')
    await page.waitForTimeout(1000)

    // 3 prix maintenance visibles
    const tarifBody = await page.content()
    expect(tarifBody, `Cycle ${cycle}: prix 29`).toContain('29')
    expect(tarifBody, `Cycle ${cycle}: prix 44`).toContain('44')
    expect(tarifBody, `Cycle ${cycle}: prix 89`).toContain('89')

    // Retour accueil via logo
    await page.click('a[aria-label*="Accueil"]')
    await page.waitForTimeout(1500)

    // Vérifier sections encore visibles
    const body2 = await page.content()
    expect(body2, `Cycle ${cycle} retour: prix 449`).toContain('449')
    expect(body2, `Cycle ${cycle} retour: realisations`).toContain('realisations')
    expect(body2, `Cycle ${cycle} retour: manifeste Performance`).toContain('Performance')

    // H1 visible après retour
    const h1After = page.locator('h1').first()
    const h1AfterOpacity = await h1After.evaluate(el => parseFloat(getComputedStyle(el).opacity))
    expect(h1AfterOpacity, `Cycle ${cycle} retour: H1 opacity`).toBeGreaterThanOrEqual(0.9)
  }
})

test('V1.d — clics CTA → /contact (local)', async ({ page }) => {
  const PAGES = [
    { url: 'http://localhost:3000', name: 'home' },
    { url: 'http://localhost:3000/tarifs', name: 'tarifs' },
    { url: 'http://localhost:3000/creation-site-internet/restaurant', name: 'restaurant' },
    { url: 'http://localhost:3000/parrainage', name: 'parrainage' },
  ]

  for (const { url, name } of PAGES) {
    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(800)

    // Clic navbar "Devis gratuit"
    const navCTA = page.locator('nav a[href="/contact"]').first()
    await navCTA.click()
    await page.waitForURL('**/contact', { timeout: 8000 })
    expect(page.url(), `${name}: navbar CTA → /contact`).toContain('/contact')

    // Formulaire visible
    const form = page.locator('form').first()
    await expect(form, `${name}: formulaire contact visible`).toBeVisible({ timeout: 5000 })

    await page.goto(url, { waitUntil: 'domcontentloaded' })
    await page.waitForTimeout(800)
  }
})

test('V3 — galerie sticky: 6 panneaux, transform progresse', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  // 6 panneaux desktop
  const panels = page.locator('#realisations .lg\\:block [style*="100vw"]')
  const panelCount = await panels.count()
  expect(panelCount, '6 panneaux galerie').toBe(6)

  // Scroller jusqu'à la galerie et vérifier la transform
  const gallery = page.locator('#realisations section.lg\\:block')
  await gallery.scrollIntoViewIfNeeded()
  await page.waitForTimeout(500)

  // Scroller au milieu de la galerie
  const box = await gallery.boundingBox()
  if (box) {
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), box.y + box.height / 2)
    await page.waitForTimeout(300)
  }

  const transform = await page.evaluate(() => {
    const track = document.querySelector('#realisations .lg\\:block .flex.h-full') as HTMLElement
    return track ? track.style.transform : 'none'
  })
  expect(transform, 'track transform non-nulle au milieu').not.toBe('translateX(0vw)')
  expect(transform, 'track transform non vide').not.toBe('')
})
