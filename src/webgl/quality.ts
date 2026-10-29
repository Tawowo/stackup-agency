import type { Tier } from './store'

export const CIBLE_FPS: Record<Tier, number> = { ultra: 55, high: 50, medium: 40, low: 28 }

export function lireForcage(): Tier | null {
  if (typeof window === 'undefined') return null
  // Le forçage (?quality=) tient pour toute la session d'onglet : il survit aux traversées.
  let q = new URLSearchParams(window.location.search).get('quality')
  try {
    if (q) sessionStorage.setItem('su-quality', q)
    else q = sessionStorage.getItem('su-quality')
  } catch {}
  return q === 'ultra' || q === 'high' || q === 'medium' || q === 'low' ? q : null
}

/**
 * WebGL2 présent ? Test sans créer de contexte (créer un contexte coûte 20 à 250 ms et three en recrée un juste après) :
 * si la création échoue malgré tout, `Scene` le détecte (erreur ou contexte perdu) et bascule sur le repli 2D.
 */
export function webglDisponible(): boolean {
  return typeof WebGL2RenderingContext !== 'undefined'
}

/**
 * Palier initial : detect-gpu (classement du GPU) croisé avec les capacités
 * (WebGL2, cœurs, mémoire, pointeur, largeur, mouvement réduit).
 * `?quality=` force un palier. Mobile : `medium` maximum par défaut.
 */
export async function detecterPalier(): Promise<Tier> {
  const force = lireForcage()
  if (force) return force
  if (!webglDisponible()) return 'low'
  const nav = navigator as Navigator & { deviceMemory?: number }
  const coeurs = nav.hardwareConcurrency ?? 4
  const memoire = nav.deviceMemory ?? 4
  const fin = window.matchMedia('(pointer: fine)').matches
  const large = window.innerWidth >= 768
  let tier: Tier = 'medium'
  try {
    const { getGPUTier } = await import('detect-gpu')
    const g = await Promise.race([
      // Table de performances servie par le site lui-même (public/gpu-benchmarks) : aucune requête vers un tiers.
      getGPUTier({ benchmarksURL: '/gpu-benchmarks' }),
      new Promise<null>((r) => setTimeout(() => r(null), 1500)),
    ])
    if (g) {
      if (g.tier >= 3) tier = 'ultra'
      else if (g.tier === 2) tier = 'high'
      else if (g.tier === 1) tier = 'medium'
      else tier = 'low'
    }
  } catch {
    tier = 'medium'
  }
  if (coeurs <= 2 || memoire <= 2) tier = minTier(tier, 'medium')
  if (!large || !fin) tier = minTier(tier, 'medium')
  return tier
}

const ORDRE: Tier[] = ['low', 'medium', 'high', 'ultra']
export function minTier(a: Tier, b: Tier): Tier {
  return ORDRE.indexOf(a) < ORDRE.indexOf(b) ? a : b
}
export function palierInferieur(t: Tier): Tier {
  return ORDRE[Math.max(0, ORDRE.indexOf(t) - 1)]!
}
