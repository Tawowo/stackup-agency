/**
 * LEXIQUE — une définition par terme (src/content/lexique/*.md), rendu remark-html comme le blog.
 * Une page `/lexique/<slug>` répond à « c'est quoi X ? » ; le hub `/lexique` les range par rubrique.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { conforme } from './conformite'
import { ancre } from './blog'

const DOSSIER = path.join(process.cwd(), 'src/content/lexique')

export type RubriqueLexique = 'web' | 'seo' | 'legal' | 'gestion'
export const RUBRIQUES_LEXIQUE: { id: RubriqueLexique; nom: string; ligne: string }[] = [
  { id: 'web', nom: 'Site web et technique', ligne: 'Domaine, hébergement, CMS, maquette : les mots de la fabrication.' },
  { id: 'seo', nom: 'Référencement et Google', ligne: 'SEO, balises, avis, fiche Google : les mots de la visibilité.' },
  { id: 'legal', nom: 'Légal, fiscal et facturation', ligne: 'Mentions, RGPD, TVA, facture électronique : les mots des obligations.' },
  { id: 'gestion', nom: 'Gestion, vente et outils', ligne: 'CRM, paiement, automatisation, panier : les mots du quotidien en ligne.' },
]

export interface EntreeLexique {
  slug: string
  terme: string
  titre: string
  seoTitre: string
  extrait: string
  definition: string
  date: string
  maj: string
  lecture: number
  rubrique: RubriqueLexique
  motsCles: string[]
  liees: string[]
  sources?: string[]
}

export interface EntreeLexiqueComplete extends EntreeLexique {
  html: string
  faq: { q: string; a: string }[]
  sommaire: { id: string; titre: string }[]
}

function normaliser(slug: string, d: Record<string, unknown>): EntreeLexique {
  return {
    slug,
    terme: String(d.term ?? slug),
    titre: conforme(String(d.title ?? slug)),
    seoTitre: conforme(String(d.seoTitle ?? d.title ?? slug)),
    extrait: conforme(String(d.excerpt ?? '')),
    definition: conforme(String(d.definition ?? d.excerpt ?? '')),
    date: String(d.date ?? '2026-10-29'),
    maj: String(d.updated ?? d.date ?? '2026-10-29'),
    lecture: Number(d.readTime ?? 3),
    rubrique: (['web', 'seo', 'legal', 'gestion'].includes(String(d.category)) ? d.category : 'web') as RubriqueLexique,
    motsCles: Array.isArray(d.keywords) ? (d.keywords as string[]) : [],
    liees: Array.isArray(d.related) ? (d.related as string[]) : [],
    sources: Array.isArray(d.sources) ? (d.sources as string[]) : undefined,
  }
}

let cache: EntreeLexique[] | null = null
export function toutesLesEntrees(): EntreeLexique[] {
  if (cache) return cache
  if (!fs.existsSync(DOSSIER)) return (cache = [])
  cache = fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith('.md'))
    .map((f) => normaliser(f.slice(0, -3), matter(fs.readFileSync(path.join(DOSSIER, f), 'utf8')).data as Record<string, unknown>))
    .sort((a, b) => a.terme.localeCompare(b.terme, 'fr', { sensitivity: 'base' }))
  return cache
}

const MD_INLINE = /\[([^\]]+)\]\([^)]+\)|[*_]{1,2}([^*_]+)[*_]{1,2}/g
const nu = (s: string) => s.replace(MD_INLINE, (_m, l, e) => l ?? e ?? '').trim()

function faqDe(md: string) {
  const s = md.match(/##\s*Questions fréquentes[^\n]*\n([\s\S]*?)(?:\n##\s|$)/i)
  if (!s) return []
  const out: { q: string; a: string }[] = []
  const re = /\*\*(.+?\?)\*\*[ \t]*\n((?:(?!\*\*)[^\n]+\n?)+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s[1]!))) out.push({ q: nu(m[1]!), a: nu(m[2]!.replace(/\n/g, ' ')) })
  return out
}

export async function entree(slug: string): Promise<EntreeLexiqueComplete | null> {
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DOSSIER, `${slug}.md`))) return null
  const { data, content } = matter(fs.readFileSync(path.join(DOSSIER, `${slug}.md`), 'utf8'))
  const e = normaliser(slug, data as Record<string, unknown>)
  const md = conforme(content)
  let rendu = (await remark().use(html).process(md)).toString()
  const sommaire: { id: string; titre: string }[] = []
  rendu = rendu.replace(/<h2>(.*?)<\/h2>/g, (_m, t: string) => {
    const brut = t.replace(/<[^>]+>/g, '')
    const id = ancre(brut)
    sommaire.push({ id, titre: brut })
    return `<h2 id="${id}">${t}</h2>`
  })
  rendu = rendu.replace(/href="https:\/\/stackup-agency\.fr\//g, 'href="/')
  return { ...e, html: rendu, faq: faqDe(md), sommaire }
}

export function entreesLiees(e: EntreeLexique): EntreeLexique[] {
  const tous = toutesLesEntrees()
  return e.liees.map((s) => tous.find((x) => x.slug === s)).filter((x): x is EntreeLexique => !!x)
}
