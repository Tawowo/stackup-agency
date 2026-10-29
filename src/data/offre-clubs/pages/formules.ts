/**
 * FORMULES DE L'OFFRE « CLUBS DE TENNIS » — le site du club et le logiciel du bureau.
 * Montants en jetons {{club:…}} uniquement (src/lib/jetons.ts) ; nom du produit : {{produit}}.
 */
import type { PageClub } from '../types'
import { DEMO } from '@/config/offre-clubs'

const SITE_INTERNET: PageClub = {
  slug: 'site-internet',
  chemin: '/clubs-de-tennis/site-internet',
  famille: 'formule',
  titre: `Le site internet de votre club de tennis, que le bureau modifie lui-même`,
  etiquette: `Formule · Le site du club`,
  reponse: `Un site aux couleurs de votre club, parfait sur téléphone, que le bureau met à jour seul avec un éditeur qui ne peut pas casser le design. Il comprend jusqu’à {{club:pages}} pages créées à la mise en place, l’adhésion en ligne avec paiement HelloAsso, les actualités, l’agenda et la galerie. Il démarre à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois.`,
  titleSeo: `Site internet club de tennis, modifiable par le bureau`,
  descriptionSeo: `Site internet pour club de tennis : thème aux couleurs du club, adhésion en ligne, paiement HelloAsso, éditeur simple. Prix par catégorie, démo en ligne.`,
  motCle: 'site internet club de tennis',
  motsCles: [
    'création site club de tennis',
    'site internet association de tennis',
    'site club de tennis modifiable soi-même',
    'site club de tennis avec adhésion en ligne',
    'prix site internet club de tennis',
    'site club de tennis avec section padel',
  ],
  capture: 'site-accueil',
  demo: [
    { libelle: `Voir le site du club fictif`, url: DEMO.site },
    { libelle: `Faire une adhésion familiale`, url: DEMO.page('/adherer') },
    { libelle: `Modifier une page avec l’éditeur`, url: DEMO.role('presidente', '/editeur') },
  ],
  tarif: {
    formule: 'site',
    texte: `Le site démarre à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois pour un club de la catégorie Mini. Pour un club de la catégorie Moyen, comptez à partir de {{club:site:moyen:mise}} € et {{club:site:moyen:mois}} € par mois. Avec le logiciel, le pack retire {{club:remise-pack}} % aux deux.`,
  },
  etapes: [
    {
      titre: `Un premier échange`,
      texte: `Nous regardons votre site actuel et vos besoins. Le premier rendez-vous en présentiel est gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; au-delà, visio, ou présentiel avec une indemnité sur devis.`,
    },
    {
      titre: `Le devis et le choix du thème`,
      texte: `Vous recevez un devis définitif selon votre catégorie et vos options, puis vous choisissez votre thème parmi 2 ou 3.`,
    },
    {
      titre: `La création des pages`,
      texte: `Nous créons jusqu’à {{club:pages}} pages à partir des textes, des photos et des documents que vous nous transmettez. Si vous préférez que nous reprenions l’ancien site ou que nous rédigions une page, ce sont des options.`,
    },
    {
      titre: `La prise en main`,
      texte: `Les heures d’accompagnement incluses servent à vous montrer l’éditeur : de {{club:heures:site:mini}} h (Mini) à {{club:heures:site:tres-grand}} h (Très grand).`,
    },
    {
      titre: `La mise en ligne`,
      texte: `Le site est publié sur le nom de domaine du club. Le délai est indicatif : il dépend surtout du temps de rassembler vos contenus.`,
    },
  ],
  sections: [
    {
      id: 'a-quoi-sert-le-site',
      titre: `À quoi sert le site d’un club de tennis ?`,
      paragraphes: [
        `Le site d’un club répond d’abord aux questions que l’on vous pose au téléphone ou au bord du court. Combien coûte l’adhésion ? À quelle heure est le cours de mon fils ? Peut-on faire un essai ? Où est le club ? Quand a lieu le tournoi ? Si la réponse est sur le site, à jour, le bureau gagne en tranquillité.`,
        `Il sert aussi à donner envie à un nouvel habitant, à un parent, à un partenaire. Et il doit rester vivant sans dépendre d’une seule personne : c’est pour cela que le site de {{produit}} se modifie avec un éditeur simple, sans nous appeler.`,
      ],
    },
    {
      id: 'ce-que-comprend-le-site',
      titre: `Ce que comprend le site du club`,
      paragraphes: [`Voici, sans rien ajouter, ce que contient la formule « site ».`],
      sous: [
        {
          titre: `Un thème haut de gamme aux couleurs du club`,
          paragraphes: [
            `Vous choisissez parmi 2 ou 3 thèmes, adaptés à votre logo, à vos couleurs et à vos typographies, avec des animations soignées et un mode sombre. Le site est pensé d’abord pour le téléphone.`,
          ],
        },
        {
          titre: `Jusqu’à {{club:pages}} pages créées à la mise en place`,
          paragraphes: [`Les pages légales s’ajoutent à ce nombre. Une sélection type :`],
          liste: [
            `accueil, le club, installations ;`,
            `tarifs et adhésion, école de tennis, adultes ;`,
            `équipes et compétitions, actualités, agenda, galerie ;`,
            `partenaires, documents, FAQ, contact, essai gratuit.`,
          ],
        },
        {
          titre: `L’éditeur : le club modifie seul`,
          paragraphes: [
            `Le bureau modifie les textes, les images, les liens, les menus et les documents, directement sur la page. Il peut créer de nouvelles pages sans limite. Le design est protégé : on ne peut pas le casser par erreur. Voir [le site modifiable par le club](/clubs-de-tennis/fonctionnalites/site-modifiable).`,
          ],
        },
        {
          titre: `L’adhésion en ligne`,
          paragraphes: [
            `Un formulaire d’adhésion en ligne, avec les pièces jointes (certificat, autorisation…) et un bouton de paiement HelloAsso. L’argent va directement sur le compte du club, jamais chez nous. Voir [l’adhésion en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne) et [le paiement HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-helloasso).`,
          ],
        },
        {
          titre: `La vie du club`,
          paragraphes: [`Tout ce qui fait vivre le site au fil de la saison :`],
          liste: [
            `les actualités ;`,
            `un agenda abonnable : les adhérents l’ajoutent à l’agenda de leur téléphone ;`,
            `une galerie qui respecte le droit à l’image ;`,
            `les documents (règlement intérieur, statuts, comptes rendus) et une FAQ ;`,
            `un bandeau d’information urgent (court fermé, tournoi reporté) ;`,
            `des pages de section pour le padel et le pickleball.`,
          ],
        },
        {
          titre: `Être trouvé, et savoir qui vous lit`,
          paragraphes: [
            `Le référencement de base est fait : titres, plan du site et données structurées, pour que le club soit trouvé quand on cherche son nom. Les statistiques de visite respectent la vie privée des visiteurs. Des heures d’accompagnement sont incluses pour recueillir vos demandes et vous aider à prendre le site en main.`,
          ],
        },
      ],
    },
    {
      id: 'abonnement',
      titre: `Ce que couvre l’abonnement mensuel`,
      paragraphes: [`L’abonnement n’est pas un loyer pour rien. Il comprend :`],
      liste: [
        `l’hébergement, le nom de domaine, le https, les sauvegardes quotidiennes, la surveillance et la sécurité ;`,
        `les mises à jour et les nouvelles fonctionnalités de la formule, et la maintenance ;`,
        `le support par e-mail ou formulaire, avec une réponse sous {{club:support-jours}} jours ouvrés ;`,
        `les comptes du bureau illimités ;`,
        `le stockage selon votre catégorie, par exemple {{club:stockage:petit}} Go pour un club Petit ;`,
        `l’export complet de vos données à tout moment ;`,
        `un contrat de traitement des données, exigé par le RGPD.`,
      ],
    },
    {
      id: 'ce-qui-n-est-pas-inclus',
      titre: `Ce qui n’est pas inclus`,
      paragraphes: [`Mieux vaut le savoir avant de signer :`],
      liste: [
        `les heures d’accompagnement au-delà de celles incluses, à {{club:heure}} € de l’heure ;`,
        `un développement propre à votre club, à {{club:dev-heure}} € de l’heure, toujours chiffré avant ;`,
        `les options présentées plus bas ;`,
        `les frais de paiement si vous choisissez un autre prestataire que HelloAsso ;`,
        `la saisie du contenu à la place du club : au fil de la saison, actualités, agenda et documents sont mis à jour par le bureau, avec l’éditeur ;`,
        `les SMS : nous n’en proposons pas ;`,
        `la gestion des accès physiques aux courts (codes, serrures) : non proposée.`,
      ],
    },
    {
      id: 'options',
      titre: `Les options qui vont avec le site`,
      paragraphes: [`Chaque option se choisit séparément, à la mise en place ou plus tard.`],
      liste: [
        `Réservation de courts en ligne : à partir de {{club:option:reservation-courts:mise}} € puis {{club:option:reservation-courts:mois}} € par mois. Voir [la réservation de courts](/clubs-de-tennis/fonctionnalites/reservation-de-courts).`,
        `Boutique du club (tenues, précommandes groupées) : à partir de {{club:option:boutique:mise}} € puis {{club:option:boutique:mois}} € par mois.`,
        `Accueil 3D sur mesure : une scène en trois dimensions unique au club en page d’accueil ; son prix figure dans [les tarifs](/clubs-de-tennis/tarifs).`,
        `Référencement Local : à partir de {{club:option:referencement-local:mise}} € puis {{club:option:referencement-local:mois}} € par mois. Référencement Régional : à partir de {{club:option:referencement-regional:mise}} € puis {{club:option:referencement-regional:mois}} € par mois.`,
        `Plusieurs lieux ou sections gérés séparément : à partir de {{club:option:plusieurs-lieux:mise}} € puis {{club:option:plusieurs-lieux:mois}} € par mois.`,
        `Page supplémentaire créée à la mise en place : {{club:option:page-supplementaire:mise}} € par page. Reprise du contenu de l’ancien site : {{club:option:reprise-contenu:mise}} € par page. Rédaction d’une page : {{club:option:redaction-page:mise}} € par page.`,
        `Adresses e-mail du club : {{club:option:adresses-email:mise}} €, le service e-mail restant à la charge du club.`,
        `Copie autonome du site en cas de départ : {{club:option:copie-autonome:mise}} €.`,
      ],
    },
    {
      id: 'prix-par-categorie',
      titre: `Combien coûte le site d’un club de tennis ?`,
      paragraphes: [
        `Le prix dépend de la taille du club, mesurée par ses licenciés FFT de la saison en cours, tennis, padel et pickleball compris. Le justificatif est simple : un export ADOC ou le rapport d’assemblée générale avec les 3 dernières saisons. La catégorie est revue une fois par an, au renouvellement.`,
        `Ces prix sont indicatifs. Le devis définitif suit un premier échange.`,
      ],
      liste: [
        `Mini, de {{club:min:mini}} à {{club:max:mini}} licenciés : à partir de {{club:site:mini:mise}} € de mise en place et {{club:site:mini:mois}} € par mois.`,
        `Petit, de {{club:min:petit}} à {{club:max:petit}} licenciés : à partir de {{club:site:petit:mise}} € et {{club:site:petit:mois}} € par mois.`,
        `Moyen, de {{club:min:moyen}} à {{club:max:moyen}} licenciés : à partir de {{club:site:moyen:mise}} € et {{club:site:moyen:mois}} € par mois.`,
        `Grand, de {{club:min:grand}} à {{club:max:grand}} licenciés : à partir de {{club:site:grand:mise}} € et {{club:site:grand:mois}} € par mois.`,
        `Très grand, {{club:min:tres-grand}} licenciés et plus : à partir de {{club:site:tres-grand:mise}} € et {{club:site:tres-grand:mois}} € par mois.`,
      ],
      sous: [
        {
          titre: `Les conditions`,
          paragraphes: [
            `L’engagement porte sur une saison, soit {{club:engagement}} mois, puis le contrat se reconduit chaque année. L’abonnement est prélevé par SEPA. La mise en place se règle en {{club:fois}} fois sans frais. En payant l’abonnement à l’année, vous bénéficiez de {{club:remise-annuelle}} % de remise. Il n’y a pas d’autre remise. Pour votre cas précis, utilisez [le simulateur](/clubs-de-tennis/simulateur).`,
          ],
        },
      ],
    },
    {
      id: 'pack-site-et-logiciel',
      titre: `Le site et le logiciel ensemble : le pack`,
      paragraphes: [
        `Le site fonctionne seul, mais il prend toute sa valeur relié au [logiciel du bureau](/clubs-de-tennis/logiciel-de-gestion) : une adhésion faite sur le site arrive directement dans le suivi des dossiers, sans ressaisie, et l’agenda ou le classement du Challenge viennent du logiciel, en direct.`,
        `Le pack retire {{club:remise-pack}} % à la mise en place et à l’abonnement. Exemple type : pour un club de la catégorie Moyen, le pack revient à partir de {{club:pack:moyen:mise}} € de mise en place et {{club:pack:moyen:mois}} € par mois, soit environ {{club:par-licencie:moyen}} € par licencié et par an pour un club type de {{club:licencies-type:moyen}} licenciés.`,
      ],
    },
    {
      id: 'fonctionnalites-du-site',
      titre: `Les fonctionnalités du site en détail`,
      paragraphes: [`Chaque page ci-dessous détaille une partie du site, avec la démo correspondante :`],
      liste: [
        `[Le site modifiable par le club](/clubs-de-tennis/fonctionnalites/site-modifiable)`,
        `[Les adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne)`,
        `[Le paiement en ligne HelloAsso](/clubs-de-tennis/fonctionnalites/paiement-helloasso)`,
        `[La réservation de courts](/clubs-de-tennis/fonctionnalites/reservation-de-courts), en option`,
        `[Le guide : créer le site de son club de tennis](/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis)`,
      ],
    },
  ],
  faq: [
    {
      q: `Qui met le site à jour une fois en ligne ?`,
      a: `Le bureau, avec l’éditeur : vous cliquez sur un texte ou une image pour le changer. Pour de l’aide au-delà des heures incluses : {{club:heure}} € de l’heure.`,
    },
    {
      q: `Peut-on abîmer le site en le modifiant ?`,
      a: `Non. L’éditeur touche le contenu, pas le design : les couleurs, les espacements et la mise en page restent ceux du thème, sur ordinateur comme sur téléphone.`,
    },
    {
      q: `Combien de pages pouvons-nous avoir ?`,
      a: `Nous créons jusqu’à {{club:pages}} pages à la mise en place, pages légales en plus. Ensuite, le club en crée lui-même autant qu’il veut. Si vous voulez que nous en créions davantage dès le départ, c’est {{club:option:page-supplementaire:mise}} € par page.`,
    },
    {
      q: `L’argent des cotisations passe-t-il par vous ?`,
      a: `Jamais. Le paiement passe par HelloAsso, gratuit pour le club, et l’argent arrive directement sur le compte du club. Si vous préférez un autre prestataire de paiement, ses frais sont à la charge du club.`,
    },
    {
      q: `Le site sera-t-il bien référencé ?`,
      a: `Personne ne peut le promettre honnêtement. Le référencement de base est fait pour que le club soit trouvé sur son nom. Pour être trouvé dans votre commune ou votre département, il existe les options Référencement Local et Référencement Régional.`,
    },
    {
      q: `Peut-on garder notre adresse de site actuelle ?`,
      a: `Le plus souvent, oui. Si le club possède déjà un nom de domaine, nous regardons au premier échange qui le détient et comment le rattacher au nouveau site.`,
    },
    {
      q: `Que se passe-t-il si nous arrêtons ?`,
      a: `Après la première saison, vous pouvez arrêter au renouvellement. Vos données s’exportent à tout moment. Si vous voulez garder un site qui fonctionne sans la plateforme, la copie autonome coûte {{club:option:copie-autonome:mise}} €. Les détails sont dans les [CGV de la plateforme](/cgv-plateforme).`,
    },
    {
      q: `Peut-on voir le site avant de signer ?`,
      a: `Oui : [la démo](/clubs-de-tennis/demo) montre le site complet d’un club fictif, le Grand Chelem Tennis Club, éditeur compris.`,
    },
  ],
  liens: [
    { href: '/clubs-de-tennis', nom: `Site et logiciel pour clubs de tennis`, note: `Vue d’ensemble de l’offre` },
    { href: '/clubs-de-tennis/logiciel-de-gestion', nom: `Le logiciel du bureau`, note: `Pour aller avec le site` },
    { href: '/clubs-de-tennis/tarifs', nom: `Tarifs`, note: `Toutes les catégories et options` },
    { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    { href: '/clubs-de-tennis/fonctionnalites/site-modifiable', nom: `Le site modifiable par le club` },
    { href: '/clubs-de-tennis/padel', nom: `Clubs avec padel` },
    { href: '/clubs-de-tennis/guides/creer-le-site-de-son-club-de-tennis', nom: `Créer le site de son club de tennis` },
  ],
  maj: '2026-10-29',
}

const LOGICIEL_DE_GESTION: PageClub = {
  slug: 'logiciel-de-gestion',
  chemin: '/clubs-de-tennis/logiciel-de-gestion',
  famille: 'formule',
  titre: `Le logiciel de gestion de votre club de tennis : tout le bureau au même endroit`,
  etiquette: `Formule · Le logiciel du bureau`,
  reponse: `Un logiciel en ligne pour le bureau : adhérents et familles, adhésions et réinscriptions, paiements HelloAsso, école de tennis, équipes, Challenge interne, bénévolat et trésorerie simple. Chaque membre du bureau voit chaque jour ce qui l’attend, et les adhérents ont leur espace sur téléphone. À partir de {{club:logiciel:mini:mise}} € de mise en place et {{club:logiciel:mini:mois}} € par mois.`,
  titleSeo: `Logiciel de gestion club de tennis : adhérents, école`,
  descriptionSeo: `Logiciel de gestion pour club de tennis : adhésions, HelloAsso, école de tennis, équipes, Challenge, import et export des fichiers ADOC. Démo en ligne.`,
  motCle: 'logiciel gestion club de tennis',
  motsCles: [
    'logiciel club de tennis',
    'logiciel gestion association tennis',
    'gestion adhérents club de tennis',
    'logiciel école de tennis et adhésions',
    'outil bureau club de tennis',
    'prix logiciel gestion club de tennis',
  ],
  capture: 'bureau-journee',
  demo: [
    { libelle: `Ouvrir « Ma journée » de la présidente`, url: DEMO.role('presidente') },
    { libelle: `Faire l’appel en tant qu’enseignant`, url: DEMO.role('enseignant', '/bureau/ecole/appel') },
    { libelle: `Voir la trésorerie du trésorier`, url: DEMO.role('tresorier', '/bureau/tresorerie') },
    { libelle: `Essayer l’espace parent`, url: DEMO.role('parent', '/espace') },
  ],
  tarif: {
    formule: 'logiciel',
    texte: `Le logiciel démarre à partir de {{club:logiciel:mini:mise}} € de mise en place et {{club:logiciel:mini:mois}} € par mois pour un club de la catégorie Mini. Pour un club de la catégorie Moyen, comptez à partir de {{club:logiciel:moyen:mise}} € et {{club:logiciel:moyen:mois}} € par mois. Avec le site, le pack retire {{club:remise-pack}} % aux deux.`,
  },
  etapes: [
    {
      titre: `Un premier échange`,
      texte: `Vous nous racontez comment le bureau travaille aujourd’hui. Premier rendez-vous en présentiel gratuit jusqu’à {{club:km}} km de Savigné-sur-Lathan ; sinon visio, ou indemnité sur devis.`,
    },
    {
      titre: `Le devis`,
      texte: `Il tient compte de votre catégorie et des options retenues. Rien n’est facturé qui n’y figure pas.`,
    },
    {
      titre: `L’import des membres`,
      texte: `Nous reprenons vos membres depuis une source : un export ADOC ou votre tableur. Une deuxième source est une option.`,
    },
    {
      titre: `Le réglage du club`,
      texte: `Saison, tarifs, groupes de l’école, courts, membres du bureau et leurs droits : le logiciel est réglé à l’image de votre club.`,
    },
    {
      titre: `La prise en main`,
      texte: `Les heures incluses servent à former le bureau et les enseignants : de {{club:heures:logiciel:mini}} h (Mini) à {{club:heures:logiciel:tres-grand}} h (Très grand). Le délai est indicatif ; les réinscriptions sont souvent un bon moment pour démarrer.`,
    },
  ],
  sections: [
    {
      id: 'ma-journee',
      titre: `Ce que voit le bureau en ouvrant le logiciel`,
      paragraphes: [
        `Le premier écran s’appelle **Ma journée**. Il montre, pour chaque membre du bureau, ce qui demande une action aujourd’hui : un dossier d’adhésion incomplet pour la secrétaire, un paiement à vérifier pour le trésorier, une équipe à composer pour le capitaine. Chacun voit ce qui le concerne, pas tout le club.`,
        `Chaque personne a un rôle et des droits précis : un enseignant fait l’appel sans voir la trésorerie, un capitaine compose son équipe sans toucher aux adhésions. Voir [Ma journée et les automatisations](/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations).`,
      ],
    },
    {
      id: 'ce-que-comprend-le-logiciel',
      titre: `Ce que comprend le logiciel du bureau`,
      paragraphes: [`Voici, sans rien ajouter, ce que contient la formule « logiciel ».`],
      sous: [
        {
          titre: `Adhérents, familles et adhésions`,
          paragraphes: [`Le cœur du bureau :`],
          liste: [
            `les adhérents et les familles, avec les rôles et les droits de chaque personne ;`,
            `les adhésions et réinscriptions en ligne, le suivi des dossiers et des relances automatiques ;`,
            `le paiement en ligne via HelloAsso, avec un suivi automatique de ce qui est payé ;`,
            `une trésorerie simple et un export pour le trésorier ;`,
            `l’import des membres depuis une source (export ADOC ou tableur).`,
          ],
        },
        {
          titre: `Licences : import et export des fichiers ADOC`,
          paragraphes: [
            `ADOC reste l’outil de la FFT pour l’administratif fédéral. {{produit}} propose l’**import et export des fichiers ADOC** et contrôle les licences manquantes : vous voyez qui a adhéré au club sans avoir encore sa licence. Les liens vers Ten’Up sont là pour les adhérents. Voir [l’import et l’export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc).`,
          ],
        },
        {
          titre: `École de tennis et planning`,
          paragraphes: [
            `Les groupes de l’école, l’appel sur téléphone par l’enseignant, les annulations et les reports, la progression Galaxie Tennis. Un planning global réunit les courts et les activités. Voir [l’école de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis).`,
          ],
        },
        {
          titre: `Challenge, équipes, tournois et événements`,
          paragraphes: [`La vie sportive du club :`],
          liste: [
            `le Challenge interne : classement, badges, saisie des matchs au format FFT, Hall of Fame ;`,
            `les équipes et compétitions : disponibilités, compositions, convocations, covoiturage ;`,
            `les tournois internes et les événements, avec inscriptions.`,
          ],
        },
        {
          titre: `Bénévolat, communication et suivi`,
          paragraphes: [`Ce qui fait tenir le club :`],
          liste: [
            `le bénévolat : missions, inscriptions, compteur d’heures ;`,
            `la communication par e-mail et par notification sur le téléphone, sans SMS ;`,
            `les documents, les statistiques et le journal de qui a fait quoi ;`,
            `5 automatisations prêtes, par exemple une relance de dossier incomplet.`,
          ],
        },
        {
          titre: `L’espace membre et parent`,
          paragraphes: [
            `Les adhérents et les parents ont leur espace, installable sur le téléphone comme une application, sans passer par un magasin d’applications : planning des enfants, absence signalée, dossier, carte de membre, saisie des matchs du Challenge. Voir [l’espace membre et parent](/clubs-de-tennis/fonctionnalites/espace-membre-et-parent).`,
          ],
        },
      ],
    },
    {
      id: 'adoc-et-le-logiciel',
      titre: `Le logiciel remplace-t-il ADOC ?`,
      paragraphes: [
        `Non, et ce n’est pas son rôle. **ADOC gère l’administratif fédéral, {{produit}} fait vivre votre club.** Les licences se prennent toujours dans ADOC. Le logiciel s’occupe de tout ce qu’ADOC ne fait pas : les familles, l’école, les équipes, le Challenge, la communication, les bénévoles.`,
        `Le lien entre les deux passe par des fichiers : vous exportez depuis ADOC, vous importez dans {{produit}}, et inversement quand c’est utile. Le logiciel n’est ni connecté ni synchronisé en direct avec ADOC, et {{produit}} n’est ni affilié ni approuvé par la FFT.`,
      ],
    },
    {
      id: 'abonnement',
      titre: `Ce que couvre l’abonnement mensuel`,
      paragraphes: [`Pendant toute la durée du contrat :`],
      liste: [
        `l’hébergement, le https, les sauvegardes quotidiennes, la surveillance et la sécurité ;`,
        `les mises à jour, les nouvelles fonctionnalités de la formule et la maintenance ;`,
        `le support par e-mail ou formulaire, avec une réponse sous {{club:support-jours}} jours ouvrés ;`,
        `les comptes du bureau et des enseignants illimités, les membres illimités dans votre catégorie ;`,
        `les e-mails automatiques dans un usage normal ;`,
        `le stockage selon la catégorie, par exemple {{club:stockage:moyen}} Go pour un club Moyen ;`,
        `l’export complet de vos données à tout moment, et un contrat de traitement des données (RGPD).`,
      ],
    },
    {
      id: 'ce-qui-n-est-pas-inclus',
      titre: `Ce qui n’est pas inclus`,
      paragraphes: [`Pour éviter les surprises :`],
      liste: [
        `les heures d’accompagnement au-delà de celles incluses : {{club:heure}} € de l’heure ;`,
        `un développement propre à votre club : {{club:dev-heure}} € de l’heure, chiffré avant ;`,
        `les options ;`,
        `les frais de paiement d’un autre prestataire que HelloAsso ;`,
        `la saisie du contenu à la place du club ;`,
        `les SMS, que nous ne proposons pas : le club garde ses groupes de messagerie s’il le souhaite ;`,
        `la gestion des accès physiques aux courts (codes, serrures).`,
      ],
    },
    {
      id: 'options',
      titre: `Les options qui vont avec le logiciel`,
      paragraphes: [`À ajouter à la mise en place ou en cours de route :`],
      liste: [
        `Assistant IA du club : à partir de {{club:option:assistant-ia:mise}} € puis {{club:option:assistant-ia:mois}} € par mois. Un humain valide toujours. Voir [l’assistant IA](/clubs-de-tennis/fonctionnalites/assistant-ia).`,
        `Commande vocale, qui nécessite l’assistant : à partir de {{club:option:commande-vocale:mise}} € puis {{club:option:commande-vocale:mois}} € par mois.`,
        `Automatisations avancées : à partir de {{club:option:automatisations-avancees:mise}} € puis {{club:option:automatisations-avancees:mois}} € par mois.`,
        `Réservation de courts en ligne : à partir de {{club:option:reservation-courts:mise}} € puis {{club:option:reservation-courts:mois}} € par mois.`,
        `Écran club-house : {{club:option:ecran-club-house:mise}} €, sans abonnement.`,
        `Sponsors et partenaires : à partir de {{club:option:sponsors:mise}} € puis {{club:option:sponsors:mois}} € par mois. Assemblée générale et votes en ligne : à partir de {{club:option:assemblee-generale:mise}} € puis {{club:option:assemblee-generale:mois}} € par mois. Dossiers de subvention : à partir de {{club:option:subventions:mise}} € puis {{club:option:subventions:mois}} € par mois.`,
        `Plusieurs lieux ou sections : à partir de {{club:option:plusieurs-lieux:mise}} € puis {{club:option:plusieurs-lieux:mois}} € par mois.`,
        `Boutique du club : à partir de {{club:option:boutique:mise}} € puis {{club:option:boutique:mois}} € par mois.`,
        `Import d’une source de données supplémentaire : {{club:option:import-source:mise}} €.`,
      ],
    },
    {
      id: 'prix-par-categorie',
      titre: `Combien coûte le logiciel de gestion d’un club de tennis ?`,
      paragraphes: [
        `La catégorie se fixe d’après les licenciés FFT de la saison en cours, tennis, padel et pickleball compris, sur la base d’un export ADOC ou du rapport d’assemblée générale avec les 3 dernières saisons. Elle est revue une fois par an, au renouvellement. Prix indicatifs ; le devis définitif suit un premier échange.`,
      ],
      liste: [
        `Mini, de {{club:min:mini}} à {{club:max:mini}} licenciés : à partir de {{club:logiciel:mini:mise}} € de mise en place et {{club:logiciel:mini:mois}} € par mois.`,
        `Petit, de {{club:min:petit}} à {{club:max:petit}} licenciés : à partir de {{club:logiciel:petit:mise}} € et {{club:logiciel:petit:mois}} € par mois.`,
        `Moyen, de {{club:min:moyen}} à {{club:max:moyen}} licenciés : à partir de {{club:logiciel:moyen:mise}} € et {{club:logiciel:moyen:mois}} € par mois.`,
        `Grand, de {{club:min:grand}} à {{club:max:grand}} licenciés : à partir de {{club:logiciel:grand:mise}} € et {{club:logiciel:grand:mois}} € par mois.`,
        `Très grand, {{club:min:tres-grand}} licenciés et plus : à partir de {{club:logiciel:tres-grand:mise}} € et {{club:logiciel:tres-grand:mois}} € par mois.`,
      ],
      sous: [
        {
          titre: `Les conditions`,
          paragraphes: [
            `Engagement d’une saison ({{club:engagement}} mois), puis reconduction annuelle. Prélèvement SEPA. Mise en place payable en {{club:fois}} fois sans frais. Abonnement payé à l’année : {{club:remise-annuelle}} % de remise. Aucune autre remise. Votre cas exact : [le simulateur](/clubs-de-tennis/simulateur).`,
          ],
        },
      ],
    },
    {
      id: 'pack-site-et-logiciel',
      titre: `Le logiciel et le site ensemble : le pack`,
      paragraphes: [
        `Avec [le site du club](/clubs-de-tennis/site-internet), le logiciel devient la source de ce qui s’affiche en public : une adhésion remplie sur le site arrive dans le suivi des dossiers, le classement du Challenge se met à jour tout seul.`,
        `Le pack retire {{club:remise-pack}} % à la mise en place et à l’abonnement. Exemple type, catégorie Petit : à partir de {{club:pack:petit:mise}} € de mise en place et {{club:pack:petit:mois}} € par mois, soit environ {{club:par-licencie:petit}} € par licencié et par an pour un club type de {{club:licencies-type:petit}} licenciés. Les heures d’accompagnement du pack vont de {{club:heures:pack:mini}} h à {{club:heures:pack:tres-grand}} h selon la catégorie.`,
      ],
    },
    {
      id: 'fonctionnalites-du-logiciel',
      titre: `Les fonctionnalités du logiciel en détail`,
      paragraphes: [`Une page par grande fonction, avec la démo correspondante :`],
      liste: [
        `[Adhésions et réinscriptions en ligne](/clubs-de-tennis/fonctionnalites/adhesions-en-ligne)`,
        `[Import et export des fichiers ADOC](/clubs-de-tennis/fonctionnalites/import-export-adoc)`,
        `[École de tennis](/clubs-de-tennis/fonctionnalites/ecole-de-tennis)`,
        `[Challenge interne et saisie des matchs](/clubs-de-tennis/fonctionnalites/challenge-interne)`,
        `[Équipes et compétitions](/clubs-de-tennis/fonctionnalites/equipes-et-competitions)`,
        `[Tournois internes](/clubs-de-tennis/fonctionnalites/tournois-internes)`,
        `[Communication](/clubs-de-tennis/fonctionnalites/communication)`,
        `[Statistiques](/clubs-de-tennis/fonctionnalites/statistiques)`,
      ],
    },
  ],
  faq: [
    {
      q: `Faut-il prendre le site pour avoir le logiciel ?`,
      a: `Non, le logiciel se prend seul. Le pack site et logiciel retire simplement {{club:remise-pack}} % aux deux, et relie l’adhésion du site au suivi des dossiers du bureau.`,
    },
    {
      q: `Combien de membres du bureau peuvent l’utiliser ?`,
      a: `Autant que vous voulez : les comptes du bureau et des enseignants sont illimités. Les adhérents sont illimités dans la limite de votre catégorie.`,
    },
    {
      q: `Le logiciel est-il relié à ADOC ?`,
      a: `Par des fichiers, pas en direct. Le logiciel propose l’import et export des fichiers ADOC et repère les licences manquantes. Les licences, elles, se prennent toujours dans ADOC.`,
    },
    {
      q: `Nos adhérents sont dans un tableur : comment les reprendre ?`,
      a: `L’import des membres depuis une source est compris : votre tableur ou un export ADOC. Si vous avez une deuxième source (un ancien fichier, un autre tableur), son import coûte {{club:option:import-source:mise}} €.`,
    },
    {
      q: `Les parents doivent-ils installer une application ?`,
      a: `Non. L’espace membre et parent s’ouvre dans le navigateur du téléphone et peut s’ajouter à l’écran d’accueil comme une application. Une application publiée sur les magasins d’applications est possible sur devis.`,
    },
    {
      q: `Envoyez-vous des SMS aux adhérents ?`,
      a: `Non. Le logiciel envoie des e-mails et des notifications sur le téléphone. Si votre club a des groupes de messagerie, il les garde.`,
    },
    {
      q: `Le logiciel remplace-t-il le logiciel de comptabilité du trésorier ?`,
      a: `Non. Il tient une trésorerie simple (ce qui est encaissé, ce qui reste dû) et produit un export pour le trésorier. La comptabilité de l’association reste où elle est.`,
    },
    {
      q: `À qui appartiennent les données de nos adhérents ?`,
      a: `Au club. Un contrat de traitement des données est signé, comme le demande le RGPD, et vous pouvez exporter toutes vos données à tout moment. Voir aussi [le guide RGPD pour un club de tennis](/clubs-de-tennis/guides/rgpd-club-de-tennis).`,
    },
  ],
  liens: [
    { href: '/clubs-de-tennis', nom: `Site et logiciel pour clubs de tennis`, note: `Vue d’ensemble de l’offre` },
    { href: '/clubs-de-tennis/site-internet', nom: `Le site du club`, note: `Pour aller avec le logiciel` },
    { href: '/clubs-de-tennis/tarifs', nom: `Tarifs` },
    { href: '/clubs-de-tennis/simulateur', nom: `Simulateur de prix` },
    { href: '/clubs-de-tennis/demo', nom: `La démo` },
    { href: '/clubs-de-tennis/fonctionnalites/ma-journee-et-automatisations', nom: `Ma journée et automatisations` },
    { href: '/clubs-de-tennis/guides/exporter-importer-adherents-adoc', nom: `Exporter et importer ses adhérents depuis ADOC` },
  ],
  maj: '2026-10-29',
}

export const FORMULES: PageClub[] = [SITE_INTERNET, LOGICIEL_DE_GESTION]
