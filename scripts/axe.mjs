/** AXE — audit d'accessibilité (WCAG 2.1 AA) des routes passées en argument, sans WebGL. */
import { chromium } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'
const routes = process.argv.slice(2)
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
let total = 0
for (const r of routes) {
  for (const largeur of [1440, 390]) {
    const ctx = await browser.newContext({ viewport: { width: largeur, height: 900 } })
    const page = await ctx.newPage()
    await page.goto(`${process.env.BASE ?? "http://localhost:3000"}${r}${r.includes('?') ? '&' : '?'}webgl=0`, { waitUntil: 'networkidle' })
    await page.waitForTimeout(1200)
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']).analyze()
    for (const v of res.violations) {
      total++
      console.log(`✗ ${r} @${largeur} [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length})`)
      v.nodes.slice(0, 3).forEach((n) => console.log('    ', n.target.join(' '), '|', (n.failureSummary ?? '').split('\n')[1]?.trim().slice(0, 160)))
    }
    await ctx.close()
  }
}
await browser.close()
console.log(total ? `${total} violation(s)` : 'aucune violation')
