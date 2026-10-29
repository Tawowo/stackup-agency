/**
 * BLOG — les 300 articles repris de l'ancien site (src/content/blog/*.md),
 * front matter gray-matter, rendu remark-html. Lecture au build (pages
 * statiques). Le texte passe par `conforme()` (règle commerciale 8).
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import { conforme } from './conformite'

const DOSSIER = path.join(process.cwd(), 'src/content/blog')

export interface Article {
  slug: string
  titre: string
  extrait: string
  date: string
  maj?: string
  lecture: number
  etiquette: string
  categorie: string
  motsCles: string[]
  publieLe?: string
}

export interface ArticleComplet extends Article {
  html: string
  faq: { q: string; a: string }[]
  sommaire: { id: string; titre: string }[]
}

/** Les catégories regroupées pour la navigation (21 catégories d'origine → 9 rayons). */
export const RAYONS: { id: string; nom: string; categories: string[]; ligne: string }[] = [
  { id: 'creation', nom: 'Créer son site', categories: ['creation', 'creation-sites', 'design', 'technique', 'performance'], ligne: 'Choisir, construire, faire durer.' },
  { id: 'seo', nom: 'Référencement', categories: ['seo'], ligne: 'Être trouvé sur Google.' },
  { id: 'seo-local', nom: 'Visibilité locale', categories: ['seo-local'], ligne: 'Sortir dans votre ville.' },
  { id: 'commerce', nom: 'Commerce & boutique', categories: ['commerce', 'ecommerce'], ligne: 'Vendre en ligne, sans commission.' },
  { id: 'outils', nom: 'Outils métier', categories: ['applications-metier', 'digital', 'ia'], ligne: 'Gagner du temps chaque jour.' },
  { id: 'restaurants', nom: 'Restaurants', categories: ['restaurants'], ligne: 'Réservations, cartes, avis.' },
  { id: 'artisans', nom: 'Artisans & libéraux', categories: ['artisans', 'professions-liberales'], ligne: 'Devis, chantiers, rendez-vous.' },
  { id: 'strategie', nom: 'Stratégie & marketing', categories: ['strategie', 'marketing', 'entrepreneuriat', 'redaction', 'juridique'], ligne: 'Décider avant de dépenser.' },
  { id: 'associations', nom: 'Associations', categories: ['associations'], ligne: 'Adhésions, dons, événements.' },
]

export function rayonDe(categorie: string) {
  return RAYONS.find((r) => r.categories.includes(categorie)) ?? RAYONS[0]!
}

function lire(slug: string) {
  return matter(fs.readFileSync(path.join(DOSSIER, `${slug}.md`), 'utf8'))
}

function normaliser(slug: string, d: Record<string, unknown>): Article {
  return {
    slug,
    titre: conforme(String(d.title ?? slug)),
    extrait: conforme(String(d.excerpt ?? d.description ?? '')),
    date: String(d.date ?? '2026-01-01'),
    maj: d.updated ? String(d.updated) : undefined,
    lecture: Number(d.readTime ?? 6),
    etiquette: String(d.tag ?? ''),
    categorie: String(d.category ?? 'creation'),
    motsCles: Array.isArray(d.keywords) ? (d.keywords as string[]) : [],
    publieLe: d.publishAt ? String(d.publishAt) : undefined,
  }
}

const publie = (a: Article) => !a.publieLe || new Date(a.publieLe).getTime() <= Date.now()

let cache: Article[] | null = null
export function tousLesArticles(): Article[] {
  if (cache) return cache
  cache = fs
    .readdirSync(DOSSIER)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const slug = f.slice(0, -3)
      return normaliser(slug, lire(slug).data as Record<string, unknown>)
    })
    .filter(publie)
    .sort((a, b) => b.date.localeCompare(a.date))
  return cache
}

const MD_INLINE = /\[([^\]]+)\]\([^)]+\)|[*_]{1,2}([^*_]+)[*_]{1,2}/g
const nu = (s: string) => s.replace(MD_INLINE, (_m, l, e) => l ?? e ?? '').trim()

function faqDe(md: string) {
  const s = md.match(/##\s*(?:Questions fréquentes|FAQ|Questions récurrentes)[^\n]*\n([\s\S]*?)(?:\n##\s|\n---\s*\n|$)/i)
  if (!s) return []
  const out: { q: string; a: string }[] = []
  const re = /\*\*(.+?\?)\*\*[ \t]*\n((?:(?!\*\*)[^\n]+\n?)+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s[1]!))) out.push({ q: nu(m[1]!), a: nu(m[2]!.replace(/\n/g, ' ')) })
  return out
}

export function ancre(t: string) {
  return t
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export async function article(slug: string): Promise<ArticleComplet | null> {
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DOSSIER, `${slug}.md`))) return null
  const { data, content } = lire(slug)
  const a = normaliser(slug, data as Record<string, unknown>)
  if (!publie(a)) return null
  const md = conforme(content)
  let rendu = (await remark().use(html).process(md)).toString()
  const sommaire: { id: string; titre: string }[] = []
  // Ancres sur les h2 (sommaire), liens internes absolus convertis en relatifs.
  rendu = rendu.replace(/<h2>(.*?)<\/h2>/g, (_m, t: string) => {
    const brut = t.replace(/<[^>]+>/g, '')
    const id = ancre(brut)
    sommaire.push({ id, titre: brut })
    return `<h2 id="${id}">${t}</h2>`
  })
  rendu = rendu.replace(/href="https:\/\/stackup-agency\.fr\//g, 'href="/')
  // Un lien vers un article pas encore publié (programmé) mènerait à une 404 : on garde le texte, sans le lien.
  const publies = new Set(tousLesArticles().map((x) => x.slug))
  rendu = rendu.replace(/<a href="\/blog\/([a-z0-9-]+)\/?">([\s\S]*?)<\/a>/g, (m, slug: string, texte: string) => (publies.has(slug) ? m : texte))
  return { ...a, html: rendu, faq: faqDe(md), sommaire }
}

export function articlesLies(a: Article, n = 3): Article[] {
  const r = rayonDe(a.categorie)
  return tousLesArticles()
    .filter((b) => b.slug !== a.slug && r.categories.includes(b.categorie))
    .slice(0, n)
}
