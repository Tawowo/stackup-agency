/**
 * ÉTAT PARTAGEABLE DU SIMULATEUR — la simulation tient dans l'adresse (paramètres courts, lisibles), pour que le
 * président l'envoie au trésorier. Lecture tolérante : un paramètre faux est ignoré, jamais une erreur.
 */
import { z } from 'zod'
import { OPTION_IDS, type OptionId } from '../../data/offre-clubs/pricing.ts'
import { BESOINS_SUR_DEVIS, SIMULATION_DEFAUT, type BesoinId, type EntreeSimulation } from './simulation.ts'

export interface Club {
  nom: string
  commune: string
  departement: string
}

export interface EtatSimulateur {
  club: Club
  entree: EntreeSimulation
}

export const CLUB_VIDE: Club = { nom: '', commune: '', departement: '' }

const entier = (v: string | null, max: number) => {
  const n = Number(v)
  return v !== null && v !== '' && Number.isFinite(n) && n >= 0 ? Math.min(Math.floor(n), max) : null
}
const texte = (v: string | null, max = 80) => (v ?? '').replace(/[\u0000-\u001f<>]/g, '').slice(0, max)

const Formule = z.enum(['site', 'logiciel', 'pack'])

/** Paramètres d'adresse → état. */
export function lireEtat(params: URLSearchParams): EtatSimulateur {
  const d = SIMULATION_DEFAUT
  const options: Partial<Record<OptionId, number>> = {}
  for (const brut of (params.get('o') ?? '').split(',')) {
    const [id, q] = brut.split(':')
    if (id && (OPTION_IDS as readonly string[]).includes(id)) options[id as OptionId] = Math.max(1, Math.min(entier(q ?? '1', 99) ?? 1, 99))
  }
  const besoins = (params.get('b') ?? '').split(',').filter((b): b is BesoinId => BESOINS_SUR_DEVIS.some((x) => x.id === b))
  const heures = Number(params.get('h'))
  return {
    club: { nom: texte(params.get('club')), commune: texte(params.get('commune')), departement: texte(params.get('dep'), 40) },
    entree: {
      licencies: {
        courante: entier(params.get('l'), 5000) || d.licencies.courante,
        precedente: entier(params.get('l1'), 5000),
        avantDerniere: entier(params.get('l2'), 5000),
      },
      formule: Formule.safeParse(params.get('f')).success ? (params.get('f') as EntreeSimulation['formule']) : d.formule,
      options,
      heuresPrevues: Number.isFinite(heures) && heures >= 0 ? Math.min(Math.round(heures * 2) / 2, 200) : d.heuresPrevues,
      premierRdv: params.get('rdv') === 'visio' ? 'visio' : 'presentiel',
      distanceKm: entier(params.get('km'), 2000),
      abonnement: params.get('abo') === 'annuel' ? 'annuel' : 'mensuel',
      miseEnPlace: params.get('mep') === '1' ? 'une-fois' : 'trois-fois',
      besoins,
    },
  }
}

/** État → paramètres d'adresse (seulement ce qui diffère d'un champ vide). */
export function ecrireEtat(e: EtatSimulateur): string {
  const p = new URLSearchParams()
  if (e.club.nom) p.set('club', e.club.nom)
  if (e.club.commune) p.set('commune', e.club.commune)
  if (e.club.departement) p.set('dep', e.club.departement)
  p.set('l', String(e.entree.licencies.courante))
  if (e.entree.licencies.precedente !== null) p.set('l1', String(e.entree.licencies.precedente))
  if (e.entree.licencies.avantDerniere !== null) p.set('l2', String(e.entree.licencies.avantDerniere))
  p.set('f', e.entree.formule)
  const o = Object.entries(e.entree.options)
    .filter(([, q]) => (q ?? 0) > 0)
    .map(([id, q]) => (q === 1 ? id : `${id}:${q}`))
  if (o.length) p.set('o', o.join(','))
  if (e.entree.heuresPrevues > 0) p.set('h', String(e.entree.heuresPrevues))
  if (e.entree.premierRdv === 'visio') p.set('rdv', 'visio')
  if (e.entree.distanceKm !== null) p.set('km', String(e.entree.distanceKm))
  if (e.entree.abonnement === 'annuel') p.set('abo', 'annuel')
  if (e.entree.miseEnPlace === 'une-fois') p.set('mep', '1')
  if (e.entree.besoins.length) p.set('b', e.entree.besoins.join(','))
  return p.toString()
}
