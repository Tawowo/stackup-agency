import { test, expect } from '@playwright/test'

test('U3 — home sections présentes avec prix', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(1000)

  // 7 services avec prix
  const serviceCards = await page.locator('a[href^="/services/"]').count()
  expect(serviceCards, '7 cartes services').toBeGreaterThanOrEqual(7)

  // Prix visibles (€ dans les cartes)
  const prixTexts = await page.locator('text=/\\d+.*€/').count()
  expect(prixTexts, 'prix €').toBeGreaterThanOrEqual(5)

  // Section maintenance 29/44/89€
  const body = await page.content()
  expect(body, 'prix 29').toContain('29')
  expect(body, 'prix 44').toContain('44')
  expect(body, 'prix 89').toContain('89')
  // Odometer supprimé — aucune colonne de digits animée
  expect(body, 'zéro Odometer DigitColumn').not.toContain('DigitColumn')

  // images réalisations (au moins 4 dans le DOM, les autres lazy)
  const body2 = await page.content()
  const realisCount = (body2.match(/realisations/g) || []).length
  expect(realisCount, 'images realisations dans le DOM').toBeGreaterThanOrEqual(4)

  // CountUp barre de confiance — valeur finale visible
  const ticker10 = await page.locator('text=/10.*j/').count()
  expect(ticker10, 'CountUp 10j').toBeGreaterThanOrEqual(1)
})

test('U3 — tarifs — prix statiques visibles', async ({ page }) => {
  await page.goto('http://localhost:3000/tarifs', { waitUntil: 'domcontentloaded' })
  const body = await page.content()
  expect(body, '449€').toContain('449')
  expect(body, '89€').toContain('89')
  expect(body, '44€').toContain('44')
  expect(body, '29€').toContain('29')
})

test('U3 — parrainage — 89€ statique visible', async ({ page }) => {
  await page.goto('http://localhost:3000/parrainage', { waitUntil: 'domcontentloaded' })
  const body = await page.content()
  expect(body, '89€ statique').toContain('89')
  // Odometer doit être absent
  expect(body, 'pas de Odometer').not.toContain('DigitColumn')
})
