/**
 * VÉRIFIER UN SITE CLIENT — robots.txt (IA bloquées ?) et sitemap (nombre de pages).
 * Usage : node scripts/verifier-robots.mjs https://tennis-club-savigne-gizeux.fr
 * À lancer depuis une machine qui accède à Internet (le conteneur de développement n'y accède pas).
 */
const base = (process.argv[2] ?? '').replace(/\/$/, '')
if (!base) {
  console.error('Usage : node scripts/verifier-robots.mjs https://exemple.fr')
  process.exit(1)
}
const ROBOTS_IA = ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'anthropic-ai', 'Claude-Web', 'Google-Extended', 'PerplexityBot', 'CCBot', 'Bytespider', 'Applebot-Extended']
const lire = async (u) => {
  const r = await fetch(u, { headers: { 'user-agent': 'verif-robots/1.0' } })
  return r.ok ? await r.text() : null
}
const robots = await lire(`${base}/robots.txt`)
if (!robots) console.log('robots.txt : introuvable ou illisible')
else {
  console.log('robots.txt lu.')
  // Découpe en groupes : « User-agent: … » suivis de leurs règles.
  const groupes = []
  let courant = null
  for (const brut of robots.split(/\r?\n/)) {
    const l = brut.replace(/#.*/, '').trim()
    if (!l) continue
    const [k, ...v] = l.split(':')
    const cle = k.toLowerCase().trim()
    const val = v.join(':').trim()
    if (cle === 'user-agent') {
      if (!courant || courant.regles.length) groupes.push((courant = { agents: [], regles: [] }))
      courant.agents.push(val.toLowerCase())
    } else if (courant && (cle === 'disallow' || cle === 'allow')) courant.regles.push([cle, val])
  }
  const bloque = (agent) => {
    const g = groupes.find((x) => x.agents.includes(agent.toLowerCase())) ?? groupes.find((x) => x.agents.includes('*'))
    if (!g) return 'autorisé (aucune règle)'
    const interdit = g.regles.some(([k, v]) => k === 'disallow' && v === '/')
    return interdit ? 'BLOQUÉ' : 'autorisé'
  }
  for (const a of ROBOTS_IA) console.log(`  ${a.padEnd(18)} ${bloque(a)}`)
}
const plans = [`${base}/sitemap.xml`, `${base}/sitemap_index.xml`]
for (const u of plans) {
  const xml = await lire(u)
  if (!xml) continue
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  console.log(`${u} : ${urls.length} entrée(s)${/<sitemapindex/.test(xml) ? ' (index de sitemaps : ouvrez chacun)' : ''}`)
  break
}
