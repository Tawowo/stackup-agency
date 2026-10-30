/**
 * OFFRE CLUBS — accès aux contenus (fonctionnalités, pages locales, FAQ, guides) et métadonnées.
 * Lecture au build (pages statiques). Tout texte passe par `jetons()` : montants et nom du produit viennent de pricing.ts et de config/offre-clubs.ts.
 */
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import type { Metadata } from 'next'
import { jetons, jetonsProfond } from './jetons'
import { ancre } from './blog'
import { meta } from './seo'
import { FONCTIONNALITES_1 } from '@/data/offre-clubs/fonctionnalites-1'
import { FONCTIONNALITES_2 } from '@/data/offre-clubs/fonctionnalites-2'
import { PAGES_LOCALES } from '@/data/offre-clubs/locales'
import { FAQ_CLUBS, FAQ_COURTE_IDS } from '@/data/offre-clubs/faq'
import type { Fonctionnalite, PageLocale, QuestionFaq } from '@/data/offre-clubs/types'

export const RACINE_CLUBS = '/clubs-de-tennis'

export const FONCTIONNALITES: Fonctionnalite[] = [...FONCTIONNALITES_1, ...FONCTIONNALITES_2]
export const fonctionnalite = (slug: string) => FONCTIONNALITES.find((f) => f.slug === slug)
export const pageLocale = (slug: string) => PAGES_LOCALES.find((p) => p.slug === slug)
export { PAGES_LOCALES, FAQ_CLUBS }
export const faqCourte = (): QuestionFaq[] => FAQ_COURTE_IDS.map((id) => FAQ_CLUBS.find((q) => q.id === id)!).filter(Boolean)

/** Page de l'offre : métadonnées (titre sans marque ≤ 60, description ≤ 155) avec les jetons résolus. */
export function metaClubs(o: { titre: string; description: string; chemin: string; type?: 'website' | 'article' }): Metadata {
  return meta({ titre: jetons(o.titre), description: jetons(o.description), chemin: o.chemin, type: o.type })
}
export const t = <T,>(x: T): T => jetonsProfond(x)

/* ───────── Guides ───────── */
const DOSSIER_GUIDES = path.join(process.cwd(), 'src/content/clubs-guides')

export interface GuideMeta {
  slug: string
  titre: string
  seoTitre: string
  extrait: string
  date: string
  maj: string
  lecture: number
  motsCles: string[]
  fonctionnalites: string[]
}
export interface Guide extends GuideMeta {
  html: string
  sommaire: { id: string; titre: string }[]
  faq: { q: string; a: string }[]
  mots: number
}

function lireGuide(slug: string): GuideMeta & { contenu: string } {
  const { data, content } = matter(fs.readFileSync(path.join(DOSSIER_GUIDES, `${slug}.md`), 'utf8'))
  const str = (v: unknown) => jetons(String(v ?? ''))
  return {
    slug,
    titre: str(data.title),
    seoTitre: str(data.seoTitle),
    extrait: str(data.excerpt),
    date: String(data.date ?? '2026-10-30'),
    maj: String(data.updated ?? data.date ?? '2026-10-30'),
    lecture: Number(data.readTime ?? 8),
    motsCles: Array.isArray(data.keywords) ? (data.keywords as string[]) : [],
    fonctionnalites: Array.isArray(data.features) ? (data.features as string[]) : [],
    contenu: jetons(content),
  }
}

export function guides(): GuideMeta[] {
  if (!fs.existsSync(DOSSIER_GUIDES)) return []
  return fs
    .readdirSync(DOSSIER_GUIDES)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const { contenu: _c, ...m } = lireGuide(f.slice(0, -3))
      void _c
      return m
    })
    .sort((a, b) => a.titre.localeCompare(b.titre, 'fr'))
}

const MD_INLINE = /\[([^\]]+)\]\([^)]+\)|[*_]{1,2}([^*_]+)[*_]{1,2}/g
const nu = (s: string) => s.replace(MD_INLINE, (_m, l, e) => l ?? e ?? '').trim()

function faqDe(md: string) {
  const s = md.match(/##\s*(?:Questions fréquentes|FAQ)[^\n]*\n([\s\S]*?)(?:\n##\s|$)/i)
  if (!s) return []
  const out: { q: string; a: string }[] = []
  const re = /\*\*(.+?\?)\*\*[ \t]*\n((?:(?!\*\*)[^\n]+\n?)+)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(s[1]!))) out.push({ q: nu(m[1]!), a: nu(m[2]!.replace(/\n/g, ' ')) })
  return out
}

export async function guide(slug: string): Promise<Guide | null> {
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(path.join(DOSSIER_GUIDES, `${slug}.md`))) return null
  const { contenu, ...m } = lireGuide(slug)
  let rendu = (await remark().use(html).process(contenu)).toString()
  const sommaire: { id: string; titre: string }[] = []
  rendu = rendu.replace(/<h2>(.*?)<\/h2>/g, (_m, titre: string) => {
    const brut = titre.replace(/<[^>]+>/g, '')
    const id = ancre(brut)
    sommaire.push({ id, titre: brut })
    return `<h2 id="${id}">${titre}</h2>`
  })
  return { ...m, html: rendu, sommaire, faq: faqDe(contenu), mots: contenu.split(/\s+/).filter(Boolean).length }
}

/** Les routes de l'offre pour le sitemap, le plan du site et llms.txt. */
export function routesClubs(): { chemin: string; nom: string; priorite: number }[] {
  const R = RACINE_CLUBS
  return [
    { chemin: R, nom: 'Site internet et logiciel de gestion pour clubs de tennis', priorite: 0.9 },
    { chemin: `${R}/tarifs`, nom: 'Tarifs de l’offre clubs', priorite: 0.9 },
    { chemin: `${R}/simulateur`, nom: 'Simulateur de prix pour clubs', priorite: 0.8 },
    { chemin: `${R}/site-internet`, nom: 'Site internet de club de tennis', priorite: 0.8 },
    { chemin: `${R}/logiciel-de-gestion`, nom: 'Logiciel de gestion de club de tennis', priorite: 0.8 },
    { chemin: `${R}/demo`, nom: 'Démo de l’offre clubs', priorite: 0.7 },
    { chemin: `${R}/faq`, nom: 'Questions fréquentes des clubs', priorite: 0.7 },
    { chemin: `${R}/fonctionnalites`, nom: 'Fonctionnalités pour clubs de tennis', priorite: 0.7 },
    { chemin: `${R}/guides`, nom: 'Guides pour clubs de tennis', priorite: 0.6 },
    ...FONCTIONNALITES.map((f) => ({ chemin: `${R}/fonctionnalites/${f.slug}`, nom: f.nom, priorite: 0.6 })),
    ...PAGES_LOCALES.map((p) => ({ chemin: `${R}/${p.slug}`, nom: p.titre, priorite: p.slug === 'indre-et-loire' ? 0.7 : 0.6 })),
    ...guides().map((g) => ({ chemin: `${R}/guides/${g.slug}`, nom: g.titre, priorite: 0.5 })),
    { chemin: '/cgv-plateforme', nom: 'Conditions générales de la plateforme', priorite: 0.2 },
  ]
}
export type { Fonctionnalite, PageLocale }
