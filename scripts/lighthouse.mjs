/**
 * LIGHTHOUSE MOBILE sur un serveur de production : score performance et indicateurs pour une liste de routes.
 * Usage : node scripts/lighthouse.mjs [BASE] [route…]   (npx lighthouse, aucune dépendance ajoutée au projet)
 * Le conteneur n'a pas de GPU : le WebGL y est logiciel (SwiftShader), comme sur PageSpeed Insights.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, readFileSync } from 'node:fs'
const args = process.argv.slice(2)
const BASE = args.find((a) => a.startsWith('http')) ?? 'http://localhost:3000'
const routes = args.filter((a) => a.startsWith('/'))
mkdirSync('/tmp/lh', { recursive: true })
for (const r of routes.length ? routes : ['/']) {
  const out = `/tmp/lh/${r.replace(/\W+/g, '_') || 'home'}.json`
  try {
    execFileSync('npx', ['-y', 'lighthouse@13.6.0', BASE + r, '--only-categories=performance,accessibility,best-practices,seo', '--output=json', `--output-path=${out}`, '--quiet', '--chrome-flags=--headless=new --no-sandbox --use-gl=angle --use-angle=swiftshader --enable-unsafe-swiftshader'], { env: { ...process.env, CHROME_PATH: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' }, stdio: 'ignore', timeout: 240000 })
  } catch (e) { console.log(r, 'ERREUR', e.message.slice(0, 80)); continue }
  const j = JSON.parse(readFileSync(out, 'utf8'))
  const c = Object.fromEntries(Object.entries(j.categories).map(([k, v]) => [k.slice(0, 4), Math.round(v.score * 100)]))
  const a = j.audits
  console.log(r.padEnd(34), 'perf', c.perf, 'a11y', c.acce, 'bp', c.best, 'seo', c.seo, '| FCP', a['first-contentful-paint'].displayValue, 'LCP', a['largest-contentful-paint'].displayValue, 'TBT', a['total-blocking-time'].displayValue, 'CLS', a['cumulative-layout-shift'].displayValue)
}
