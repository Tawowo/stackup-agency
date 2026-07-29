import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'blog-seo', path: '/services/redaction-blog-seo' },
  { name: 'tarifs', path: '/tarifs' },
  { name: 'a-propos', path: '/a-propos' },
  { name: 'contact', path: '/contact' },
  { name: 'realisations', path: '/realisations' },
  { name: 'ressources-documents', path: '/ressources/documents' },
]

for (const page of PAGES) {
  test.describe(`${page.name}`, () => {
    test(`screenshot light @${test.info ? '' : ''}`, async ({ page: p, browserName }, testInfo) => {
      await p.goto(page.path, { waitUntil: 'domcontentloaded' })
      await p.waitForTimeout(1000)
      const project = testInfo.project.name
      await p.screenshot({
        path: `tests/e2e/screenshots/${page.name}_${project}_light.png`,
        fullPage: true,
      })
    })

    test(`screenshot dark @${test.info ? '' : ''}`, async ({ page: p }, testInfo) => {
      await p.emulateMedia({ colorScheme: 'dark' })
      await p.goto(page.path, { waitUntil: 'domcontentloaded' })
      await p.waitForTimeout(1000)
      const project = testInfo.project.name
      await p.screenshot({
        path: `tests/e2e/screenshots/${page.name}_${project}_dark.png`,
        fullPage: true,
      })
    })

    test(`axe accessibility`, async ({ page: p }) => {
      await p.goto(page.path, { waitUntil: 'domcontentloaded' })
      const results = await new AxeBuilder({ page: p })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze()
      const violations = results.violations
      if (violations.length > 0) {
        console.log(`\n=== Axe violations on ${page.name} ===`)
        for (const v of violations) {
          console.log(`[${v.impact}] ${v.id}: ${v.description}`)
          for (const node of v.nodes) {
            console.log(`  - ${node.html}`)
          }
        }
      }
      expect(violations, `Accessibility violations on ${page.name}: ${JSON.stringify(violations.map(v => ({ id: v.id, impact: v.impact, count: v.nodes.length })), null, 2)}`).toHaveLength(0)
    })
  })
}
