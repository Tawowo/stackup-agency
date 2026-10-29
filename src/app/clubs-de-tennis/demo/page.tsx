/**
 * /clubs-de-tennis/demo — accès à la démo en ligne (club fictif « Grand Chelem Tennis Club ») : les trois entrées,
 * le parcours conseillé, puis rôle par rôle, chaque étape ouvrant directement le bon écran avec le bon rôle.
 */
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import Lie from '@/components/editorial/Lie'
import { Duo } from '@/components/appareils/Appareils'
import { AppelFinal, BoutonsDemo, PiedOffre } from '@/gabarits/clubs/composants'
import { arianeDe } from '@/gabarits/clubs/PageClub'
import { howTo } from '@/gabarits/clubs/schema'
import { JsonLd, faqPage, filAriane, meta } from '@/lib/seo'
import { jetons, jetonsProfond } from '@/lib/jetons'
import { DEMO, RACINE_CLUBS } from '@/config/offre-clubs'
import { LEGENDES, captureDemo, suiteDemo } from '@/data/offre-clubs/captures'
import { NOTE_DEMO, PARCOURS_CONSEILLE, PARCOURS_DEMO } from '@/data/offre-clubs/demo'
import { FAQ_CLUBS } from '@/data/offre-clubs/faq'
import '@/gabarits/clubs/clubs.css'
import './demo.css'

const CHEMIN = `${RACINE_CLUBS}/demo`

export const metadata = meta({
  titre: 'Démo du logiciel et du site d’un club de tennis',
  description: 'Essayez en ligne le site et le logiciel d’un club de tennis fictif, rôle par rôle : présidente, trésorier, enseignant, capitaine, parent, joueur. Sans inscription.',
  chemin: CHEMIN,
  image: '/og/clubs/demo.png',
})

const FAQ = jetonsProfond(FAQ_CLUBS.filter((q) => q.theme === 'demo'))
const PARCOURS = jetonsProfond(PARCOURS_DEMO)
const CONSEILLE = jetonsProfond(PARCOURS_CONSEILLE)

export default function Page() {
  const ariane = arianeDe({ chemin: CHEMIN, titre: 'La démo', famille: 'formule' })
  return (
    <>
      <JsonLd data={[filAriane(ariane.map((a) => ({ nom: a.nom, chemin: a.href }))), howTo('La démo en dix minutes', CONSEILLE.map((e) => ({ titre: e.titre, texte: e.texte }))), faqPage(FAQ.map((f) => ({ q: f.q, a: f.a })))]} />
      <Document
        moment="clubs-demo"
        ariane={ariane}
        etiquette="Clubs de tennis · démo en ligne"
        titre="Essayez le club comme si vous y étiez."
        chapo={`Le « ${DEMO.clubFictif} » est un club fictif, complet, en ligne : son site public, le logiciel de son bureau et l’espace de ses membres. Choisissez un rôle et tout s’ouvre avec les droits de cette personne. Sans inscription, sans installation.`}
        monde={<Duo projet={suiteDemo({ bureau: ['site-accueil', 'bureau-journee', 'bureau-ecole'], mobile: ['espace-parent', 'espace-jeu', 'site-accueil'] })} prioritaire />}
        sommaire={[
          { id: 'entrees', titre: 'Les trois entrées' },
          { id: 'parcours', titre: 'La démo en dix minutes' },
          { id: 'roles', titre: 'Rôle par rôle' },
          { id: 'faq', titre: 'Questions sur la démo' },
        ]}
        entete={<BoutonsDemo />}
      >
        <section id="entrees" aria-labelledby="entrees-t">
          <h2 id="entrees-t">Les trois entrées</h2>
          <BoutonsDemo avecTexte />
          <p className="cl-note-demo">
            <Lie t={NOTE_DEMO} />
          </p>
          <p>
            Pour choisir vous-même un rôle parmi tous ceux de la démo : <a href={DEMO.accueil}>l’accueil de la démo</a>.
          </p>
        </section>

        <section id="parcours" aria-labelledby="parcours-t" className="cl-bloc">
          <h2 id="parcours-t">La démo en dix minutes</h2>
          <p>Le parcours conseillé, dans l’ordre. Chaque lien ouvre le bon écran avec le bon rôle, dans un nouvel onglet.</p>
          <ol className="cl-etapes">
            {CONSEILLE.map((e, i) => (
              <li key={e.titre}>
                <span className="su-mono cl-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3>{e.titre}</h3>
                  <p>
                    <Lie t={e.texte} />
                  </p>
                  <p>
                    <a href={e.url} target="_blank" rel="noopener noreferrer">
                      Ouvrir cet écran <span className="sr-only">(nouvel onglet)</span>↗
                    </a>
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="roles" aria-labelledby="roles-t" className="cl-bloc">
          <h2 id="roles-t">Rôle par rôle</h2>
          <p>Les personnes ci-dessous sont les personnages fictifs de la démo.</p>
          <div className="cd-roles">
            {PARCOURS.map((p) => {
              const c = captureDemo(p.capture)
              const im = (p.capture.startsWith('espace') ? c.mobile : c.bureau).images[0]
              return (
                <article key={p.role} className="cd-role su-plaque su-plaque--ivoire" aria-labelledby={`role-${p.role}`}>
                  {im && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={im.fichier} width={im.largeur} height={im.hauteur} alt={LEGENDES[p.capture]} loading="lazy" decoding="async" data-mobile={p.capture.startsWith('espace') ? '1' : '0'} />
                  )}
                  <div>
                    <h3 id={`role-${p.role}`}>
                      {p.nom} <span>· {p.personne}</span>
                    </h3>
                    <p>{jetons(p.resume)}</p>
                    <ul>
                      {p.etapes.map((e) => (
                        <li key={e.titre}>
                          <a href={e.url} target="_blank" rel="noopener noreferrer">
                            {e.titre} <span className="sr-only">(nouvel onglet)</span>↗
                          </a>
                          <span>
                            <Lie t={e.texte} />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section id="faq" aria-labelledby="faq-t" className="cl-bloc">
          <h2 id="faq-t">Questions sur la démo</h2>
          <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.a }))} groupe="faq-demo-clubs" />
        </section>
        <AppelFinal titre="Vous avez vu la démo ? Parlons de votre club." />
        <PiedOffre />
      </Document>
    </>
  )
}
