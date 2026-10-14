import { GEO } from '@/data/geo'

export interface Epingle {
  id: string
  nom: string
  lat: number
  lon: number
  role: 'cible' | 'voisin' | 'repere'
  href?: string
}

/** Épingles d'une ville : elle-même, ses voisines (avec page quand elle existe) et quelques repères. */
export function epinglesVille(slug: string, voisines: { slug: string; nom: string; href?: string }[]): Epingle[] {
  const g = GEO[slug]
  if (!g) return []
  const liste: Epingle[] = [{ id: slug, nom: g.nom, lat: g.lat, lon: g.lon, role: 'cible' }]
  for (const v of voisines) {
    const gv = GEO[v.slug]
    if (gv) liste.push({ id: v.slug, nom: gv.nom, lat: gv.lat, lon: gv.lon, role: 'voisin', href: v.href })
  }
  return liste
}
