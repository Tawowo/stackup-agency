import { test, expect } from '@playwright/test'

const PAGES = [
  { url: 'http://localhost:3000', name: 'home' },
  { url: 'http://localhost:3000/tarifs', name: 'tarifs' },
  { url: 'http://localhost:3000/creation-site-internet/restaurant', name: 'restaurant' },
]

test.describe('V1.a — elementFromPoint diagnostic', () => {
  for (const { url, name } of PAGES) {
    test(`elementFromPoint @ ${name}`, async ({ page }) => {
      const consoleLogs: string[] = []
      page.on('console', m => consoleLogs.push(`[${m.type()}] ${m.text()}`))
      page.on('pageerror', err => consoleLogs.push(`[error] ${err.message}`))

      await page.goto(url, { waitUntil: 'networkidle' })
      await page.waitForTimeout(2000)

      // Find navbar CTA "Devis gratuit"
      const navCTA = page.locator('nav a[href="/contact"]').first()
      const navBox = await navCTA.boundingBox()

      if (navBox) {
        const cx = navBox.x + navBox.width / 2
        const cy = navBox.y + navBox.height / 2
        const result = await page.evaluate(({ x, y }) => {
          const el = document.elementFromPoint(x, y) as HTMLElement
          if (!el) return { tag: 'null', cls: '', z: '', id: '' }
          const style = getComputedStyle(el)
          return {
            tag: el.tagName,
            cls: el.className?.toString().slice(0, 80),
            z: style.zIndex,
            pe: style.pointerEvents,
            id: el.id,
            isLink: el.tagName === 'A' || el.closest('a') !== null,
          }
        }, { x: cx, y: cy })
        console.log(`[${name}] navbar CTA @ (${Math.round(cx)},${Math.round(cy)}):`, JSON.stringify(result))
        expect(result.isLink, `Navbar CTA must be a link on ${name}`).toBe(true)
      }

      // Section CTA (not navbar)
      const sectionCTA = page.locator('main a[href="/contact"]').first()
      const sBox = await sectionCTA.boundingBox()
      if (sBox) {
        const cx = sBox.x + sBox.width / 2
        const cy = sBox.y + sBox.height / 2
        const result = await page.evaluate(({ x, y }) => {
          const el = document.elementFromPoint(x, y) as HTMLElement
          if (!el) return { tag: 'null', cls: '', z: '', id: '' }
          const style = getComputedStyle(el)
          return {
            tag: el.tagName,
            cls: el.className?.toString().slice(0, 80),
            z: style.zIndex,
            pe: style.pointerEvents,
            isLink: el.tagName === 'A' || el.closest('a') !== null,
          }
        }, { x: cx, y: cy })
        console.log(`[${name}] section CTA @ (${Math.round(cx)},${Math.round(cy)}):`, JSON.stringify(result))
      }

      // Console errors
      const errors = consoleLogs.filter(l => l.includes('[error]') || l.includes('404') || l.includes('hydrat'))
      if (errors.length) console.log(`Console issues on ${name}:`, errors.join('\n'))
    })
  }
})
