/** Toutes les pages rédigées de l'offre « clubs de tennis », par famille. */
import { FONCTIONNALITES_1 } from './fonctionnalites-1'
import { FONCTIONNALITES_2 } from './fonctionnalites-2'
import { FORMULES } from './formules'
import { GUIDES_1 } from './guides-1'
import { GUIDES_2 } from './guides-2'
import { LOCALES } from './locales'
import { SPORTS } from './sports'
import type { PageClub } from '../types'

export const FONCTIONNALITES: PageClub[] = [...FONCTIONNALITES_1, ...FONCTIONNALITES_2]
export const GUIDES: PageClub[] = [...GUIDES_1, ...GUIDES_2]
/** Pages directement sous /clubs-de-tennis/<slug> : formules, départements et région, padel et pickleball. */
export const PAGES_RACINE: PageClub[] = [...FORMULES, ...LOCALES, ...SPORTS]
export { FORMULES, LOCALES, SPORTS }
export const TOUTES_LES_PAGES_CLUBS: PageClub[] = [...PAGES_RACINE, ...FONCTIONNALITES, ...GUIDES]
