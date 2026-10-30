/** Pages régionale, départementales, padel et pickleball : contenu propre à chaque page (data/offre-clubs/locales.ts). */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Action from '@/components/ui/Action'
import Lie from '@/components/editorial/Lie'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, Faq, LiensOffre, MentionFft, MentionPrix, Section, j } from '@/gabarits/clubs/blocs'
import { REFERENCE, CLUBS, PRODUCT_NAME } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { PAGES_LOCALES, metaClubs, pageLocale } from '@/lib/clubs'
import { faqPage } from '@/lib/seo'
import { serviceClubs } from '@/lib/schema-clubs'

export const dynamicParams = false

export function generateStaticParams() {
  return PAGES_LOCALES.map((p) => ({ zone: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ zone: string }> }): Promise<Metadata> {
  const { zone } = await params
  const p = pageLocale(zone)
  if (!p) return {}
  return metaClubs({ titre: p.titleSeo, description: p.descriptionSeo, chemin: `${CLUBS}/${zone}` })
}

export default async function Page({ params }: { params: Promise<{ zone: string }> }) {
  const { zone } = await params
  const p = pageLocale(zone)
  if (!p) notFound()
  const chemin = `${CLUBS}/${zone}`
  const voisines = p.voisines.map((v) => pageLocale(v)).filter((x): x is NonNullable<typeof x> => !!x)
  const indre = zone === 'indre-et-loire'
  return (
    <PageClubs
      moment={`clubs-${zone}`}
      chemin={chemin}
      etiquette={p.etiquette}
      titre={p.titre}
      chapo={p.reponse}
      maj={p.maj}
      entete={
        <p className="cl-hero__actions">
          <Action href={`${CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
          <Action href="/contact?a=appel" variante="contour">
            Réserver un appel gratuit
          </Action>
        </p>
      }
      schema={[serviceClubs({ chemin, nom: `${PRODUCT_NAME} : ${p.nom}`, description: p.reponse }), faqPage(p.faq.map((q) => ({ q: j(q.q), a: j(q.a) })))]}
    >
      {p.sections.map((s, i) => (
        <Section key={s.id} id={s.id} titre={s.titre}>
          <div className="cl-bloc-texte">
            {s.paragraphes.map((x) => (
              <p key={x.slice(0, 50)}>
                <Lie t={j(x)} />
              </p>
            ))}
            {s.liste && (
              <ul className="cl-liste">
                {s.liste.map((x) => (
                  <li key={x}>
                    <Lie t={j(x)} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {i === 0 && p.communes && p.communes.length > 0 && (
            <>
              <h3>Principales communes</h3>
              <ul className="cl-chips">
                {p.communes.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </>
          )}
        </Section>
      ))}

      {indre && (
        <Section id="reference" etiquette="La référence du département" titre="Un club d’Indre-et-Loire l’utilise déjà">
          <p className="cl-sec__intro">
            Le {REFERENCE.nom} fait vivre son site avec cette plateforme. {REFERENCE.lien} Vous pouvez voir le résultat, et en parler avec nous lors d’un rendez-vous en présentiel.
          </p>
          <p>
            <Link href={REFERENCE.fiche}>Voir la réalisation</Link>
          </p>
        </Section>
      )}

      <Section id="questions" etiquette="Les questions" titre={`Questions fréquentes : ${p.nom}`}>
        <Faq questions={p.faq} id={`faq-${zone}`} />
        <MentionPrix />
      </Section>

      <Section id="voisines" etiquette="Autour" titre="Les pages voisines">
        <ul className="cl-chips">
          {voisines.map((v) => (
            <li key={v.slug}>
              <Link href={`${CLUBS}/${v.slug}`}>{v.nom}</Link>
            </li>
          ))}
        </ul>
      </Section>

      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
