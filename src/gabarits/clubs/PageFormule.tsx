/** Page d'une formule : « site internet de club de tennis » ou « logiciel de gestion de club de tennis ». */
import Link from 'next/link'
import Action from '@/components/ui/Action'
import MaquetteClubs from '@/components/clubs/MaquetteClubs'
import PageClubs from './PageClubs'
import { AppelFinal, Faq, LiensOffre, MentionFft, MentionPrix, Section, BoutonsDemo, j } from './blocs'
import { CLUBS } from '@/config/offre-clubs'
import { APPEL_FINAL, PAGES_COMPRISES } from '@/data/offre-clubs/contenu'
import { LOGICIEL_INCLUS, SITE_INCLUS } from '@/data/offre-clubs/inclus'
import { PRICING } from '@/data/offre-clubs/pricing'
import { FONCTIONNALITES } from '@/lib/clubs'
import { eur } from '@/domain/clubs/resume'
import { faqPage } from '@/lib/seo'
import { serviceClubs } from '@/lib/schema-clubs'
import type { QR } from '@/data/offre-clubs/types'

interface Props {
  formule: 'site' | 'logiciel'
  chemin: string
  titre: string
  chapo: string
  etiquette: string
  intro: string
  /** Paragraphes de la section « Pourquoi » (texte propre à la page). */
  pourquoi: { titre: string; paragraphes: string[] }[]
  faq: QR[]
}

export default function PageFormule({ formule, chemin, titre, chapo, etiquette, intro, pourquoi, faq }: Props) {
  const inclus = formule === 'site' ? SITE_INCLUS : LOGICIEL_INCLUS
  const features = FONCTIONNALITES.filter((f) => f.formule === formule || f.formule === 'site-et-logiciel')
  const prix = PRICING.categories.map((c) => ({ c, p: formule === 'site' ? c.site : c.logiciel }))
  const autre = formule === 'site' ? { href: `${CLUBS}/logiciel-de-gestion`, nom: 'la formule logiciel' } : { href: `${CLUBS}/site-internet`, nom: 'la formule site' }
  return (
    <PageClubs
      moment={`clubs-${formule}`}
      chemin={chemin}
      etiquette={etiquette}
      titre={titre}
      chapo={chapo}
      maj="2026-10-30"
      monde={<MaquetteClubs variante={formule === 'site' ? 'site' : 'bureau'} />}
      entete={
        <p className="cl-hero__actions">
          <Action href={`${CLUBS}/simulateur`}>Estimer mon prix</Action>
          <Action href={`${CLUBS}/demo`} variante="contour" evt="clubs_clic_demo">
            Voir la démo
          </Action>
        </p>
      }
      schema={[serviceClubs({ chemin, nom: titre }), faqPage(faq.map((q) => ({ q: j(q.q), a: j(q.a) })))]}
    >
      <Section id="presentation" etiquette="La formule" titre={titre} intro={intro}>
        {pourquoi.map((b) => (
          <div key={b.titre} className="cl-bloc-texte">
            <h3>{b.titre}</h3>
            {b.paragraphes.map((p) => (
              <p key={p.slice(0, 40)}>{j(p)}</p>
            ))}
          </div>
        ))}
      </Section>

      <Section id="inclus" etiquette="Ce qui est compris" titre={formule === 'site' ? 'Tout ce que comprend le site du club' : 'Tout ce que comprend le logiciel du club'}>
        <ul className="cl-liste">
          {inclus.map((x) => (
            <li key={x.titre}>
              <strong>{x.titre}.</strong> {x.texte}
            </li>
          ))}
        </ul>
        {formule === 'site' && (
          <>
            <h3>Les pages créées à la mise en place</h3>
            <ul className="cl-chips">
              {PAGES_COMPRISES.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p className="cl-aide">Les pages légales sont incluses en plus. Au-delà de quinze pages, chaque page créée est une option ; le club peut aussi en ajouter lui-même, sans limite, avec l’éditeur.</p>
          </>
        )}
      </Section>

      <Section id="fonctionnalites" etiquette="Les fonctionnalités" titre="Ce que le club peut faire">
        <ul className="cl-chips">
          {features.map((f) => (
            <li key={f.slug}>
              <Link href={`${CLUBS}/fonctionnalites/${f.slug}`}>{f.nom}</Link>
            </li>
          ))}
        </ul>
        <p className="cl-aide">Chaque fonctionnalité a sa page, avec un aperçu, les étapes et les questions fréquentes.</p>
      </Section>

      <Section id="prix" etiquette="Le prix" titre={formule === 'site' ? 'Le prix du site, selon vos licenciés' : 'Le prix du logiciel, selon vos licenciés'} intro={`Le prix dépend de la catégorie du club. Pour avoir le site et le logiciel, le pack coûte ${Math.round(PRICING.packDiscount * 100)} % de moins que les deux séparés : voir ${autre.nom}.`}>
        <div className="cl-cats">
          {prix.map(({ c, p }) => (
            <article className="cl-cat su-plaque su-plaque--ivoire" key={c.id}>
              <header>
                <h3>{c.nom}</h3>
                <p className="su-mono">
                  {c.licencies.min}
                  {c.licencies.max ? ` à ${c.licencies.max}` : ' et plus'} licenciés
                </p>
              </header>
              <dl>
                <div>
                  <dt>Mise en place</dt>
                  <dd>{eur(p.miseEnPlace)}</dd>
                </div>
                <div data-pack="1">
                  <dt>Abonnement</dt>
                  <dd>{eur(p.mensuel)} <span>par mois</span></dd>
                </div>
              </dl>
              <p className="cl-cat__note">
                {formule === 'site' ? c.heures.site : c.heures.logiciel} h d’accompagnement incluses · {c.stockageGo} Go de stockage
              </p>
            </article>
          ))}
        </div>
        <MentionPrix />
        <p className="cl-hero__actions">
          <Action href={`${CLUBS}/tarifs`}>Les tarifs détaillés</Action>
          <Action href={`${CLUBS}/simulateur`} variante="contour">
            Le simulateur
          </Action>
        </p>
      </Section>

      <Section id="demo" etiquette="La démo" titre="Voyez-le avant de décider">
        <BoutonsDemo />
      </Section>

      <Section id="faq" etiquette="Les questions" titre="Questions fréquentes">
        <Faq questions={faq} id={`faq-${formule}`} />
        <p className="cl-aide">
          <Link href={`${CLUBS}/faq`}>Toutes les questions fréquentes →</Link>
        </p>
      </Section>

      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
