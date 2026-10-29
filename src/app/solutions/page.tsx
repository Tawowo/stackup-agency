import type { Metadata } from 'next'
import { jetons } from '@/lib/jetons'
import { meta, filAriane, JsonLd } from '@/lib/seo'
import Hub from '@/experiences/solutions/Hub'
import { LIGNES } from '@/config/tarifs.generated'
import { SOLUTIONS } from '@/data/solutions'
import { METIERS } from '@/data/metiers'
import { aPartirDe } from '@/domain/devis/offres'

export const metadata: Metadata = meta({
  titre: 'Logiciel de gestion sur mesure pour artisans et TPE',
  description: jetons('Un logiciel de gestion fait pour votre métier : devis, factures, chantiers, planning, statistiques, avec en option automatisations, facturation électronique, commande vocale et assistant IA. À partir de {{prix:outil}} €.'),
  chemin: '/solutions',
})

/** Ordre des groupes du catalogue : automatisation et IA en tête. */
const ORDRE = ['AUTOMATISATION ET INTELLIGENCE ARTIFICIELLE', 'GESTION COMMERCIALE', 'ORGANISATION', 'VENTE ET RELATION CLIENT', 'MÉTIERS SPÉCIFIQUES', 'PILOTAGE']
const titre = (g: string) => {
  const t = g.toLowerCase()
  return t.charAt(0).toUpperCase() + t.slice(1)
}

export default function Page() {
  const modules = LIGNES.filter((l) => l.famille === 'outil' && l.code !== 'O00')
  const groupes = ORDRE.map((g) => ({
    titre: titre(g),
    modules: modules
      .filter((m) => m.groupe.replace('MODULES — ', '') === g)
      .map((m) => ({ code: m.code, libelle: m.libelle, description: m.description, fiche: SOLUTIONS.find((s) => s.codes[0] === m.code)?.slug ?? null })),
  })).filter((g) => g.modules.length > 0)
  const slugsMetiers = [...new Set(SOLUTIONS.flatMap((s) => s.metiersCibles))]
  const metiers = slugsMetiers
    .map((m) => METIERS.find((x) => x.slug === m))
    .filter((m): m is NonNullable<typeof m> => !!m)
    .map((m) => ({ slug: m.slug, nom: m.metier.charAt(0).toUpperCase() + m.metier.slice(1) }))
    .slice(0, 16)
  return (
    <main>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Outils de gestion', chemin: '/solutions' }])} />
      <Hub groupes={groupes} metiers={metiers} prix={aPartirDe('outil')} total={modules.length} />
    </main>
  )
}
