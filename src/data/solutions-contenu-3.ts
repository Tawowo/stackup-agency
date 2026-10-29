import type { ContenuSolution } from './solutions-contenu'

export const CONTENU_SOLUTIONS_3: Record<string, ContenuSolution> = {
  'planning-employes': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : dans un restaurant, le planning de la semaine est un tableau blanc dans l’office. Le jeudi, une serveuse échange son service avec une collègue, l’information passe de bouche à oreille, et le samedi soir la salle compte une personne de trop et un poste de plonge vide. Personne n’a rien oublié, mais personne ne tenait le même document.`,
          `Exemple type : dans une salle de sport, les coachs interviennent sur des cours collectifs, des séances individuelles et l’accueil. Le responsable refait chaque semaine un tableur, l’envoie en pièce jointe, et trois coachs consultent encore la version de la semaine précédente. Quand un cours saute, il faut appeler chacun pour savoir qui peut remplacer.`,
          `Exemple type : dans un institut de beauté, deux esthéticiennes ont des horaires qui changent selon les congés et les formations. La gérante répond tous les soirs à des messages du type « je travaille quand la semaine prochaine ? ». Le planning existe, mais il vit dans sa tête et dans son téléphone.`,
        ],
      },
      {
        titre: `Comment fonctionne le planning des employés`,
        paragraphes: [
          `Côté responsable, vous ouvrez une vue jour, semaine ou mois et vous placez chaque personne sur un créneau : poste, lieu, horaires de début et de fin. Si vous affectez quelqu’un qui est déjà occupé à ce moment-là, ou qui est en congé, l’écran vous le signale avant que vous n’enregistriez. Vous pouvez copier une semaine type et ne corriger que ce qui change.`,
          `Côté équipe, chaque membre se connecte avec son propre accès, depuis son téléphone, sans rien installer. Il voit ses horaires de la semaine, et seulement les autres plannings si vous l’avez décidé. Lorsque vous modifiez un créneau, la personne concernée peut être prévenue si votre outil comprend le module de notifications ou celui des automatisations.`,
          `Ce qui est automatique : la détection des conflits, l’affichage à jour pour tout le monde, le lien avec les rendez-vous ou les chantiers déjà saisis dans l’outil. Ce qui ne l’est pas : la décision. Le module ne choisit pas qui travaille, il ne calcule pas tout seul la paie et ne remplace pas votre jugement sur la charge de chacun. Les demandes de congés, les échanges de créneaux et le pointage sont des modules à part, à ajouter si vous en avez besoin.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au tableau blanc ou au cahier, le module apporte une seule version du planning, consultable partout, avec un historique des changements. Face au tableur partagé, il apporte la vérification des conflits et des droits d’accès : un tableur laisse tout le monde tout modifier, un outil peut limiter ce que chacun voit et change.`,
          `Face à un logiciel de planning du marché, le choix se joue autrement. Si vous avez une petite équipe, des horaires qui changent peu et aucun besoin de lien avec vos clients, un logiciel standard par abonnement ou même un tableur propre suffit largement, et ce sera moins cher au départ. Le module sur mesure devient intéressant quand le planning doit parler à d’autres éléments : vos rendez-vous, vos chantiers, vos règles de la maison, votre vocabulaire.`,
          `Il ne remplace pas un logiciel de paie ni le conseil de votre expert-comptable, et il ne vous dit pas ce que le droit du travail impose sur les durées de repos ou l’affichage des horaires. Pour cela, le site officiel [service-public.fr](https://www.service-public.fr) reste la référence. Le module peut seulement vous aider à garder une trace propre de ce qui a été planifié.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le planning d’équipe sert d’abord aux activités où plusieurs personnes se relaient sur des horaires variables : le [restaurant](/creation-site-internet/restaurant), la [salle de sport](/creation-site-internet/salle-de-sport), l’[institut de beauté](/creation-site-internet/institut-beaute). Il sert aussi aux entreprises de service qui envoient des équipes chez leurs clients, quand le planning doit suivre les interventions.`,
          `Une configuration courante : le planning, plus la [prise de rendez-vous en ligne](/solutions/prise-rendez-vous-en-ligne) pour que les créneaux proposés au public tiennent compte de la présence réelle de l’équipe. Si vous avez beaucoup de demandes d’absence, on ajoute le module de congés ; si vous devez justifier les heures effectuées, la feuille de temps. Chaque ajout se chiffre séparément, vous ne payez que ce que vous gardez.`,
          `Un point de vigilance : tout dispositif de pointage manipule des données personnelles sur vos salariés. Le choix d’un simple relevé des heures déclaré par l’employé ou d’un système plus intrusif se discute ensemble, et la CNIL publie des repères sur [cnil.fr](https://www.cnil.fr).`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module, ici le planning. Le prix monte avec le nombre de modules ajoutés, le nombre de rôles différents à gérer et les liens avec d’autres éléments, comme vos rendez-vous. Vous pouvez avoir une première idée avec [l’estimateur de prix](/tarifs#estimer), le devis écrit fixe ensuite le montant définitif.`,
          `L’abonnement est facultatif : à partir de {{abo:min}} € par mois, sans engagement, pour l’hébergement, les mises à jour et l’assistance. Si vous le résiliez, le code et vos données vous appartiennent selon les conditions du devis, et vous gardez la possibilité de les confier à quelqu’un d’autre. Pour comparer avec un abonnement de logiciel standard sur plusieurs années, le [calculateur d’abonnement](/outils/calculateur-abonnement-saas) vous donne un ordre de grandeur à partir de vos propres chiffres.`,
          `Avant de signer, une démo de votre outil peut être préparée ({{carte:demo}} € facturés à part, non déduits du devis). Le calendrier se fixe ensemble avant de commencer, il ne dépend pas d’une durée annoncée à l’avance.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `La liste de votre équipe, avec pour chaque personne le poste, les types de service qu’elle peut assurer et les contraintes connues (temps partiel, jours fixes). Notez aussi qui a le droit de modifier le planning et qui peut seulement le consulter : cela détermine les accès à créer.`,
          `Les règles de la maison, souvent jamais écrites : combien de personnes minimum à tel moment, quels postes ne peuvent pas rester vides, quels horaires sont habituels le week-end. Ce sont ces règles qui permettent de configurer des alertes utiles plutôt que des alertes permanentes.`,
          `Enfin, apportez un ou deux plannings réels des dernières semaines, avec leurs ratures. Ils montrent les cas compliqués que l’outil devra gérer et servent à tester le module avec vos vraies données avant la mise en service.`,
        ],
      },
    ],
    faq: [
      {
        q: `Le planning peut-il tenir compte des jours fériés et des fermetures ?`,
        a: `Oui, vous renseignez vos jours de fermeture et vos jours particuliers dans l’outil, et ils apparaissent dans le calendrier. Les règles de majoration ou de repos liées au droit du travail ne sont pas calculées par le module : elles sont à vérifier auprès de votre expert-comptable ou sur service-public.fr.`,
      },
      {
        q: `Que se passe-t-il si un employé n’a pas de smartphone ?`,
        a: `Il peut consulter le planning depuis n’importe quel ordinateur, ou vous pouvez imprimer la semaine depuis l’outil et l’afficher. L’outil complète le papier sans vous obliger à le supprimer.`,
      },
      {
        q: `Peut-on garder l’historique des plannings passés ?`,
        a: `Oui, les semaines passées restent consultables dans l’outil et font partie des données que vous pouvez exporter. Cela vous aide à retrouver qui était présent un jour donné en cas de question.`,
      },
    ],
  },

  'menu-qr-code': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : une brasserie propose un plat du jour qui change tous les midis. La carte imprimée ne le mentionne pas, l’ardoise est à l’entrée, et les serveurs répètent la même annonce table après table. Quand le poisson est épuisé à treize heures, les clients l’apprennent après avoir choisi.`,
          `Exemple type : un salon de thé fait varier ses gâteaux selon les fournées et les saisons. Réimprimer la carte à chaque changement est un coût et une corvée, donc la carte reste en circulation avec des mentions rayées au stylo, ce qui donne une image négligée.`,
          `Exemple type : un client allergique demande si une préparation contient des fruits à coque. Le serveur du jour n’est pas sûr, la cuisine est en plein service, et la réponse arrive tard ou pas du tout. Une carte en ligne qui indique les allergènes que vous avez renseignés évite une partie de ces échanges.`,
        ],
      },
      {
        titre: `Comment fonctionne le menu digital et QR code`,
        paragraphes: [
          `Côté professionnel, vous vous connectez à votre outil, ordinateur ou téléphone, et vous modifiez la carte comme une liste : catégories, plats, prix, descriptions, photos, allergènes. Un plat épuisé se désactive d’un geste, un plat du jour s’ajoute et disparaît le lendemain. Dès que vous enregistrez, la carte publiée est à jour.`,
          `Côté client, il scanne le QR code posé sur la table, au comptoir ou en vitrine avec l’appareil photo de son téléphone. La carte s’ouvre dans le navigateur, sans application à installer ni compte à créer. Elle a une adresse web stable : le QR code imprimé une fois continue de fonctionner quand la carte change.`,
          `Ce qui est automatique : la mise à jour instantanée et l’affichage adapté au téléphone. Ce qui ne l’est pas : le contenu. Les allergènes, par exemple, sont ceux que vous saisissez, et leur exactitude reste de votre responsabilité. Le module n’analyse pas vos recettes. Il peut être relié à une commande en ligne, mais c’est alors un autre module.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face à la carte papier, la carte en ligne se corrige sans réimpression, et elle peut montrer des photos. Mais le papier garde ses atouts : il se lit sans téléphone, sans batterie, sans réseau, et certains clients, notamment les plus âgés, préfèrent l’avoir en main. Beaucoup d’établissements gardent donc quelques cartes imprimées en complément, et c’est un choix raisonnable.`,
          `Face à un simple fichier PDF mis en ligne, le module apporte un affichage lisible sur mobile, une modification sans logiciel de mise en page et un classement par catégories. Un PDF bien fait reste une solution acceptable pour une carte très stable et un petit établissement : elle ne coûte presque rien à mettre en place.`,
          `Face aux plateformes de carte et de commande par abonnement, qui offrent souvent un service clé en main pour un besoin standard, le module sur mesure se justifie quand vous voulez une carte à votre image, reliée à votre site, à votre commande ou à vos stocks, et sans dépendre de l’évolution des offres d’un tiers. Si votre besoin est seulement d’afficher une carte, une solution standard peut suffire. Le sujet est détaillé dans l’article [menu digital ou menu papier](/blog/menu-digital-vs-menu-papier).`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module est pensé pour la restauration : [restaurant](/creation-site-internet/restaurant), [brasserie-bar](/creation-site-internet/brasserie-bar), [café et salon de thé](/creation-site-internet/cafe-salon-the). Il convient aussi au traiteur, au food truck ou à la pizzeria dès qu’une carte change souvent.`,
          `Une configuration type : la carte avec QR code, plus la [réservation de restaurant](/solutions/reservation-restaurant) si vous prenez des réservations, et la [commande à emporter](/solutions/click-and-collect) si vous vendez des plats à emporter. Les trois partagent le même outil, donc le plat épuisé en salle l’est aussi à la commande.`,
          `Le même contenu peut apparaître sur votre site internet, ce qui sert aussi votre référencement local : une carte écrite en texte est lisible par les moteurs de recherche, contrairement à une image de menu. L’article [carte et QR code pour un restaurant](/blog/carte-qr-code-restaurant-menu) détaille les bonnes pratiques d’affichage.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module, ici la carte en ligne. Le prix varie selon le nombre de langues, la présence de photos à intégrer, le nombre de cartes différentes (midi, soir, boissons, carte des vins) et le lien éventuel avec la commande ou le site. Le devis écrit fixe le montant, après une première estimation sur la page [tarifs](/tarifs#estimer).`,
          `L’abonnement est facultatif : à partir de {{abo:min}} € par mois, sans engagement, pour l’hébergement, la maintenance et l’assistance. Si vous arrêtez, vos données s’exportent et le code est cédé selon les conditions du devis. Pour mesurer ce que coûterait un abonnement standard sur plusieurs années, essayez le [calculateur d’abonnement](/outils/calculateur-abonnement-saas).`,
          `Une démo préparée pour votre établissement est possible avant de vous engager ({{carte:demo}} € facturés à part, non déduits du devis). Les QR codes à imprimer sont fournis ; leur impression et leurs supports restent à votre charge, et le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Votre carte actuelle, à jour, avec les noms exacts des plats, les prix, les formules et leurs conditions. Précisez ce qui change souvent et ce qui est stable : cela détermine l’organisation des catégories et la facilité de mise à jour.`,
          `Les allergènes de chaque préparation, confirmés par la cuisine. L’information sur les allergènes est une obligation pour les professionnels de la restauration ; la forme exacte attendue est à vérifier sur le site officiel [economie.gouv.fr](https://www.economie.gouv.fr). Le module affiche ce que vous saisissez, il ne le vérifie pas.`,
          `Des photos de vos plats si vous souhaitez en montrer, avec une lumière correcte et un format régulier, ainsi que votre logo et vos couleurs. Décidez enfin où les QR codes seront posés et qui, dans l’équipe, aura la charge de modifier la carte au quotidien.`,
        ],
      },
    ],
    faq: [
      {
        q: `Que faire si le réseau mobile est mauvais dans mon établissement ?`,
        a: `Le QR code nécessite une connexion pour ouvrir la carte. Si le réseau est faible chez vous, proposez le wifi aux clients avec un affichage simple, ou gardez quelques cartes imprimées. Une carte légère, sans images trop lourdes, s’affiche aussi plus vite.`,
      },
      {
        q: `Peut-on avoir la carte en plusieurs langues ?`,
        a: `Oui, la carte peut être proposée en plusieurs langues. Les traductions doivent être fournies ou relues par vous : le module les affiche, mais ne garantit pas leur justesse. Chaque langue ajoutée se prend en compte dans le devis.`,
      },
      {
        q: `Le QR code change-t-il quand je modifie la carte ?`,
        a: `Non. Le QR code pointe vers une adresse fixe, et c’est le contenu derrière cette adresse qui change. Vous n’avez donc jamais à réimprimer les supports quand vous modifiez un prix ou un plat.`,
      },
    ],
  },

  'tableau-de-bord': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : une gérante de boutique de vêtements connaît sa journée par la caisse, mais pas son mois. Elle sait qu’elle a bien vendu, sans savoir si les marges ont tenu. Le point complet arrive chez son comptable plusieurs semaines après la fin du trimestre, quand il n’y a plus rien à corriger.`,
          `Exemple type : un restaurateur suit son chiffre d’affaires dans un tableur qu’il remplit le dimanche soir. Les ventes sont dans la caisse, les achats dans un classeur, les factures fournisseurs dans un tiroir. Il doit recouper trois sources pour savoir si la semaine était bonne, donc il ne le fait pas toujours.`,
          `Exemple type : un organisme de formation facture ses sessions par lots. Les paiements en retard sont repérés au hasard d’un coup de fil, parce qu’aucun écran n’affiche d’un coup d’œil les factures échues et les clients concernés. La trésorerie se tend avant qu’on ait vu pourquoi.`,
        ],
      },
      {
        titre: `Comment fonctionne le tableau de bord dirigeant`,
        paragraphes: [
          `Le tableau de bord ne saisit rien lui-même : il lit ce qui est déjà enregistré dans votre outil, c’est-à-dire vos devis, vos factures et vos paiements. À l’ouverture, vous voyez le chiffre d’affaires du mois comparé à l’objectif que vous avez fixé, la répartition par type de prestation, vos meilleurs clients et les factures en retard.`,
          `Vous choisissez les indicateurs qui comptent pour vous : on n’affiche pas vingt graphiques pour en regarder deux. Chaque graphique se lit sans formation, avec une légende claire, et vous pouvez cliquer pour descendre au détail, par exemple de « factures en retard » vers la liste des factures concernées. Les rapports PDF automatiques, envoyés à date fixe, sont un module à part.`,
          `Ce qui est automatique : les calculs, la mise à jour dès qu’une facture ou un paiement est saisi. Ce qui ne l’est pas : la justesse. Un tableau de bord n’est exact que si les données qui l’alimentent le sont, et il n’invente rien. En option, un assistant d’IA peut commenter vos chiffres en langage simple ; c’est un outil intégré à votre application, qui n’a pas vocation à décider à votre place.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au tableur, le tableau de bord évite les copies manuelles, les formules cassées et les versions concurrentes. Mais un tableur bien tenu par quelqu’un d’à l’aise avec ses formules reste un très bon outil pour une activité simple, et il ne coûte rien de plus que votre temps.`,
          `Face à la comptabilité, il ne la remplace pas. Votre expert-comptable produit des documents officiels, bilans et déclarations ; le tableau de bord offre une vue de pilotage en cours d’année. Les deux se complètent, et leurs chiffres peuvent différer légèrement tant que tout n’est pas encore enregistré ou rapproché.`,
          `Face aux logiciels de gestion ou de pilotage du marché, qui proposent souvent des tableaux de bord prêts à l’emploi, la différence tient à la source des données et au choix des indicateurs. Si vos chiffres sont déjà dans un logiciel standard qui vous convient, ajouter un outil serait inutile. Le module sur mesure a du sens quand vos données sont dispersées ou quand vos indicateurs sont propres à votre métier. L’article [tableau de bord du dirigeant](/blog/tableau-de-bord-dirigeant) explique comment choisir ces indicateurs.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le tableau de bord s’adresse aux activités qui facturent régulièrement et veulent suivre leur trésorerie : [restaurant](/creation-site-internet/restaurant), [boutique de mode](/creation-site-internet/boutique-mode), [organisme de formation](/creation-site-internet/organisme-formation). Il sert aussi aux artisans, dès que les devis et les factures se multiplient.`,
          `Il n’a de valeur que si les données entrent dans l’outil. La configuration la plus naturelle est donc la [gestion des devis et factures](/solutions/gestion-devis-factures), qui le nourrit directement. Si vous vendez en boutique, la [caisse enregistreuse](/solutions/caisse-enregistreuse) fournit les ventes du comptoir ; le [CRM sur mesure](/solutions/crm-sur-mesure) apporte la vue par client.`,
          `Un tableau de bord seul, sans ces sources, resterait vide. Ce point se discute dès le premier échange, pour ne pas vous vendre un écran sans données.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module. Le tableau de bord de base fait partie du socle ; le tableau de bord avancé, avec marges et objectifs, et les rapports PDF automatiques s’ajoutent en modules. Le prix varie selon le nombre d’indicateurs personnalisés, le nombre de sources de données à relier et le niveau de détail attendu.`,
          `L’abonnement est facultatif : à partir de {{abo:min}} € par mois, sans engagement. Vos données et le code vous appartiennent selon les conditions du devis, avec un export possible à tout moment. Pour situer le coût d’un abonnement standard dans la durée, le [calculateur d’abonnement](/outils/calculateur-abonnement-saas) fait le calcul avec vos propres chiffres.`,
          `Le tableau de bord est déjà visible dans la démo du logiciel de gestion de Stackup. Pour voir vos propres indicateurs avant de signer, une démo dédiée est possible ({{carte:demo}} € facturés à part, non déduits du devis). Le calendrier se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `Dites quelles questions vous vous posez chaque semaine : « ai-je atteint mon objectif ? », « qui me doit de l’argent ? », « quelle prestation rapporte le plus ? ». Ce sont ces questions qui définissent les indicateurs, pas une liste de graphiques génériques.`,
          `Rassemblez vos données de départ : liste de vos clients, catalogue de vos prestations ou produits avec leurs prix, factures de l’année en cours si vous voulez un historique. Plus ces données sont propres, plus les chiffres affichés seront fiables dès le premier jour.`,
          `Fixez vos objectifs, ou au moins une première valeur de départ pour le chiffre d’affaires mensuel. Décidez aussi qui verra les chiffres : le dirigeant seul, ou aussi un associé ou un responsable. Les droits d’accès se règlent selon cette réponse.`,
        ],
      },
    ],
    faq: [
      {
        q: `Le tableau de bord peut-il se connecter à ma banque ou à ma comptabilité ?`,
        a: `Cela dépend des services concernés et se chiffre au devis comme une connexion à un service externe. Par défaut, le tableau de bord lit les données saisies dans votre outil. Les liens avec une banque ou un logiciel de comptabilité se décident ensemble, selon ce que ces services permettent.`,
      },
      {
        q: `Mes associés ou mon comptable peuvent-ils y accéder ?`,
        a: `Oui, avec des accès distincts et des droits adaptés : un comptable peut, par exemple, consulter les factures sans pouvoir modifier le reste. Vous gardez la main sur qui voit quoi, et vous pouvez retirer un accès à tout moment.`,
      },
      {
        q: `À quelle fréquence les chiffres sont-ils mis à jour ?`,
        a: `Dès qu’une donnée est enregistrée dans l’outil, le tableau de bord la prend en compte. Il n’y a pas de calcul de nuit à attendre. Une facture saisie à dix heures apparaît dans le chiffre d’affaires dès son enregistrement.`,
      },
    ],
  },

  'reservation-location': {
    sections: [
      {
        titre: `Le problème, vu depuis le terrain`,
        paragraphes: [
          `Exemple type : un gîte reçoit des demandes par téléphone, par message et par une plateforme de réservation. Le propriétaire note chaque séjour dans un cahier, mais un week-end de printemps, deux familles se présentent pour la même semaine, parce qu’une réservation prise par téléphone n’a jamais été reportée sur l’autre calendrier.`,
          `Exemple type : un magasin de sport loue des vélos, des skis ou du matériel de randonnée. Le vendeur répond dix fois par jour à « il vous reste un modèle pour samedi ? » en feuilletant un registre. Un client qui n’obtient pas de réponse immédiate va voir ailleurs.`,
          `Exemple type : un camping propose des emplacements, des mobil-homes et la location de salle. Les arrivées, les départs et les états des lieux se jouent sur plusieurs supports. Le jour du changement de client, personne ne sait avec certitude quel hébergement est prêt.`,
        ],
      },
      {
        titre: `Comment fonctionne la réservation de location`,
        paragraphes: [
          `Chaque bien à louer (chambre, salle, véhicule, pièce de matériel) existe dans l’outil avec ses caractéristiques et son calendrier. Pour réserver, le client choisit des dates, voit ce qui est libre et envoie sa demande, ou réserve directement selon votre réglage. Dès qu’une période est prise, elle se bloque pour ce bien : un second client ne peut plus la choisir.`,
          `Côté professionnel, vous voyez un calendrier d’ensemble par bien, vous créez une réservation prise par téléphone en quelques secondes, vous déplacez ou annulez. Chaque client a une fiche avec l’historique de ses locations. Une confirmation et un rappel peuvent partir par e-mail ; le paiement d’un acompte ou du solde est possible via un service tiers dont le coût d’usage est refacturé.`,
          `Ce qui est automatique : le blocage des dates et l’envoi des confirmations. Ce qui ne l’est pas : les conditions. Le module ne décide pas de vos règles de caution, d’annulation ou d’état des lieux ; c’est vous qui les fixez, et elles doivent figurer dans vos conditions de location. Pour le matériel et les véhicules, l’entretien et l’affectation se suivent via un module distinct.`,
        ],
      },
      {
        titre: `Ce que ce module remplace, et ce qu’il ne remplace pas`,
        paragraphes: [
          `Face au cahier ou au calendrier papier, le module supprime les doubles saisies et permet au client de voir les disponibilités sans vous appeler. Face au tableur, il bloque réellement les dates, ce qu’un tableau ne fait pas tout seul.`,
          `Face aux plateformes de réservation qui prélèvent une commission, le choix est économique et stratégique : elles apportent de la visibilité et un public déjà présent, ce qu’un outil personnel ne vous donne pas. Beaucoup de loueurs combinent les deux, avec la plateforme pour se faire connaître et leur propre outil pour les clients qui reviennent. L’article [réservation en ligne, commission ou propriété](/blog/systeme-reservation-en-ligne-commission-ou-propriete) détaille ce raisonnement.`,
          `Face aux logiciels spécialisés du marché (gestion de gîtes, de campings, de location de matériel), qui répondent à un besoin standard avec leurs règles prêtes à l’emploi, ils sont préférables si votre activité entre dans leurs cases et si vous n’avez pas d’exigence particulière. Le module sur mesure vaut le détour pour une activité mixte, avec des biens de natures différentes, ou des règles qui sortent de l’ordinaire. L’outil ne remplace pas non plus le contrat de location lui-même.`,
        ],
      },
      {
        titre: `Pour quels métiers et avec quelle configuration`,
        paragraphes: [
          `Le module sert surtout les loueurs : [gîte et location saisonnière](/creation-site-internet/gite-location-saisonniere), [camping](/creation-site-internet/camping), [magasin de sport](/creation-site-internet/magasin-sport) qui loue du matériel, [hôtel et chambres d’hôtes](/creation-site-internet/hotel-chambres-hotes). Il convient aussi à la location de salles, de véhicules ou d’outils.`,
          `La configuration type associe la réservation à la [gestion des devis et factures](/solutions/gestion-devis-factures) pour produire contrat, facture et acompte depuis la même réservation, et au [portail client](/solutions/portail-client) si vos clients doivent retrouver leurs documents. L’article [application de réservation de location](/blog/application-reservation-location) décrit les cas d’usage courants.`,
          `Si vous avez du matériel à entretenir ou plusieurs véhicules, on ajoute le suivi des véhicules et du matériel. Si vous êtes seul avec un seul bien, un agenda simple peut suffire, et nous vous le dirons.`,
        ],
      },
      {
        titre: `Budget et mise en place`,
        paragraphes: [
          `Un outil de gestion démarre à partir de {{prix:outil}} € : le socle (connexion sécurisée, base de données, tableau de bord, export de vos données) et le premier module, ici la réservation. Le prix varie selon le nombre de biens, la complexité des règles de tarification (saison, durée minimale, options), le paiement en ligne et la liaison avec votre site internet. Une première estimation se fait avec [l’estimateur de prix](/tarifs#estimer) ; le devis écrit fixe le montant.`,
          `Vous pouvez ajouter un abonnement, facultatif et sans engagement, à partir de {{abo:min}} € par mois, qui couvre l’hébergement, la maintenance et l’assistance. Le code et vos données vous appartiennent selon les conditions du devis, avec export à tout moment. Pour comparer avec un abonnement ou une commission sur plusieurs années, le [calculateur d’abonnement](/outils/calculateur-abonnement-saas) fait le calcul avec vos chiffres.`,
          `Une démo à votre image est possible avant de signer ({{carte:demo}} € facturés à part, non déduits du devis). Le coût d’usage du paiement en ligne, lui, dépend du service tiers choisi et il est refacturé. Le calendrier de mise en place se fixe ensemble avant de commencer.`,
        ],
      },
      {
        titre: `Ce qu’il faut préparer avant de commencer`,
        paragraphes: [
          `La liste de ce que vous louez, avec pour chaque bien sa description, ses photos et sa capacité. Précisez ce qui se loue seul et ce qui se loue ensemble : une salle avec son matériel, un emplacement avec ses options.`,
          `Vos tarifs et leurs règles : prix selon la saison, durée minimale, jours d’arrivée imposés, suppléments. Notez aussi vos conditions : acompte demandé, caution, délai d’annulation, remboursement. Ce sont des décisions commerciales, à prendre avant de configurer le module, et à faire relire si nécessaire.`,
          `Les réservations déjà en cours, pour les reporter dans l’outil dès le départ et éviter tout conflit. Rassemblez enfin les calendriers externes que vous utilisez, notamment ceux des plateformes, car leur synchronisation passe par une connexion à un service externe, à prévoir dans le devis.`,
        ],
      },
    ],
    faq: [
      {
        q: `Comment éviter une double réservation avec une plateforme extérieure ?`,
        a: `En reliant les calendriers : avec l’option de connexion à un service externe, les dates prises d’un côté se bloquent de l’autre. Les possibilités exactes dépendent de ce que la plateforme autorise, et la fréquence de mise à jour se vérifie au moment de la mise en place.`,
      },
      {
        q: `Le client peut-il modifier ou annuler sa réservation seul ?`,
        a: `Si vous le décidez, oui : il utilise le lien de sa confirmation, dans les limites que vous fixez, comme un délai minimal avant l’arrivée. Vous pouvez aussi choisir de valider vous-même chaque modification.`,
      },
      {
        q: `Peut-on gérer des biens de natures différentes dans le même outil ?`,
        a: `Oui, une chambre, une salle et une paire de skis peuvent coexister, chacun avec son calendrier, ses tarifs et ses règles. C’est justement un cas où un module sur mesure est plus souple qu’un logiciel pensé pour un seul type de location.`,
      },
    ],
  },
}
