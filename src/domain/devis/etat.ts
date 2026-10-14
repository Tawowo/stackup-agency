/**
 * L'ÉTAT DE L'ESTIMATEUR — la configuration (ConfigDevis) + ce que l'interface retient
 * (métier choisi, étape). Validé par zod, sérialisé dans l'URL (`?e=`), partageable.
 */
import { z } from 'zod'
import { configDe, configVide } from './config.ts'
import { TARIFS } from './tarifs.ts'
import type { Tarifs } from './tarifs.ts'
import type { ConfigDevis } from './types.ts'

const entier = (max: number) => z.number().int().min(0).max(max).catch(0)
const booleen = z.boolean().catch(false)
const SUIVIS = ['Aucun', 'Local', 'Régional', 'National']

const ConfigSchema = z
  .object({
    accueil: z.string().max(24).catch('Aucun'),
    pages: z.record(z.string().max(24), entier(500)).catch({}),
    pagesSerie: entier(2000),
    portee: z.string().max(24).catch('Aucun'),
    ia: z.string().max(24).catch('Aucune'),
    options: z.record(z.string().regex(/^[A-Z]{1,2}\d{1,3}$/), entier(99)).catch({}),
    boutique: z
      .object({ active: booleen, produits: entier(10000), import: booleen, variantes: entier(50000), categories: entier(500) })
      .catch({ active: false, produits: 0, import: false, variantes: 0, categories: 0 }),
    outil: z
      .object({ actif: booleen, utilisateurs: z.number().int().min(1).max(500).catch(1) })
      .catch({ actif: false, utilisateurs: 1 }),
    demoPayee: booleen,
    visioPayee: booleen,
    rdvSupplementaires: entier(50),
    kmAuDela: entier(2000),
    urgence: booleen,
    remise: z.number().min(0).max(0.5).catch(0),
    abonnement: z
      .object({
        actif: booleen,
        publications: entier(40),
        articles: entier(20),
        suivi: z.string().max(12).catch('Aucun'),
        suiviIA: booleen,
        liens: entier(20),
        ficheGoogle: booleen,
        rapport: booleen,
        heuresModifs: entier(40),
        annuel: booleen,
      })
      .catch({ actif: false, publications: 0, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false }),
  })
  .partial()
  .catch({})

export interface EtatEstimateur {
  cfg: ConfigDevis
  /** Métier choisi à l'étape « outil » (filtre des modules). */
  metier: string
  /** Étape en cours (1 à 9, 10 = fin). */
  etape: number
}

export const ETAT_VIDE = (): EtatEstimateur => ({ cfg: configVide(), metier: '', etape: 1 })

/** Retire ce qui ne correspond à rien dans la grille (ligne supprimée de l'Excel, id inconnu). */
export function assainir(cfg: ConfigDevis, t: Tarifs = TARIFS): ConfigDevis {
  const niveaux = t.niveaux.map((n) => n.id)
  const actifs = niveaux.filter((id) => id !== 'Aucun')
  const out = configDe(cfg)
  if (!niveaux.includes(out.accueil)) out.accueil = 'Aucun'
  out.pages = Object.fromEntries(actifs.map((id) => [id, out.pages[id] ?? 0]).filter(([, n]) => (n as number) > 0))
  if (!t.portees.some((p) => p.id === out.portee)) out.portee = t.portees[0]?.id ?? 'Aucun'
  if (!t.iaNiveaux.some((p) => p.id === out.ia)) out.ia = t.iaNiveaux[0]?.id ?? 'Aucune'
  if (!SUIVIS.includes(out.abonnement.suivi)) out.abonnement.suivi = 'Aucun'
  const valides = new Set(
    t.lignes.filter((l) => ['fonctionnalite', 'effet', 'contenu', 'seo', 'outil', 'outil-option'].includes(l.famille) || (l.famille === 'boutique' && !['B00', 'B01', 'B02', 'B03', 'B04'].includes(l.code))).map((l) => l.code),
  )
  out.options = Object.fromEntries(Object.entries(out.options).filter(([k, n]) => valides.has(k) && n > 0))
  // Une boutique suppose un site ; un site « Aucun » n'a pas de pages.
  if (out.boutique.active && out.accueil === 'Aucun') out.accueil = actifs[0] ?? 'Aucun'
  if (out.accueil === 'Aucun') {
    out.pages = {}
    out.pagesSerie = 0
  }
  if (!out.outil.actif) out.options = Object.fromEntries(Object.entries(out.options).filter(([k]) => !/^(O|OP)\d+$/.test(k)))
  if (!out.boutique.active) out.options = Object.fromEntries(Object.entries(out.options).filter(([k]) => !/^B\d+$/.test(k)))
  return out
}

const egal = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b)

/** Ne garde que ce qui diffère de la configuration vide : jeton court. */
function compacter(cfg: ConfigDevis): Record<string, unknown> {
  const vide = configVide() as unknown as Record<string, unknown>
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(cfg)) {
    if (egal(v, vide[k])) continue
    if (v && typeof v === 'object' && !Array.isArray(v) && ['boutique', 'outil', 'abonnement'].includes(k)) {
      const base = vide[k] as Record<string, unknown>
      out[k] = Object.fromEntries(Object.entries(v).filter(([kk, vv]) => !egal(vv, base[kk])))
    } else out[k] = v
  }
  return out
}

function versBase64Url(s: string): string {
  const octets = new TextEncoder().encode(s)
  let bin = ''
  for (const o of octets) bin += String.fromCharCode(o)
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function depuisBase64Url(s: string): string {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/'))
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)))
}

/** Jeton d'URL : `?e=…`. */
export function encoder(e: EtatEstimateur): string {
  const corps: Record<string, unknown> = { c: compacter(e.cfg) }
  if (e.metier) corps.m = e.metier
  if (e.etape !== 1) corps.s = e.etape
  return versBase64Url(JSON.stringify(corps))
}

export function decoder(jeton: string | null | undefined, t: Tarifs = TARIFS): EtatEstimateur {
  if (!jeton || jeton.length > 2400) return ETAT_VIDE()
  try {
    const brut = JSON.parse(depuisBase64Url(jeton)) as { c?: unknown; m?: unknown; s?: unknown }
    const partiel = ConfigSchema.parse(brut.c ?? {}) as Partial<ConfigDevis>
    const metier = typeof brut.m === 'string' ? brut.m.slice(0, 40) : ''
    const etape = typeof brut.s === 'number' ? Math.min(10, Math.max(1, Math.round(brut.s))) : 1
    return { cfg: assainir(configDe(partiel), t), metier, etape }
  } catch {
    return ETAT_VIDE()
  }
}

// ───────── Les 5 raccourcis ─────────
export interface Raccourci {
  id: string
  titre: string
  phrase: string
  etat: () => EtatEstimateur
}

const e = (cfg: Partial<ConfigDevis>, metier = ''): EtatEstimateur => ({ cfg: assainir(configDe(cfg)), metier, etape: 1 })

export const RACCOURCIS: Raccourci[] = [
  {
    id: 'simple',
    titre: 'Un site simple pour être présent',
    phrase: 'Votre activité, vos coordonnées, vos réalisations : propre, clair, trouvable.',
    etat: () => e({ accueil: 'Classique', pages: { Classique: 4 }, portee: 'Essentiel', options: { F16: 1 } }),
  },
  {
    id: 'demarque',
    titre: 'Un site qui se démarque',
    phrase: 'Des pages vivantes, une vraie présence locale, un formulaire de devis soigné.',
    etat: () =>
      e({
        accueil: 'Signature',
        pages: { Animé: 6 },
        portee: 'Local',
        options: { F02: 1, F07: 1, F10: 1 },
        abonnement: { actif: true, publications: 2, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: true, rapport: false, heuresModifs: 0, annuel: false },
      }),
  },
  {
    id: 'spectaculaire',
    titre: 'Un site spectaculaire comme celui-ci',
    phrase: 'Un univers 3D animé, des pages mises en scène : le visiteur s’en souvient.',
    etat: () =>
      e({
        accueil: 'Immersif',
        pages: { Signature: 5 },
        portee: 'Local',
        options: { E03: 1, E04: 1, F02: 1 },
        abonnement: { actif: true, publications: 4, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false },
      }),
  },
  {
    id: 'boutique',
    titre: 'Une boutique en ligne',
    phrase: 'Vos produits, un panier, le paiement par carte, les e-mails de commande.',
    etat: () =>
      e({
        accueil: 'Animé',
        pages: { Classique: 3 },
        portee: 'Essentiel',
        boutique: { active: true, produits: 30, import: false, variantes: 40, categories: 6 },
        options: { B05: 1 },
        abonnement: { actif: true, publications: 0, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false },
      }),
  },
  {
    id: 'outil',
    titre: 'Un outil pour gérer mon activité',
    phrase: 'Clients, devis, factures, planning : au même endroit, fait pour votre façon de travailler.',
    etat: () =>
      e(
        {
          outil: { actif: true, utilisateurs: 3 },
          options: { O01: 1, O02: 1, O03: 1, O04: 1, OP2: 1 },
          abonnement: { actif: true, publications: 0, articles: 0, suivi: 'Aucun', suiviIA: false, liens: 0, ficheGoogle: false, rapport: false, heuresModifs: 0, annuel: false },
        },
        'artisan du bâtiment',
      ),
  },
]
