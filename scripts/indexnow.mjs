/**
 * IndexNow submission — lit le sitemap prod, poste par lots de 100
 * Usage: node scripts/indexnow.mjs [--dry-run]
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const HOST = 'stackup-agency.fr'
const KEY_FILE = 'a3f7c2e1d9b4e8f0a1c5d7e9f2b3a4c6.txt'
const KEY = KEY_FILE.replace('.txt', '')
const KEY_LOCATION = `https://${HOST}/${KEY_FILE}`
const SITEMAP_URL = `https://${HOST}/sitemap.xml`
const ENDPOINT = 'https://api.indexnow.org/indexnow'
const BATCH = 100
const DRY_RUN = process.argv.includes('--dry-run')

async function fetchSitemap(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Sitemap fetch failed: ${res.status} ${url}`)
  return res.text()
}

function extractUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim())
}

async function submitBatch(urls) {
  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }
  if (DRY_RUN) {
    console.log(`[dry-run] would POST ${urls.length} URLs`)
    return
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  if (res.ok || res.status === 200 || res.status === 202) {
    console.log(`✓ ${urls.length} URLs soumises (HTTP ${res.status})`)
  } else {
    console.error(`✗ Erreur HTTP ${res.status}: ${await res.text()}`)
  }
}

;(async () => {
  console.log(`IndexNow — host: ${HOST} | key: ${KEY}`)
  console.log(`Récupération du sitemap: ${SITEMAP_URL}`)

  let xml
  try {
    xml = await fetchSitemap(SITEMAP_URL)
  } catch (e) {
    console.error(`Impossible de récupérer le sitemap: ${e.message}`)
    console.error('Lancez ce script en local après déploiement prod.')
    process.exit(1)
  }

  const urls = extractUrls(xml)
  console.log(`${urls.length} URLs trouvées dans le sitemap`)

  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH)
    await submitBatch(batch)
    if (i + BATCH < urls.length) await new Promise(r => setTimeout(r, 500))
  }

  console.log('IndexNow terminé.')
})()
