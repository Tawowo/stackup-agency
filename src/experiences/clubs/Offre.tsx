/**
 * /clubs-de-tennis — LA GRANDE PAGE DE L'OFFRE, celle qu'on envoie par e-mail aux clubs. Elle doit convaincre seule,
 * sur téléphone d'abord. Seize moments alternant nuit et ivoire (data-nuit, piloté par la Lumière), tout le contenu dans
 * le HTML (rendu serveur), une seule île client : le simulateur compact. Prix lus dans pricing.ts, listes dans inclus.ts.
 */
import Link from 'next/link'
import ScenePage from '@/components/ScenePage'
import Action from '@/components/ui/Action'
import Accordeon from '@/components/editorial/Accordeon'
import { Portable, Telephone } from '@/components/appareils/Appareils'
import Simulateur from '@/experiences/simulateur-clubs/Simulateur'
import { BoutonsDemo, PiedOffre, eur } from '@/gabarits/clubs/composants'
import { BOUTONS_DEMO, DEMO, PRODUCT_NAME, PROMESSE, RACINE_CLUBS, REFERENCE } from '@/config/offre-clubs'
import { CATEGORIES, PRICING, coutParLicencieAn, tarif } from '@/data/offre-clubs/pricing'
import { ABONNEMENT_NON_INCLUS, INCLUS_LOGICIEL, INCLUS_SITE, SUR_DEVIS } from '@/data/offre-clubs/inclus'
import { PAGES_FONCTIONNALITES } from '@/data/offre-clubs/catalogue'
import { LEGENDES, captureDemo, suiteDemo, type IdCapture } from '@/data/offre-clubs/captures'
import { FAQ_CLUBS } from '@/data/offre-clubs/faq'
import { jetons, jetonsProfond } from '@/lib/jetons'
import { SITE } from '@/config/site'
import '@/gabarits/clubs/clubs.css'
import './offre.css'

const MOYEN = CATEGORIES.find((c) => c.id === 'moyen')!
const pack = (c = MOYEN) => tarif(c, 'pack')
const parLicencie = coutParLicencieAn(pack().mois, MOYEN.clubType).toLocaleString('fr-FR', { minimumFractionDigits: 2 })
const remise = Math.round(PRICING.packDiscount * 100)

const PROBLEMES = [
  { titre: 'Un tableur pour les adhérents', texte: 'Une version chez le trésorier, une autre chez la secrétaire, et personne ne sait laquelle est la bonne.' },
  { titre: 'Des e-mails en pagaille', texte: 'Les inscriptions, les certificats, les questions des parents arrivent dans des boîtes différentes et se perdent.' },
  { titre: 'Des groupes de messagerie', texte: 'Pratiques pour prévenir vite, mais l’information importante disparaît sous les messages du jour.' },
  { titre: 'Un site qui vieillit', texte: 'Il faut appeler la seule personne qui sait le modifier, et les horaires d’il y a deux saisons y sont encore.' },
  { titre: 'Et ADOC à côté', texte: 'L’outil officiel de la fédération, indispensable pour les licences, mais qui ne fait pas vivre le club au quotidien.' },
]

const SOLUTION: { titre: string; texte: string; lien: string; capture: IdCapture; mobile?: boolean }[] = [
  { titre: 'Le site du club', texte: 'Beau, à vos couleurs, parfait sur téléphone, et modifiable par le bureau sans rien casser. L’adhésion en ligne et le paiement HelloAsso sont dedans.', lien: `${RACINE_CLUBS}/site-internet`, capture: 'site-accueil' },
  { titre: 'Le logiciel du bureau', texte: 'Adhérents et familles, dossiers, école de tennis, Challenge, équipes, trésorerie, fichiers ADOC : chacun voit ce qui le concerne et ce qu’il a à faire aujourd’hui.', lien: `${RACINE_CLUBS}/logiciel-de-gestion`, capture: 'bureau-journee' },
  { titre: 'L’espace membre et parent', texte: 'Sur le téléphone, comme une application : le planning des enfants, une absence en un geste, la saisie d’un match, la carte de membre.', lien: `${RACINE_CLUBS}/fonctionnalites/espace-membre-et-parent`, capture: 'espace-parent', mobile: true },
]

const MERCREDI: { heure: string; titre: string; etapes: string[]; capture: IdCapture; mobile?: boolean }[] = [
  { heure: '9 h 30', titre: 'Il va pleuvoir ce soir', etapes: ['« Ma journée » prévient la présidente : trois séances en extérieur sont menacées.', 'En deux clics, les séances passent dans la halle ou sont reportées.', 'Les parents concernés sont prévenus par e-mail et par notification, avec le nouvel horaire.'], capture: 'bureau-journee' },
  { heure: '14 h 00', titre: 'Un parent inscrit son enfant', etapes: ['Sur le site, le parent remplit l’adhésion familiale et joint l’attestation de santé.', 'Il paie avec HelloAsso, en plusieurs fois s’il le souhaite.', 'Le dossier arrive aussitôt au bureau, complet, avec le paiement suivi.'], capture: 'site-adhesion' },
  { heure: '19 h 45', titre: 'Un match est saisi', etapes: ['Thomas saisit son match du Challenge sur son téléphone, au format FFT.', 'Son adversaire confirme le score d’un geste.', 'Le classement bouge sur le site du club, sans que personne n’ait rien recopié.'], capture: 'espace-jeu', mobile: true },
]

const ROLES = [
  { role: 'Président ou présidente', texte: 'Une seule page le matin, « Ma journée », dit ce qui demande une décision. Les statistiques préparent le rapport d’assemblée générale.' },
  { role: 'Trésorier ou trésorière', texte: 'Les paiements HelloAsso se rapprochent tout seuls des adhésions. Les impayés sont listés, les relances partent, l’export est prêt pour les comptes.' },
  { role: 'Secrétaire', texte: 'Les dossiers d’adhésion se suivent en colonnes : complet, à relancer, validé. Les licences manquantes ressortent avant l’export vers ADOC.' },
  { role: 'Enseignant ou enseignante', texte: 'L’appel se fait sur le téléphone, au bord du court. Une séance annulée prévient les familles ; la progression Galaxie Tennis se note en fin de séance.' },
  { role: 'Capitaine', texte: 'Les disponibilités arrivent d’elles-mêmes, la composition respecte les classements, la convocation et le covoiturage partent ensemble.' },
  { role: 'Parent', texte: 'Le planning de ses enfants sur le téléphone, une absence en un geste, les autorisations signées en ligne, la carte de membre toujours sur soi.' },
  { role: 'Joueur ou joueuse', texte: 'Ses matchs, son classement au Challenge, les tournois internes, la réservation d’un court si le club la propose.' },
]

const ETAPES_MISE_EN_PLACE = [
  { titre: 'Un premier échange', texte: `Un appel de 30 minutes, ou un rendez-vous au club (gratuit jusqu’à ${PRICING.premierRdvGratuitKm} km de Savigné-sur-Lathan, en Indre-et-Loire) : vos licenciés, vos outils actuels, ce qui vous prend du temps.` },
  { titre: 'Le justificatif des licenciés', texte: 'Un export ADOC ou le rapport d’assemblée générale avec les trois dernières saisons : il fixe la catégorie, revue une fois par an.' },
  { titre: 'Le devis', texte: 'Un devis écrit et ferme, à partir de la grille publique. Rien ne démarre sans votre signature.' },
  { titre: 'La mise en place', texte: 'Thème aux couleurs du club, pages, import des membres depuis votre export ADOC ou votre tableur. Le délai est indicatif : il dépend surtout des contenus que le club fournit.' },
  { titre: 'La formation', texte: 'Les heures d’accompagnement incluses servent à prendre en main le site et le logiciel, membre du bureau par membre du bureau.' },
  { titre: 'La mise en ligne', texte: 'Le site est publié, les adhérents reçoivent leur accès à l’espace membre, les premières adhésions arrivent.' },
  { titre: 'Le suivi', texte: `Support par e-mail ou formulaire, réponse sous ${PRICING.supportJoursOuvres} jours ouvrés ; mises à jour et nouvelles fonctionnalités de la formule incluses.` },
]

const DONNEES = [
  { titre: 'Les données du club appartiennent au club', texte: 'Le club est responsable de traitement, nous sommes sous-traitant (article 28 du RGPD), avec un contrat de traitement des données signé.' },
  { titre: 'Export complet à tout moment', texte: 'Les adhérents, les paiements, l’historique : tout s’exporte, quand vous le voulez, et vous est remis en fin de contrat.' },
  { titre: 'Droits par personne', texte: 'Chaque membre du bureau ne voit que ce dont il a besoin ; un journal garde la trace de qui a fait quoi.' },
  { titre: 'Sauvegardes quotidiennes', texte: 'Hébergement, https, surveillance et sauvegardes chaque jour sont compris dans l’abonnement.' },
  { titre: 'Mineurs et santé, avec prudence', texte: 'Pour la santé, seuls le type et la date du document sont tenus ; le droit à l’image est respecté dans la galerie.' },
  { titre: 'Aucune revente, aucune publicité', texte: 'Les données servent au club et à rien d’autre. La liste des sous-traitants figure dans les conditions de la plateforme.' },
]

const FAQ = jetonsProfond(FAQ_CLUBS.filter((q) => q.essentielle))

function Section({ id, nuit, titre, etiquette, intro, children, className = '' }: { id: string; nuit: 0 | 1; titre: string; etiquette: string; intro?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`co-section ${className}`} data-moment={`clubs-${id}`} data-nuit={nuit} aria-labelledby={`${id}-t`}>
      <div className="co-conteneur">
        <p className="su-mono co-etiquette">{etiquette}</p>
        <h2 id={`${id}-t`} className="su-display co-h2">
          {titre}
        </h2>
        {intro && <p className="co-intro">{intro}</p>}
        {children}
      </div>
    </section>
  )
}

function Vignette({ id, mobile = false }: { id: IdCapture; mobile?: boolean }) {
  const c = captureDemo(id)
  const im = (mobile ? c.mobile : c.bureau).images[0]
  if (!im) return null
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="co-vignette" data-mobile={mobile ? '1' : '0'} src={im.fichier} width={im.largeur} height={im.hauteur} alt={LEGENDES[id]} loading="lazy" decoding="async" />
}

export default function Offre() {
  const montrerAcompleter = process.env.VERCEL_ENV !== 'production' && !REFERENCE.temoignage.citation
  return (
    <main id="contenu" className="co">
      <ScenePage moment="clubs-heros" forme="logo" projection={0.55} pose={{ x: 0.1, y: -0.18 }} />

      {/* 1. Héro */}
      <header className="co-heros" data-moment="clubs-heros" data-nuit="1">
        <div className="co-conteneur co-heros__grille">
          <div className="co-heros__texte">
            <nav className="su-mono co-ariane" aria-label="Fil d’Ariane">
              <Link href="/">Accueil</Link> <span aria-hidden="true">/</span> <span>Clubs de tennis</span>
            </nav>
            <p className="su-mono co-etiquette co-etiquette--heros">{PRODUCT_NAME} · clubs de tennis, padel et pickleball</p>
            <h1 className="su-display co-h1">{PROMESSE.titre}</h1>
            <p className="co-chapo">
              <strong>{PROMESSE.sousTitre}</strong> {PROMESSE.pourQui}
            </p>
            <p className="co-actions">
              <Action href={`${RACINE_CLUBS}/demo`}>Voir la démo</Action>
              <Action href="#estimer" variante="contour">
                Estimer le prix pour mon club
              </Action>
            </p>
            <ul className="co-heros__demo" aria-label="La démo en ligne">
              {BOUTONS_DEMO.map((b) => (
                <li key={b.id}>
                  <a href={b.url} target="_blank" rel="noopener noreferrer">
                    {b.libelle} <span aria-hidden="true">↗</span>
                    <span className="sr-only"> (nouvel onglet)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="co-heros__prix">
              À partir de <strong>{eur(tarif(CATEGORIES[0]!, 'site').mois)}</strong> par mois pour le site, <strong>{eur(tarif(CATEGORIES[0]!, 'logiciel').mois)}</strong> pour le logiciel. Pour un club de {MOYEN.clubType} licenciés avec les deux : environ <strong>{parLicencie} €</strong> par licencié et par an.
            </p>
          </div>
          <div className="co-heros__appareils" aria-label="Aperçu de la démo : le logiciel du bureau et le site du club">
            <figure className="co-heros__ecran co-heros__ecran--bureau">
              <Portable ecran={suiteDemo({ bureau: ['bureau-journee', 'bureau-adhesions', 'bureau-ecole', 'bureau-challenge'], mobile: [] }).bureau} nom="Le logiciel du bureau" prioritaire />
              <figcaption className="su-mono">Le logiciel du bureau</figcaption>
            </figure>
            <figure className="co-heros__ecran co-heros__ecran--site">
              <Telephone ecran={suiteDemo({ bureau: [], mobile: ['site-accueil', 'espace-parent', 'espace-jeu'] }).mobile} nom="Le site et l’espace membre" prioritaire />
              <figcaption className="su-mono">Le site et l’espace membre</figcaption>
            </figure>
          </div>
        </div>
      </header>

      {/* 2. Le problème */}
      <Section id="probleme" nuit={0} etiquette="01 — Le constat" titre="Un bureau de bénévoles, et des outils qui ne se parlent pas." intro="Le club tourne grâce à quelques personnes qui donnent leurs soirées. Le temps qu’elles passent à recopier, relancer et chercher la bonne version, c’est du temps qu’elles ne passent pas sur les courts.">
        <ul className="co-cartes co-cartes--5">
          {PROBLEMES.map((p, i) => (
            <li key={p.titre} className="co-carte su-plaque su-plaque--ivoire">
              <span className="su-mono cl-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.titre}</h3>
              <p>{p.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. La solution */}
      <Section id="solution" nuit={1} etiquette="02 — La solution" titre="Trois pièces, connectées en direct." intro={`Ce qui est saisi d’un côté apparaît de l’autre, tout de suite. ${PROMESSE.sousTitre}`}>
        <ol className="co-solution">
          {SOLUTION.map((s, i) => (
            <li key={s.titre} className="co-solution__bloc">
              <Vignette id={s.capture} mobile={s.mobile} />
              <div>
                <span className="su-mono cl-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.titre}</h3>
                <p>{s.texte}</p>
                <Link href={s.lien} className="co-lien">
                  En savoir plus <span className="sr-only">sur {s.titre.toLowerCase()}</span>→
                </Link>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* 4. Un mercredi au club */}
      <Section id="mercredi" nuit={0} etiquette="03 — Un mercredi au club" titre="Une journée ordinaire, sans rien recopier." intro="Trois moments de la vie d’un club, tels qu’ils se passent dans la démo du Grand Chelem Tennis Club, un club fictif.">
        <ol className="co-mercredi">
          {MERCREDI.map((m) => (
            <li key={m.titre} className="co-mercredi__moment">
              <p className="su-mono co-mercredi__heure">{m.heure}</p>
              <div className="co-mercredi__corps">
                <h3>{m.titre}</h3>
                <ol>
                  {m.etapes.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ol>
              </div>
              <Vignette id={m.capture} mobile={m.mobile} />
            </li>
          ))}
        </ol>
        <p className="cl-note-demo">Dans la démo, les messages aux familles sont simulés en SMS ; l’offre, elle, prévient par e-mail et par notification sur le téléphone.</p>
      </Section>

      {/* 5. Rôle par rôle */}
      <Section id="roles" nuit={1} etiquette="04 — Rôle par rôle" titre="Ce que ça change pour chacun.">
        <ul className="co-cartes co-cartes--roles">
          {ROLES.map((r) => (
            <li key={r.role} className="co-carte co-carte--nuit">
              <h3>{r.role}</h3>
              <p>{r.texte}</p>
            </li>
          ))}
        </ul>
        <p className="co-actions">
          <Action href={DEMO.role('parent')} variante="contour">
            Essayer en tant que parent
          </Action>
          <Action href={`${RACINE_CLUBS}/demo#roles`} variante="lien">
            Tous les rôles de la démo
          </Action>
        </p>
      </Section>

      {/* 6. Les fonctionnalités */}
      <Section id="fonctionnalites" nuit={0} etiquette="05 — Les fonctionnalités" titre="Tout ce que le club fait déjà, au même endroit.">
        <ul className="co-fonctions">
          {PAGES_FONCTIONNALITES.map((f, i) => (
            <li key={f.chemin}>
              <Link href={f.chemin}>
                <span className="su-mono cl-num">{String(i + 1).padStart(2, '0')}</span>
                <b>{f.nom}</b>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 7. ADOC et Ten'Up */}
      <Section id="adoc" nuit={1} etiquette="06 — ADOC et Ten’Up" titre="ADOC reste l’outil officiel. On travaille avec ses fichiers." intro="Soyons précis, parce que c’est la première question des secrétaires.">
        <div className="co-deux">
          <div className="co-carte co-carte--nuit">
            <h3>Ce que fait {PRODUCT_NAME}</h3>
            <ul className="co-coches co-coches--oui">
              <li>
                <strong>Import et export des fichiers ADOC</strong> : un export ADOC crée ou met à jour les fiches des adhérents ; un fichier prêt pour la saisie dans ADOC en ressort.
              </li>
              <li>Contrôle des licences manquantes : qui a payé sa cotisation mais n’a pas encore de licence.</li>
              <li>Des liens vers Ten’Up pour les joueurs (tournois, classement).</li>
            </ul>
          </div>
          <div className="co-carte co-carte--nuit">
            <h3>Ce qu’il ne fait pas</h3>
            <ul className="co-coches co-coches--non">
              <li>Aucune connexion directe à ADOC : les échanges passent par des fichiers, que vous gardez la main pour importer.</li>
              <li>Aucune saisie automatique dans ADOC ni dans Ten’Up.</li>
              <li>Aucun partenariat avec la FFT : {PRODUCT_NAME} n’est ni affilié ni approuvé par la fédération.</li>
            </ul>
          </div>
        </div>
        <p className="co-actions">
          <Action href={`${RACINE_CLUBS}/fonctionnalites/import-export-adoc`} variante="lien">
            Import et export des fichiers ADOC, en détail
          </Action>
        </p>
      </Section>

      {/* 8. Tarifs résumés */}
      <Section id="tarifs" nuit={0} etiquette="07 — Les tarifs" titre="Un prix qui suit la taille du club." intro={`Une mise en place, payable en ${PRICING.installments} fois sans frais, puis un abonnement mensuel. La catégorie dépend des licenciés FFT de la saison en cours (tennis, padel et pickleball).`}>
        <div className="co-formules">
          {(['site', 'logiciel', 'pack'] as const).map((f) => {
            const t = tarif(CATEGORIES[0]!, f)
            return (
              <article key={f} className="co-formule su-plaque su-plaque--ivoire" data-pack={f === 'pack' ? '1' : '0'} aria-labelledby={`f-${f}`}>
                {f === 'pack' && <p className="co-formule__ruban su-mono">−{remise} % sur les deux</p>}
                <h3 id={`f-${f}`}>{f === 'site' ? 'Le site' : f === 'logiciel' ? 'Le logiciel' : 'Site + logiciel'}</h3>
                <p className="co-formule__prix">
                  <span>à partir de</span> <strong>{eur(t.mois)}</strong> <span>par mois</span>
                </p>
                <p className="co-formule__mise">+ mise en place à partir de {eur(t.miseEnPlace)}</p>
                <ul>
                  {(f === 'logiciel' ? INCLUS_LOGICIEL.slice(0, 4) : f === 'site' ? INCLUS_SITE.slice(0, 4) : ['Le site et le logiciel, connectés en direct', 'Toutes les fonctions des deux formules', `Les heures d’accompagnement des deux réunies`, `${remise} % de moins que la somme des deux`]).map((x) => (
                    <li key={jetons(x)}>{jetons(x).split(' : ')[0]}</li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
        <div className="co-tableau" role="region" aria-label="Prix par catégorie de club" tabIndex={0}>
          <table>
            <caption className="sr-only">Prix mensuel et mise en place par catégorie</caption>
            <thead>
              <tr>
                <th scope="col">Catégorie</th>
                <th scope="col">Le site</th>
                <th scope="col">Le logiciel</th>
                <th scope="col">Site + logiciel</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((c) => (
                <tr key={c.id}>
                  <th scope="row">
                    {c.nom}
                    <span>{c.max === null ? `${c.min} licenciés et +` : `${c.min} à ${c.max}`}</span>
                  </th>
                  {(['site', 'logiciel', 'pack'] as const).map((f) => (
                    <td key={f}>
                      <strong>{eur(tarif(c, f).mois)}</strong>/mois
                      <span>{eur(tarif(c, f).miseEnPlace)} à la mise en place</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="co-licencie">
          Exemple : un club de la catégorie {MOYEN.nom} avec {MOYEN.clubType} licenciés, site + logiciel à {eur(pack().mois)} par mois, revient à environ <strong>{parLicencie} € par licencié et par an</strong>.
        </p>
        <p className="co-actions">
          <Action href={`${RACINE_CLUBS}/tarifs`}>Tous les tarifs et les options</Action>
          <Action href="#estimer" variante="contour">
            Estimer pour mon club
          </Action>
        </p>
      </Section>

      {/* 9. Inclus, non inclus, sur devis */}
      <Section id="inclus" nuit={1} etiquette="08 — En un coup d’œil" titre="Ce qui est inclus, ce qui ne l’est pas.">
        <div className="co-trois">
          <div className="co-carte co-carte--nuit">
            <h3>Inclus dans l’abonnement</h3>
            <ul className="co-coches co-coches--oui">
              <li>Hébergement, nom de domaine, sauvegardes quotidiennes, sécurité</li>
              <li>Mises à jour et nouvelles fonctionnalités de la formule</li>
              <li>Support, réponse sous {PRICING.supportJoursOuvres} jours ouvrés</li>
              <li>Comptes du bureau et des enseignants illimités</li>
              <li>Export complet des données à tout moment</li>
              <li>Contrat de traitement des données (RGPD)</li>
            </ul>
          </div>
          <div className="co-carte co-carte--nuit">
            <h3>Non inclus</h3>
            <ul className="co-coches co-coches--non">
              {ABONNEMENT_NON_INCLUS.map((x) => (
                <li key={jetons(x)}>{(jetons(x).split(' (')[0] ?? '').split(' : ')[0]}</li>
              ))}
            </ul>
          </div>
          <div className="co-carte co-carte--nuit">
            <h3>Sur devis</h3>
            <ul className="co-coches co-coches--devis">
              {SUR_DEVIS.slice(0, 7).map((x) => (
                <li key={jetons(x)}>{jetons(x).split(' (')[0]}</li>
              ))}
            </ul>
            <Action href={`${RACINE_CLUBS}/simulateur#devis`} variante="lien">
              Demander un devis
            </Action>
          </div>
        </div>
      </Section>

      {/* 10. Le simulateur */}
      <section id="estimer" className="co-section co-estimer" data-moment="clubs-estimer" data-nuit="0" aria-labelledby="estimer-t">
        <div className="co-conteneur">
          <p className="su-mono co-etiquette">09 — Le simulateur</p>
          <h2 id="estimer-t" className="su-display co-h2">
            Combien pour votre club ?
          </h2>
          <p className="co-intro">Deux réponses suffisent pour une première idée. Le simulateur complet ajoute les options, l’accompagnement et le paiement, et vous envoie le récapitulatif.</p>
          <Simulateur compact />
        </div>
      </section>

      {/* 11. La démo */}
      <Section id="demo" nuit={1} etiquette="10 — La démo" titre="Le club fictif est en ligne. Entrez." intro={`Le « ${DEMO.clubFictif} » a son site, son bureau et ses membres. Sans inscription : choisissez une entrée.`}>
        <BoutonsDemo avecTexte />
        <p className="co-actions">
          <Action href={`${RACINE_CLUBS}/demo`} variante="lien">
            Le parcours conseillé, rôle par rôle
          </Action>
        </p>
      </Section>

      {/* 12. Référence TCSG */}
      <Section id="reference" nuit={0} etiquette="11 — Ils l’utilisent" titre={`Le ${REFERENCE.club}.`}>
        <div className="co-reference">
          <div>
            <p>
              Le club de tennis de Savigné-sur-Lathan, Gizeux et Cléré-les-Pins, en Indre-et-Loire, utilise la solution. Par transparence : {REFERENCE.lien}
            </p>
            {REFERENCE.temoignage.citation ? (
              <figure className="co-temoignage">
                <blockquote>
                  <p>« {REFERENCE.temoignage.citation} »</p>
                </blockquote>
                <figcaption>
                  {REFERENCE.temoignage.auteur}, {REFERENCE.temoignage.fonction}
                </figcaption>
              </figure>
            ) : (
              montrerAcompleter && (
                <div className="cl-a-completer" role="note">
                  <p className="su-mono">À COMPLÉTER — visible seulement hors production</p>
                  <p>Citation réelle d’un membre du bureau du TCSG, son nom, sa fonction et sa photo : à renseigner dans src/config/offre-clubs.ts (REFERENCE.temoignage). Jamais de citation inventée.</p>
                </div>
              )
            )}
            <p className="co-actions">
              <Action href={REFERENCE.url} variante="contour">
                Voir le site du club
              </Action>
            </p>
          </div>
          <Vignette id="site-accueil" />
        </div>
      </Section>

      {/* 13. Comment ça se passe */}
      <Section id="deroule" nuit={1} etiquette="12 — Comment ça se passe" titre="Du premier appel à la mise en ligne.">
        <ol className="co-deroule">
          {ETAPES_MISE_EN_PLACE.map((e, i) => (
            <li key={e.titre}>
              <span className="su-mono cl-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{e.titre}</h3>
              <p>{e.texte}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* 14. Sécurité et données */}
      <Section id="donnees" nuit={0} etiquette="13 — Sécurité et données" titre="Les données du club restent au club.">
        <ul className="co-cartes co-cartes--3">
          {DONNEES.map((d) => (
            <li key={d.titre} className="co-carte su-plaque su-plaque--ivoire">
              <h3>{d.titre}</h3>
              <p>{d.texte}</p>
            </li>
          ))}
        </ul>
        <p>
          Le détail est écrit dans les <Link href="/cgv-plateforme#annexe">conditions de la plateforme, annexe données</Link>.
        </p>
      </Section>

      {/* 15. FAQ courte */}
      <Section id="faq" nuit={1} etiquette="14 — Questions fréquentes" titre="Les huit questions qu’on nous pose le plus.">
        <div className="co-faq">
          <Accordeon questions={FAQ.map((f) => ({ q: f.q, r: f.a }))} groupe="faq-clubs-accueil" />
        </div>
        <p className="co-actions">
          <Action href={`${RACINE_CLUBS}/faq`} variante="lien">
            Toutes les questions
          </Action>
        </p>
      </Section>

      {/* 16. Appel final */}
      <section id="contact" className="co-section co-final" data-moment="clubs-final" data-nuit="0" aria-labelledby="final-t">
        <div className="co-conteneur">
          <h2 id="final-t" className="su-display co-h1 co-final__titre">
            Parlons de votre club.
          </h2>
          <p className="co-intro">
            Un appel de 30 minutes, gratuit, avec {SITE.fondateur}, qui code la plateforme et qui est lui-même vice-président d’un club de tennis. Ou un rendez-vous au club, gratuit jusqu’à {PRICING.premierRdvGratuitKm} km de Savigné-sur-Lathan.
          </p>
          <p className="co-actions">
            <Action href="/contact?a=appel&objet=Club%20de%20tennis">Réserver un appel</Action>
            <Action href={`${RACINE_CLUBS}/simulateur#devis`} variante="contour">
              Demander un devis
            </Action>
          </p>
          <p className="co-final__ecrire">
            Ou écrire à <a href={`mailto:${SITE.email}?subject=${encodeURIComponent(`${PRODUCT_NAME} — notre club`)}`}>{SITE.email}</a> · <a href={SITE.telephoneLien}>{SITE.telephone}</a>
          </p>
          <nav aria-label="Pages de l’offre" className="co-plan">
            <Link href={`${RACINE_CLUBS}/site-internet`}>Le site du club</Link>
            <Link href={`${RACINE_CLUBS}/logiciel-de-gestion`}>Le logiciel du bureau</Link>
            <Link href={`${RACINE_CLUBS}/tarifs`}>Tarifs</Link>
            <Link href={`${RACINE_CLUBS}/simulateur`}>Simulateur</Link>
            <Link href={`${RACINE_CLUBS}/demo`}>Démo</Link>
            <Link href={`${RACINE_CLUBS}/faq`}>FAQ</Link>
            <Link href={`${RACINE_CLUBS}/guides`}>Guides</Link>
            <Link href={`${RACINE_CLUBS}/padel`}>Padel</Link>
            <Link href={`${RACINE_CLUBS}/pickleball`}>Pickleball</Link>
            <Link href={`${RACINE_CLUBS}/centre-val-de-loire`}>Centre-Val de Loire</Link>
            <Link href={`${RACINE_CLUBS}/indre-et-loire`}>Indre-et-Loire</Link>
          </nav>
          <PiedOffre />
        </div>
      </section>
    </main>
  )
}
