import Link from 'next/link'
import Action from '@/components/ui/Action'
import MaquetteClubs from '@/components/clubs/MaquetteClubs'
import PageClubs from '@/gabarits/clubs/PageClubs'
import { AppelFinal, LiensOffre, MentionFft, Section } from '@/gabarits/clubs/blocs'
import { CLUBS, DEMO } from '@/config/offre-clubs'
import { APPEL_FINAL, DEMO_PARCOURS, PARCOURS_CONSEILLE, ROLES } from '@/data/offre-clubs/contenu'
import { metaClubs } from '@/lib/clubs'
import { serviceClubs } from '@/lib/schema-clubs'

const CHEMIN = `${CLUBS}/demo`
export const metadata = metaClubs({
  titre: 'Démo du site et du logiciel pour club de tennis',
  description: 'Essayez le site d’un club fictif, ouvrez le logiciel du bureau et testez chaque rôle : présidente, trésorier, enseignant, parent. Sans inscription, sans engagement.',
  chemin: CHEMIN,
})

export default function Page() {
  return (
    <PageClubs
      moment="clubs-demo"
      chemin={CHEMIN}
      etiquette="La démo"
      titre="Essayez le site et le logiciel d’un club de tennis"
      chapo="Un club fictif, « Grand Chelem Tennis Club », pour tout voir sans rien engager : le site que voient les familles, le logiciel du bureau et chaque rôle, de la présidente au parent."
      maj="2026-10-30"
      monde={<MaquetteClubs />}
      entete={
        <p className="cl-hero__actions">
          <Action href={DEMO.site} evt="clubs_clic_demo">
            Voir le site d’un club
          </Action>
          <Action href={DEMO.bureau} variante="contour" evt="clubs_clic_demo">
            Ouvrir le logiciel du bureau
          </Action>
        </p>
      }
      schema={[serviceClubs({ chemin: CHEMIN, nom: 'Démo de l’offre pour clubs de tennis' })]}
    >
      <Section id="trois-portes" etiquette="Trois portes d’entrée" titre="Ce que vous découvrez dans chaque lien">
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
      </Section>

      <Section id="parcours" etiquette="Par où commencer" titre="Un parcours conseillé, en quelques minutes">
        <ol className="cl-etapes">
          {PARCOURS_CONSEILLE.map((e) => (
            <li key={e}>
              <div>{e}</div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="roles" etiquette="Rôle par rôle" titre="Ce que chaque rôle verra" intro="Dans la démo, vous choisissez un rôle et le club change de visage. Voici ce qui change pour chacun.">
        <div className="cl-grille">
          {ROLES.map((r) => (
            <article className="cl-carte" key={r.id}>
              <h3>{r.titre}</h3>
              <p>{r.texte}</p>
              <Link href={`${CLUBS}/fonctionnalites/${r.fonctionnalite}`}>Voir la fonctionnalité →</Link>
            </article>
          ))}
        </div>
      </Section>

      <Section id="honnetete" etiquette="À savoir" titre="Une démo, pas un vrai club">
        <p className="cl-sec__intro">
          Le club « Grand Chelem Tennis Club » est fictif : ses adhérents, ses séances et ses paiements sont des exemples. Rien de ce que vous saisissez dans la démo n’est conservé pour un vrai club. Le seul club réel qui utilise la solution aujourd’hui est le <Link href="/realisations/tennis-club-savigne-gizeux">Tennis Club Savigné-Gizeux</Link>.
        </p>
      </Section>

      <AppelFinal titre={APPEL_FINAL.titre} texte={APPEL_FINAL.texte} />
      <LiensOffre />
      <MentionFft />
    </PageClubs>
  )
}
