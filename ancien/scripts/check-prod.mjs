#!/usr/bin/env node
/**
 * Vérifie les 6 marqueurs de production Stackup Agency.
 * Usage: node scripts/check-prod.mjs [base_url]
 * Défaut: https://stackup-agency.fr
 */

const BASE = process.argv[2] || 'https://stackup-agency.fr'
const TIMEOUT = 15000

async function fetchText(url) {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(TIMEOUT),
    headers: { 'Accept': 'text/html,*/*', 'User-Agent': 'check-prod/1.0' },
  })
  return { status: res.status, text: await res.text() }
}

async function main() {
  console.log(`\n═══ CHECK PRODUCTION — ${BASE} ═══\n`)

  let html, status
  try {
    ;({ status, text: html } = await fetchText(BASE))
    console.log(`  Page home : HTTP ${status}`)
  } catch (e) {
    console.error(`  ❌ Impossible de joindre ${BASE} : ${e.message}`)
    process.exit(1)
  }

  const lower = html.toLowerCase()
  const results = []

  // 1. Pas de TikTok
  const hasTikTok = lower.includes('tiktok')
  results.push({
    id: 1,
    label: 'Pas de "tiktok" dans le HTML',
    ok: !hasTikTok,
    detail: hasTikTok ? 'TROUVÉ' : 'absent ✓',
  })

  // 2. Pas de "matheo-reboul"
  const hasMatheo = lower.includes('matheo-reboul') || lower.includes('mathéo reboul')
  results.push({
    id: 2,
    label: 'Pas de "matheo-reboul" dans le HTML',
    ok: !hasMatheo,
    detail: hasMatheo ? 'TROUVÉ' : 'absent ✓',
  })

  // 3. H1 correct
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html)
  const h1Text = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim() : ''
  const h1Ok = h1Text.toLowerCase().includes('fait décoller')
  results.push({
    id: 3,
    label: 'H1 = "Le site web qui fait décoller votre activité."',
    ok: h1Ok,
    detail: h1Text.slice(0, 80) || '(aucun H1)',
  })

  // 4. Navbar avec vrais liens (pas d'ancres)
  const hasServices = html.includes('href="/services"') || html.includes("href='/services'")
  const hasTarifs = html.includes('href="/tarifs"') || html.includes("href='/tarifs'")
  const hasBlog = html.includes('href="/blog"') || html.includes("href='/blog'")
  const hasContact = html.includes('href="/contact"') || html.includes("href='/contact'")
  const navOk = hasServices && hasTarifs && hasBlog && hasContact
  results.push({
    id: 4,
    label: 'Navbar : /services /tarifs /blog /contact (pas d\'ancres)',
    ok: navOk,
    detail: [
      hasServices ? '/services ✓' : '/services ✗',
      hasTarifs ? '/tarifs ✓' : '/tarifs ✗',
      hasBlog ? '/blog ✓' : '/blog ✗',
      hasContact ? '/contact ✓' : '/contact ✗',
    ].join(', '),
  })

  // 5. Maintenance 72h
  const has72h = html.includes('72')
  results.push({
    id: 5,
    label: 'Maintenance : mention "72 h"',
    ok: has72h,
    detail: has72h ? 'trouvé ✓' : 'absent ✗',
  })

  // 6. Image hero répond 200
  let imgStatus = 0
  try {
    const r = await fetch(`${BASE}/images/hero-monument-s.webp`, {
      signal: AbortSignal.timeout(TIMEOUT),
      method: 'HEAD',
    })
    imgStatus = r.status
  } catch {}
  results.push({
    id: 6,
    label: '/images/hero-monument-s.webp répond 200',
    ok: imgStatus === 200,
    detail: imgStatus ? `HTTP ${imgStatus}` : 'TIMEOUT/ERREUR',
  })

  // ─── Rapport ────────────────────────────────────────────────────
  let allOk = true
  for (const r of results) {
    const icon = r.ok ? '✅' : '❌'
    console.log(`  ${icon} [${r.id}] ${r.label}`)
    if (!r.ok || process.env.VERBOSE) console.log(`       └─ ${r.detail}`)
    if (!r.ok) allOk = false
  }

  console.log(`\n${allOk ? '✅ PRODUCTION OK — 6/6 marqueurs verts' : '❌ PRODUCTION KO — voir marqueurs rouges ci-dessus'}`)
  console.log(`   URL : ${BASE}\n`)

  process.exit(allOk ? 0 : 1)
}

main().catch(e => { console.error(e); process.exit(1) })
