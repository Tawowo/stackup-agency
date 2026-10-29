import type { Pilier } from './types'

export const PILIER: Pilier = {
  slug: 'maintenance',
  chemin: '/services/maintenance',
  titre: `Maintenance de site internet : garder votre site à jour, sauvegardé et en état de marche`,
  etiquette: `Service · maintenance`,
  reponse: `La maintenance d'un site internet, c'est tout ce qui le garde en vie après la mise en ligne : mises à jour, sauvegardes, surveillance, sécurité, certificat, correctifs et petites modifications. Chez Stackup, elle démarre à partir de {{abo:min}} € par mois, sans engagement, avec un préavis d'un mois.`,
  titleSeo: `Maintenance de site internet : contenu, risques, abonnement`,
  descriptionSeo: `Maintenance de site internet : mises à jour, sauvegardes, sécurité, panne. Abonnement sans engagement dès {{abo:min}} €/mois. Demandez un état des lieux.`,
  sections: [
    {
      id: 'ce-que-recouvre',
      titre: `Que comprend la maintenance d'un site internet ?`,
      paragraphes: [
        `Un site n'est pas un document imprimé : c'est un petit logiciel qui tourne sur un serveur, dépend de composants extérieurs et reçoit la visite de robots autant que de clients. Il s'use même quand vous n'y touchez pas. Un bon contrat dit lesquels de ces neuf postes sont inclus.`,
      ],
      liste: [
        `Mises à jour : le socle technique du site, ses extensions éventuelles, les bibliothèques qu'il utilise. On les teste avant publication.`,
        `Sauvegardes : une copie complète du site et de ses données, conservée ailleurs que sur le serveur qui héberge le site.`,
        `Surveillance : une alerte quand le site ne répond plus, que la page d'accueil affiche une erreur ou que le formulaire de contact cesse d'envoyer des messages.`,
        `Sécurité : durcissement de la configuration, comptes d'administration protégés, contrôle des accès, vérification qu'aucun fichier inattendu n'apparaît.`,
        `Certificat de sécurité : le cadenas du navigateur (HTTPS) doit être renouvelé avant son échéance, sinon les visiteurs voient un avertissement qui les fait fuir.`,
        `Nom de domaine et hébergement : suivi des échéances, contrôle de la configuration, relais auprès de l'hébergeur.`,
        `Correctifs : réparation d'un bug constaté (un bouton qui ne répond plus, une image absente sur téléphone).`,
        `Petites modifications : changer un horaire, ajouter une photo, remplacer un tarif, publier une actualité quand vous n'avez pas envie de le faire vous-même.`,
        `Rapports : un compte rendu simple de ce qui a été fait et de ce qui mérite attention.`,
      ],
    },
    {
      id: 'risques',
      titre: `Que risque un site internet qui n'est pas entretenu ?`,
      paragraphes: [
        `Un site non entretenu ne tombe pas en panne le lendemain. Il vieillit en silence, puis le problème apparaît au pire moment : un samedi, en pleine saison. Quatre risques réels :`,
      ],
      liste: [
        `La faille de sécurité. Les composants d'un site publient régulièrement des correctifs. Tant qu'ils ne sont pas appliqués, la faille est connue de tous, y compris des robots qui scannent le web à longueur de journée. `,
        `La panne. Certificat expiré, domaine non renouvelé, version du langage serveur retirée par l'hébergeur, base de données saturée : ces pannes ont des causes banales et évitables. Un formulaire peut aussi cesser d'envoyer sans rien afficher : des demandes se perdent à votre insu.`,
        `La lenteur. Un site qui s'alourdit au fil des ajouts (images non optimisées, scripts oubliés, extensions inutiles) devient pénible sur un téléphone. Les visiteurs partent, et le moteur de recherche en tient compte.`,
        `La perte de référencement. Un site inaccessible pendant plusieurs jours, un site qui affiche des avertissements de sécurité ou un site piraté qui diffuse des liens indésirables peut perdre ses positions sur Google. Retrouver sa place prend un temps qu'on ne maîtrise pas.`,
      ],
    },
    {
      id: 'sur-mesure-wordpress',
      titre: `Site sur mesure ou WordPress : qu'est-ce qui se met à jour, qu'est-ce qui se casse ?`,
      paragraphes: [
        `La maintenance dépend de la façon dont le site est fabriqué. Aucune solution n'est bonne ou mauvaise en soi : chacune a ses contraintes.`,
        `Un site WordPress repose sur un cœur, un thème et, souvent, plusieurs extensions écrites par des auteurs différents. Chaque élément a son propre rythme de publication. C'est sa force (une extension existe pour presque tout) et sa fragilité : une mise à jour du cœur peut se heurter à une extension qui n'a pas suivi. Résultat fréquent : une page blanche ou une fonction qui disparaît. Plus il y a d'extensions, plus il y a de points à surveiller.`,
        `Un site sur mesure contient seulement ce dont il a besoin. Moins de pièces, donc moins de combinaisons à tester et moins de surface exposée. En contrepartie, son auteur est seul à en connaître les détails : si le prestataire disparaît sans remettre code et documentation, vous dépendez de lui. Le coût de départ est aussi plus élevé qu'avec un modèle prêt à l'emploi. D'où l'importance de prévoir propriété et transmission dans le contrat.`,
      ],
      liste: [
        `Ce qui se met à jour sur un site WordPress : le cœur, le thème, chaque extension, la version du langage serveur. Ce qui se casse le plus souvent : la compatibilité entre ces éléments, les formulaires, les modules de réservation ou de paiement.`,
        `Ce qui se met à jour sur un site sur mesure : les bibliothèques utilisées, la version du langage serveur, le certificat. Ce qui se casse le plus souvent : un composant externe qui change son fonctionnement (une carte, un service d'envoi de mails), ce qui se traite au cas par cas.`,
      ],
    },
    {
      id: 'contrat',
      titre: `Que doit préciser un contrat de maintenance de site web ?`,
      paragraphes: [
        `Avant de signer avec n'importe quel prestataire, y compris nous, vérifiez que cinq points sont écrits noir sur blanc.`,
      ],
      sous: [
        {
          titre: `Le périmètre`,
          paragraphes: [
            `Que couvre exactement l'abonnement ? Les mises à jour, la surveillance, les sauvegardes, les petites modifications ? Un contrat honnête dit aussi ce qui est exclu : une nouvelle page, une refonte, une fonction nouvelle sont des projets à part, avec un devis.`,
          ],
        },
        {
          titre: `Les délais de réaction`,
          paragraphes: [
            `Méfiez-vous des rétablissements promis à l'heure près. Ce qui compte : comment signaler un problème, qui répond, dans quel ordre on traite les urgences (site inaccessible avant demande de confort), avec quel suivi (accusé de réception, puis points d'avancement). Le contrat doit le décrire avec des mots, sans garantie qu'il ne peut pas tenir.`,
          ],
        },
        {
          titre: `La restauration`,
          paragraphes: [
            `Où sont stockées les sauvegardes ? À quel rythme sont-elles faites ? Combien de temps les garde-t-on ? Et surtout : le prestataire sait-il restaurer, et l'a-t-il déjà testé ? Une sauvegarde jamais restaurée reste une hypothèse.`,
          ],
        },
        {
          titre: `La propriété`,
          paragraphes: [
            `À qui appartiennent le nom de domaine, le compte d'hébergement, le code et les contenus ? La bonne réponse est simple : à vous. Le nom de domaine doit être enregistré à votre nom, avec vos identifiants de gestionnaire. Un prestataire qui garde le domaine à son nom crée une dépendance que vous découvrirez le jour où vous voudrez partir.`,
          ],
        },
        {
          titre: `La résiliation`,
          paragraphes: [
            `Comment arrête-t-on ? Avec quel préavis ? Que récupère-t-on en partant : accès, code, sauvegarde, documentation ? Pour ne pas dépendre d'un abonnement : pas de durée minimale, un préavis court, une remise complète du dossier.`,
          ],
        },
      ],
    },
    {
      id: 'abonnement-stackup',
      titre: `Combien coûte la maintenance d'un site chez Stackup ?`,
      paragraphes: [
        `L'abonnement de maintenance Stackup démarre à partir de {{abo:min}} € par mois. Il est sans engagement : vous pouvez l'arrêter avec un préavis d'un mois, sans pénalité. Le montant dépend du type de site (vitrine, plusieurs pages, boutique, outil sur mesure), du nombre de fonctions à surveiller et de la place laissée aux petites modifications.`,
        `Ce qui n'entre pas dans l'abonnement : les évolutions importantes (nouvelle section, nouvelle fonction, refonte). Elles passent par un devis séparé, validé avant que le travail ne commence. Une intervention exceptionnelle, hors de ce que l'abonnement prévoit, est annoncée avant d'être réalisée et facturée au temps passé : pas de surprise sur la facture. Pour estimer un projet, passez par l'[estimateur de la page tarifs](/tarifs).`,
        `Pour un site fabriqué ailleurs, on regarde d'abord son état, puis on vous propose une formule adaptée, ou on vous dit franchement que la reprise n'a pas de sens.`,
      ],
      sous: [
        {
          titre: `Comment on travaille avec vous au quotidien`,
          paragraphes: [
            `Vous parlez à une seule personne, Mathéo Reboul, qui connaît votre site, pas à un standard. Une demande courante passe par un e-mail à contact@stackup-agency.fr ; une urgence, par un appel direct. Les petites modifications sont traitées dans l'ordre de réception, sauf blocage de votre activité.`,
            `On vous demande peu : prévenir quand quelque chose change (horaires, service, salarié), garder vos identifiants en lieu sûr, lire le compte rendu. Si vous voulez un jour reprendre la main ou changer de prestataire, on remet le dossier complet : c'est votre site.`,
          ],
        },
      ],
    },
    {
      id: 'piratage-panne',
      titre: `Que faire si votre site est piraté ou en panne ?`,
      paragraphes: [
        `Ne paniquez pas et n'effacez rien. Voici l'ordre à suivre, seul ou avec un prestataire.`,
      ],
      liste: [
        `Constater et noter : que voit-on exactement (page blanche, message d'erreur, page étrangère, redirection vers un site inconnu) et depuis quand ? Une capture d'écran et l'heure aident beaucoup.`,
        `Vérifier que ce n'est pas autre chose : hébergement impayé, domaine échu ou certificat expiré donnent des symptômes proches.`,
        `Prévenir les bonnes personnes : votre prestataire et votre hébergeur. Si des données personnelles de clients ont pu être exposées, la question d'une déclaration à la CNIL se pose : le site de la CNIL explique les cas concernés.`,
        `Changer les mots de passe : administration du site, hébergement, messagerie, accès aux fichiers. À faire depuis un poste sain.`,
        `Remettre le site dans un état connu : restaurer la dernière sauvegarde saine plutôt que nettoyer à la main. Nettoyer sans trouver l'origine de la faille, c'est se faire pirater à nouveau.`,
        `Comprendre et fermer la faille : composant non mis à jour, mot de passe faible, accès oublié. Sans cette étape, la restauration ne sert à rien.`,
        `Vérifier le référencement : si le moteur de recherche a signalé le site comme dangereux, un contrôle dans la Search Console et une demande de réexamen sont nécessaires. Le délai de réponse dépend de Google.`,
      ],
      sous: [
        {
          titre: `Mon site reste bloqué sur « Briefly unavailable for scheduled maintenance »`,
          paragraphes: [
            `Ce message apparaît sur un site WordPress lorsqu'une mise à jour a été interrompue (connexion coupée, onglet fermé, serveur trop lent). WordPress crée alors un petit fichier nommé .maintenance à la racine du site, qui doit disparaître à la fin de la mise à jour. S'il reste, le site affiche indéfiniment ce message. En général, supprimer ce fichier via l'accès aux fichiers de l'hébergeur, puis relancer la mise à jour, suffit. Sinon, une extension a échoué : restaurez la sauvegarde.`,
          ],
        },
        {
          titre: `Mettre volontairement son site « en maintenance »`,
          paragraphes: [
            `Pendant une grosse évolution, on peut afficher une page d'attente claire, avec le téléphone de l'entreprise bien visible, et la retirer dès que c'est fini.`,
          ],
        },
      ],
    },
    {
      id: 'sauvegarde-restauration',
      titre: `Sauvegarde et restauration : comment ça marche, et pourquoi il faut les tester`,
      paragraphes: [
        `Une sauvegarde utile répond à trois conditions. Elle est complète : fichiers du site, base de données s'il y en a une, et configuration. Elle est séparée : conservée ailleurs que sur le serveur du site, sinon un incident sur ce serveur emporte tout. Et elle est récente, à un rythme qui correspond à la vie du site : un site vitrine qui change deux fois par an n'a pas les mêmes besoins qu'une boutique qui reçoit des commandes chaque jour.`,
        `On garde plusieurs versions successives : un problème est parfois découvert tard, et la plus récente peut déjà être abîmée.`,
        `La restauration est l'autre moitié du travail. Elle consiste à remettre le site dans l'état d'un jour donné, ce qui suppose de savoir où chaque pièce va. Il faut la tester de temps en temps sur une copie. Pour une boutique, une question s'ajoute : que devient une commande passée entre la sauvegarde et l'incident ? La réponse doit être connue avant la panne.`,
      ],
    },
    {
      id: 'domaine-messagerie',
      titre: `Nom de domaine et messagerie : qui les gère, et à quel nom ?`,
      paragraphes: [
        `Le nom de domaine (par exemple monentreprise.fr) est ce qui permet à vos clients de vous trouver. Il se loue, il ne s'achète pas : il faut le renouveler à échéance. Un oubli peut couper à la fois le site et les adresses e-mail.`,
        `Vérifiez trois choses. D'abord, le domaine est bien enregistré à votre nom, avec une adresse e-mail de contact que vous consultez. Ensuite, vous connaissez le bureau d'enregistrement qui le gère et vous disposez de l'accès. Enfin, les réglages qui le relient au site et à la messagerie (les enregistrements DNS) sont documentés quelque part.`,
        `La messagerie professionnelle mérite le même soin. Les e-mails de votre site (réponse à un formulaire, confirmation de commande) doivent arriver chez vous et non dans les courriers indésirables. Cela dépend de réglages d'authentification de l'expéditeur, que la maintenance vérifie. Elle ne remplace pas une boîte e-mail : on s'assure que tout fonctionne ensemble.`,
      ],
    },
    {
      id: 'site-abandonne',
      titre: `Reprendre la maintenance d'un site existant, laissé par un ancien prestataire`,
      paragraphes: [
        `Situation courante : le prestataire a cessé son activité ou ne répond plus, le site fonctionne mais personne ne s'en occupe. La reprise est possible, dans l'ordre.`,
        `On commence par un état des lieux, sans rien toucher : accès disponibles, technologie utilisée, version des composants, présence de sauvegardes, état du certificat et du domaine, qualité du code. Ce diagnostic dit si le site peut être repris tel quel, s'il faut d'abord le stabiliser, ou si une refonte sera plus raisonnable à terme. Pour ce dernier cas, voyez notre page sur la [refonte de site internet](/services/refonte-de-site-internet).`,
      ],
      liste: [
        `Récupérer les accès : nom de domaine, hébergement, administration du site, messagerie. Si le domaine est au nom de l'ancien prestataire, il faut obtenir son transfert ; si vous n'arrivez pas à le joindre, des démarches existent auprès du bureau d'enregistrement.`,
        `Faire une sauvegarde complète avant toute intervention, même si le site est dans un état médiocre.`,
        `Stabiliser : mises à jour critiques, corrections de sécurité, suppression de ce qui est inutile.`,
        `Documenter : noter ce que contient le site, ce qui a été fait, ce qui reste fragile.`,
        `Décider ensemble : continuer avec une maintenance régulière, ou préparer une évolution plus profonde.`,
      ],
    },
    {
      id: 'audience-rgpd',
      titre: `Mesure d'audience, RGPD et mentions légales : ce que la maintenance doit garder à jour`,
      paragraphes: [
        `Un site évolue, et ses obligations avec lui. Changement d'adresse, de forme juridique, nouveau formulaire ou outil de statistiques : tout cela peut rendre vos mentions légales ou votre politique de confidentialité inexactes. La maintenance vérifie qu'elles correspondent à la réalité. Vous pouvez consulter notre [politique de confidentialité](/politique-confidentialite) pour voir comment nous traitons ce sujet nous-mêmes.`,
        `Sur la mesure d'audience, la voie la plus simple est de choisir un outil qui respecte les visiteurs : des statistiques anonymes, sans suivi publicitaire, sans profil individuel. Certains outils de ce type peuvent se passer de bandeau de consentement sous conditions ; la CNIL les précise sur son site, à vérifier avant de choisir. Mieux vaut mesurer peu et utilement (pages lues, origine des demandes) que collecter beaucoup.`,
        `Autre point de vigilance : les formulaires. Ils doivent dire à quoi servent les données demandées, ne demander que le nécessaire et renvoyer vers la politique de confidentialité. La maintenance ne remplace pas un conseil juridique ; pour un cas précis, la CNIL reste la référence.`,
      ],
    },
  ],
  exemples: [
    {
      titre: `Exemple type : un artisan plombier avec un site vitrine`,
      texte: `Exemple fictif. Un plombier a un site de quelques pages, mis en ligne il y a plusieurs années. Il ne le modifie presque jamais et choisit la maintenance pour ne plus y penser : certificat renouvelé, sauvegardes, formulaire testé, modification faite sur simple message. Un jour, le formulaire cesse d'envoyer ses messages après un changement chez le service d'envoi ; la surveillance le détecte et on corrige avant que des demandes se perdent.`,
    },
    {
      titre: `Exemple type : une boutique en ligne de cave à vins`,
      texte: `Exemple fictif. Un caviste vend en ligne avec un site qui reçoit des commandes toute l'année, davantage avant les fêtes. La maintenance est plus serrée : sauvegardes plus fréquentes, mises à jour testées sur une copie, surveillance du paiement et des e-mails de confirmation. Avant la période chargée, on vérifie les points sensibles et on évite toute mise à jour importante.`,
    },
    {
      titre: `Exemple type : un site laissé par un ancien prestataire`,
      texte: `Exemple fictif. Une kinésithérapeute découvre que son site affiche un avertissement de sécurité. Son ancien prestataire ne répond plus et le domaine est enregistré à son nom à lui. On fait l'état des lieux, on récupère accès et domaine avec elle, on sauvegarde, on stabilise et on documente. Elle choisit ensuite une maintenance régulière et une refonte plus tard.`,
    },
  ],
  faq: [
    {
      q: `Combien coûte la maintenance d'un site internet ?`,
      a: `Chez Stackup, l'abonnement démarre à partir de {{abo:min}} € par mois, sans engagement. Le montant varie selon le type de site, sa taille et la part de petites modifications incluse.`,
    },
    {
      q: `Est-ce que je peux résilier à tout moment ?`,
      a: `Oui. L'abonnement est sans engagement : vous le résiliez avec un préavis d'un mois, sans pénalité. Vous repartez avec accès, sauvegardes et documentation.`,
    },
    {
      q: `La maintenance est-elle obligatoire ?`,
      a: `Aucune loi ne vous impose un contrat de maintenance, mais un site qui n'est pas mis à jour s'expose à des failles, des pannes et à un référencement qui se dégrade. Vous pouvez l'assurer vous-même si vous en avez le temps.`,
    },
    {
      q: `Que comprend un forfait de maintenance pour une petite entreprise ?`,
      a: `En général : mises à jour, sauvegardes, surveillance, vérification du certificat et du domaine, correctifs et un volume de petites modifications. Les évolutions importantes font l'objet d'un devis séparé.`,
    },
    {
      q: `Maintenez-vous un site que vous n'avez pas créé ?`,
      a: `Souvent oui, après un état des lieux. Après un état des lieux, on vous dit franchement ce qui est raisonnable de reprendre, ou si une refonte est préférable.`,
    },
    {
      q: `Mon site est piraté ou en panne, que faire en premier ?`,
      a: `Notez ce que vous voyez, vérifiez que le domaine, l'hébergement et le certificat sont à jour, puis contactez votre prestataire et votre hébergeur. Restaurer une version saine est la voie la plus sûre.`,
    },
    {
      q: `À qui appartiennent mon nom de domaine et mon site ?`,
      a: `À vous. Le domaine doit être enregistré à votre nom, avec un accès que vous contrôlez. Le contrat précise aussi qui détient le code et les contenus.`,
    },
    {
      q: `Combien de temps pour réagir en cas de problème ?`,
      a: `Nous ne promettons pas de délai chiffré. Une panne qui bloque votre activité passe avant le reste : accusé de réception rapide, puis point d'avancement jusqu'au rétablissement.`,
    },
    {
      q: `La maintenance gère-t-elle aussi les mentions légales et le RGPD ?`,
      a: `Elle vérifie que vos mentions légales, votre politique de confidentialité et vos formulaires restent cohérents avec le site. Elle ne remplace pas un conseil juridique.`,
    },
    {
      q: `Peut-on modifier le contenu du site soi-même ?`,
      a: `Selon la manière dont le site est conçu, oui. Sinon, envoyez-nous la modification par e-mail et nous la publions.`,
    },
  ],
  sources: [
    { nom: `CNIL, le site de la Commission nationale de l'informatique et des libertés`, url: `https://www.cnil.fr` },
    { nom: `Service-public.fr, informations pour les entreprises`, url: `https://entreprendre.service-public.fr` },
    { nom: `web.dev, bonnes pratiques de performance et de sécurité`, url: `https://web.dev` },
    { nom: `Google Search Central, guide pour les propriétaires de site`, url: `https://developers.google.com/search` },
  ],
  liens: [
    { href: `/tarifs`, nom: `Estimer le prix de votre projet`, note: `L'estimateur calcule un prix à partir de ce que vous cochez.` },
    { href: `/services/refonte-de-site-internet`, nom: `Refonte de site internet`, note: `Quand la maintenance ne suffit plus.` },
    { href: `/services/creation-de-site-internet`, nom: `Création de site internet`, note: `Partir sur de bonnes bases dès le départ.` },
    { href: `/services/referencement`, nom: `Référencement`, note: `Un site à jour est plus facile à bien positionner.` },
    { href: `/contact`, nom: `Nous contacter`, note: `Pour un état des lieux ou un devis de maintenance.` },
    { href: `/politique-confidentialite`, nom: `Politique de confidentialité`, note: `Comment nous traitons les données.` },
  ],
  maj: `2026-10-30`,
  type: 'service',
}
