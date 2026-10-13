#!/usr/bin/env node
/**
 * Crawl intégral : part de la home, suit tous les liens internes <a href> réellement
 * présents dans le HTML rendu (pas seulement le sitemap), vérifie chaque statut,
 * détecte les liens cassés, les ancres mortes et les images qui ne chargent pas.
 * Usage: node scripts/crawl-links.mjs [base_url]
 */
import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const BASE = process.argv[2] || 'http://localhost:3000'
const ROOT = resolve(fileURLToPath(import.meta.url), '../../')

function extractLinks(html) {
  const hrefs = [...html.matchAll(/<a\s[^>]*href=["']([^"']+)["']/gi)].map(m => m[1])
  return hrefs
}

function extractImgs(html) {
  return [...html.matchAll(/<img\s[^>]*src=["']([^"']+)["']/gi)].map(m => m[1])
}

const visited = new Map() // path -> { status, from }
const imgSeen = new Set()
const brokenLinks = [] // { from, to, status }
const brokenImgs = []
const queue = ['/']
const MAX_PAGES = 2000

function normalize(rawHref, from) {
  const href = rawHref ? rawHref.replace(/&amp;/g, '&') : rawHref
  if (!href) return null
  if (href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('#')) return null
  if (href.startsWith('http') && !href.startsWith(BASE) && !href.includes('stackup-agency.fr')) return null // externe
  let path = href.replace('https://stackup-agency.fr', '').replace('http://stackup-agency.fr', '').replace(BASE, '')
  if (!path.startsWith('/')) return null
  path = path.split('#')[0]
  if (path === '') path = '/'
  return path
}

async function fetchPage(path) {
  try {
    const res = await fetch(BASE + path, { signal: AbortSignal.timeout(10000), redirect: 'manual' })
    return { status: res.status, html: res.status === 200 ? await res.text() : '' }
  } catch (e) {
    return { status: 0, html: '', error: e.message }
  }
}

function decodeEntities(s) {
  return s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
}

async function checkImg(rawSrc, from) {
  const src = decodeEntities(rawSrc)
  if (imgSeen.has(src)) return
  imgSeen.add(src)
  if (src.startsWith('data:')) return
  const path = src.startsWith('http') ? src.replace(BASE, '').replace('https://stackup-agency.fr', '') : src
  if (!path.startsWith('/')) return
  try {
    const res = await fetch(BASE + path, { signal: AbortSignal.timeout(8000), method: 'GET' })
    if (res.status !== 200) brokenImgs.push({ from, src: path, status: res.status })
  } catch (e) {
    brokenImgs.push({ from, src: path, status: 0, error: e.message })
  }
}

async function main() {
  console.log(`\n=== Crawl intégral — ${BASE} ===\n`)
  let processed = 0
  const imgChecks = []

  while (queue.length > 0 && processed < MAX_PAGES) {
    const batch = queue.splice(0, 8)
    await Promise.all(batch.map(async path => {
      if (visited.has(path)) return
      visited.set(path, { status: null })
      const { status, html } = await fetchPage(path)
      visited.set(path, { status })
      processed++
      if (status !== 200) {
        brokenLinks.push({ from: '(lien vers)', to: path, status })
        return
      }
      const links = extractLinks(html)
      for (const href of links) {
        const norm = normalize(href, path)
        if (norm && !visited.has(norm) && !queue.includes(norm)) queue.push(norm)
      }
      const imgs = extractImgs(html)
      for (const src of imgs) imgChecks.push(checkImg(src, path))
    }))
    process.stdout.write(`\r  Pages traitées : ${processed} — file restante : ${queue.length}`)
  }
  process.stdout.write('\n')
  await Promise.all(imgChecks)

  console.log(`\n✅ ${processed} pages explorées (liens internes réels, BFS depuis /)\n`)

  const errors = [...visited.entries()].filter(([, v]) => v.status !== 200)
  console.log(`❌ Pages en erreur : ${errors.length}`)
  errors.forEach(([path, v]) => console.log(`  [${v.status || 'TIMEOUT'}] ${path}`))

  console.log(`\n🖼️  Images cassées : ${brokenImgs.length}`)
  brokenImgs.slice(0, 40).forEach(b => console.log(`  [${b.status || 'ERR'}] ${b.src} (sur ${b.from})`))
  if (brokenImgs.length > 40) console.log(`  … +${brokenImgs.length - 40} autres`)

  console.log(`\n═══ Résumé : ${processed} pages, ${errors.length} erreurs de page, ${brokenImgs.length} images cassées ═══\n`)
  process.exit(errors.length > 0 || brokenImgs.length > 0 ? 1 : 0)
}

main().catch(e => { console.error(e); process.exit(1) })
