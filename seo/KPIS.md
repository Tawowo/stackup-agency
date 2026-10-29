# KPIS — ce qu’on mesure, où, quand

Aucune valeur n’est écrite ici tant qu’elle n’est pas lue dans l’outil source. Remplir la colonne « Dernier relevé » à la main (date + valeur), une fois par mois, 30 minutes.

## Visibilité (Search Console, onglet Performances)
| Indicateur | Source | Fréquence | Dernier relevé |
|---|---|---|---|
| Clics et impressions, 28 jours | Search Console, type « Web » | mensuelle | |
| Position moyenne des 100 requêtes suivies | `docs/seo/suivi.csv` (filtre requête par requête) | mensuelle | |
| Requêtes « agence web Tours », « création site internet Tours », « agence web Saumur », « création site internet Chinon » | Search Console | mensuelle | |
| Pages indexées / non indexées (+ motifs) | Search Console, Indexation des pages | mensuelle | |
| Couverture du sitemap (URL envoyées / indexées) | Search Console, Sitemaps | mensuelle | |
| Requêtes de marque (« Stackup Agency », « Mathéo Reboul ») | Search Console | mensuelle | |

## Local (Google Business Profile)
| Indicateur | Source | Fréquence | Dernier relevé |
|---|---|---|---|
| Appels, itinéraires, clics vers le site | Performances de la fiche | mensuelle | |
| Recherches directes / de découverte | idem | mensuelle | |
| Nombre d’avis, note, taux de réponse | fiche | mensuelle | |
| Publications faites (objectif : 1 par semaine) | fiche | mensuelle | |

## Conversions (mesure interne sans cookie)
Événements consignés par `/api/mesure` : `vue`, `estimation_lancee`, `contact_envoye`, `clic_telephone`, `clic_email`, `clic_demo`, `clic_appel`, `telechargement`, chacun avec la **page d’entrée de la session** et l’origine réduite au domaine.
| Indicateur | Source | Fréquence |
|---|---|---|
| Demandes envoyées (`contact_envoye`) par page d’entrée | `npm run seo:conversions journal.log` | mensuelle |
| Appels et e-mails cliqués par page d’entrée | idem | mensuelle |
| Estimations lancées / demandes de démo / appels gratuits | idem | mensuelle |
| Téléchargements (cahier des charges, documents) | idem | mensuelle |
| Taux : demandes ÷ vues, par famille de pages (métiers, villes, blog, outils) | idem + `seo/conversions.csv` | trimestrielle |

Les journaux se lisent dans l’hébergeur (filtre « mesure »). Respect de « Ne pas me suivre » : ces chiffres sont des minima.

## Qualité technique (CI et contrôle manuel)
| Indicateur | Cible | Source |
|---|---|---|
| Manquements `seo:check` | 0 | CI |
| Pages orphelines, pages à ≤ 2 liens entrants | 0 / décroissant | `npm run seo:links` |
| Core Web Vitals (LCP, INP, CLS) en données terrain | « Bon » | Search Console, Signaux Web |
| Lighthouse mobile (performance, SEO, accessibilité) | ≥ 90 / 100 / 95 | `lighthouserc.json` |
| Poids JavaScript d’une page | à réduire (budget demandé : 150 ko compressés ; non atteint aujourd’hui, voir `docs/JOURNAL.md`) | `scripts/poids.mjs` |

## Visibilité dans les assistants d’IA (trimestriel, à la main)
Poser dix questions types (« agence web Tours », « combien coûte un site pour un artisan », « site internet plombier Indre-et-Loire »…) dans plusieurs assistants ; noter dans `docs/seo/suivi.csv` si Stackup est cité, avec quelle page. Ne rien en conclure sur un seul relevé.

## Contenu
| Indicateur | Source |
|---|---|
| Articles publiés / programmés | `seo/blog-triage.csv` |
| Articles « Améliorer » restants | `seo/blog-triage.csv` |
| Pages sans impression en 90 jours | Search Console → à enrichir ou fusionner, jamais à multiplier |

## Objectifs réalistes
Aucun objectif de position n’est promis. Les seuils utiles : zéro manquement technique, une fiche Google complète avec avis réels, un contenu par intention et pas davantage, des conversions lues par page d’entrée. Les objectifs chiffrés se fixent après trois mois de relevés réels.
