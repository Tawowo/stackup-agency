import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'uber-eats-ou-commande-directe',
  chemin: '/comparatif/uber-eats-ou-commande-directe',
  titre: 'Uber Eats, Deliveroo ou commande directe : que choisir pour votre restaurant ou votre boulangerie ?',
  etiquette: 'Comparatif · commande en ligne',
  reponse: `Uber Eats et Deliveroo vous apportent de la visibilité et une livraison déjà organisée, mais la plateforme garde la relation avec vos clients et prélève sa part sur chaque commande. La commande et le click & collect sur votre propre site demandent un investissement de départ, mais les clients, les données et la marge restent chez vous.`,
  titleSeo: 'Uber Eats, Deliveroo ou commande directe : comparatif',
  descriptionSeo: 'Uber Eats, Deliveroo ou commande directe sur votre site ? Commissions, clients, visibilité, livraison : comparez avant de choisir pour votre restaurant.',
  sections: [
    {
      id: 'ce-que-apportent-plateformes',
      titre: 'Que vous apportent Uber Eats et Deliveroo ?',
      paragraphes: [
        `Ce sont des places de marché : elles affichent votre établissement à des clients qui cherchent à manger près d'eux, prennent la commande, encaissent le paiement et, selon les formules, organisent la livraison. Vous recevez la commande, vous préparez, un livreur passe. Pour un restaurant qui démarre ou qui veut remplir un créneau creux, c'est un canal de vente réel, rapide à ouvrir.`,
        `Leur avantage principal est la visibilité : des clients qui ne vous connaissent pas vous trouvent dans l'application. Un autre est logistique : vous ne gérez ni livreurs, ni tournée. Nous ne cherchons donc pas à les déconseiller par principe.`,
        `Cette page ne cite aucune commission ni aucun tarif de ces plateformes : ils varient selon le contrat et évoluent, consultez les conditions actuelles de chaque plateforme. Côté Stackup, un site de commande sur mesure démarre à partir de {{prix:boutique}} €, le montant exact dépendant de votre carte et de vos modes de retrait.`,
      ],
    },
    {
      id: 'commandes-directes-definition',
      titre: 'Comment fonctionne la commande directe sur son propre site ?',
      paragraphes: [
        `Vos clients ouvrent votre site, choisissent leurs plats ou leurs produits, paient en ligne ou au retrait et viennent chercher leur commande à l'heure choisie : c'est le [click & collect](/solutions/click-and-collect). Vous voyez les commandes arriver sur un écran, vous préparez, le client passe. Pour ceux qui ont un livreur à eux ou des tournées simples, une livraison locale peut s'ajouter, mais elle reste à organiser.`,
        `Le [menu QR code](/solutions/menu-qr-code) complète le dispositif en salle : le client scanne, consulte la carte à jour, et vous pouvez y relier la commande. Le tout fonctionne sous votre nom de domaine, sans application à installer pour le client.`,
      ],
    },
    {
      id: 'commissions-cout-reel',
      titre: 'Combien coûte vraiment une commande passée par une plateforme ?',
      paragraphes: [
        `C'est la question à poser avant tout. Une plateforme prélève une commission sur chaque commande, dont le niveau dépend de la formule (avec ou sans livraison par leurs livreurs) et du contrat négocié. S'y ajoutent parfois des frais de service et des opérations promotionnelles payantes. Nous ne donnons aucun taux : demandez-le par écrit, et calculez ce qu'il reste de votre marge, une fois les produits, la main-d'œuvre et l'emballage payés.`,
        `Sur un site à vous, il n'y a pas de commission de plateforme, mais d'autres coûts : développement au départ, hébergement, nom de domaine, suivi (à partir de {{abo:min}} € par mois chez Stackup, sans obligation) et frais du prestataire de paiement. Notre article [vendre en ligne sans commission](/blog/commissions-plateformes-vente-en-ligne-sans-commission) détaille cette comparaison.`,
        `Le calcul honnête se fait avec vos volumes : un restaurant qui prend peu de commandes en ligne amortira lentement un site ; un autre qui en prend beaucoup, davantage.`,
      ],
    },
    {
      id: 'clients-donnees-fidelisation',
      titre: 'À qui appartiennent les clients qui commandent ?',
      paragraphes: [
        `Sur une plateforme, le client est d'abord celui de la plateforme : elle détient la relation, les coordonnées et l'historique, et fixe ce que vous pouvez en faire. Vous ne pouvez pas toujours le recontacter, ni lui proposer une offre de fidélité. Il peut commander chez un voisin au prochain clic.`,
        `Avec la commande directe, vous collectez vous-même (avec son accord) l'adresse électronique et l'historique, vous pouvez envoyer une offre pour un jour creux et construire une fidélité. Le fichier est à vous. Informez vos clients et respectez le RGPD, dont les repères sont sur [cnil.fr](https://www.cnil.fr).`,
      ],
    },
    {
      id: 'visibilite-notoriete',
      titre: 'Une commande directe vous rend-elle assez visible ?',
      paragraphes: [
        `C'est le point faible du site propre, et il faut l'admettre. Une plateforme met votre carte devant des clients qui ne vous connaissent pas. Un site à vous n'apporte rien sans visites : il faut une fiche Google bien tenue, un [référencement local](/services/referencement-local) soigné, des avis, éventuellement un peu de réseaux sociaux.`,
        `La stratégie la plus courante n'est donc pas un choix exclusif : certains restaurateurs utilisent les plateformes pour se faire connaître, puis incitent leurs clients à commander en direct. Cela suppose une expérience de commande aussi simple que dans l'application, et de ne jamais rendre la commande directe pénible.`,
      ],
    },
    {
      id: 'livraison-logistique',
      titre: 'Qui livre si vous n\'êtes plus sur une plateforme ?',
      paragraphes: [
        `C'est la vraie limite de la commande directe. Une plateforme met à disposition un réseau de livreurs ; sur votre site, vous retirez la logistique des mains de l'intermédiaire, mais vous devez la remplacer. Pour beaucoup d'établissements, le click & collect suffit : le client vient chercher, vous n'avez rien à livrer.`,
        `Si vous voulez livrer, trois voies : vos propres livreurs, un prestataire local avec lequel vous vous organisez, ou une plateforme pour la seule livraison. Cette dernière option garde la commande chez vous, mais le service de livraison a un coût et des conditions à vérifier. Voir [application de livraison pour restaurant](/blog/application-livraison-restaurant).`,
      ],
    },
    {
      id: 'mise-en-route-gestion',
      titre: 'Quelle solution est la plus rapide à mettre en route, et la plus simple à gérer ?',
      paragraphes: [
        `Les plateformes, sans hésitation : un dossier, une carte à saisir, et vous recevez des commandes. Un site de commande exige une conception, des photos, le paramétrage des horaires et des créneaux. Nous ne promettons pas de durée fixe : le calendrier se fixe ensemble avant de commencer.`,
        `Au quotidien, la différence se joue sur les tablettes : plusieurs plateformes imposent plusieurs écrans en cuisine. Une commande directe peut arriver dans un outil unique, relié à votre gestion (commandes à emporter) et à votre caisse si vous le souhaitez.`,
      ],
    },
    {
      id: 'metiers-cas-differents',
      titre: 'Restaurant, pizzeria, boulangerie : le choix est-il le même ?',
      paragraphes: [
        `Non, le métier change le calcul.`,
      ],
      sous: [
        {
          titre: 'Restaurant',
          paragraphes: [
            `Les plateformes aident à remplir des créneaux creux, mais la commande directe protège les marges d'une carte à emporter bien pensée.`,
          ],
        },
        {
          titre: 'Pizzeria',
          paragraphes: [
            `La vente à emporter y est naturelle, avec une clientèle d'habitués qui commandent souvent : c'est un terrain favorable à la commande directe, avec un pizzaïolo qui voit les commandes arriver à l'heure choisie.`,
          ],
        },
        {
          titre: 'Boulangerie-pâtisserie',
          paragraphes: [
            `Les commandes de gâteaux, de plateaux et de pains spéciaux se prêtent bien au click & collect : le client réserve et passe à l'heure. La livraison par plateforme y a peu de sens pour le pain du quotidien.`,
          ],
        },
      ],
    },
    {
      id: 'quand-choisir',
      titre: 'Quand choisir une plateforme, quand choisir la commande directe ?',
      paragraphes: [
        `Nos critères, en toute franchise : ils dépendent de votre établissement, pas de ce que nous aimerions vendre.`,
      ],
      sous: [
        {
          titre: 'Choisissez plutôt Uber Eats ou Deliveroo si…',
          paragraphes: [
            `Vous voulez être vu vite par de nouveaux clients et que la livraison soit organisée à votre place.`,
          ],
          liste: [
            `Vous démarrez et vous n'avez pas encore de clientèle.`,
            `Vous voulez tester la livraison sans investir.`,
            `Votre marge supporte la commission de la plateforme.`,
          ],
        },
        {
          titre: 'Choisissez plutôt la commande directe si…',
          paragraphes: [
            `Vous avez déjà des habitués et vous voulez garder votre marge, vos clients et votre image.`,
          ],
          liste: [
            `Vous vendez surtout à emporter, au comptoir ou au click & collect.`,
            `Vous voulez recontacter vos clients et construire une fidélité.`,
            `Vous voulez relier commandes, caisse et stocks dans un même outil.`,
            `Vous raisonnez sur plusieurs années et avez un interlocuteur de confiance pour le suivi.`,
          ],
        },
      ],
    },
    {
      id: 'questions-avant-decider',
      titre: 'Quelles questions se poser avant de choisir ?',
      paragraphes: [
        `Répondez-y par écrit avant de signer :`,
      ],
      liste: [
        `Quelle part de votre chiffre d'affaires voulez-vous réaliser en ligne ?`,
        `Quelle marge vous reste-t-il sur une commande passée par plateforme ?`,
        `Voulez-vous livrer, ou le retrait suffit-il ?`,
        `Quels clients voulez-vous pouvoir recontacter ?`,
        `Comment ferez-vous connaître votre site à vos clients ?`,
      ],
    },
  ],
  exemples: [
    {
      titre: 'Exemple type : un restaurant qui ouvre en centre-ville',
      texte: `Il n'a pas encore d'habitués et ses soirées en semaine sont calmes. Une plateforme de livraison l'aide à se faire connaître. Il ajoute ensuite une carte à emporter sur un site à lui, pour que les clients satisfaits commandent directement la fois suivante.`,
    },
    {
      titre: 'Exemple type : une pizzeria de quartier avec une clientèle d\'habitués',
      texte: `Ses clients connaissent la carte et commandent souvent. Une commande en ligne sur son propre site, en click & collect, lui permet de garder sa marge et de voir les commandes arriver à l'heure. Elle conserve une plateforme pour la livraison seulement si elle n'a pas de livreur.`,
    },
    {
      titre: 'Exemple type : une boulangerie-pâtisserie qui vend des gâteaux sur commande',
      texte: `Les plateaux et les gâteaux d'anniversaire se réservent à l'avance, pour un retrait précis. Le click & collect convient parfaitement : le client choisit, paie ou règle au retrait, et la boulangère prépare avec le calendrier sous les yeux. Une plateforme y apporterait peu.`,
    },
  ],
  comparaison: {
    titre: 'Plateformes de livraison et commande directe, critère par critère',
    colonnes: ['Uber Eats, Deliveroo (plateformes)', 'Commande directe sur votre site'],
    lignes: [
      {
        critere: 'Coût de départ',
        a: 'Faible : dossier d\'inscription et saisie de la carte.',
        b: 'Plus élevé : conception et développement, à partir de {{prix:boutique}} €.',
      },
      {
        critere: 'Coûts récurrents',
        a: 'Commission sur chaque commande et frais éventuels : consultez les conditions actuelles de la plateforme.',
        b: 'Hébergement, domaine, suivi et frais du prestataire de paiement, sans commission de plateforme.',
      },
      {
        critere: 'Propriété des clients et données',
        a: 'La relation client reste en grande partie chez la plateforme.',
        b: 'Fichier clients à vous, avec leur accord et dans le respect du RGPD.',
      },
      {
        critere: 'Visibilité',
        a: 'Forte : vous apparaissez dans l\'application auprès de nouveaux clients.',
        b: 'À construire : fiche Google, référencement local, avis, bouche-à-oreille.',
      },
      {
        critere: 'Personnalisation',
        a: 'Cadre imposé par la plateforme.',
        b: 'Totale : votre carte, votre image, vos créneaux et vos règles.',
      },
      {
        critere: 'Livraison',
        a: 'Organisée par la plateforme selon la formule.',
        b: 'À organiser : click & collect, vos livreurs ou un prestataire local.',
      },
      {
        critere: 'Dépendance',
        a: 'À la plateforme : ses prix, ses conditions, son classement.',
        b: 'À votre prestataire : code documenté et accès à votre nom indispensables.',
      },
      {
        critere: 'Export et sortie',
        a: 'Peu de données récupérables ; la clientèle ne vous suit pas.',
        b: 'Données et code à vous si le contrat le prévoit ; changement de prestataire possible.',
      },
      {
        critere: 'Contrat et engagement',
        a: 'Conditions de la plateforme, modifiables par elle ; à relire régulièrement.',
        b: 'Devis et contrat avec prix affichés ; suivi sans obligation.',
      },
    ],
    note: `Les commissions, tarifs et conditions d'Uber Eats, de Deliveroo et des plateformes équivalentes ne sont volontairement pas cités : consultez les conditions actuelles de chaque plateforme. Les prix Stackup sont toujours « à partir de » ; le [simulateur de tarifs](/tarifs#estimer) donne une estimation.`,
  },
  faq: [
    {
      q: 'Uber Eats ou commande directe : quelle est la meilleure option pour un restaurant ?',
      a: `Aucune ne gagne d'office. La plateforme apporte de la visibilité et de la livraison, la commande directe protège votre marge et vos clients. Beaucoup d'établissements combinent les deux.`,
    },
    {
      q: 'Quelle alternative à Uber Eats ou Deliveroo pour un restaurant ?',
      a: `La commande en ligne sur votre propre site, avec retrait sur place (click & collect) et, si vous le souhaitez, une livraison que vous organisez.`,
    },
    {
      q: 'Peut-on avoir un système de commande sans commission ?',
      a: `Oui, sur votre propre site : pas de commission de plateforme, mais des coûts d'hébergement, de suivi et de paiement en ligne. Il faut donc comparer avec vos volumes réels.`,
    },
    {
      q: 'Comment mettre en place le click & collect pour une pizzeria ?',
      a: `Il faut une carte en ligne, des créneaux de retrait, un paiement ou un règlement au retrait, et un écran pour voir les commandes. Notre article [click & collect : mise en place](/blog/click-and-collect-mise-en-place) détaille les étapes.`,
    },
    {
      q: 'Une boulangerie a-t-elle intérêt à être sur Uber Eats ?',
      a: `Rarement pour le pain du quotidien. Les commandes de gâteaux et de plateaux se prêtent mieux au click & collect sur votre propre site, avec retrait à l'heure choisie.`,
    },
    {
      q: 'Peut-on utiliser une plateforme et un site de commande en même temps ?',
      a: `Oui, c'est courant : la plateforme sert à se faire connaître, le site à fidéliser. Veillez à ce que la commande directe soit aussi simple que dans l'application.`,
    },
    {
      q: 'Combien coûte un site de commande en ligne chez Stackup ?',
      a: `À partir de {{prix:boutique}} €, selon votre carte, vos créneaux et les liaisons avec vos outils. Le [simulateur de tarifs](/tarifs#estimer) donne une estimation, puis le devis fixe le montant.`,
    },
    {
      q: 'Faut-il une application mobile pour que mes clients commandent ?',
      a: `Non. Le site fonctionne dans le navigateur du téléphone, sans rien à installer. Le client ouvre votre adresse, ou scanne un QR code, et commande.`,
    },
    {
      q: 'Peut-on essayer avant de payer le projet ?',
      a: `Oui : une démo est possible avant le devis. C'est une prestation à part, facturée {{carte:demo}} €, qui n'est pas déduite du devis.`,
    },
    {
      q: 'Que se passe-t-il si mon prestataire n\'est plus disponible ?',
      a: `C'est le risque principal du sur-mesure. Exigez un code documenté, des accès à votre nom et la propriété écrite du code et des données, pour qu'un autre développeur puisse reprendre. [Parlons-en](/contact).`,
    },
  ],
  sources: [
    { nom: 'CNIL : données personnelles de vos clients', url: 'https://www.cnil.fr' },
    { nom: 'Economie.gouv.fr : commerce en ligne', url: 'https://www.economie.gouv.fr' },
  ],
  liens: [
    { href: '/solutions/click-and-collect', nom: 'Click & collect', note: 'Commande en ligne et retrait à l\'heure choisie.' },
    { href: '/solutions/menu-qr-code', nom: 'Menu QR code', note: 'Une carte à jour, consultable depuis la table.' },
    { href: '/creation-site-internet/restaurant', nom: 'Site pour restaurant' },
    { href: '/creation-site-internet/pizzeria', nom: 'Site pour pizzeria' },
    { href: '/creation-site-internet/boulangerie-patisserie', nom: 'Site pour boulangerie-pâtisserie' },
    { href: '/blog/commissions-plateformes-vente-en-ligne-sans-commission', nom: 'Vendre en ligne sans commission', note: 'Ce que coûtent vraiment les plateformes.' },
    { href: '/tarifs#estimer', nom: 'Simulateur de tarifs', note: 'Une estimation « à partir de » selon votre projet.' },
    { href: '/contact', nom: 'Parler de votre projet', note: 'Décrire votre établissement et obtenir un avis franc.' },
  ],
  maj: '2026-10-29',
  type: 'comparatif',
}
