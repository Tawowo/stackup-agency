import Link from 'next/link'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, LiensOffre, MentionFft, Section } from '@/gabarits/clubs/blocs'
import { CLUBS } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { guides, metaClubs } from '@/lib/clubs'
import { serviceClubs } from '@/lib/schema-clubs'
import { ORIGINE } from '@/lib/seo'

const CHEMIN = `${CLUBS}/guides`
export const metadata = metaClubs({
  titre: 'Guides pour clubs de tennis : site, adhésions, ADOC, RGPD',
  description: 'Douze guides pratiques pour les bureaux de clubs : créer le site, organiser les réinscriptions, gérer l’école de tennis, exporter depuis ADOC, financer le numérique.',
  chemin: CHEMIN,
})

export default function Page() {
  const liste = guides()
  return (
    <PageClubs
      moment="clubs-guides"
      chemin={CHEMIN}
      etiquette="Les guides"
      titre="Les guides pour les bureaux de clubs de tennis"
      chapo="Des réponses concrètes pour les bénévoles : créer le site du club, organiser les réinscriptions, gérer l’école de tennis, encaisser les cotisations, respecter le RGPD."
      maj="2026-10-30"
      schema={[
        serviceClubs({ chemin: CHEMIN, nom: 'Guides pour clubs de tennis' }),
        { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: liste.map((g, i) => ({ '@type': 'ListItem', position: i + 1, name: g.titre, url: `${ORIGINE}${CHEMIN}/${g.slug}` })) },
      ]}
    >
      <Section id="liste" etiquette="Tous les guides" titre="Lire, comprendre, décider">
        <div className="cl-grille">
          {liste.map((g) => (
            <article className="cl-carte" key={g.slug}>
              <p className="su-mono cl-carte__etiq">{g.lecture} min de lecture</p>
              <h3>{g.titre}</h3>
              <p>{g.extrait}</p>
              <Link href={`${CHEMIN}/${g.slug}`}>Lire le guide →</Link>
            </article>
          ))}
        </div>
      </Section>
      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
