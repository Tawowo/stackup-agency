/** Une fonctionnalité : bénéfice, aperçu illustratif, étapes, texte, FAQ, formule et prix, démo. Contenu lu dans data/offre-clubs/fonctionnalites-*.ts. */
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Action from '@/components/ui/Action'
import Lie from '@/components/editorial/Lie'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, BoutonsDemo, Faq, LiensOffre, MentionFft, Section, j } from '@/gabarits/clubs/blocs'
import { CLUBS, DEMO, DEMO_ECRANS, PRODUCT_NAME } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { optionDe } from '@/data/offre-clubs/pricing'
import { MENTION_PRIX_INDICATIFS } from '@/data/offre-clubs/inclus'
import { FONCTIONNALITES, fonctionnalite, metaClubs } from '@/lib/clubs'
import { eur } from '@/domain/clubs/resume'
import { faqPage } from '@/lib/seo'
import { serviceClubs } from '@/lib/schema-clubs'

export function generateStaticParams() {
  return FONCTIONNALITES.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const f = fonctionnalite(slug)
  if (!f) return {}
  return metaClubs({ titre: f.titleSeo, description: f.descriptionSeo, chemin: `${CLUBS}/fonctionnalites/${slug}` })
}

const FORMULES = { site: 'Formule site', logiciel: 'Formule logiciel', 'site-et-logiciel': 'Site et logiciel' } as const

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const f = fonctionnalite(slug)
  if (!f) notFound()
  const chemin = `${CLUBS}/fonctionnalites/${slug}`
  const opt = f.optionId ? optionDe(f.optionId) : undefined
  const demoUrl = DEMO_ECRANS[slug] ?? DEMO[f.ecran]
  const voisines = f.voisines.map((v) => fonctionnalite(v)).filter((x): x is NonNullable<typeof x> => !!x)
  return (
    <PageClubs
      moment={`clubs-${slug}`}
      chemin={chemin}
      fil={[{ nom: 'Fonctionnalités', chemin: `${CLUBS}/fonctionnalites` }]}
      etiquette={`Fonctionnalité · ${FORMULES[f.formule]}${opt ? ' · en option' : ''}`}
      titre={f.titre}
      chapo={f.reponse}
      maj={f.maj}
      entete={
        <p className="cl-hero__actions">
          <Action href={demoUrl} evt="clubs_clic_demo">
            Ouvrir dans la démo
          </Action>
          <Action href={`${CLUBS}/simulateur`} variante="contour">
            Estimer le prix
          </Action>
        </p>
      }
      schema={[serviceClubs({ chemin, nom: `${f.nom} — ${PRODUCT_NAME}`, description: f.reponse }), faqPage(f.faq.map((q) => ({ q: j(q.q), a: j(q.a) })))]}
    >
      <Section id="benefice" etiquette="Le bénéfice" titre={f.nom}>
        <div className="cl-fonction">
          <div>
            <p className="cl-sec__intro">
              <Lie t={j(f.benefice)} />
            </p>
            <p className="cl-aide">
              {FORMULES[f.formule]}
              {opt ? (
                <>
                  {' '}
                  · Option : à partir de {opt.miseEnPlace !== null ? `${eur(opt.miseEnPlace)} de mise en place` : ''}
                  {opt.mensuel ? ` et ${eur(opt.mensuel)} par mois` : ''}. {MENTION_PRIX_INDICATIFS}
                </>
              ) : (
                ' · Comprise dans la formule.'
              )}
            </p>
          </div>
          <figure className="cl-apercu" aria-label={`Aperçu illustratif : ${f.apercu.titre}`}>
            <header>
              <b>{f.apercu.titre}</b>
              <span className="su-mono">Exemple</span>
            </header>
            <ul>
              {f.apercu.lignes.map((l) => (
                <li key={l.gauche} data-etat={l.etat ?? ''}>
                  <span>{j(l.gauche)}</span>
                  <span>{j(l.droite)}</span>
                </li>
              ))}
            </ul>
            <footer>Aperçu illustratif d’un club fictif, pas une capture d’écran.</footer>
          </figure>
        </div>
      </Section>

      <Section id="etapes" etiquette="Comment ça marche" titre="Pas à pas">
        <ol className="cl-etapes">
          {f.etapes.map((e) => (
            <li key={e.titre}>
              <div>
                <b>{j(e.titre)}</b>
                <Lie t={j(e.texte)} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {f.sections.map((s) => (
        <Section key={s.id} id={s.id} titre={s.titre}>
          <div className="cl-bloc-texte">
            {s.paragraphes.map((p) => (
              <p key={p.slice(0, 50)}>
                <Lie t={j(p)} />
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
        </Section>
      ))}

      <Section id="demo" etiquette="La démo" titre="Voyez-la fonctionner" intro="Un club fictif, « Grand Chelem Tennis Club », pour tout essayer sans rien engager.">
        <BoutonsDemo />
      </Section>

      <Section id="faq" etiquette="Les questions" titre={`Questions fréquentes sur ${f.nom.charAt(0).toLowerCase()}${f.nom.slice(1)}`}>
        <Faq questions={f.faq} id={`faq-${slug}`} />
      </Section>

      <Section id="voisines" etiquette="À voir aussi" titre="Les fonctionnalités voisines">
        <div className="cl-grille">
          {voisines.map((v) => (
            <article className="cl-carte" key={v.slug}>
              <h3>{v.nom}</h3>
              <p>{j(v.reponse).split('. ')[0]}.</p>
              <Link href={`${CLUBS}/fonctionnalites/${v.slug}`}>Voir la fonctionnalité →</Link>
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
