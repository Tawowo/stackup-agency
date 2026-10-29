/** Lit le sitemap d'un serveur, qu'il soit un fichier unique ou un index de sitemaps : renvoie le texte XML de toutes les entrées. */
export async function lireSitemapXml(base) {
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  if (!xml.includes('<sitemapindex')) return xml
  const enfants = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, '&'))
  const parts = await Promise.all(enfants.map(async (u) => (await fetch(base + new URL(u).pathname)).text()))
  return parts.join('\n')
}
