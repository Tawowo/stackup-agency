/**
 * /clubs-de-tennis — LA grande page de l'offre, celle qui est envoyée par e-mail aux clubs : elle doit convaincre seule, sur téléphone d'abord.
 * Les prix et les listes viennent de pricing.ts et inclus.ts ; les textes de data/offre-clubs/contenu.ts.
 */
import Link from 'next/link'
import Action from '@/components/ui/Action'
import Lie from '@/components/editorial/Lie'
import MaquetteClubs from '@/components/clubs/MaquetteClubs'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, BoutonsDemo, BoutonsPrincipaux, CartesCategories, Faq, InclusNonInclus, ListeCoches, MentionFft, MentionPrix, Reference, Section, j } from '@/gabarits/clubs/blocs'
import Simulateur from '@/experiences/clubs/Simulateur'
import { CLUBS, DEMO } from '@/config/offre-clubs'
import { ADOC, APPEL_FINAL, DEMO_PARCOURS, DONNEES, ETAPES_MISE_EN_PLACE, MERCREDI, PROBLEME, PROMESSE, ROLES, SOLUTION } from '@/data/offre-clubs/contenu'
import { SITE_INCLUS, LOGICIEL_INCLUS } from '@/data/offre-clubs/inclus'
import { calculer, categoriePour, simulationVide } from '@/domain/clubs/calcul'
import { eur, eurCents } from '@/domain/clubs/resume'
import { FONCTIONNALITES, faqCourte, metaClubs } from '@/lib/clubs'
import { faqPage } from '@/lib/seo'
import { howToMiseEnPlace, logicielClubs, serviceClubs } from '@/lib/schema-clubs'

export const metadata = metaClubs({
  titre: 'Site internet et logiciel de gestion pour club de tennis',
  description: 'Le site de votre club et le logiciel de votre bureau, connectés en direct : adhésions en ligne, école de tennis, paiements HelloAsso, challenge interne. Démo en ligne.',
  chemin: CLUBS,
})

const premiere = (s: string) => {
  const t = j(s)
  const i = t.indexOf('. ')
  return i > 0 ? t.slice(0, i + 1) : t
}

export default function Page() {
  // Exemple chiffré : un club de 220 licenciés avec site et logiciel (calculé, jamais écrit à la main).
  const exemple = calculer({ ...simulationVide(), licencies: { actuelle: 220, precedente: 0, avantPrecedente: 0 } })
  const cat = categoriePour(220)
  const faq = faqCourte()
  return (
    <PageClubs
      moment="clubs-accueil"
      chemin={CLUBS}
      etiquette="Pour les clubs de tennis, de padel et de pickleball"
      titre="Le site et le logiciel de gestion de votre club de tennis, enfin connectés"
      chapo={PROMESSE}
      maj="2026-10-30"
      monde={<MaquetteClubs />}
      entete={
        <>
          <BoutonsPrincipaux />
          <p className="cl-hero__ligne">Démo en ligne, prix affichés, sans engagement pour regarder.</p>
        </>
      }
      schema={[serviceClubs(), logicielClubs(), howToMiseEnPlace(), faqPage(faq.map((q) => ({ q: j(q.q), a: j(q.a) })))]}
    >
      <Section id="probleme" etiquette={PROBLEME.etiquette} titre={PROBLEME.titre} intro={PROBLEME.intro}>
        <ol className="cl-outils">
          {PROBLEME.outils.map((o) => (
            <li key={o.titre}>
              <b>{o.titre}</b>
              {o.texte}
            </li>
          ))}
        </ol>
        <p className="cl-sec__intro" style={{ marginTop: 24 }}>
          {j(PROBLEME.conclusion)}
        </p>
      </Section>

      <Section id="solution" etiquette={SOLUTION.etiquette} titre={SOLUTION.titre} intro={SOLUTION.intro}>
        <div className="cl-grille">
          {SOLUTION.blocs.map((b) => (
            <article className="cl-carte" key={b.id}>
              <p className="su-mono cl-carte__etiq">{b.accroche}</p>
              <h3>{b.titre}</h3>
              <p>{b.texte}</p>
              <Link href={b.lien}>{b.lienTexte} →</Link>
            </article>
          ))}
        </div>
        <ul className="cl-connexions">
          {SOLUTION.connexions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Section>

      <Section id="mercredi" etiquette={MERCREDI.etiquette} titre={MERCREDI.titre} intro={MERCREDI.intro}>
        <ol className="cl-jour">
          {MERCREDI.scenes.map((s) => (
            <li key={s.heure}>
              <span className="cl-jour__heure">{s.heure}</span>
              <div>
                <h3>{s.titre}</h3>
                <p>{s.texte}</p>
                <p className="cl-jour__effet">{s.effet}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="roles" etiquette="Ce que ça change" titre="Rôle par rôle, ce qui devient plus simple" intro="Chaque membre du bureau, chaque famille, chaque joueur y trouve sa place, et ne voit que ce qui le concerne.">
        <div className="cl-grille">
          {ROLES.map((r) => (
            <article className="cl-carte" key={r.id}>
              <h3>{r.titre}</h3>
              <p>{r.texte}</p>
              <Link href={`${CLUBS}/fonctionnalites/${r.fonctionnalite}`}>Voir comment →</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="fonctionnalites" etiquette="Les fonctionnalités" titre="Tout ce que le club peut faire, au même endroit" intro="Chaque fonctionnalité a sa page, avec son aperçu, ses étapes et ses questions.">
        <div className="cl-grille">
          {FONCTIONNALITES.map((f) => (
            <article className="cl-carte" key={f.slug}>
              <p className="su-mono cl-carte__etiq">{f.formule === 'site' ? 'Site' : f.formule === 'logiciel' ? 'Logiciel' : 'Site et logiciel'}</p>
              <h3>{f.nom}</h3>
              <p>{premiere(f.reponse)}</p>
              <Link href={`${CLUBS}/fonctionnalites/${f.slug}`}>En savoir plus →</Link>
            </article>
          ))}
        </div>
        <details className="cl-details">
          <summary>Tout ce qui est compris dans la formule site, et dans la formule logiciel</summary>
          <div className="cl-deux">
            <div>
              <h3>Le site</h3>
              <ul className="cl-liste">
                {SITE_INCLUS.map((x) => (
                  <li key={x.titre}>
                    <strong>{x.titre}.</strong> {x.texte}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Le logiciel</h3>
              <ul className="cl-liste">
                {LOGICIEL_INCLUS.map((x) => (
                  <li key={x.titre}>
                    <strong>{x.titre}.</strong> {x.texte}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </Section>

      <Section id="adoc" etiquette={ADOC.etiquette} titre={ADOC.titre} intro={ADOC.intro}>
        <div className="cl-deux">
          <div>
            <h3>Ce que nous faisons</h3>
            <ListeCoches items={[...ADOC.fait]} signe="oui" />
          </div>
          <div>
            <h3>Ce que nous ne faisons pas</h3>
            <ListeCoches items={[...ADOC.nonFait]} signe="non" />
          </div>
        </div>
        <p className="cl-aide">
          <Link href={`${CLUBS}/fonctionnalites/import-export-adoc`}>Le détail de l’import et de l’export ADOC</Link> · <Link href={`${CLUBS}/guides/exporter-importer-adherents-adoc`}>Le guide pour exporter et importer ses adhérents</Link>
        </p>
      </Section>

      <Section id="tarifs" etiquette="Les tarifs" titre="Trois formules, cinq catégories selon vos licenciés" intro="Site seul, logiciel seul, ou les deux avec une remise. Le prix dépend du nombre de licenciés FFT de la saison en cours, tennis, padel et pickleball compris.">
        <CartesCategories />
        <p className="cl-sec__intro" style={{ marginTop: 28 }}>
          <strong>Exemple.</strong> Un club de 220 licenciés (catégorie {cat.nom}) avec le site et le logiciel : à partir de {eur(exemple.miseEnPlace.total)} de mise en place, puis à partir de {eur(exemple.abonnement.mensuel)} par mois. Cela représente environ <strong>{eurCents(exemple.coutParLicencieAn)} par licencié et par an</strong> d’abonnement.
        </p>
        <MentionPrix />
        <p className="cl-hero__actions">
          <Action href={`${CLUBS}/tarifs`}>Voir les tarifs détaillés</Action>
          <Action href={`${CLUBS}/simulateur`} variante="contour">
            Faire ma simulation
          </Action>
        </p>
      </Section>

      <Section id="inclus" etiquette="En un coup d’œil" titre="Ce qui est inclus, ce qui ne l’est pas, ce qui passe sur devis">
        <InclusNonInclus />
      </Section>

      <Section id="simulateur" etiquette="Le simulateur" titre="Votre prix en trente secondes" intro="Indiquez vos licenciés et choisissez une formule : l’estimation s’affiche tout de suite. Pour affiner (options, accompagnement, paiement), ouvrez la simulation complète.">
        <Simulateur compact />
      </Section>

      <Section id="demo" etiquette="La démo" titre="Essayez avant de décider" intro="Un club fictif, « Grand Chelem Tennis Club », pour tout voir sans rien engager.">
        <div className="cl-parcours">
          {DEMO_PARCOURS.map((d) => (
            <article className="cl-carte" key={d.id}>
              <h3>{d.titre}</h3>
              <p>{d.texte}</p>
              <Action href={DEMO[d.id]} variante={d.id === 'site' ? 'plein' : 'contour'} evt="clubs_clic_demo">
                {d.bouton}
              </Action>
            </article>
          ))}
        </div>
        <p className="cl-aide">
          <Link href={`${CLUBS}/demo`}>Le parcours conseillé, rôle par rôle</Link>
        </p>
      </Section>

      <Section id="reference" etiquette="La référence" titre="Un club qui l’utilise vraiment">
        <Reference />
      </Section>

      <Section id="mise-en-place" etiquette="Comment ça se passe" titre="Du premier échange à la mise en ligne" intro="Sept étapes, sans mauvaise surprise : vous savez toujours où vous en êtes.">
        <ol className="cl-etapes">
          {ETAPES_MISE_EN_PLACE.map((e) => (
            <li key={e.titre}>
              <div>
                <b>{e.titre}</b>
                <Lie t={j(e.texte)} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="donnees" etiquette={DONNEES.etiquette} titre={DONNEES.titre} intro={DONNEES.intro}>
        <div className="cl-grille">
          {DONNEES.points.map((p) => (
            <article className="cl-carte" key={p.titre}>
              <h3>{p.titre}</h3>
              <p>{p.texte}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="faq" etiquette="Les questions fréquentes" titre="Ce que demandent les présidents et les trésoriers">
        <Faq questions={faq} />
        <p className="cl-aide">
          <Link href={`${CLUBS}/faq`}>Toutes les questions fréquentes →</Link>
        </p>
      </Section>

      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <div className="cl-demo" data-variante="ligne">
        <BoutonsDemo />
      </div>
      <MentionFft />
    </PageClubs>
  )
}
