#!/usr/bin/env node
/**
 * Inventaire automatique du site — lit le sitemap local, vérifie chaque URL.
 * Usage: node scripts/site-inventory.mjs [base_url]
 * Défaut base_url: http://localhost:3000
 */

import { readFileSync } from 'fs'
import { join, resolve } from 'path'
import { fileURLToPath } from 'url'

const BASE = process.argv[2] || 'http://localhost:3000'
const ROOT = resolve(fileURLToPath(import.meta.url), '../../')
const SITEMAP_PATH = join(ROOT, 'public', 'sitemap.xml')
const NEXT_SITEMAP = join(ROOT, '.next', 'server', 'app', 'sitemap.xml', 'route.js')

// ─── Parse sitemap ────────────────────────────────────────
async function fetchSitemap() {
  try {
    // Try to fetch from live server first
    const res = await fetch(`${BASE}/sitemap.xml`, { signal: AbortSignal.timeout(5000) })
    if (res.ok) {
      return await res.text()
    }
  } catch {}

  // Fallback: read static file
  try {
    return readFileSync(SITEMAP_PATH, 'utf8')
  } catch {}

  return null
}

function extractUrls(xml) {
  const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)]
  return matches.map(m => m[1].trim())
}

// ─── Check a single URL ────────────────────────────────────
async function checkUrl(url) {
  const path = url.replace('https://stackup-agency.fr', BASE)
  const start = Date.now()
  try {
    const res = await fetch(path, {
      signal: AbortSignal.timeout(10000),
      headers: { 'Accept': 'text/html' },
    })
    const html = await res.text()
    const ms = Date.now() - start

    const status = res.status
    const h1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)?.[1]?.replace(/<[^>]+>/g, '').trim().slice(0, 60) || null
    const hasFooter = /<footer/i.test(html)
    // Strip script/style tags before checking for data render issues
    const htmlNoScripts = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '')
    const badStrings = ['>undefined<', '>NaN<', '[object Object]'].filter(s => htmlNoScripts.includes(s))

    return { url, status, h1, hasFooter, badStrings, ms, ok: status === 200 && !badStrings.length }
  } catch (e) {
    return { url, status: 0, h1: null, hasFooter: false, badStrings: [], ms: Date.now() - start, ok: false, error: e.message }
  }
}

// ─── Main ──────────────────────────────────────────────────
async function main() {
  console.log(`\n=== Inventaire Stackup Agency — ${BASE} ===\n`)

  const xml = await fetchSitemap()
  if (!xml) {
    console.error('❌ Impossible de lire le sitemap. Le serveur tourne-t-il ? (npm run start)')
    process.exit(1)
  }

  const urls = extractUrls(xml)
  console.log(`📋 ${urls.length} URLs trouvées dans le sitemap\n`)

  const CONCURRENCY = 5
  const results = []
  for (let i = 0; i < urls.length; i += CONCURRENCY) {
    const batch = urls.slice(i, i + CONCURRENCY)
    const batchResults = await Promise.all(batch.map(checkUrl))
    results.push(...batchResults)
    process.stdout.write(`\r  Progression : ${Math.min(i + CONCURRENCY, urls.length)}/${urls.length}`)
  }
  process.stdout.write('\n\n')

  // ─── Rapport ──────────────────────────────────────────────
  const ok = results.filter(r => r.ok)
  const ko = results.filter(r => !r.ok)
  const noH1 = results.filter(r => r.ok && !r.h1)
  const noFooter = results.filter(r => r.ok && !r.hasFooter)
  const withBad = results.filter(r => r.badStrings.length > 0)

  console.log(`✅ OK        : ${ok.length}/${results.length}`)
  console.log(`❌ Erreurs   : ${ko.length}`)
  console.log(`⚠️  Sans H1   : ${noH1.length}`)
  console.log(`⚠️  Sans footer: ${noFooter.length}`)
  console.log(`🚨 Texte invalide ("undefined"/"NaN"): ${withBad.length}`)

  if (ko.length > 0) {
    console.log('\n─── Pages en erreur ───────────────────────────────────')
    ko.forEach(r => {
      console.log(`  [${r.status || 'TIMEOUT'}] ${r.url}${r.error ? ` — ${r.error}` : ''}`)
    })
  }

  if (withBad.length > 0) {
    console.log('\n─── Texte invalide ─────────────────────────────────────')
    withBad.forEach(r => {
      console.log(`  ${r.url} → ${r.badStrings.join(', ')}`)
    })
  }

  if (noH1.length > 0) {
    console.log('\n─── Pages sans H1 ──────────────────────────────────────')
    noH1.forEach(r => console.log(`  ${r.url}`))
  }

  // Tableau complet
  console.log('\n─── Tableau complet ─────────────────────────────────────')
  console.log('Status | H1 | Footer | ms  | URL')
  console.log('-------|----|----|-----|----------------------------------------')
  results.forEach(r => {
    const s = String(r.status || 'ERR').padEnd(6)
    const h = (r.h1 ? '✓' : '✗').padEnd(4)
    const f = (r.hasFooter ? '✓' : '✗').padEnd(4)
    const t = String(r.ms).padEnd(5)
    const u = r.url.replace('https://stackup-agency.fr', '')
    console.log(`${s} | ${h}| ${f}| ${t}| ${u}`)
  })

  console.log(`\n═══ Résumé : ${ok.length} OK / ${results.length} URLs — ${ko.length} erreurs ═══\n`)

  process.exit(ko.length > 0 || withBad.length > 0 ? 1 : 0)
}

main().catch(e => { console.error(e); process.exit(1) })
