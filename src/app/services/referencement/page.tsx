/**
 * /services/referencement — être trouvé sur Google et dans les IA : cinq portées décrites par leur
 * résultat, trois niveaux de visibilité dans les IA, des modules à la carte et le suivi mensuel.
 * Tous les montants viennent de l'Excel (onglets Référencement et Abonnements).
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import MondeSerp from '@/components/mondes/MondeSerp'
import Action from '@/components/ui/Action'
import { prixLigne, uniteLigne } from '@/components/tarifs/format'
import { LIGNES, NIVEAUX_IA, PARAMS, PORTEES } from '@/config/tarifs.generated'
import { lienEstimateur } from '@/domain/devis/etat'
import { euros } from '@/domain/devis/resume'
import { IA_PHRASE, PHRASE_IA, PHRASE_PORTEE, TITRE_IA, TITRE_PORTEE, nettoyer } from '@/experiences/estimateur/donnees'
import { JsonLd, faqPage, filAriane } from '@/lib/seo'
import PilierCorps, { sommaireDe } from '@/gabarits/pilier/PilierCorps'
import { metaPilier } from '@/gabarits/pilier/PagePilier'
import { PILIER } from '@/data/piliers/referencement'
import '@/gabarits/pilier/pilier.css'
import './referencement.css'

export const metadata = metaPilier(PILIER)

const coef = PARAMS.coefficient
const seo = LIGNES.filter((l) => l.famille === 'seo')
const suivis = ['A14', 'A15', 'A20', 'A21'].map((c) => LIGNES.find((l) => l.code === c)).filter((l): l is NonNullable<typeof l> => !!l)

export default function Page() {
  const lien = lienEstimateur({ etape: 4 })
  return (
    <>
      <JsonLd data={[filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Services', chemin: '/services' }, { nom: 'Référencement', chemin: '/services/referencement' }]), faqPage(PILIER.faq)]} />
      <Document
        moment="doc-referencement"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/services', nom: 'Services' },
          { href: '/services/referencement', nom: 'Référencement' },
        ]}
        etiquette="Référencement · 5 portées"
        titre="Être trouvé sur Google, et dans les IA."
        chapo="Quand quelqu’un cherche votre métier, vous voulez qu’il tombe sur vous. Vous choisissez jusqu’où : votre nom, votre ville, votre département, toute la France. Chaque niveau est décrit par son résultat, jamais par un pourcentage."
        entete={
          <p className="su-ref__actions">
            <Action href={lien}>Choisir mon niveau</Action>
            <Action href="/contact?a=appel" variante="contour">
              Réserver mon appel gratuit
            </Action>
          </p>
        }
        monde={<MondeSerp />}
        large
      >
        <div className="su-ref">
          <section aria-labelledby="ref-portees" className="su-ref__bloc">
            <h2 id="ref-portees" className="su-ref__titre">
              Jusqu’où voulez-vous être trouvé ?
            </h2>
            <p className="su-ref__intro">Chaque niveau inclut le précédent. Le travail porte sur toutes vos pages ; le prix se compose d’un forfait et d’un montant par page (moins par page en série : villes, métiers).</p>
            <ol className="su-ref__cartes">
              {PORTEES.filter((p) => p.id !== 'Aucun').map((p, k) => (
                <li key={p.id} className="su-ref__carte">
                  <p className="su-mono su-ref__niveau">
                    {k + 1} · {p.id}
                  </p>
                  <h3 className="su-ref__carte-titre">{TITRE_PORTEE[p.id] ?? p.objectif}</h3>
                  <p className="su-ref__texte">{PHRASE_PORTEE[p.id] ?? p.objectif}</p>
                  <p className="su-ref__texte su-ref__texte--doux">{nettoyer(p.contenu)}</p>
                  <p className="su-ref__prix su-tabular">
                    Forfait {euros(p.forfait.prix * coef)}
                    <span> + {euros(p.parPage.prix * coef)} par page</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="ref-ia" className="su-ref__bloc">
            <h2 id="ref-ia" className="su-ref__titre">
              Être cité par les intelligences artificielles
            </h2>
            <p className="su-ref__intro">{IA_PHRASE}</p>
            <ol className="su-ref__cartes su-ref__cartes--3">
              {NIVEAUX_IA.filter((p) => p.id !== 'Aucune').map((p) => (
                <li key={p.id} className="su-ref__carte">
                  <p className="su-mono su-ref__niveau">{p.id}</p>
                  <h3 className="su-ref__carte-titre">{TITRE_IA[p.id] ?? p.objectif}</h3>
                  <p className="su-ref__texte">{PHRASE_IA[p.id] ?? p.objectif}</p>
                  <p className="su-ref__texte su-ref__texte--doux">{nettoyer(p.contenu)}</p>
                  <p className="su-ref__prix su-tabular">
                    Forfait {euros(p.forfait.prix * coef)}
                    <span> + {euros(p.parPage.prix * coef)} par page</span>
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="ref-carte" className="su-ref__bloc">
            <h2 id="ref-carte" className="su-ref__titre">
              Des modules à la carte
            </h2>
            <p className="su-ref__intro">En plus d’un niveau, ou pour un site que vous avez déjà : prenez seulement ce qui vous manque.</p>
            <ul className="su-ref__liste">
              {seo.map((l) => (
                <li key={l.code} className="su-ref__ligne">
                  <div>
                    <p className="su-ref__ligne-nom">{l.libelle}</p>
                    {l.description && <p className="su-ref__ligne-texte">{nettoyer(l.description)}</p>}
                  </div>
                  <p className="su-ref__ligne-prix su-tabular">
                    {prixLigne(l)}
                    {uniteLigne(l) && <span> · {uniteLigne(l)}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="ref-suivi" className="su-ref__bloc">
            <h2 id="ref-suivi" className="su-ref__titre">
              Et ensuite : un suivi mois après mois
            </h2>
            <p className="su-ref__intro">Être trouvé se travaille dans la durée. Le suivi se compose dans votre abonnement, sans engagement, préavis d’un mois.</p>
            <ul className="su-ref__liste">
              {suivis.map((l) => (
                <li key={l.code} className="su-ref__ligne">
                  <div>
                    <p className="su-ref__ligne-nom">{l.libelle}</p>
                    <p className="su-ref__ligne-texte">{nettoyer(l.description)}</p>
                  </div>
                  <p className="su-ref__ligne-prix su-tabular">
                    {prixLigne(l)}
                    <span> · par mois</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          <aside className="su-ref__honnete" aria-label="Ce que nous ne promettons pas">
            <h2 className="su-ref__titre su-ref__titre--petit">Ce que nous ne promettons pas</h2>
            <p>
              Aucun positionnement ne peut être garanti, ni aucune citation par une intelligence artificielle : cela dépend de la concurrence, du temps et des moteurs. Nous travaillons ce qui est en notre main — votre site, vos contenus, votre présence — et nous vous disons honnêtement ce que nous observons.
            </p>
            <p className="su-ref__actions">
              <Action href={lien}>Choisir mon niveau dans l’estimateur</Action>
              <Link className="su-ref__lien" href="/tarifs#a-la-carte">
                Vous avez déjà un site ? Voir les services à la carte
              </Link>
            </p>
          </aside>
        </div>
        <nav aria-label="Sommaire du guide" className="su-ref__sommaire">
          <p className="su-mono">Le référencement expliqué</p>
          <ol>
            {sommaireDe(PILIER).map((x) => (
              <li key={x.id}>
                <a href={`#${x.id}`}>{x.titre}</a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="su-prose su-doc__prose su-ref__guide">
          <PilierCorps pilier={PILIER} />
        </div>
      </Document>
    </>
  )
}
