/**
 * LES ZONES D'INTERVENTION — les onze intercommunalités d'Indre-et-Loire (source : communes-groupes.ts, découpage officiel).
 * UNE page par intercommunalité, jamais une page par commune : chaque commune est citée dans le texte de sa zone et dans
 * les données structurées (`areaServed`). Le moteur « Votre commune » (client) retrouve zone, distance et contact sans page dédiée.
 */
import { COMMUNES_PAR_DEPARTEMENT } from './communes-groupes'
import { ZONES_A } from './enrichissements/zones-a'
import { ZONES_B } from './enrichissements/zones-b'
import { ZONES_C } from './enrichissements/zones-c'
import { ZONES_D } from './enrichissements/zones-d'
import type { ContenuZone } from './enrichissements/types'
import { jetonsProfond } from '@/lib/jetons'

export interface Zone {
  slug: string
  /** Nom officiel (titres, données structurées). */
  nom: string
  /** Nom court (menus, liens). */
  court: string
  communes: string[]
  /** Ville-centre et son repère (latitude, longitude) pour la distance indicative depuis Savigné-sur-Lathan. */
  centre: { nom: string; lat: number; lon: number }
  contenu: ContenuZone
}

const BASE = { nom: 'Savigné-sur-Lathan', lat: 47.42, lon: 0.31 }

const EPCI: { slug: string; nom: string; court: string; source: string; centre: { nom: string; lat: number; lon: number } }[] = [
  { slug: 'touraine-ouest-val-de-loire', nom: 'Communauté de communes Touraine Ouest Val de Loire', court: 'Touraine Ouest Val de Loire', source: 'CC Touraine Ouest Val de Loire', centre: { nom: 'Langeais', lat: 47.327, lon: 0.409 } },
  { slug: 'tours-metropole-val-de-loire', nom: 'Tours Métropole Val de Loire', court: 'Tours Métropole', source: 'Tours Métropole Val de Loire', centre: { nom: 'Tours', lat: 47.394, lon: 0.684 } },
  { slug: 'chinon-vienne-et-loire', nom: 'Communauté de communes Chinon, Vienne et Loire', court: 'Chinon Vienne et Loire', source: 'CC Chinon, Vienne et Loire', centre: { nom: 'Chinon', lat: 47.167, lon: 0.241 } },
  { slug: 'touraine-vallee-de-l-indre', nom: 'Communauté de communes Touraine Vallée de l’Indre', court: 'Touraine Vallée de l’Indre', source: 'CC Touraine Vallée de l’Indre', centre: { nom: 'Montbazon', lat: 47.288, lon: 0.7 } },
  { slug: 'gatine-racan', nom: 'Communauté de communes Gâtine et Choisilles – Pays de Racan', court: 'Gâtine-Racan', source: 'CC de Gâtine-Racan', centre: { nom: 'Neuillé-Pont-Pierre', lat: 47.55, lon: 0.55 } },
  { slug: 'castelrenaudais', nom: 'Communauté de communes du Castelrenaudais', court: 'Castelrenaudais', source: 'CC du Castelrenaudais', centre: { nom: 'Château-Renault', lat: 47.597, lon: 0.909 } },
  { slug: 'val-d-amboise', nom: 'Communauté de communes du Val d’Amboise', court: 'Val d’Amboise', source: 'CC du Val d’Amboise', centre: { nom: 'Amboise', lat: 47.413, lon: 0.985 } },
  { slug: 'touraine-est-vallees', nom: 'Communauté de communes Touraine-Est Vallées', court: 'Touraine-Est Vallées', source: 'CC Touraine-Est Vallées', centre: { nom: 'Montlouis-sur-Loire', lat: 47.386, lon: 0.829 } },
  { slug: 'blere-val-de-cher', nom: 'Communauté de communes Autour de Chenonceaux – Bléré Val de Cher', court: 'Bléré Val de Cher', source: 'CC Autour de Chenonceaux Bléré-Val de Cher', centre: { nom: 'Bléré', lat: 47.325, lon: 0.998 } },
  { slug: 'loches-sud-touraine', nom: 'Communauté de communes Loches Sud Touraine', court: 'Loches Sud Touraine', source: 'CC Loches Sud Touraine', centre: { nom: 'Loches', lat: 47.129, lon: 1.0 } },
  { slug: 'touraine-val-de-vienne', nom: 'Communauté de communes Touraine Val de Vienne', court: 'Touraine Val de Vienne', source: 'CC Touraine Val de Vienne', centre: { nom: 'Sainte-Maure-de-Touraine', lat: 47.109, lon: 0.622 } },
]

/** Un lien Markdown égaré dans un paragraphe (`[texte](/chemin)`) redevient du texte simple. */
const sansMarkdown = <T,>(x: T): T => (typeof x === 'string' ? (x.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') as T) : Array.isArray(x) ? (x.map(sansMarkdown) as T) : x && typeof x === 'object' ? (Object.fromEntries(Object.entries(x).map(([k, v]) => [k, sansMarkdown(v)])) as T) : x)
const CONTENUS: Record<string, ContenuZone> = sansMarkdown(jetonsProfond({ ...ZONES_A, ...ZONES_B, ...ZONES_C, ...ZONES_D }))
const GROUPES = COMMUNES_PAR_DEPARTEMENT['indre-et-loire']!

export const ZONES: Zone[] = EPCI.map((e) => ({
  slug: e.slug,
  nom: e.nom,
  court: e.court,
  centre: e.centre,
  communes: GROUPES.find((g) => g.epci === e.source)!.communes,
  contenu: CONTENUS[e.slug]!,
}))

export const zone = (slug: string) => ZONES.find((z) => z.slug === slug)
export const zoneDeCommune = (commune: string) => ZONES.find((z) => z.communes.includes(commune))
export const nbCommunes37 = () => ZONES.reduce((a, z) => a + z.communes.length, 0)

/** Distance indicative par la route depuis Savigné-sur-Lathan jusqu'à la ville-centre de la zone (à vol d'oiseau × 1,25, arrondie à 5 km). */
export function distanceIndicative(z: Zone): number {
  const R = 6371
  const rad = (d: number) => (d * Math.PI) / 180
  const dLat = rad(z.centre.lat - BASE.lat)
  const dLon = rad(z.centre.lon - BASE.lon)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(BASE.lat)) * Math.cos(rad(z.centre.lat)) * Math.sin(dLon / 2) ** 2
  const vol = 2 * R * Math.asin(Math.sqrt(a))
  return Math.max(5, Math.round((vol * 1.25) / 5) * 5)
}
/** Mode d'intervention annoncé selon la distance : sur place jusqu'à ~60 km, visio au-delà (la démo, les prix et le suivi sont les mêmes). */
export const modeIntervention = (km: number) => (km <= 60 ? ('sur place ou visio' as const) : ('visio, déplacement possible' as const))
