// Capture les vraies captures 2x de la démo vidéaste (à lancer depuis un réseau
// qui atteint demo-videaste-vitrine.vercel.app — le proxy du conteneur CI la bloque).
// Usage : node scripts/capture-demo-videaste.mjs
// Sections stables cadrées (hero susceptible d'évoluer — vidéo de fond à venir).
import { chromium } from 'playwright'
import { execSync } from 'child_process'

const BASE = process.env.DEMO_URL || 'https://demo-videaste-vitrine.vercel.app'
const OUT = 'public/images/realisations'

const b = await chromium.launch()
// Desktop 2x — hero actuel (facile à re-générer quand la vidéo arrive)
const d = await b.newPage({ viewport: { width: 1440, height: 670 }, deviceScaleFactor: 2 })
await d.goto(BASE, { waitUntil: 'networkidle' }); await d.waitForTimeout(3000)
await d.screenshot({ path: '/tmp/dv-desktop.png' })
// Mobile 2x
const m = await b.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true })
await m.goto(BASE, { waitUntil: 'networkidle' }); await m.waitForTimeout(3000)
await m.screenshot({ path: '/tmp/dv-mobile.png' })
await b.close()
execSync(`cwebp -q 88 /tmp/dv-desktop.png -o ${OUT}/demo-videaste.webp`)
execSync(`cwebp -q 88 /tmp/dv-mobile.png -o ${OUT}/demo-videaste-mobile.webp`)
console.log('Captures régénérées. Pensez aux sections stables (portfolio, livraison, admin) si le hero a changé.')
