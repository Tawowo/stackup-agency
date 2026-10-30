import Link from 'next/link'
import Action from '@/components/ui/Action'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, CartesCategories, ConditionsListe, Faq, InclusNonInclus, LiensOffre, MentionFft, MentionPrix, OptionsGrille, Section } from '@/gabarits/clubs/blocs'
import { CLUBS } from '@/config/offre-clubs'
import { APPEL_FINAL } from '@/data/offre-clubs/contenu'
import { PRICING } from '@/data/offre-clubs/pricing'
import { calculer, simulationVide } from '@/domain/clubs/calcul'
import { eur, eurCents } from '@/domain/clubs/resume'
import { FAQ_CLUBS, metaClubs } from '@/lib/clubs'
import { faqPage } from '@/lib/seo'
import { jetons } from '@/lib/jetons'
import { serviceClubs } from '@/lib/schema-clubs'

const CHEMIN = `${CLUBS}/tarifs`
export const metadata = metaClubs({
  titre: 'Tarifs site et logiciel de gestion pour club de tennis',
  description: 'Prix indicatifs selon le nombre de licenciés : site, logiciel ou les deux, options, paiement en plusieurs fois, ce qui est inclus et ce qui ne l’est pas.',
  chemin: CHEMIN,
})

export default function Page() {
  const faq = FAQ_CLUBS.filter((q) => q.theme === 'prix').slice(0, 5)
  const ex = (n: number) => calculer({ ...simulationVide(), licencies: { actuelle: n, precedente: 0, avantPrecedente: 0 } })
  const exemples = [60, 220, 420].map((n) => ({ n, r: ex(n) }))
  return (
    <PageClubs
      moment="clubs-tarifs"
      chemin={CHEMIN}
      etiquette="Les tarifs"
      titre="Combien coûte le site et le logiciel d’un club de tennis"
      chapo="Le prix dépend d’un seul chiffre : le nombre de licenciés de votre club. Voici la grille complète, les options, ce qui est compris, et tout ce qui reste sur devis."
      maj="2026-10-30"
      entete={
        <p className="cl-hero__actions">
          <Action href={`${CLUBS}/simulateur`}>Estimer le prix pour mon club</Action>
          <Action href="/contact?a=appel" variante="contour">
            Réserver un appel gratuit
          </Action>
        </p>
      }
      schema={[serviceClubs({ chemin: CHEMIN, nom: 'Tarifs de l’offre pour clubs de tennis' }), faqPage(faq.map((q) => ({ q: jetons(q.q), a: jetons(q.a) })))]}
    >
      <Section id="categories" etiquette="La grille" titre="Cinq catégories, selon vos licenciés" intro="On compte les licenciés FFT de la saison en cours, sections tennis, padel et pickleball comprises. Le club fournit un justificatif : un export ADOC, ou le rapport d’assemblée générale avec les chiffres des trois dernières saisons. La catégorie est revue une fois par an, au renouvellement, jamais en cours de saison.">
        <CartesCategories />
        <MentionPrix />
        <p className="cl-aide">
          Le pack site + logiciel bénéficie de {Math.round(PRICING.packDiscount * 100)} % de remise sur la mise en place et sur l’abonnement, par rapport à la somme des deux. Il n’y a aucune autre remise.
        </p>
      </Section>

      <Section id="exemples" etiquette="Des exemples" titre="Ce que cela représente par licencié" intro="Trois clubs types avec le site et le logiciel, sans option. Les chiffres sont calculés depuis la grille, ils n’engagent pas : le devis est établi après un premier échange.">
        <div className="cl-grille">
          {exemples.map(({ n, r }) => (
            <article className="cl-carte" key={n}>
              <p className="su-mono cl-carte__etiq">Club de {n} licenciés · catégorie {r.categorie.nom}</p>
              <h3>{eur(r.abonnement.mensuel)} par mois</h3>
              <p>Mise en place : {eur(r.miseEnPlace.total)}, payable en {PRICING.miseEnPlaceEnFois} fois sans frais.</p>
              <p>
                <strong>{eurCents(r.coutParLicencieAn)} par licencié et par an</strong> d’abonnement.
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="inclus" etiquette="L’abonnement" titre="Ce que comprend l’abonnement mensuel">
        <InclusNonInclus />
      </Section>

      <Section id="options" etiquette="Les options" titre="Les options, à prix fixe" intro="Chaque option a son prix, affiché ici. Certaines n’existent qu’avec le site, d’autres qu’avec le logiciel : le simulateur le gère pour vous.">
        <OptionsGrille />
      </Section>

      <Section id="conditions" etiquette="Les conditions" titre="Engagement, paiement, déplacements">
        <ConditionsListe />
        <p className="cl-aide">
          Les conditions complètes figurent dans les <Link href="/cgv-plateforme">conditions générales de la plateforme</Link>.
        </p>
      </Section>

      <Section id="devis" etiquette="Sur mesure" titre="Quand on passe sur devis" intro="Une fonction qui n’existe pas, une reprise depuis un autre logiciel, un club omnisport, une application sur les stores : cela se chiffre à part, avant tout engagement.">
        <p className="cl-hero__actions">
          <Action href="/contact?a=appel">Demander un devis</Action>
          <Action href={`${CLUBS}/simulateur`} variante="contour">
            Faire la simulation
          </Action>
        </p>
      </Section>

      <Section id="faq" etiquette="Les questions sur le prix" titre="Ce que l’on nous demande le plus souvent">
        <Faq questions={faq} id="faq-prix" />
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
