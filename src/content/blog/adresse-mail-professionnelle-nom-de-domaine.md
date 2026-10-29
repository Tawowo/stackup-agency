---
title: "Adresse e-mail professionnelle avec son nom de domaine : mise en place"
seoTitle: "Adresse mail professionnelle : créer et configurer la sienne"
excerpt: "Créer une adresse mail pro à votre nom de domaine, la configurer sur mobile, éviter le spam et les boîtes pleines : le guide pas à pas pour une TPE."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 13
tag: "Technique"
category: "technique"
type: "guide"
keywords: ["création adresse mail professionnelle", "adresse mail professionnelle nom de domaine", "c'est quoi spf dkim et dmarc", "messagerie professionnelle pas chère", "comment configurer sa messagerie professionnelle sur son téléphone", "ma boîte mail est pleine que faire"]
sources: ["https://www.cnil.fr", "https://www.service-public.fr"]
---

**Pour créer une adresse e-mail professionnelle, il faut un nom de domaine à vous (par exemple votre-entreprise.fr) puis une messagerie rattachée à ce domaine, fournie par votre hébergeur ou par un service de messagerie dédié.** Comptez ensuite une demi-journée de réglages sérieux : les boîtes, les enregistrements d'authentification (SPF, DKIM, DMARC), la configuration du téléphone et quelques règles de tri.

## Création d'une adresse mail professionnelle : ce qu'il vous faut

Une adresse du type contact@votre-entreprise.fr rassure un client là où une adresse gratuite grand public laisse un doute. Elle suppose trois choses.

1. **Un nom de domaine.** C'est l'adresse de votre site, que vous louez chaque année auprès d'un bureau d'enregistrement. Il doit être à votre nom : pour savoir comment le choisir et le garder, lisez notre article sur [l'hébergement d'un site](/blog/paa-hebergement-site).
2. **Une messagerie rattachée à ce domaine.** Deux grandes familles existent : la messagerie incluse chez votre hébergeur (souvent simple, parfois limitée en espace) et la messagerie d'un grand fournisseur de bureautique en ligne, payante par utilisateur.
3. **Des enregistrements DNS corrects.** Ce sont les lignes techniques qui disent au monde entier où livrer vos messages et qui prouvent que c'est bien vous qui les envoyez.

Un point à comprendre tout de suite : **la messagerie et le site sont deux services différents**, même s'ils partagent le même nom de domaine. Votre site peut changer d'hébergeur sans que vos e-mails bougent, à condition de ne pas toucher aux enregistrements qui gèrent la messagerie. C'est l'erreur qui explique la plupart des « j'ai perdu mes mails en changeant de site » : on déplace le domaine, l'ancien hébergement est résilié, et avec lui disparaissent les boîtes et leur contenu.

### Comment créer une adresse mail sur OVH ou chez un hébergeur classique

Chez la plupart des hébergeurs, dont OVH, la marche à suivre est la même :

1. Connectez-vous à l'espace client et ouvrez la rubrique de gestion de votre domaine ou de vos e-mails.
2. Vérifiez que l'offre de messagerie est active sur ce domaine (elle est parfois incluse, parfois à ajouter).
3. Créez le compte : le nom avant l'arobase (contact, devis, prenom), le mot de passe, et la taille de la boîte si elle est réglable.
4. Notez les paramètres de connexion (serveur entrant, serveur sortant, ports) : vous en aurez besoin pour le téléphone.
5. Testez en vous écrivant depuis une adresse extérieure, puis en répondant.

Si vous ne maîtrisez pas l'interface, demandez à la personne qui gère votre site de s'en charger : c'est une opération de quelques minutes pour qui connaît les zones DNS, et une source d'erreurs pour qui les découvre.

### Messagerie pas chère ou grand fournisseur : comment choisir

Pour une TPE, la comparaison tient en quelques critères, pas en une marque gagnante.

- **Le prix réel.** Une messagerie incluse dans l'hébergement coûte souvent le prix de l'hébergement seul. Une suite bureautique en ligne se facture par utilisateur et par mois : multipliez par le nombre de personnes, y compris les boîtes « génériques » comme contact@.
- **L'espace de stockage.** Une boîte pleine bloque la réception. Regardez la taille par boîte et ce qui se passe quand elle est atteinte.
- **Les outils autour.** Agenda partagé, contacts, documents en ligne : utiles si vous êtes plusieurs ou si vous aimez tout au même endroit.
- **La dépendance.** Plus vous empilez de services chez un seul fournisseur, plus il est difficile d'en partir. Gardez vos contacts et vos archives exportables.
- **L'assistance.** Savoir qui répond quand un message n'arrive plus.

Une solution de bureautique en ligne type Microsoft 365 ou Google Workspace est adaptée si vous travaillez à plusieurs sur des documents ou si vous voulez un agenda commun. Pour un artisan seul qui reçoit des demandes de devis, la messagerie de l'hébergeur suffit souvent, à condition de bien la configurer. Il n'y a pas de bonne réponse universelle, seulement un usage à décrire avant de payer.

## C'est quoi SPF, DKIM et DMARC, et pourquoi votre fournisseur vous les demande

Ces trois sigles décrivent des lignes à ajouter à la zone DNS de votre domaine. Leur but : prouver que vos messages viennent bien de vous, pour qu'ils arrivent en boîte de réception plutôt qu'en courrier indésirable.

- **SPF** liste les serveurs autorisés à envoyer des messages au nom de votre domaine. Un message envoyé depuis un serveur absent de la liste paraît suspect.
- **DKIM** ajoute une signature numérique à chaque message envoyé. Le destinataire vérifie cette signature avec une clé publique publiée dans votre DNS. C'est une preuve que le contenu n'a pas été modifié en route et qu'il vient bien de votre domaine.
- **DMARC** dit au destinataire quoi faire quand SPF ou DKIM échouent (ne rien faire, mettre en indésirable, rejeter) et vous envoie des rapports. On commence par une politique d'observation, puis on durcit quand tout est stable.

Si votre fournisseur de messagerie ou d'envoi vous demande d'ajouter ces enregistrements, ce n'est pas du zèle : les grandes messageries ont renforcé leurs exigences d'authentification, surtout pour les envois en volume. Sans ces lignes, vos devis, vos factures et vos réponses aux formulaires risquent de finir en indésirables.

Une règle d'or : **n'ajoutez pas un second enregistrement SPF**. Il n'y en a qu'un seul par domaine, qui regroupe tous les services autorisés (messagerie, outil d'envoi de factures, formulaire du site). Deux enregistrements SPF s'annulent mutuellement.

### Quel service de messagerie est le plus fiable pour la livraison

Aucune marque n'est « la plus fiable » dans l'absolu. La livraison de vos messages dépend surtout de trois choses que vous contrôlez : l'authentification (SPF, DKIM, DMARC), la réputation de votre domaine (pas de listes achetées, pas de pics d'envois soudains) et la qualité de ce que vous envoyez (objet clair, pas de pièce jointe énorme, un lien de désinscription quand il s'agit de promotion). Un bon fournisseur bien configuré vaut mieux qu'un fournisseur prestigieux mal configuré.

## Configurer sa messagerie sur son téléphone

Pour lire et répondre depuis votre mobile, ajoutez le compte avec le protocole **IMAP** : il synchronise la boîte entre tous vos appareils, de sorte qu'un message lu ou supprimé sur le téléphone l'est aussi sur l'ordinateur. L'ancien protocole POP télécharge les messages sur un seul appareil, ce qui explique bien des « mes mails ont disparu de mon ordinateur ».

La marche à suivre générale :

1. Ouvrez les réglages du téléphone, rubrique comptes ou messagerie, et choisissez d'ajouter un compte « autre ».
2. Saisissez l'adresse complète et le mot de passe.
3. Si la détection automatique échoue, renseignez le serveur entrant, le serveur sortant et les ports que votre hébergeur indique, avec chiffrement activé.
4. Activez l'authentification sur le serveur sortant : c'est l'oubli le plus fréquent.

### Mes mails restent bloqués dans la boîte d'envoi

Quand un message reste dans la boîte d'envoi, les causes habituelles sont :

- **Une pièce jointe trop lourde.** Les serveurs limitent la taille des messages. Envoyez plutôt un lien de téléchargement.
- **Le serveur sortant mal réglé** : port, chiffrement ou authentification absente. Comparez avec les paramètres donnés par l'hébergeur.
- **Un mot de passe changé** d'un côté mais pas de l'autre.
- **Une boîte d'envoi saturée** ou un message corrompu : supprimez-le puis réécrivez-le.
- **Un réseau qui bloque le port d'envoi** (certains Wi-Fi publics). Testez en 4G.

### Ma boîte mail est pleine, que faire

Dans l'ordre : videz la corbeille et les indésirables (ils comptent dans l'espace), triez les messages avec de grosses pièces jointes, archivez l'ancien courrier dans un dossier local ou une sauvegarde, puis, si le problème revient, demandez à votre fournisseur d'augmenter la taille de la boîte ou passez à une offre plus généreuse. Sachez que **supprimer des messages sur un compte IMAP les supprime partout** : exportez avant de purger.

## Automatiser sans devenir informaticien

Une grande partie du travail de messagerie d'un artisan ou d'un commerçant est répétitive. Elle s'automatise sans logiciel compliqué.

### Répondre automatiquement quand vous êtes en chantier

La réponse automatique (ou « message d'absence ») sert à dire ce qui va se passer : « J'ai bien reçu votre message. Je suis sur un chantier jusqu'à ce soir et je vous réponds demain matin. Pour une urgence, appelez le 07 64 02 08 98. » Elle rassure sans vous obliger à répondre. Rédigez-la une fois, activez-la sur les plages où vous êtes injoignable, et indiquez un autre moyen de vous joindre. Évitez de promettre une heure précise que vous ne tiendrez pas.

### Envoyer un e-mail quand un formulaire est rempli

Le formulaire de contact de votre site peut déclencher deux e-mails : une notification pour vous, et un accusé de réception pour le visiteur (« Votre demande est bien arrivée, voici la suite »). Le second réduit les relances et les appels d'inquiétude. Pour qu'ils arrivent, l'envoi doit passer par un service authentifié sur votre domaine, avec les enregistrements vus plus haut. C'est typiquement le genre de mécanisme que nous réglons dans un [site sur mesure](/services/creation-de-site-internet) ou, pour des enchaînements plus larges, dans un projet d'[automatisation](/services/ia-et-automatisation).

### Trier automatiquement ses e-mails professionnels

Les règles de tri de votre messagerie font l'essentiel du travail :

- un dossier par type : demandes de devis, fournisseurs, factures reçues, administratif ;
- une règle par expéditeur ou par mot de l'objet qui classe et marque comme prioritaire ;
- un tri des notifications et lettres d'information dans un dossier à lire le vendredi ;
- une alerte pour les messages de vos clients importants.

Pour créer une règle, ouvrez les paramètres de votre messagerie, cherchez « règles », « filtres » ou « tri automatique », choisissez la condition (expéditeur, objet, mot-clé) puis l'action (déplacer, marquer, transférer). Les services de messagerie récents ajoutent des tris par intelligence artificielle ; ils peuvent aider, mais **relisez toujours le dossier « indésirables »** : un devis important peut s'y glisser. Évitez de confier vos messages clients à un outil externe dont vous ne connaissez pas la politique de confidentialité.

### Envoyer ses factures par e-mail : est-ce valable

Oui : une facture au format PDF envoyée par e-mail est aujourd'hui acceptée, à condition qu'elle comporte toutes les mentions obligatoires et que vous en gardiez une copie. L'administration prépare cependant une réforme de la facturation électronique entre entreprises, avec des plateformes agréées et un calendrier de déploiement progressif, reporté à plusieurs reprises : **vérifiez le calendrier en vigueur sur le site officiel** ([service-public.fr](https://www.service-public.fr) ou impots.gouv.fr) avant de faire des choix d'outils. Notre page sur la [facture électronique](/services/facture-electronique) résume ce qui concerne un artisan ou un commerçant.

### Relances de devis et d'impayés : des modèles courts

Une relance efficace est brève, polie, et propose une action.

**Relance de devis sans réponse :**
« Bonjour Madame, Monsieur, je me permets de revenir vers vous au sujet du devis du ⟨date⟩ pour [travaux ou prestation]. Avez-vous eu le temps d'en prendre connaissance ? Je reste disponible pour l'ajuster ou répondre à vos questions. Bien cordialement. »

**Relance de facture impayée (première relance, amiable) :**
« Bonjour, sauf erreur de ma part, la facture n° ⟨numéro⟩ du ⟨date⟩, d'un montant de ⟨montant⟩, reste à régler à ce jour. Pourriez-vous me confirmer la date de règlement prévue ? Si le paiement est déjà parti, merci de ne pas tenir compte de ce message. Cordialement. »

Si la relance amiable reste sans effet, la suite (rappel écrit ferme, puis mise en demeure) suit des règles précises : consultez [service-public.fr](https://www.service-public.fr) pour les démarches. Pour envoyer ces relances sans y penser, un petit outil qui repère les devis restés sans réponse et prépare le message est une bonne application des [logiciels de gestion sur mesure](/services/logiciel-de-gestion).

### Relancer un panier abandonné

Un e-mail de relance de panier abandonné est possible sur une boutique en ligne, mais il reste soumis aux règles sur le consentement et l'information des personnes. Ne l'envoyez qu'aux clients dont vous avez le droit d'utiliser l'adresse, avec un lien pour ne plus recevoir ces messages, et vérifiez la position de la [CNIL](https://www.cnil.fr) avant de l'activer.

## Prospection par e-mail : ce que dit la règle

Écrire à des clients potentiels n'est pas interdit, mais la règle dépend de la cible.

- **Particuliers (clients grand public) :** la prospection par e-mail suppose en principe leur **accord préalable** (opt-in). On ne scrape pas une liste, on n'achète pas une base sans vérifier d'où viennent les consentements.
- **Professionnels :** la prospection est possible sans accord préalable si le message est **en rapport avec leur activité**, si vous les avez informés de l'usage de leur adresse et s'ils peuvent s'opposer facilement.
- **Dans tous les cas :** identifiez-vous clairement, précisez que le message est commercial, et ajoutez un **lien de désinscription** qui fonctionne. Respectez la désinscription sans délai.

Les règles précises (consentement, exceptions pour clients existants, conservation des adresses) sont détaillées par la [CNIL](https://www.cnil.fr) : consultez-les avant de lancer une campagne. Pour construire une liste de clients par e-mail, passez par un formulaire d'inscription clair sur votre site, une case à cocher non précochée, et conservez la preuve du consentement.

### Peut-on écrire ses mails avec ChatGPT ou un assistant

Oui pour un premier jet : un assistant d'écriture propose un plan, reformule, raccourcit. Non pour envoyer tel quel : relisez, corrigez les informations, retirez le ton générique. Et ne collez jamais dans l'outil les données personnelles de vos clients sans avoir lu ses conditions d'utilisation.

## Ce qui se passe quand vous changez de site

Avant toute refonte ou changement d'hébergeur, faites cette courte liste :

- relever où est hébergée la messagerie (chez l'hébergeur du site ou ailleurs) ;
- sauvegarder les boîtes en les copiant dans un logiciel de messagerie sur ordinateur, ou en les exportant ;
- noter les enregistrements DNS actuels avant de les modifier ;
- ne résilier l'ancien hébergement qu'après avoir vérifié que les e-mails arrivent bien au nouvel endroit.

C'est un des points que nous traitons dans une [refonte](/services/refonte-de-site-internet) : la messagerie ne doit jamais être le dégât collatéral du changement de site. Et si vous cherchez une personne qui s'occupe du suivi de ces réglages dans la durée, regardez notre [offre de maintenance](/services/maintenance) ou écrivez-nous via la [page contact](/contact).

## Questions fréquentes

**Peut-on garder son ancienne adresse gratuite en parallèle ?**
Oui, pendant la transition : activez un transfert depuis l'ancienne adresse vers la nouvelle et prévenez vos contacts. Au bout de quelques mois, ne gardez l'ancienne que comme adresse de secours.

**Faut-il une adresse par personne ou une adresse commune ?**
Les deux se combinent : une adresse générique (contact@) pour le public, et une adresse nominative pour chaque personne qui répond aux clients. L'adresse générique peut être redirigée vers plusieurs boîtes.

**Combien de temps faut-il pour que les enregistrements DNS prennent effet ?**
La propagation n'est pas instantanée : elle peut aller de quelques minutes à plusieurs heures, selon la durée de vie réglée sur chaque enregistrement. Testez le lendemain avant de conclure à une erreur.

**Comment savoir si mes messages arrivent en indésirables chez les destinataires ?**
Envoyez un message de test à quelques adresses de messageries différentes (vous-même, un proche, un collègue) et regardez où il atterrit. Des outils de test d'authentification gratuits existent aussi.

**Quelle est la différence entre un alias et une boîte ?**
Un alias est une adresse qui redirige vers une boîte existante, sans stockage propre. Une boîte a son espace, son mot de passe, ses dossiers. Pour un petit commerce, des alias (devis@, contact@) renvoyés vers une seule boîte suffisent souvent.
