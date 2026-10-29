---
term: "bandeau cookies"
title: "À quoi sert un bandeau cookies ?"
seoTitle: "Bandeau cookies : définition, rôle et règles à vérifier"
excerpt: "Bandeau cookies : la fenêtre qui demande l'accord du visiteur avant les traceurs. Voyez quand il est utile, ce qu'il doit proposer et les pièges à éviter."
definition: "Le bandeau cookies est le message qui demande au visiteur d'accepter ou de refuser les traceurs non indispensables. Il n'a de valeur que s'il bloque réellement ces traceurs tant que le visiteur n'a pas répondu."
date: "2026-10-29"
updated: "2026-10-29"
readTime: 3
category: "legal"
keywords: ["bandeau cookies", "bandeau cookies obligatoire", "définition bandeau cookies", "consentement cookies", "bandeau cookies cnil"]
related: ["cookies", "cnil", "rgpd", "politique-de-confidentialite", "google-analytics"]
sources: ["https://www.cnil.fr"]
---

**Le bandeau cookies est la fenêtre ou la bannière qui demande au visiteur son accord avant que le site dépose des traceurs non indispensables. Il n'est utile que si ces traceurs sont réellement bloqués jusqu'à la réponse : un bandeau décoratif ne protège ni le visiteur, ni vous.**

## À quoi ça sert ?

Il sert à recueillir un [consentement](/lexique/cookies) valable. Selon les recommandations de la [CNIL](/lexique/cnil), ce consentement doit être :

- **préalable** : rien ne se déclenche avant la réponse ;
- **libre** : refuser ne doit pas être plus compliqué qu'accepter ;
- **éclairé** : le visiteur sait à quoi il consent, par finalité ;
- **spécifique** : on peut accepter certains usages et en refuser d'autres ;
- **modifiable** : le visiteur peut revenir sur son choix à tout moment.

Si votre site n'utilise **aucun** traceur soumis au consentement, aucun bandeau n'est nécessaire. C'est parfois la meilleure solution.

## Comment ça marche (en pratique)

Techniquement, le bandeau pilote le chargement des outils :

1. à l'arrivée, seuls les éléments indispensables se chargent ;
2. le visiteur choisit : accepter, refuser, personnaliser ;
3. selon la réponse, les outils concernés (mesure d'audience, vidéos tierces, pixels) sont chargés ou non ;
4. le choix est mémorisé, et un lien dans le pied de page permet de le changer.

Les détails exacts (apparence des boutons, durée de conservation du choix, cas d'exemption de la mesure d'audience) sont précisés par la CNIL et évoluent : à vérifier sur cnil.fr.

## Exemple concret

Exemple type : un kinésithérapeute a un site avec un agenda externe et une mesure d'audience. Au départ, il a installé un bandeau avec un seul bouton « OK », alors que l'outil d'audience se charge dès l'arrivée. Il remplace le bandeau par un dispositif qui propose accepter, refuser et personnaliser, et qui retient réellement le chargement de l'outil. Il teste en navigation privée pour le vérifier.

## Les erreurs fréquentes

- Un bandeau qui informe mais ne bloque rien.
- Un bouton « Accepter » très visible et un refus caché dans un sous-menu.
- Des cases précochées.
- Un « mur de cookies » qui interdit l'accès au site en cas de refus, sauf cas à vérifier.
- Ne pas permettre de retirer son consentement ensuite.
- Installer un outil gratuit sans vérifier ce qu'il dépose.

## Pour aller plus loin

- [Bandeau cookies : obligations et solutions](/blog/bandeau-cookies-site-obligation)
- [Politique de confidentialité et RGPD sur un site](/blog/rgpd-site-internet-artisan-commercant)
- [Auditer votre site](/outils/audit-site)
- [Créer un site avec Stackup](/creation-site-internet)

## Questions fréquentes

**Mon site doit-il avoir un bandeau cookies ?**
Seulement s'il dépose des traceurs soumis au consentement. Un site sans traceurs de ce type peut s'en passer ; faites vérifier avec un outil d'audit.

**Le bandeau fourni par mon outil suffit-il ?**
Pas toujours. Il faut contrôler qu'il bloque bien les traceurs avant la réponse et qu'il propose un refus aussi simple que l'acceptation.

**Que se passe-t-il si le visiteur refuse ?**
Le site doit continuer à fonctionner pour l'essentiel, sans les traceurs refusés.

**Combien de temps le choix est-il conservé ?**
La CNIL formule des recommandations sur la durée. Elles peuvent évoluer : consultez cnil.fr.
