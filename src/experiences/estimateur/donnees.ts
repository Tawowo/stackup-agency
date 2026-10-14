/**
 * DONNÉES ÉDITORIALES DE L'ESTIMATEUR — regroupements par besoin, métiers, phrases
 * d'explication. Aucun prix ici : les libellés, descriptions et montants viennent de
 * l'Excel (`tarifs.generated.ts`). Un code absent de l'Excel est simplement ignoré.
 */
import { LIGNES } from '@/config/tarifs.generated'
import type { Ligne } from '@/config/tarifs.generated'

export const BESOINS: { id: string; titre: string; phrase: string; codes: string[] }[] = [
  { id: 'demandes', titre: 'Recevoir des demandes', phrase: 'Que vos clients vous écrivent ou vous appellent en un geste.', codes: ['F02', 'F03', 'F16', 'F13'] },
  { id: 'rdv', titre: 'Prendre des rendez-vous', phrase: 'Des créneaux réservés sans échange de messages.', codes: ['F04', 'F05'] },
  { id: 'travail', titre: 'Montrer mon travail', phrase: 'Des photos, des avis, des avant/après : la preuve sous les yeux.', codes: ['F07', 'F09', 'F10', 'F20', 'E07', 'E05', 'E10'] },
  { id: 'informer', titre: 'Informer et publier', phrase: 'Des nouvelles, des réponses aux questions, des documents.', codes: ['F06', 'F08', 'F11', 'F19'] },
  { id: 'aider', titre: 'Aider mes clients', phrase: 'Un espace, un calculateur, une recherche : du service en ligne.', codes: ['F12', 'F17', 'F18'] },
  { id: 'monde', titre: 'Toucher plus de monde', phrase: 'Une autre langue, des statistiques de visites.', codes: ['F14', 'F15'] },
  { id: 'effet', titre: 'Marquer les esprits', phrase: 'Des effets sur mesure pour qu’on se souvienne de vous.', codes: ['E01', 'E02', 'E03', 'E04', 'E06', 'E08', 'E09'] },
]

export interface GroupeLignes {
  id: string
  titre: string
  phrase: string
  lignes: Ligne[]
}

/** Lignes choisissables (prix > 0) regroupées par besoin ; le reste tombe dans « Autres ». */
export function groupesFonctionnalites(): GroupeLignes[] {
  const dispo = LIGNES.filter((l) => (l.famille === 'fonctionnalite' || l.famille === 'effet') && l.prix > 0)
  const pris = new Set<string>()
  const groupes: GroupeLignes[] = BESOINS.map((b) => {
    const lignes = b.codes.map((c) => dispo.find((l) => l.code === c)).filter((l): l is Ligne => !!l)
    lignes.forEach((l) => pris.add(l.code))
    return { id: b.id, titre: b.titre, phrase: b.phrase, lignes }
  }).filter((g) => g.lignes.length > 0)
  const reste = dispo.filter((l) => !pris.has(l.code))
  if (reste.length) groupes.push({ id: 'autres', titre: 'Autres idées', phrase: '', lignes: reste })
  return groupes
}

/** Unité « par … » : la ligne peut se prendre plusieurs fois. */
export const estMultiple = (l: Ligne) => /^par /i.test(l.unite)

export const METIERS: { id: string; modules: string[] }[] = [
  { id: 'artisan du bâtiment', modules: ['O01', 'O02', 'O03', 'O04', 'O06', 'O07', 'O10', 'O11', 'O13', 'O14', 'O20', 'O25', 'O26', 'O27', 'O28', 'O30'] },
  { id: 'commerce', modules: ['O01', 'O03', 'O05', 'O06', 'O15', 'O16', 'O17', 'O18', 'O26', 'O29'] },
  { id: 'restaurant', modules: ['O03', 'O05', 'O07', 'O08', 'O12', 'O15', 'O16', 'O17', 'O18', 'O19', 'O24'] },
  { id: 'santé et bien-être', modules: ['O01', 'O03', 'O04', 'O07', 'O08', 'O20', 'O21', 'O28', 'O30'] },
  { id: 'services à domicile', modules: ['O01', 'O02', 'O03', 'O07', 'O08', 'O10', 'O11', 'O13', 'O14', 'O25'] },
  { id: 'association', modules: ['O01', 'O07', 'O12', 'O22', 'O23', 'O26', 'O27', 'O28', 'O29'] },
  { id: 'location', modules: ['O01', 'O03', 'O04', 'O08', 'O09', 'O14', 'O20', 'O30'] },
]

/** « MODULES — GESTION COMMERCIALE » → « Gestion commerciale ». */
export function titreGroupe(groupe: string): string {
  const s = groupe.replace(/^MODULES\s*[—-]\s*/i, '').toLowerCase()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function modulesOutil(): { titre: string; lignes: Ligne[] }[] {
  const mods = LIGNES.filter((l) => l.famille === 'outil' && l.code !== 'O00')
  const ordre: string[] = []
  for (const l of mods) if (!ordre.includes(l.groupe)) ordre.push(l.groupe)
  return ordre.map((g) => ({ titre: titreGroupe(g), lignes: mods.filter((l) => l.groupe === g) }))
}

/** Ce que le visiteur lit, en mots simples. */
export const ETAPES = [
  { id: 1, court: 'Projet', titre: 'Quel est votre projet ?' },
  { id: 2, court: 'Accueil', titre: 'L’allure de votre page d’accueil' },
  { id: 3, court: 'Pages', titre: 'Les autres pages de votre site' },
  { id: 4, court: 'Google', titre: 'Être trouvé sur Google et dans les IA' },
  { id: 5, court: 'Fonctions', titre: 'Ce que votre site sait faire' },
  { id: 6, court: 'Contenus', titre: 'Les textes de votre site' },
  { id: 7, court: 'Boutique', titre: 'Votre boutique' },
  { id: 8, court: 'Outil', titre: 'Votre outil de gestion' },
  { id: 9, court: 'Suivi', titre: 'Après la mise en ligne' },
] as const

/** Phrases par portée et par niveau d'IA (le texte long vient de l'Excel). */
export const IA_PHRASE =
  'Aujourd’hui, on demande de plus en plus conseil à ChatGPT, à Gemini ou aux résumés de Google. Ce réglage aide ces outils à comprendre qui vous êtes et à vous citer.'

/** Les descriptions de l'Excel peuvent citer un code (« traduction à part : C04 ») : jamais montré au client. */
export const nettoyer = (t: string) => t.replace(/\s*:\s*[A-Z]{1,2}\d{1,2}\b/g, '').replace(/\s{2,}/g, ' ').trim()

export const PHRASE_PORTEE: Record<string, string> = {
  Essentiel: 'Votre nom ressort en premier quand on le tape ; le site est rapide et lisible sur mobile.',
  Local: 'Les gens des environs vous trouvent quand ils cherchent votre métier.',
  Régional: 'Vos services ressortent sur tout le département ou la région, ville par ville.',
  National: 'Vous visez les recherches les plus demandées, partout en France.',
}
export const PHRASE_IA: Record<string, string> = {
  Essentielle: 'Votre activité est décrite proprement pour que les assistants s’y retrouvent.',
  Avancée: 'On répond aux questions de vos clients et on vérifie régulièrement ce que disent les IA.',
}
