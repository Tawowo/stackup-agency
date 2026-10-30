/**
 * L'ÉTAT DU SIMULATEUR DANS L'URL — lien partageable (le président l'envoie au trésorier). Paramètres courts et lisibles, validés par zod ;
 * toute valeur invalide retombe sur la valeur par défaut, jamais d'erreur.
 */
import { z } from 'zod'
import { PRICING } from '../../data/offre-clubs/pricing.ts'
import { HORS_CATALOGUE } from '../../data/offre-clubs/inclus.ts'
import { simulationVide } from './calcul.ts'
import type { Simulation } from './types.ts'

const nombre = (max: number) => z.coerce.number().min(0).max(max).catch(0)
const texte = (max: number) => z.string().max(max).catch('')

const Schema = z.object({
  c: texte(80),
  v: texte(80),
  d: texte(40),
  l: nombre(20000),
  l1: nombre(20000),
  l2: nombre(20000),
  f: z.enum(['s', 'l', 'p']).catch('p'),
  o: texte(400),
  h: nombre(100),
  r: z.enum(['p', 'v']).catch('p'),
  k: nombre(2000),
  a: z.enum(['m', 'a']).catch('m'),
  m: z.enum(['1', '3']).catch('1'),
  x: texte(200),
})

const FORMULE = { s: 'site', l: 'logiciel', p: 'pack' } as const
const FORMULE_INV = { site: 's', logiciel: 'l', pack: 'p' } as const

export function encoder(s: Simulation): string {
  const q = new URLSearchParams()
  if (s.club.nom) q.set('c', s.club.nom)
  if (s.club.commune) q.set('v', s.club.commune)
  if (s.club.departement) q.set('d', s.club.departement)
  if (s.licencies.actuelle) q.set('l', String(s.licencies.actuelle))
  if (s.licencies.precedente) q.set('l1', String(s.licencies.precedente))
  if (s.licencies.avantPrecedente) q.set('l2', String(s.licencies.avantPrecedente))
  if (s.formule !== 'pack') q.set('f', FORMULE_INV[s.formule])
  const o = Object.entries(s.options).filter(([, n]) => n > 0).map(([id, n]) => (n > 1 ? `${id}:${n}` : id)).join(',')
  if (o) q.set('o', o)
  if (s.accompagnement.heures) q.set('h', String(s.accompagnement.heures))
  if (s.accompagnement.rdv === 'visio') q.set('r', 'v')
  if (s.accompagnement.distanceKm) q.set('k', String(s.accompagnement.distanceKm))
  if (s.paiement.abonnement === 'annuel') q.set('a', 'a')
  if (s.paiement.miseEnPlace === 'trois-fois') q.set('m', '3')
  if (s.horsCatalogue.length) q.set('x', s.horsCatalogue.join(','))
  return q.toString()
}

export function decoder(entree: string | URLSearchParams | Record<string, string | undefined>): Simulation {
  const brut = entree instanceof URLSearchParams ? Object.fromEntries(entree) : typeof entree === 'string' ? Object.fromEntries(new URLSearchParams(entree)) : entree
  const p = Schema.parse(brut)
  const connus = new Set(PRICING.options.map((x) => x.id))
  const options: Record<string, number> = {}
  for (const part of p.o.split(',')) {
    const [id, n] = part.split(':')
    if (id && connus.has(id)) options[id] = Math.max(1, Math.min(200, Math.floor(Number(n) || 1)))
  }
  const horsIds = new Set(HORS_CATALOGUE.map((h) => h.id))
  const base = simulationVide()
  return {
    ...base,
    club: { nom: p.c, commune: p.v, departement: p.d },
    licencies: { actuelle: Math.floor(p.l), precedente: Math.floor(p.l1), avantPrecedente: Math.floor(p.l2) },
    formule: FORMULE[p.f],
    options,
    accompagnement: { heures: p.h, rdv: p.r === 'v' ? 'visio' : 'presentiel', distanceKm: p.k },
    paiement: { abonnement: p.a === 'a' ? 'annuel' : 'mensuel', miseEnPlace: p.m === '3' ? 'trois-fois' : 'une-fois' },
    horsCatalogue: p.x.split(',').filter((id) => horsIds.has(id)),
  }
}
