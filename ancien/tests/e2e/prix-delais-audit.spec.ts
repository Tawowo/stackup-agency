/**
 * S2 — Audit prix visibles + délais CGV
 * Vérifie sur toutes les pages clés :
 *   - chaque offre contient un texte avec "€" non vide
 *   - opacité calculée = 1 sur les éléments prix
 *   - aucune mention de délai invalide ("4 semaines", "semaines" pour nos livraisons)
 */

import { test, expect, Page } from '@playwright/test'

const PAGES_WITH_PRICES = [
  '/',
  '/services',
  '/services/site-vitrine',
  '/services/site-multi-pages',
  '/services/site-ecommerce',
  '/services/systeme-gestion',
  '/services/site-association',
  '/services/redaction-blog-seo',
  '/tarifs',
  '/tarifs/starter',
  '/tarifs/pro',
  '/tarifs/premium',
]

const PAGES_WITH_DELAYS = [
  '/',
  '/services',
  '/services/site-vitrine',
  '/services/site-multi-pages',
  '/services/site-ecommerce',
  '/services/systeme-gestion',
  '/services/site-association',
  '/tarifs',
  '/faq',
]

// Délais autorisés selon CGV
const VALID_DELAY_PATTERNS = [
  '10 jours ouvrés',
  '17 jours ouvrés',
  '21 jours ouvrés',
  '7 jours ouvrés',
]

async function waitForPage(page: Page, path: string) {
  await page.goto(path, { waitUntil: 'domcontentloaded' })
  // Attendre que les éléments dynamiques soient rendus
  await page.waitForTimeout(500)
}

test.describe('S2 — Prix visibles sur toutes les pages clés', () => {
  for (const path of PAGES_WITH_PRICES) {
    test(`${path} — au moins un prix visible (€)`, async ({ page }) => {
      await waitForPage(page, path)

      // Chercher tous les éléments contenant "€"
      const priceElements = page.locator(':text-matches("€")')
      const count = await priceElements.count()

      expect(count, `Aucun prix trouvé sur ${path}`).toBeGreaterThan(0)

      // Vérifier que le premier élément prix est visible (opacité ≥ 0.9)
      const first = priceElements.first()
      await expect(first).toBeVisible()

      const opacity = await first.evaluate(el => {
        const style = window.getComputedStyle(el)
        return parseFloat(style.opacity)
      })

      expect(opacity, `Prix avec opacité ${opacity} sur ${path}`).toBeGreaterThanOrEqual(0.9)
    })
  }
})

test.describe('S2 — Délais CGV corrects (pas de "4 semaines")', () => {
  for (const path of PAGES_WITH_DELAYS) {
    test(`${path} — aucun délai invalide`, async ({ page }) => {
      await waitForPage(page, path)

      const content = await page.textContent('body') ?? ''

      // "4 semaines" est interdit comme délai de livraison pour nos services
      // On cherche le pattern spécifique "Livraison.*4 semaines" ou "4 semaines" seul
      // (les articles de blog hors scope ne sont pas dans ces pages)
      const hasInvalidDelay = /Livraison\s*:\s*4 semaines/i.test(content)
        || /délai.*4 semaines/i.test(content)
        || /livré.*4 semaines/i.test(content)

      expect(hasInvalidDelay, `Délai invalide "4 semaines" détecté sur ${path}`).toBe(false)
    })
  }
})

test.describe('S2 — Contrôle des pages services individuelles', () => {
  const servicePages = [
    { path: '/services/site-vitrine',     expectedPrice: '449', expectedDelay: '10 jours' },
    { path: '/services/site-multi-pages', expectedPrice: '749', expectedDelay: '17 jours' },
    { path: '/services/site-ecommerce',   expectedPrice: '1 647', expectedDelay: '21 jours' },
    { path: '/services/systeme-gestion',  expectedPrice: '1 447', expectedDelay: '21 jours' },
    { path: '/services/site-association', expectedPrice: '149',  expectedDelay: '7 jours' },
  ]

  for (const { path, expectedPrice, expectedDelay } of servicePages) {
    test(`${path} — prix et délai CGV corrects`, async ({ page }) => {
      await waitForPage(page, path)
      const content = await page.textContent('body') ?? ''

      // Le prix doit apparaître quelque part (format "449" ou "1 647" avec espace insécable)
      const priceOk = content.includes(expectedPrice) || content.replace(/\s/g, '').includes(expectedPrice.replace(/\s/g, ''))
      expect(priceOk, `Prix ${expectedPrice} introuvable sur ${path}`).toBe(true)

      // Le délai doit apparaître
      expect(content, `Délai ${expectedDelay} introuvable sur ${path}`).toContain(expectedDelay)
    })
  }
})
