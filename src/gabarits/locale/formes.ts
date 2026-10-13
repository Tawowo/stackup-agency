import type { LayoutName } from '@/webgl/layouts'

/** L'offre liée à un métier ou un service décide de la forme que prend la pile. */
export const FORME_DU_SERVICE: Record<string, LayoutName> = {
  'site-vitrine': 'page',
  'site-multi-pages': 'multi',
  'site-ecommerce': 'boutique',
  'systeme-gestion': 'logiciel',
}

export const FORME_SERVICE_LOCAL: Record<string, LayoutName> = {
  'creation-site-restaurant': 'page',
  'creation-site-artisan': 'page',
  'creation-site-commerce': 'multi',
  'creation-boutique-en-ligne': 'boutique',
  'developpement-application-metier': 'logiciel',
  'referencement-local-seo': 'strates',
}

/** Les FAQ qui parlent de délais sont écartées (règle 8 : aucune durée affichée). */
export const sansDelai = (faq: { q: string; a: string }[]) => faq.filter((f) => !/combien de temps|délai|delai|jours ouvrés|semaines?\b/i.test(f.q + ' ' + f.a))
