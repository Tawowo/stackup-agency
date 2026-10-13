#!/usr/bin/env node
/**
 * scripts/seo-lint.mjs
 * Vérifie chaque URL du sitemap : title, description, H1, canonical, JSON-LD, liens internes, alt images.
 * Usage : node scripts/seo-lint.mjs [--url https://stackup-agency.fr] [--max 50]
 */
import { readFileSync } from 'fs'
import { JSDOM } from 'jsdom'

const BASE = process.argv.includes('--url')
  ? process.argv[process.argv.indexOf('--url') + 1]
  : 'http://localhost:3000'

const MAX = process.argv.includes('--max')
  ? parseInt(process.argv[process.argv.indexOf('--max') + 1])
  : 100

// Fetch sitemap
async function fetchSitemap() {
  const res = await fetch(`${BASE}/sitemap.xml`)
  const xml = await res.text()
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map(m => m[1].replace('https://stackup-agency.fr', BASE).replace('http://stackup-agency.fr', BASE))
  return urls
}

async function fetchPage(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'SEO-Lint/1.0' }, signal: AbortSignal.timeout(10000) })
    if (!res.ok) return { url, error: `HTTP ${res.status}` }
    const html = await res.text()
    return { url, html }
  } catch (e) {
    return { url, error: e.message }
  }
}

function auditPage({ url, html, error }) {
  if (error) return [{ url, rule: 'fetch', msg: error }]

  const dom = new JSDOM(html)
  const doc = dom.window.document
  const fails = []

  const path = url.replace(BASE, '') || '/'

  // Title
  const title = doc.querySelector('title')?.textContent?.trim() || ''
  if (!title) fails.push({ url: path, rule: 'title-missing', msg: 'Pas de <title>' })
  else if (title.length < 30) fails.push({ url: path, rule: 'title-short', msg: `Title trop court (${title.length} car.) : "${title}"` })
  else if (title.length > 65) fails.push({ url: path, rule: 'title-long', msg: `Title trop long (${title.length} car.) : "${title.slice(0, 65)}…"` })

  // Description
  const desc = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim() || ''
  if (!desc) fails.push({ url: path, rule: 'desc-missing', msg: 'Pas de meta description' })
  else if (desc.length < 120) fails.push({ url: path, rule: 'desc-short', msg: `Description courte (${desc.length} car.)` })
  else if (desc.length > 165) fails.push({ url: path, rule: 'desc-long', msg: `Description longue (${desc.length} car.)` })

  // H1
  const h1s = doc.querySelectorAll('h1')
  if (h1s.length === 0) fails.push({ url: path, rule: 'h1-missing', msg: 'Aucun H1' })
  else if (h1s.length > 1) fails.push({ url: path, rule: 'h1-multiple', msg: `${h1s.length} H1 trouvés` })

  // Canonical
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute('href') || ''
  if (!canonical) fails.push({ url: path, rule: 'canonical-missing', msg: 'Pas de canonical' })
  else {
    const canonPath = canonical.replace('https://stackup-agency.fr', '').replace('http://localhost:3000', '') || '/'
    if (canonPath !== path && !(path === '/' && canonPath === '')) {
      // Accepter les petites variations (trailing slash)
      const normPath = path.replace(/\/$/, '')
      const normCanon = canonPath.replace(/\/$/, '')
      if (normPath !== normCanon) {
        fails.push({ url: path, rule: 'canonical-mismatch', msg: `Canonical ${canonPath} ≠ ${path}` })
      }
    }
  }

  // JSON-LD
  const jsonldScripts = doc.querySelectorAll('script[type="application/ld+json"]')
  if (jsonldScripts.length === 0) {
    fails.push({ url: path, rule: 'jsonld-missing', msg: 'Aucun JSON-LD' })
  } else {
    jsonldScripts.forEach((s, idx) => {
      try { JSON.parse(s.textContent || '') }
      catch { fails.push({ url: path, rule: 'jsonld-invalid', msg: `JSON-LD #${idx} invalide` }) }
    })
  }

  // Liens internes dans le body (hors nav/footer)
  const main = doc.querySelector('main') || doc.body
  const bodyLinks = main ? [...main.querySelectorAll('a[href^="/"], a[href^="https://stackup-agency.fr"]')] : []
  // Exclure nav et footer
  const navLinks = doc.querySelectorAll('nav a, footer a')
  const navSet = new Set([...navLinks].map(a => a))
  const contentLinks = bodyLinks.filter(a => !navSet.has(a))
  if (contentLinks.length < 3) {
    fails.push({ url: path, rule: 'internal-links', msg: `Seulement ${contentLinks.length} liens internes dans le corps` })
  }

  // Alt sur images de contenu (hors icônes SVG et aria-hidden)
  const imgs = doc.querySelectorAll('img:not([aria-hidden="true"])')
  imgs.forEach(img => {
    const alt = img.getAttribute('alt')
    const src = img.getAttribute('src') || ''
    // Ignorer les icônes (src contenant "icon" ou très petits)
    if (src.includes('icon') || src.includes('logo')) return
    if (alt === null) {
      fails.push({ url: path, rule: 'img-alt', msg: `Image sans alt : ${src.slice(0, 60)}` })
    }
  })

  return fails
}

async function main() {
  console.log(`\n🔍 SEO Lint — ${BASE}\n`)

  const allUrls = await fetchSitemap()
  console.log(`📋 ${allUrls.length} URLs dans le sitemap — audit des ${Math.min(MAX, allUrls.length)} premières\n`)

  const urls = allUrls.slice(0, MAX)
  const BATCH = 5
  const allFails = []
  const titles = new Map()
  const descs  = new Map()

  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH)
    const pages = await Promise.all(batch.map(fetchPage))

    for (const page of pages) {
      const fails = auditPage(page)
      allFails.push(...fails)

      // Détection doublons title/desc
      if (page.html) {
        const dom = new JSDOM(page.html)
        const doc = dom.window.document
        const t = doc.querySelector('title')?.textContent?.trim()
        const d = doc.querySelector('meta[name="description"]')?.getAttribute('content')?.trim()
        const path = page.url.replace(BASE, '') || '/'
        if (t) {
          if (titles.has(t)) allFails.push({ url: path, rule: 'title-duplicate', msg: `Title identique à ${titles.get(t)}` })
          else titles.set(t, path)
        }
        if (d) {
          if (descs.has(d)) allFails.push({ url: path, rule: 'desc-duplicate', msg: `Description identique à ${descs.get(d)}` })
          else descs.set(d, path)
        }
      }
    }

    process.stdout.write(`  Audité ${Math.min(i + BATCH, urls.length)}/${urls.length}\r`)
  }

  console.log('\n')

  if (allFails.length === 0) {
    console.log('✅ Zéro échec SEO détecté !\n')
    process.exit(0)
  }

  // Grouper par règle
  const byRule = {}
  allFails.forEach(f => {
    if (!byRule[f.rule]) byRule[f.rule] = []
    byRule[f.rule].push(f)
  })

  const sorted = Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)

  console.log(`❌ ${allFails.length} échecs sur ${urls.length} pages\n`)
  sorted.forEach(([rule, fails]) => {
    console.log(`\n[${rule}] — ${fails.length} page(s)`)
    fails.slice(0, 5).forEach(f => console.log(`  ${f.url}\n    → ${f.msg}`))
    if (fails.length > 5) console.log(`  … +${fails.length - 5} autres`)
  })

  console.log('\n')
  process.exit(1)
}

main().catch(e => { console.error(e); process.exit(1) })
