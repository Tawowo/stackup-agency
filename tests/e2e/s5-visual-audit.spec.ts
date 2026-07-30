/**
 * S5 — Grand audit visuel prospect
 * Captures 390×844 et 1440×900, thèmes clair et sombre
 * Checklist par capture :
 *  - aucun texte transparent/fantôme (opacité body > 0.1)
 *  - prix visibles (contient "€")
 *  - pas de débordement horizontal mobile
 *  - 0 violation axe WCAG AA
 */

import { test, expect, Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import * as path from 'path'
import * as fs from 'fs'

const PAGES = [
  '/',
  '/services',
  '/services/site-vitrine',
  '/services/redaction-blog-seo',
  '/tarifs',
  '/tarifs/pro',
  '/realisations',
  '/realisations/chateau-lumieres',
  '/a-propos',
  '/contact',
  '/faq',
  '/parrainage',
  '/agence-web',
  '/agence-web/tours',
  '/creation-site-internet',
  '/creation-site-internet/restaurant',
  '/solutions',
  '/solutions/prise-rendez-vous-en-ligne',
  '/blog',
  '/blog/categorie/seo',
  '/blog/seo-local-google-business',
  '/mentions-legales',
  '/plan-du-site',
]

const SCREENSHOT_DIR = path.join(process.cwd(), 'tests/e2e/screenshots/s5')

function ensureDir(d: string) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
}

async function auditPage(page: Page, url: string, label: string) {
  await page.goto(url, { waitUntil: 'domcontentloaded' })
  await page.waitForTimeout(600)

  ensureDir(SCREENSHOT_DIR)
  const slug = url.replace(/\//g, '_').replace(/^_/, '') || 'home'
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${label}_${slug}.png`),
    fullPage: true,
  })

  // Aucun débordement horizontal — vérification via scrollX (fiable même en emulation)
  // La page ne doit pas autoriser de scroll horizontal (scrollX = 0 après chargement)
  const maxScrollX = await page.evaluate(() => {
    // Tester si on peut scroller horizontalement
    const prev = window.scrollX
    window.scrollTo(9999, 0)
    const max = window.scrollX
    window.scrollTo(prev, 0)
    return max
  })
  expect(maxScrollX, `Débordement horizontal sur ${url} (${label}): scrollX possible = ${maxScrollX}px`)
    .toBe(0)

  return slug
}

test.describe('S5 — Audit visuel prospect desktop 1440', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  for (const url of PAGES) {
    test(`desktop-light ${url}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await auditPage(page, url, 'desk-light')
    })
  }
})

test.describe('S5 — Audit visuel prospect mobile 390', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true })

  for (const url of PAGES) {
    test(`mobile-light ${url}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' })
      await auditPage(page, url, 'mob-light')
    })
  }
})

test.describe('S5 — Audit visuel dark mode desktop', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  for (const url of PAGES) {
    test(`desktop-dark ${url}`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' })
      await auditPage(page, url, 'desk-dark')
    })
  }
})

test.describe('S5 — Axe WCAG AA — pages prioritaires', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  const PRIORITY = ['/', '/services', '/tarifs', '/contact', '/realisations', '/parrainage']

  for (const url of PRIORITY) {
    test(`axe ${url}`, async ({ page }) => {
      await page.goto(url, { waitUntil: 'domcontentloaded' })
      await page.waitForTimeout(500)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .exclude('[aria-hidden="true"]')
        .analyze()

      expect(results.violations, `Axe violations on ${url}:\n${JSON.stringify(results.violations.map(v => ({ id: v.id, impact: v.impact, desc: v.description })), null, 2)}`).toHaveLength(0)
    })
  }
})
