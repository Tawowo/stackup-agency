#!/usr/bin/env node
/**
 * Vérifie les redirections 301 configurées dans next.config.mjs
 * Usage: node scripts/check-redirects.mjs [baseUrl]
 */

const BASE_URL = process.argv[2] || 'https://stackup-agency.fr'

const REDIRECTS = [
  { from: '/blog/agence-web-blois', to: '/agence-web/blois' },
  { from: '/blog/agence-web-amboise', to: '/agence-web/amboise' },
  { from: '/blog/agence-web-le-mans', to: '/agence-web/le-mans' },
  { from: '/blog/agence-web-nantes', to: '/agence-web/nantes' },
  { from: '/blog/agence-web-caen', to: '/agence-web/caen' },
  { from: '/blog/agence-web-rouen', to: '/agence-web/rouen' },
  { from: '/blog/agence-web-chartres', to: '/agence-web/chartres' },
  { from: '/blog/agence-web-vendome', to: '/agence-web/vendome' },
  { from: '/blog/agence-web-saumur', to: '/agence-web/saumur' },
  { from: '/blog/seo-local-tours', to: '/agence-web/tours' },
  { from: '/blog/seo-local-orleans', to: '/agence-web/orleans' },
  { from: '/blog/seo-local-chartres', to: '/agence-web/chartres' },
  { from: '/blog/seo-local-dreux', to: '/agence-web/dreux' },
  { from: '/contact', to: '/contact', expectStatus: 200 },
]

let passed = 0
let failed = 0
const errors = []

async function checkRedirect({ from, to, expectStatus = 301 }) {
  const url = `${BASE_URL}${from}`
  const expected = `${BASE_URL}${to}`
  try {
    const res = await fetch(url, { redirect: 'manual' })
    const status = res.status
    const location = res.headers.get('location') || ''
    if (expectStatus === 200) {
      if (status === 200) { passed++; console.log(`OK  ${from} → ${status}`) }
      else { failed++; const e = `FAIL ${from} → ${status} (attendu 200)`; errors.push(e); console.log(e) }
    } else {
      const locNorm = location.replace(/\/$/, '')
      const expNorm = expected.replace(/\/$/, '')
      if ((status === 301 || status === 308) && locNorm === expNorm) { passed++; console.log(`OK  ${from} → ${to} (${status})`) }
      else { failed++; const e = `FAIL ${from} status=${status} location=${location} (attendu 301→${expected})`; errors.push(e); console.log(e) }
    }
  } catch (e) { failed++; const msg = `FAIL ${from} ERREUR: ${e.message}`; errors.push(msg); console.log(msg) }
}

console.log(`\nCheck redirections sur ${BASE_URL}\n${'-'.repeat(60)}`)
for (const r of REDIRECTS) await checkRedirect(r)
console.log(`\n${'-'.repeat(60)}\n${passed} OK — ${failed} ECHEC`)
if (errors.length) { errors.forEach(e => console.log('  ' + e)); process.exit(1) }
