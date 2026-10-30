import Link from 'next/link'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, LiensOffre, MentionFft, Section, j } from '@/gabarits/clubs/blocs'
import { CLUBS } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { FONCTIONNALITES, metaClubs } from '@/lib/clubs'
import { serviceClubs } from '@/lib/schema-clubs'
import { ORIGINE } from '@/lib/seo'

const CHEMIN = `${CLUBS}/fonctionnalites`
export const metadata = metaClubs({
  titre: 'Fonctionnalités du site et du logiciel pour club de tennis',
  description: 'Adhésions en ligne, école de tennis, challenge interne, équipes, tournois, espace parent, HelloAsso, import ADOC : les fonctionnalités, une page chacune.',
  chemin: CHEMIN,
})

export default function Page() {
  return (
    <PageClubs
      moment="clubs-fonctionnalites"
      chemin={CHEMIN}
      etiquette="Les fonctionnalités"
      titre="Ce que le site et le logiciel d’un club de tennis savent faire"
      chapo="Quatorze fonctionnalités, chacune expliquée pas à pas, avec un aperçu, les questions fréquentes et ce qui est inclus ou en option."
      maj="2026-10-30"
      schema={[
        serviceClubs({ chemin: CHEMIN, nom: 'Fonctionnalités de l’offre pour clubs de tennis' }),
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: FONCTIONNALITES.map((f, i) => ({ '@type': 'ListItem', position: i + 1, name: f.nom, url: `${ORIGINE}${CLUBS}/fonctionnalites/${f.slug}` })),
        },
      ]}
    >
      <Section id="liste" etiquette="Toutes les pages" titre="Choisissez ce qui vous intéresse" intro="Le site, le logiciel ou les deux : chaque page dit à quelle formule appartient la fonctionnalité, et ce qui est en option.">
        <div className="cl-grille">
          {FONCTIONNALITES.map((f) => (
            <article className="cl-carte" key={f.slug}>
              <p className="su-mono cl-carte__etiq">{f.formule === 'site' ? 'Site' : f.formule === 'logiciel' ? 'Logiciel' : 'Site et logiciel'}</p>
              <h3>{f.nom}</h3>
              <p>{j(f.reponse).split('. ')[0]}.</p>
              <Link href={`${CLUBS}/fonctionnalites/${f.slug}`}>Voir la fonctionnalité →</Link>
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
