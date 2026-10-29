import type { ContenuSolution } from './solutions-contenu'

export const CONTENU_SOLUTIONS_1: Record<string, ContenuSolution> = {
  'prise-rendez-vous-en-ligne': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Un rendez-vous se perd rarement par mauvaise volonté. Il se perd parce que l’agenda vit à trois endroits : le carnet posé sur le comptoir, le téléphone qui sonne en pleine séance et la messagerie que l’on lit le soir. Dès que deux de ces endroits ne racontent plus la même histoire, un créneau est donné deux fois ou ne l’est jamais.`,
          `Exemple type : une ostéopathe enchaîne les consultations de la matinée. Pendant ce temps, quatre appels tombent sur le répondeur. Deux personnes rappellent, les deux autres vont voir ailleurs, parce que l’on prend rendez-vous là où l’on obtient une réponse tout de suite. Le soir, elle passe une demi-heure à rappeler et à recopier dans le carnet.`,
          `Exemple type : un garage reçoit des demandes de vidange et de contrôle par téléphone, par SMS et au comptoir. Le chef d’atelier note à la volée, et le lundi matin deux véhicules sont attendus sur le même pont à la même heure. Le client qui patiente n’a pas à savoir que le carnet était mal tenu.`,
          `Exemple type : un salon de coiffure voit des clientes oublier leur rendez-vous du samedi. La chaise reste vide, la coloratrice a réservé sa matinée pour rien. Un simple rappel la veille aurait suffi, mais personne n’a le temps d’appeler chaque cliente.`,
        ],
      },
      {
        titre: `Comment fonctionne la prise de rendez-vous en ligne`,
        paragraphes: [
          `Du côté du professionnel, tout commence par un réglage fait une fois : vos prestations avec leur durée (une première consultation n’est pas un suivi), vos horaires d’ouverture, vos pauses, vos congés, et le délai minimal avant lequel on ne peut plus réserver ou annuler. Si plusieurs personnes travaillent chez vous, chacune a son agenda, ses prestations et ses jours de présence.`,
          `Du côté du client, le parcours tient en quelques écrans : il choisit la prestation, voit uniquement les créneaux réellement libres, indique son nom et un moyen de le joindre, puis reçoit une confirmation. Il n’a pas de compte à créer s’il ne le souhaite pas. S’il doit annuler, le lien de son message de confirmation lui permet de le faire lui-même, et le créneau redevient disponible aussitôt pour quelqu’un d’autre.`,
          `À l’écran, vous retrouvez la journée sous forme de liste ou de grille, avec pour chaque rendez-vous le nom, la prestation et la fiche du client, où s’accumule l’historique de ses visites. Vous pouvez aussi saisir un rendez-vous vous-même, quand un client vous parle au comptoir : il occupe le même agenda, donc rien ne se croise.`,
          `Ce qui est automatique : le calcul des créneaux libres, le blocage des plages que vous fermez, la confirmation et la libération d’un créneau annulé. Ce qui ne l’est pas : le rappel avant le rendez-vous, qui demande le module Automatisations ; l’envoi de SMS passe en outre par un service externe, généralement facturé à l’usage par son fournisseur. La décision d’accepter un client en urgence ou de décaler un créneau reste la vôtre.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au cahier papier, le gain est surtout la disponibilité : le cahier ne se consulte que sur place, alors qu’un agenda en ligne répond à toute heure. Il garde pourtant des vertus, notamment la souplesse, et pour un artisan qui reçoit trois clients par semaine, le papier reste parfaitement défendable.`,
          `Face à un tableur ou à l’agenda de votre téléphone, le module apporte ce qui leur manque : le client voit lui-même les créneaux libres et les protections contre la double réservation. Si votre agenda n’est consulté que par vous et que personne ne réserve à distance, ces outils suffisent largement.`,
          `Face aux plateformes de réservation du marché, le choix est surtout économique et stratégique. Une plateforme est rapide à ouvrir, apporte parfois de nouveaux clients et dispose d’applications toutes prêtes ; en contrepartie, elle prend un abonnement ou une commission, et la relation client passe par elle. Un module intégré à votre propre outil ne vous amène pas de clients inconnus : il sert ceux qui vous connaissent déjà et garde leurs données chez vous. Si vous cherchez avant tout de la visibilité, ou si vous démarrez avec un besoin standard, un logiciel du marché peut être le meilleur choix. Le billet sur [les systèmes de réservation, commission ou propriété](/blog/systeme-reservation-en-ligne-commission-ou-propriete) détaille ce raisonnement.`,
          `Ce que le module ne remplace pas : le contact humain pour les situations particulières, une régulation médicale ou une prise en charge d’urgence, et les règles propres à votre profession en matière de données de santé, qu’il faut examiner avant de choisir où elles sont conservées.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module s’adresse à tout métier qui vend du temps : [ostéopathe](/creation-site-internet/osteopathe), [salon de coiffure](/creation-site-internet/salon-coiffure), [institut de beauté](/creation-site-internet/institut-beaute), [garage automobile](/creation-site-internet/garage-automobile) ou auto-école. Ce qui change d’un métier à l’autre, ce sont les durées, les intervalles entre deux clients et les informations demandées à la réservation.`,
          `La configuration type associe trois modules. La prise de rendez-vous elle-même, le [planning d’équipe](/solutions/planning-employes) lorsqu’il y a plusieurs agendas à coordonner, et le [CRM sur mesure](/solutions/crm-sur-mesure) pour conserver la fiche et l’historique de chaque client. Un thérapeute seul s’arrêtera souvent au premier ; un salon de plusieurs personnes ajoutera le planning.`,
          `Le module peut être relié à votre site internet : le bouton « Prendre rendez-vous » ouvre alors l’agenda directement depuis vos pages, sans renvoyer vers un site tiers. Le [lexique](/lexique/prise-de-rendez-vous-en-ligne) rappelle le vocabulaire de base, et l’article sur le [no-show](/blog/reservation-en-ligne-reduire-no-shows) montre comment limiter les rendez-vous non honorés.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} €, ce qui comprend le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module. Si la prise de rendez-vous est ce premier module, le reste du budget dépend de ce que vous y ajoutez. Les prix ne s’additionnent donc pas à la volée : le devis écrit fixe le montant avant tout engagement, et l’[estimateur](/tarifs#estimer) donne un ordre de grandeur en quelques minutes.`,
          `Ce qui fait varier le prix : le nombre d’agendas, la complexité des prestations (forfaits, durées variables, ressources comme une cabine ou un pont), le lien avec le site internet, l’import de vos rendez-vous existants et les rappels automatiques. Le calendrier de réalisation se fixe ensemble avant de commencer.`,
          `L’abonnement qui couvre l’hébergement, les sauvegardes et les correctifs est facultatif et sans engagement ; il démarre à partir de {{abo:min}} € par mois, et le [calculateur d’abonnement](/outils/calculateur-abonnement-saas) permet de le comparer à un logiciel en abonnement. Le code et les données vous appartiennent, et l’export est inclus dans le socle. Avant de signer, une démo de votre propre outil peut être préparée : elle coûte {{carte:demo}} €, facturée à part et non déduite du devis.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Dressez la liste de vos prestations avec, pour chacune, sa durée réelle (celle que vous constatez, pas celle que vous annoncez) et le temps de préparation ou de rangement à prévoir entre deux clients. C’est la donnée qui détermine la qualité des créneaux proposés.`,
          `Rassemblez vos horaires habituels, vos pauses, vos jours de fermeture connus, et décidez de vos règles : combien de temps à l’avance peut-on réserver, jusqu’à quand peut-on annuler, accepte-t-on un nouveau client en ligne ou seulement un client déjà connu. Si vous tenez à valider certains rendez-vous à la main, dites-le dès le départ.`,
          `Pensez enfin à vos clients actuels : un fichier de contacts, même imparfait, peut être repris au démarrage. Et réfléchissez au message que vous souhaitez voir dans la confirmation, car c’est souvent là que l’on précise l’adresse, l’accès ou ce qu’il faut apporter.`,
        ],
      },
    ],
    faq: [
      { q: `Mes clients doivent-ils créer un compte pour réserver ?`, a: `Non, pas obligatoirement. Ils indiquent leur nom et un moyen de les joindre, puis reçoivent une confirmation. Un compte client n’est utile que si vous voulez leur donner accès à leur historique, ce qui relève du portail client.` },
      { q: `Peut-on empêcher les réservations de dernière minute ?`, a: `Oui. Vous fixez un délai minimal avant le rendez-vous : en deçà, le créneau n’apparaît plus en ligne et le client doit vous appeler. C’est pratique quand vous préparez votre matériel la veille.` },
      { q: `Le module fonctionne-t-il sans site internet ?`, a: `Oui. Il a sa propre adresse, que vous pouvez placer sur votre fiche Google, vos réseaux sociaux ou vos cartes de visite. Relié à votre site, il s’ouvre depuis vos pages, mais ce n’est pas une condition.` },
    ],
  },

  'gestion-devis-factures': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Le devis est le moment où une demande devient un chantier, et c’est souvent là que le temps se perd. Rédigé le soir, au retour d’un chantier, recopié à partir du précédent, il part en retard, et le client qui n’a pas de réponse sollicite un autre artisan. Le sujet n’est pas la mise en page, c’est la rapidité et l’exactitude.`,
          `Exemple type : un plombier chiffre une salle de bains. Il sait que le même mitigeur, la même évacuation et les mêmes heures reviennent d’un devis à l’autre, mais il repart d’une page blanche, ou d’un ancien fichier dont il oublie de changer le nom du client. Une erreur d’un nom ou d’un prix sur un document déjà envoyé se paie en crédibilité.`,
          `Exemple type : un paysagiste a émis une quinzaine de factures au printemps. En juin, il ne sait plus lesquelles sont réglées. Il hésite à relancer par peur de se tromper, et il attend que la trésorerie se tende pour regarder ses relevés. Le retard de paiement s’installe faute de visibilité, plus que par mauvaise foi du client.`,
          `Exemple type : un électricien reçoit un message de son comptable : la numérotation de ses factures comporte un trou et deux documents portent le même numéro. Il faut reprendre l’année à la main, un soir où il aurait mieux à faire.`,
        ],
      },
      {
        titre: `Comment fonctionne la gestion des devis et factures`,
        paragraphes: [
          `Le point de départ est un catalogue de prestations et de fournitures, avec vos libellés, vos unités et vos prix. Pour un devis, vous choisissez le client dans votre fichier (ou vous le créez), vous ajoutez des lignes depuis le catalogue, vous ajustez les quantités, et le total se calcule. Le document s’envoie par e-mail avec un lien : le client le consulte et vous voyez s’il l’a ouvert.`,
          `Quand le client accepte, le devis devient une facture en un geste : les lignes sont reprises, rien n’est ressaisi. Pour un chantier découpé, vous émettez un acompte, puis une facture de solde qui déduit ce qui a déjà été versé. La numérotation est continue et attribuée par l’outil, et si une erreur survient, vous émettez un avoir plutôt que de modifier un document déjà envoyé.`,
          `Le suivi des paiements montre en un coup d’œil ce qui est réglé, ce qui est attendu et ce qui est en retard. Vous marquez un paiement reçu à la main, ou vous le rapprochez de votre relevé. Les relances partent selon les règles que vous avez fixées, avec un texte que vous aurez écrit une fois pour toutes.`,
          `Ce qui est automatique : les calculs, la numérotation, la conversion du devis en facture, le calcul des retards. Ce qui ne l’est pas : le contenu du devis, qui reste votre expertise, le choix du taux de TVA applicable à chaque ligne et le jugement sur le moment de relancer un client fidèle. L’option Devis et factures automatiques prépare un devis à partir d’une demande, mais vous le relisez avant l’envoi.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au modèle de devis dans un traitement de texte ou un tableur, la différence est la mémoire : le tableur ne se souvient pas de vos clients ni de vos tarifs, et il autorise toutes les erreurs de numérotation. À quelques factures par mois, c’est pourtant un outil honnête, et rien n’oblige à en changer tant qu’il ne vous coûte pas de temps.`,
          `Face aux logiciels de devis et de facturation du marché, le choix tient au besoin. Pour une activité classique, avec des devis standard et un seul utilisateur, un logiciel en abonnement est déjà adapté, simple à démarrer et mis à jour pour vous. Le sur-mesure devient pertinent quand vos devis ont une logique propre (calcul au mètre carré, options liées entre elles, métrés), quand plusieurs personnes interviennent, ou quand vous voulez relier le devis à votre planning et à vos stocks. Le coût de départ y est plus élevé, et vous dépendez d’un prestataire pour les évolutions : c’est la contrepartie à examiner. L’article [logiciel sur mesure ou logiciel du marché](/blog/logiciel-sur-mesure-ou-logiciel-du-marche) pose les critères.`,
          `Le module ne remplace pas votre comptable. Il prépare des documents propres et un export, mais il ne tient pas votre comptabilité ni ne décide de votre régime de TVA. Il ne remplace pas non plus un logiciel de caisse certifié si vous encaissez des ventes au comptoir : ce sujet est traité à part dans le module [caisse](/solutions/caisse-enregistreuse).`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert tous les métiers qui chiffrent avant d’intervenir : [plombier](/creation-site-internet/plombier), [électricien](/creation-site-internet/electricien), [maçon-rénovateur](/creation-site-internet/macon-renovateur), [paysagiste](/creation-site-internet/paysagiste-jardinier), et plus largement les artisans du bâtiment, les prestataires de services et les petites sociétés de conseil.`,
          `La configuration type commence par le fichier clients, car un devis sans fiche client est un devis sans suite : le [CRM sur mesure](/solutions/crm-sur-mesure). Viennent ensuite les devis, les factures et le suivi des paiements. Un artisan avec des équipes ajoute le [planning](/solutions/planning-employes) pour affecter les chantiers acceptés ; un indépendant seul s’en tiendra souvent aux trois premiers.`,
          `Les [devis refusés ou non signés](/blog/devis-refuses-non-signes-pourquoi-et-que-faire) ont leurs causes propres, et l’outil aide surtout à répondre vite, ce qui compte plus qu’on ne le croit. Pour valider les formes légales d’un devis ou d’une facture, le plus sûr reste de consulter service-public.fr.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} €. Ce montant comprend le socle de l’outil (connexion sécurisée, base de données, tableau de bord, export de vos données) et un premier module. La gestion des devis et factures regroupe plusieurs modules du catalogue : les devis, les factures, le suivi des paiements avec relances et, en option, les devis et factures automatiques. Le devis écrit précise lesquels sont retenus, et l’[estimateur de tarifs](/tarifs#estimer) donne une première idée.`,
          `Ce qui fait varier le prix : le nombre de modèles de documents, la complexité du calcul de vos devis, l’import de votre fichier clients et de vos anciens documents, l’export comptable, et la facturation électronique, présentée dans la section des questions. Le calendrier se fixe ensemble avant de commencer.`,
          `L’abonnement facultatif, sans engagement, couvre hébergement, sauvegardes et correctifs à partir de {{abo:min}} € par mois ; le [calculateur](/outils/calculateur-abonnement-saas) permet de le comparer à un abonnement de logiciel. Le code et vos données sont à vous, avec un export disponible à tout moment. La démo du logiciel de gestion est déjà en ligne ; pour la vôtre, comptez une démo à {{carte:demo}} €, facturée à part et non déduite du devis.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Réunissez trois ou quatre de vos devis récents, de préférence des cas différents : un simple, un complexe, un refusé. Ils montrent la vraie logique de calcul, bien mieux qu’une explication orale. Joignez une facture avec acompte si vous en émettez.`,
          `Rédigez votre catalogue : les prestations que vous vendez le plus, leur unité, leur prix habituel, le taux de TVA qui s’y applique. Si vous bénéficiez de la franchise en base de TVA, précisez-le, car les mentions des documents en dépendent. Rassemblez aussi vos conditions de paiement, vos pénalités de retard et le texte de vos mentions légales.`,
          `Enfin, récupérez le fichier de vos clients et la dernière numérotation utilisée, pour que la suite reste continue. Demandez à votre comptable ce qu’il attend comme export ; c’est une question qui évite bien des retouches par la suite.`,
        ],
      },
    ],
    faq: [
      { q: `Peut-on modifier un devis après l’avoir envoyé ?`, a: `Oui, en créant une nouvelle version du devis, l’ancienne restant conservée dans l’historique. Pour une facture déjà émise, on ne la modifie pas : on émet un avoir, puis une nouvelle facture, ce qui garde une trace propre pour votre comptable.` },
      { q: `Le client peut-il signer le devis en ligne ?`, a: `Oui, avec le module Signature électronique, le client accepte le devis depuis son téléphone. Sans ce module, il peut le renvoyer signé par e-mail, comme il le ferait avec un document papier.` },
      { q: `Que se passe-t-il si je change de comptable ou de logiciel plus tard ?`, a: `Rien de bloquant : l’export de vos données est inclus, et l’export comptable en option produit un fichier lisible par la plupart des cabinets. Les documents déjà émis restent consultables et vous appartiennent.` },
    ],
  },

  'click-and-collect': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Dans un commerce alimentaire, la commande à l’avance n’est pas une nouveauté : la boulangère prépare déjà la brioche du dimanche, le boucher met de côté le rôti. Ce qui fait défaut, c’est un endroit unique où ces commandes arrivent, sans dépendre d’un papier punaisé ou d’un SMS lu trop tard.`,
          `Exemple type : une boulangerie prend des commandes de gâteaux et de pains spéciaux par téléphone, par SMS et au comptoir. Le vendredi soir, la fournée du samedi se prépare avec trois sources d’information qui ne coïncident pas. Un gâteau d’anniversaire est oublié, et c’est un client de longue date qui repart déçu.`,
          `Exemple type : une boucherie charcuterie est assaillie le samedi matin à l’approche des repas du dimanche. La file dépasse la porte, certains clients renoncent. Le boucher voudrait que ceux qui ont déjà choisi retirent leur commande sans attendre, et savoir la veille combien de pièces découper.`,
          `Exemple type : une fleuriste reçoit des commandes de bouquets pour des occasions précises : un anniversaire, une fête des mères. Chaque demande contient une date, une heure de retrait et un message à joindre. Notées au hasard, ces informations s’égarent, et une carte de vœux manque au moment de remettre le bouquet.`,
        ],
      },
      {
        titre: `Comment fonctionne le Click et Collect`,
        paragraphes: [
          `Côté commerçant, vous saisissez une fois votre catalogue : les produits avec leur photo, leur prix et, si besoin, leurs variantes (taille, parfum, quantité). Vous indiquez vos jours et créneaux de retrait, la capacité de préparation par créneau, et le délai nécessaire pour qu’une commande soit prête. Les produits indisponibles se masquent en un clic.`,
          `Côté client, le parcours est court : il parcourt le catalogue, remplit son panier, choisit un créneau de retrait parmi ceux qui restent ouverts, laisse ses coordonnées et valide. Il reçoit une confirmation. Quand la commande est prête, il est prévenu, et il se présente à l’heure choisie, où il retire son panier sans refaire la queue.`,
          `Sur votre écran, la liste de préparation du lendemain regroupe les produits à fabriquer ou à sortir, avec les quantités totales, puis le détail par client. Chaque commande passe par des statuts simples, reçue, prête, retirée, que vous faites avancer en touchant l’écran. À la fin de la journée, les commandes non retirées ressortent d’elles-mêmes.`,
          `Ce qui est automatique : le calcul des créneaux encore ouverts, le total de la commande, la liste de préparation et l’envoi de la notification. Ce qui ne l’est pas : la décision de refuser une commande trop grosse ou de remplacer un produit manquant, que vous gardez. Le paiement en ligne n’est pas imposé : le client peut régler au retrait, ce qui convient bien à beaucoup de commerces de proximité.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au téléphone et au cahier de commandes, le module apporte une trace unique et une liste de préparation que l’on n’a pas à reconstituer. Si vous recevez quelques commandes par semaine, toutes de clients que vous connaissez, le cahier reste très bien : le passage à l’écran ne se justifie que lorsque la saisie vous coûte plus de temps qu’elle n’en fait gagner.`,
          `Face aux plateformes qui proposent le retrait en magasin, le contraste vient de la commission et de la relation. Une plateforme vous donne de la visibilité et un paiement géré ; elle prélève généralement une part sur chaque commande ou un abonnement, et le client reste son client. Un module à vous coûte à la création, ne prélève rien sur chaque vente et conserve le fichier des acheteurs. Si vous avez besoin avant tout d’être trouvé par des inconnus, une plateforme peut compléter votre dispositif. L’article sur les [commissions des plateformes](/blog/commissions-plateformes-vente-en-ligne-sans-commission) en détaille les mécanismes.`,
          `Face à une boutique en ligne complète, le module est plus léger : il sert à préparer et suivre des retraits, pas à expédier des colis, gérer des transporteurs ou des paiements à distance. Si vous voulez aussi vendre à des clients lointains, l’offre [boutique en ligne](/services/site-ecommerce) est le bon outil. Le Click et Collect ne remplace enfin ni votre caisse ni votre gestion de stocks, auxquelles il peut en revanche se relier.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module convient aux commerces où l’on prépare avant de remettre : [boulangerie-pâtisserie](/creation-site-internet/boulangerie-patisserie), [boucherie-charcuterie](/creation-site-internet/boucherie-charcuterie), [fleuriste](/creation-site-internet/fleuriste), [fromager](/creation-site-internet/fromager), ou une épicerie fine pendant les fêtes de fin d’année.`,
          `La configuration type associe le Click et Collect à la [gestion des stocks](/solutions/gestion-stocks) pour ne pas vendre ce qui est épuisé, au [programme de fidélité](/solutions/programme-fidelite) si vous voulez récompenser les habitués, et à la [caisse](/solutions/caisse-enregistreuse) lorsque vous souhaitez que les ventes à distance et au comptoir se retrouvent au même endroit. Un commerce qui démarre peut se limiter au seul module.`,
          `Pour comprendre les contraintes de ce type de vente, notamment pour les produits frais, l’article sur la [mise en place d’un Click et Collect](/blog/click-and-collect-mise-en-place) et celui sur [le commerce de proximité](/blog/click-and-collect-commerce-de-proximite) sont de bons points de départ. Le [lexique](/lexique/click-and-collect) donne la définition courte.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} €, avec le socle (connexion sécurisée, base de données, tableau de bord, export) et le premier module. Si le Click et Collect est ce module, le prix final dépend de la taille de votre catalogue, de ce que vous voulez automatiser et du lien avec votre site. Le devis écrit fixe le montant, et l’[estimateur](/tarifs#estimer) donne une première orientation.`,
          `Ce qui le fait varier : le nombre de produits et de variantes, la reprise de votre catalogue depuis un fichier, les règles de créneaux (capacité par heure, jours de fermeture, commandes spéciales de fêtes), la présence ou non d’un paiement en ligne et l’affichage sur votre site internet. Aucun calendrier n’est annoncé d’avance : il se fixe ensemble avant de commencer.`,
          `Un abonnement facultatif, sans engagement, couvre l’hébergement, les sauvegardes et les correctifs à partir de {{abo:min}} € par mois ; comparez-le avec un abonnement de plateforme grâce au [calculateur](/outils/calculateur-abonnement-saas). Le code et les données restent à vous. Avant de vous engager, une démo à {{carte:demo}} €, facturée à part et non déduite du devis, vous montre l’outil à vos couleurs.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Rassemblez votre catalogue : la liste des produits que vous voulez vendre à distance, avec leur nom, leur prix, leur unité (à la pièce, au poids, à la part) et une photo nette. Commencez par vingt ou trente références plutôt que par la totalité de la vitrine, vous complèterez ensuite.`,
          `Décidez de vos règles de retrait : quels jours, quelles heures, combien de commandes par créneau vous pouvez préparer sans déborder, et quelle avance il vous faut pour les produits qui se fabriquent à la demande. Précisez comment vous traitez un produit épuisé et une commande non retirée.`,
          `Réfléchissez à votre mode de paiement (au retrait, en ligne, ou les deux) et aux mentions que vous devez afficher, par exemple les allergènes sur une denrée alimentaire. En cas de doute sur la réglementation de vos produits, la DGCCRF (economie.gouv.fr) est la source officielle à consulter.`,
        ],
      },
    ],
    faq: [
      { q: `Que se passe-t-il si un client ne vient pas retirer sa commande ?`, a: `La commande reste signalée comme non retirée dans votre liste du jour. Vous décidez de la suite : relancer le client, remettre les produits en vente ou, si le paiement avait eu lieu en ligne, traiter la situation selon vos conditions de vente. L’outil garde la trace pour éviter que ce soit toujours le même client qui oublie.` },
      { q: `Peut-on limiter le nombre de commandes par créneau ?`, a: `Oui. Vous fixez la capacité de chaque créneau selon ce que votre équipe peut préparer. Quand elle est atteinte, le créneau disparaît de la liste proposée au client, qui en choisit un autre sans que vous ayez à intervenir.` },
      { q: `Les commandes de fêtes, très au-dessus de l’ordinaire, sont-elles prévues ?`, a: `Oui, on règle des périodes particulières : des jours d’ouverture exceptionnels, un catalogue de fête, une date limite de commande et des quantités maximales par produit. Cela évite de s’engager au-delà de ce que le laboratoire ou l’atelier peut produire.` },
    ],
  },

  'reservation-restaurant': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Un restaurant vend des places dans le temps : une table non occupée à vingt heures ne se rattrape pas à vingt-deux. C’est pourquoi la réservation pèse tant sur l’activité, et pourquoi la prendre au téléphone, en plein coup de feu, expose à des erreurs coûteuses.`,
          `Exemple type : un bistrot de quartier note ses réservations sur un grand cahier, au comptoir. Le serveur du midi inscrit une table de six, celui du soir ne voit pas la ligne, et la salle se retrouve avec huit couverts de plus qu’elle ne peut asseoir. Il faut alors expliquer à des clients arrivés à l’heure qu’il n’y a plus de place pour eux.`,
          `Exemple type : une pizzeria dont le téléphone sonne sans cesse entre dix-huit et vingt heures, au moment où l’équipe est la plus sollicitée. Les appels manqués ne laissent pas de message, et on ne saura jamais combien de clients ont renoncé.`,
          `Exemple type : une brasserie voit trois tables vides un samedi soir, réservées sous des noms qui ne sont jamais venus. Personne n’a rappelé les clients, personne n’a de moyen simple de repérer ceux qui ont déjà fait défaut. Le no-show a un coût que l’on ne chiffre qu’à la fin du mois.`,
        ],
      },
      {
        titre: `Comment fonctionne la réservation de restaurant`,
        paragraphes: [
          `Du côté du restaurateur, on paramètre d’abord la salle : le nombre de couverts par service (midi, soir), la durée moyenne d’un repas selon la taille de la table, les jours de fermeture, et la part de la salle que vous voulez ouvrir en ligne. Vous gardez ainsi de la place pour les clients qui se présentent sans avoir réservé.`,
          `Le client choisit une date, un service et le nombre de personnes ; il voit les horaires encore disponibles, laisse son nom et son numéro, parfois une remarque (allergie, poussette, anniversaire). Il reçoit la confirmation. S’il souhaite modifier ou annuler, il le fait depuis ce message, et la table se libère pour d’autres.`,
          `À l’écran, la vue du jour montre la salle service par service, avec les arrivées attendues, le nombre de couverts et les remarques utiles à l’équipe en salle comme en cuisine. Le responsable peut déplacer une réservation, ajouter une table réservée par téléphone, bloquer une plage pour un groupe. La fiche client rappelle ses venues précédentes et ses éventuelles absences.`,
          `Ce qui est automatique : le calcul de ce qui reste réservable, la fermeture d’un service complet, la confirmation, l’envoi d’un rappel si le module Automatisations est choisi. Ce qui ne l’est pas : l’affectation fine des tables selon le déroulé du service, le choix d’accepter un groupe important et les relations avec un client difficile, que la maison garde en main.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au cahier de réservations, le module protège de la double inscription et se consulte depuis plusieurs endroits à la fois, par exemple en cuisine et au comptoir. Pour une adresse de quelques tables, qui connaît presque tous ses clients et reçoit très peu d’appels, le cahier reste fiable.`,
          `Face aux plateformes de réservation de restaurants, la différence est celle de la commission et de la propriété de la relation. Une plateforme met votre table en vente auprès d’un public vaste, ce qui peut aider à remplir une salle récente ; en échange, elle facture sous forme d’abonnement ou de montant par couvert selon les formules, et les coordonnées de vos convives lui appartiennent en grande partie. Un module sur votre propre site ne vous apporte pas de clients nouveaux, mais il fidélise ceux qui vous trouvent par ailleurs, et vous garde leurs coordonnées. De nombreux restaurateurs combinent d’ailleurs les deux, ce qui est cohérent. L’article [commission ou propriété](/blog/systeme-reservation-en-ligne-commission-ou-propriete) détaille ces options.`,
          `Le module ne remplace pas le logiciel de caisse, ni la gestion des stocks de cuisine. Il ne résout pas non plus à lui seul les absences : il en réduit le nombre grâce au rappel et à l’historique, comme l’explique l’article sur [les no-shows](/blog/no-show-reservation-restaurant), mais une politique claire reste nécessaire.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module concerne les établissements qui acceptent des réservations : [restaurant](/creation-site-internet/restaurant), [pizzeria](/creation-site-internet/pizzeria), [brasserie-bar](/creation-site-internet/brasserie-bar), [restaurant gastronomique](/creation-site-internet/restaurant-gastronomique), mais aussi un traiteur qui reçoit des demandes d’événements ou un café avec une salle privatisable.`,
          `La configuration type regroupe la réservation, le [menu avec QR code](/solutions/menu-qr-code) pour que la carte soit toujours à jour, et le [programme de fidélité](/solutions/programme-fidelite) si vous cultivez une clientèle d’habitués. Un restaurant avec une équipe un peu étoffée y ajoute le [planning des employés](/solutions/planning-employes) pour ajuster les effectifs selon les réservations.`,
          `Le site vitrine du restaurant porte la réservation : le bouton doit y être visible dès l’arrivée. Le guide sur le [site internet d’un restaurant](/blog/guide-site-internet-restaurant) explique quoi y placer, et le [tableau de bord](/solutions/tableau-de-bord) aide à relire l’activité semaine après semaine.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} €, socle et premier module compris (connexion sécurisée, base de données, tableau de bord, export de vos données). Le module de réservation se règle selon votre salle, et le devis écrit en fixe le prix avant tout engagement ; l’[estimateur](/tarifs#estimer) permet de se faire une idée en amont.`,
          `Ce qui le fait varier : le nombre de services et de salles (terrasse, salle privée), les règles de capacité, les groupes et privatisations, le lien avec votre site internet, l’import des réservations en cours et les rappels automatiques. Pas de durée annoncée à l’avance : le calendrier se décide ensemble avant de commencer.`,
          `L’abonnement facultatif et sans engagement prend en charge l’hébergement, les sauvegardes et les correctifs, à partir de {{abo:min}} € par mois. Le [calculateur d’abonnement](/outils/calculateur-abonnement-saas) aide à le comparer à une formule de plateforme. Vous restez propriétaire du code et de vos données. Une démo à {{carte:demo}} €, facturée à part et non déduite du devis, peut précéder la signature.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Dessinez votre salle telle qu’elle fonctionne vraiment : combien de tables, de quelle taille, lesquelles se regroupent, combien de couverts maximum par service. Précisez la durée habituelle d’un repas, qui varie selon le nombre de convives et le moment de la semaine.`,
          `Listez vos horaires de service, vos jours de fermeture connus et vos règles de réservation : jusqu’à quelle heure on peut réserver le jour même, à partir de combien de personnes vous demandez un contact par téléphone, si vous exigez des coordonnées complètes, si vous gardez des tables pour les clients sans réservation.`,
          `Décidez enfin de votre position sur les absences : un simple rappel ? une mention dans les conditions ? un autre dispositif ? C’est une décision de gestion avant d’être un réglage technique. Prévoyez aussi le texte de la confirmation, avec l’adresse, l’accès, et la façon de vous prévenir en cas de retard.`,
        ],
      },
    ],
    faq: [
      { q: `Comment gérer une réservation de groupe ?`, a: `On fixe un nombre maximal de couverts réservables en ligne. Au-delà, le client est invité à vous envoyer une demande, que vous étudiez avant de la confirmer. Vous pouvez ainsi proposer un menu de groupe et demander des précisions comme les allergies ou l’horaire souhaité.` },
      { q: `Le client peut-il choisir sa table ?`, a: `Pas par défaut : la plupart des restaurants préfèrent attribuer les tables eux-mêmes pour équilibrer la salle. Le client indique un nombre de personnes et parfois une préférence, par exemple terrasse ou intérieur, que vous suivez ou non selon le service.` },
      { q: `Que faire des clients qui ne viennent pas ?`, a: `L’outil garde l’historique de leurs absences dans leur fiche. Vous pouvez décider d’appeler avant un gros service les personnes déjà défaillantes, ou de demander une confirmation. Les mesures plus strictes relèvent de votre politique commerciale, à rédiger avec soin.` },
    ],
  },
}
