---
title: "Formulaire de contact : bloquer le spam et sécuriser l'envoi"
seoTitle: "Formulaire de contact : bloquer le spam et le sécuriser"
excerpt: "Spam, messages perdus, captcha, honeypot, chatbot : comment protéger votre formulaire de contact et être sûr de recevoir les vrais messages de vos clients."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 14
tag: "Technique"
category: "technique"
type: "guide"
keywords: ["protection antispam formulaire de contact", "comment sécuriser un formulaire de contact", "honeypot formulaire", "mon formulaire de contact envoie dans les spams", "chatbot ou formulaire de contact", "bloquer le spam des formulaires wordpress"]
sources: ["https://www.cnil.fr", "https://www.service-public.fr"]
---

**Un formulaire de contact se protège en combinant plusieurs barrières discrètes : un champ piège invisible (honeypot), une vérification côté serveur, une limite du nombre d'envois et, seulement si nécessaire, un captcha. Et pour que les vrais messages arrivent dans votre boîte, il faut aussi configurer correctement l'envoi des e-mails.**

Deux problèmes distincts se cachent derrière la même plainte. Le premier : trop de messages indésirables. Le second : des messages de vrais clients qui n'arrivent jamais, ou qui finissent dans les courriers indésirables. Les deux se traitent, mais pas de la même façon. Cet article démêle l'un et l'autre, puis aborde la question qui revient souvent : faut-il remplacer le formulaire par un chatbot ?

## Je reçois trop de spam sur mon formulaire de contact : d'où ça vient ?

La grande majorité du spam de formulaire ne vient pas de personnes mais de **robots** qui parcourent le web, trouvent un formulaire et le remplissent automatiquement. Leurs objectifs varient :

- placer des liens vers d'autres sites ou des offres douteuses ;
- proposer des services de référencement, de création de site ou de financement ;
- tester si votre formulaire peut servir à envoyer des e-mails à d'autres personnes (c'est plus grave) ;
- injecter du code pour détourner le formulaire.

Un site d'artisan ou de commerce local n'est pas visé parce qu'il est connu : il l'est parce qu'il est **trouvable**. Un formulaire exposé sans aucune protection finira par être repéré.

Premier réflexe : regardez à quoi ressemblent les messages. Un texte générique sans lien avec votre métier, une adresse e-mail étrange, des liens en nombre, un message en langue étrangère : ce sont des signes de robots. Un message vague mais cohérent, de quelqu'un qui cherche un renseignement, est un vrai contact mal rédigé. Cette distinction compte, parce qu'une protection trop dure bloque aussi les vrais clients.

## Comment sécuriser un formulaire de contact : les barrières à empiler

Aucune protection n'est parfaite seule. On les additionne, de la moins gênante à la plus gênante pour le visiteur.

### Un honeypot : le piège invisible

C'est la réponse à la question « c'est quoi un honeypot dans un formulaire ? ». Il s'agit d'un champ supplémentaire, caché visuellement aux humains (par CSS, pas en le supprimant), que seuls les robots remplissent, puisqu'ils lisent le code et non l'écran. Si le champ est rempli à l'arrivée, le message est ignoré, sans que le visiteur ait rien vu.

Pour qu'il fonctionne bien :

- donner au champ un nom plausible (« site web », « téléphone 2 ») pour qu'un robot ait envie de le remplir ;
- le masquer pour les lecteurs d'écran aussi (attribut qui le sort de la navigation), afin de ne pas piéger une personne qui utilise une aide technique ;
- le tester côté serveur, jamais seulement dans le navigateur.

### Un temps minimal de remplissage

Un humain met quelques secondes à lire et à écrire. Un robot envoie immédiatement. On enregistre l'heure d'affichage du formulaire, et on rejette les envois arrivés trop vite. Il ne faut pas fixer la barre trop haut : une personne qui colle un texte déjà rédigé peut aller vite.

### Une validation côté serveur

Le navigateur peut vérifier qu'un champ est rempli et qu'une adresse a la bonne forme, mais cette vérification peut être contournée. Le serveur doit **revérifier** tout ce qu'il reçoit : longueur des champs, format de l'e-mail, présence d'un consentement, absence de caractères de contrôle dans l'objet (qui permettent de glisser des en-têtes d'e-mail). C'est le point le plus important pour la sécurité : un formulaire qui construit un e-mail directement avec ce que saisit le visiteur peut être détourné pour envoyer du courrier à des tiers.

### Une limite d'envois

Même un humain pressé n'a pas besoin d'envoyer vingt messages en une minute. On limite donc le nombre d'envois par adresse IP et par période. Les envois excédentaires reçoivent un message poli de patience. C'est la meilleure protection contre une vague de robots, et elle ne dérange personne en pratique.

### Un filtre sur le contenu

Quelques règles simples font beaucoup : refuser les messages contenant plus de quelques liens, ceux qui ne comportent aucun mot en français quand votre site est en français, ceux qui reprennent une liste de mots typiques. Ce filtre se règle en regardant ce qui est réellement arrivé dans votre boîte pendant quelques semaines. À éviter : une liste de mots interdits trop large, qui rejetterait un vrai client mentionnant « devis » ou « offre ».

### Un captcha, en dernier recours

Un captcha (case à cocher, image à reconnaître, puzzle) arrête beaucoup de robots, mais coûte quelque chose au visiteur : du temps, de la frustration, parfois une barrière pour les personnes qui utilisent un lecteur d'écran ou ont une vue réduite. Il peut aussi faire appel à un service tiers qui collecte des informations sur le navigateur du visiteur. Dans ce cas, renseignez-vous sur ce que le service collecte et sur ce que cela implique pour votre politique de confidentialité et pour votre bandeau de consentement : la CNIL publie des recommandations à ce sujet sur cnil.fr.

La bonne règle : commencez par le honeypot, la validation serveur, le temps minimal et la limite d'envois. Si le spam persiste, ajoutez un captcha. Les solutions de captcha « invisibles » existent, mais vérifiez qu'elles ne posent pas de problème d'accessibilité. Pour le cadre général de l'accessibilité d'un site, voir [l'article sur le RGAA pour une TPE](/blog/accessibilite-site-web-guide).

## Comment bloquer le spam des formulaires WordPress ?

Sur WordPress, les formulaires sont presque toujours gérés par une extension. Trois pistes, dans l'ordre :

1. **Activer les options antispam de l'extension**. La plupart proposent un honeypot et une limite de débit. C'est souvent désactivé par défaut.
2. **Ajouter une extension antispam** qui analyse les messages. Elle filtre bien, mais elle fait appel à un service extérieur et ajoute un composant à surveiller et mettre à jour.
3. **Mettre à jour** WordPress et ses extensions. Un formulaire obsolète peut présenter une faille exploitée par des robots pour envoyer du courrier à votre insu.

Le risque principal d'un site WordPress est le nombre d'extensions empilées : chaque extension de formulaire, de captcha et d'antispam ajoute du code à entretenir. Voilà pourquoi [la maintenance régulière](/blog/maintenance-site-web-guide) fait partie de la sécurité. Si votre site est hébergé sur une offre mutualisée, la configuration du serveur joue aussi, notamment pour l'envoi d'e-mails : voir [le choix d'un hébergeur](/blog/hebergement-site-internet-choisir-un-hebergeur).

## Mon formulaire de contact envoie dans les spams : que vérifier ?

C'est l'autre moitié du problème, et elle est souvent plus coûteuse que le spam reçu : un vrai client écrit, le message n'arrive pas, vous ne le saurez jamais. Les causes les plus fréquentes :

**L'expéditeur est votre propre adresse, mais le serveur n'est pas autorisé à l'utiliser.** Beaucoup de formulaires envoient le message « depuis » l'adresse du visiteur, ce qui ressemble à une usurpation. Les messageries le détectent et classent le message en indésirable. La bonne pratique : envoyer depuis une adresse de **votre** domaine, avec le champ « répondre à » rempli avec l'adresse du visiteur.

**Les enregistrements d'authentification du domaine manquent.** Trois mécanismes (SPF, DKIM, DMARC) permettent de déclarer quels serveurs ont le droit d'envoyer du courrier au nom de votre domaine. Sans eux, ou avec une configuration incomplète, les messages sont suspects. Ces réglages se font dans la zone DNS du domaine, chez le registraire ou l'hébergeur. Les fournisseurs d'envoi d'e-mail sérieux fournissent les valeurs exactes à saisir.

**L'envoi passe par la fonction d'e-mail du serveur d'hébergement.** Elle est souvent partagée avec d'autres sites, dont certains sont mal tenus, ce qui nuit à la réputation de l'adresse d'envoi. Un service d'envoi dédié aux e-mails transactionnels est plus fiable. Sur les sites que nous fabriquons, l'envoi passe par un service spécialisé (Resend) plutôt que par le serveur du site.

**Le message lui-même ressemble à du spam.** Objet tout en majuscules, liens nombreux, mise en forme criarde.

**Vous ne regardez pas les bons dossiers.** Avant de modifier quoi que ce soit, cherchez dans les indésirables, dans les messages en quarantaine de votre fournisseur et dans les règles de tri. Faites ensuite un test avec une adresse d'un autre fournisseur.

Un bon formulaire fait aussi **deux choses de plus** : il affiche une confirmation claire après l'envoi, et il conserve un exemplaire du message côté serveur ou par un second e-mail. Ainsi, un message ne disparaît jamais sans trace.

## Comment ajouter un formulaire de contact sur son site ?

Selon la façon dont le site est construit, trois chemins existent.

- **Constructeur de site** (Wix, Squarespace, Jimdo et équivalents) : un bloc « formulaire » à glisser dans la page. Rapide, mais la protection antispam est celle de la plateforme et vous ne la réglez pas.
- **WordPress** : une extension de formulaire, à configurer avec les barrières décrites plus haut.
- **Site sur mesure** : le formulaire est écrit avec le site, avec une route côté serveur qui valide, filtre et envoie. C'est l'approche qui permet le plus de contrôle (champs adaptés à votre métier, devis pré-rempli, envoi vers un agenda) et aussi celle qui demande d'être soigneusement testée. [Le service de création de site](/services/creation-de-site-internet) en décrit le principe.

Dans tous les cas, limitez les champs à ce qui est utile : nom, moyen de vous joindre, message, éventuellement un champ lié à votre métier (type de travaux, commune). Chaque champ en plus réduit le nombre de messages envoyés. La CNIL demande par ailleurs de ne collecter que les données nécessaires et d'informer la personne sur l'usage qui en est fait : une courte mention sous le bouton d'envoi renvoyant vers la politique de confidentialité suffit pour un formulaire simple. Consultez cnil.fr pour le détail.

## Chatbot ou formulaire de contact : lequel est le plus efficace ?

Pour un artisan ou un commerçant, **le formulaire reste la base**. Il est simple, accessible, vous laisse une trace écrite et ne dépend de personne. Le chatbot est un complément, utile dans certains cas, et inutile ou contre-productif dans d'autres.

### Quand un chatbot aide vraiment

- Vous recevez toujours les mêmes questions (horaires, zones de livraison, modes de paiement, délais de rendez-vous) et vous voulez y répondre sans décrocher.
- Vous voulez guider le visiteur vers le bon service ou le bon formulaire (« Je veux un devis », « J'ai une urgence »).
- Vous avez un volume suffisant de demandes pour que le tri vous fasse gagner du temps.

### Quand il vaut mieux s'en passer

- Vous recevez peu de messages. Une page « questions fréquentes » bien rédigée fait le même travail, sans composant en plus.
- Le visiteur cherche une réponse précise et se retrouve dans une conversation qui tourne en rond. C'est le défaut le plus courant des assistants mal paramétrés.
- Vous n'avez pas le temps de relire les conversations et de corriger les réponses.

### WhatsApp Business ou chatbot sur site ?

WhatsApp Business convient si vos clients sont déjà à l'aise avec cette messagerie et si vous répondez vite. Il garde la conversation sur le téléphone du client, avec photos faciles à envoyer (utile pour un plombier ou un carreleur qui demande une photo du problème). Son défaut : la conversation est sur une application tierce, avec des horaires de réponse implicites. Le chatbot sur site garde le visiteur sur votre page et peut alimenter un formulaire ou un agenda, mais il ne remplace pas une vraie réponse humaine.

La combinaison la plus courante pour une petite entreprise : **un formulaire clair, un numéro de téléphone cliquable, et éventuellement un lien WhatsApp**, plutôt qu'un chatbot.

## Un chatbot pour un site d'artisan ou de commerçant : de quoi parle-t-on ?

Le mot recouvre trois réalités très différentes.

1. **L'assistant à règles** : il pose des questions à choix (« Quel est votre besoin ? »), oriente, et affiche une réponse écrite à l'avance. Il ne devine rien, il ne se trompe pas, il se met à jour quand vous modifiez les réponses.
2. **L'assistant qui prend des rendez-vous** : il propose des créneaux issus de votre agenda et enregistre la demande. C'est plutôt un formulaire de réservation présenté en conversation. Pour le choix entre cette solution et une plateforme, voir [l'article sur la prise de rendez-vous et la réservation](/blog/logiciel-de-prise-de-rendez-vous-et-reservation).
3. **L'assistant à texte libre**, qui génère des réponses à partir de vos documents grâce à de l'intelligence artificielle. Il paraît plus souple, mais il peut répondre faux avec aplomb, ce qui est un risque pour un métier où un délai, une garantie ou un prix mal indiqués engagent. Il demande aussi un suivi et peut entraîner un coût d'usage continu.

Pour la plupart des artisans et commerçants, le premier type suffit. Il peut s'intégrer à un site fabriqué sur mesure, avec les réponses que vous fournissez. La page [IA et automatisation](/services/ia-et-automatisation) décrit comment nous abordons ces outils.

## Combien coûte un chatbot, et peut-on en créer un gratuitement ?

On ne peut pas donner de chiffre fiable sans connaître votre besoin, mais on peut dire ce qui fait varier le coût :

- le **type d'assistant** (règles, rendez-vous, texte libre) ;
- le **nombre de questions et de parcours** à écrire et à tester ;
- les **liaisons** avec votre agenda, votre boîte e-mail ou votre outil de gestion ;
- le **suivi** : relire les conversations, corriger, mettre à jour ;
- l'éventuel **coût d'usage** si un service tiers facture à la conversation.

Des solutions gratuites existent, souvent limitées en nombre de conversations ou en personnalisation, avec une marque affichée ou des données traitées chez un tiers. Pour un petit commerce, elles peuvent servir de test, à condition de relire leurs conditions et de ne pas y faire transiter d'informations sensibles. Un assistant sur mesure se chiffre au devis ; un outil de ce type s'inscrit dans l'offre « outil sur mesure », à partir de {{prix:outil}} € selon le périmètre. Un simple formulaire bien protégé, lui, fait partie du site.

## Que mettre en place, concrètement ?

Pour un site de TPE, voici l'ordre de travail que nous suivons :

1. Un formulaire court, avec confirmation visible et message d'erreur lisible.
2. Honeypot, validation serveur, temps minimal, limite d'envois.
3. Envoi par un service d'e-mail dédié, depuis une adresse du domaine, avec SPF, DKIM et DMARC.
4. Un exemplaire du message conservé, pour ne rien perdre.
5. Un test mensuel : vous envoyez vous-même un message et vérifiez qu'il arrive.
6. Un captcha uniquement si le spam persiste malgré tout.
7. Un assistant à règles seulement si les mêmes questions reviennent chaque semaine.

Pour qu'un tel dispositif reste fiable dans la durée, il faut l'entretenir, ce qui fait partie du contrat de [maintenance](/services/maintenance). Vous souhaitez savoir si votre formulaire actuel perd des messages ? [Contactez-nous](/contact) : un test réel prend quelques minutes.

## Questions fréquentes

**Un formulaire de contact est-il obligatoire sur un site professionnel ?**
Non. La loi impose des mentions légales identifiant l'éditeur, avec une adresse e-mail ou un moyen de contact, mais pas un formulaire. Un numéro de téléphone cliquable et une adresse e-mail peuvent suffire ; le formulaire facilite surtout la prise de contact en dehors des heures d'ouverture.

**Faut-il demander un consentement dans un formulaire de contact ?**
Il faut informer la personne de l'usage de ses données et de ses droits. Pour répondre à sa demande, la base légale est l'exécution d'une mesure précontractuelle ou l'intérêt légitime, pas forcément une case à cocher. Vérifiez le détail sur cnil.fr, surtout si vous réutilisez l'adresse pour de la prospection.

**Combien de temps garder les messages reçus par le formulaire ?**
Pas indéfiniment. La durée doit être proportionnée à l'usage, et la CNIL invite à fixer une durée de conservation raisonnable. Notez-la dans votre politique de confidentialité et supprimez les messages sans suite au-delà.

**Comment savoir si mon formulaire perd des messages ?**
Envoyez-vous un test depuis un autre appareil et une autre adresse, cherchez dans les indésirables, puis contrôlez que la copie conservée par le site contient bien le message. Refaites ce test après chaque changement d'hébergeur ou de messagerie.

**Un captcha fait-il perdre des clients ?**
Il peut décourager certains visiteurs, en particulier sur mobile ou avec une aide technique. C'est pourquoi on le réserve aux cas où les autres barrières ne suffisent pas.
