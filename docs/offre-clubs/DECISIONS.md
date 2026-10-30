# Offre clubs — décisions (une ligne par décision)

## Écarts avec les règles existantes (à valider)
- **CLAUDE.md, règle 8** (« prix calculés par le moteur depuis l’Excel », « aucune offre site association ») : l’offre clubs est une **plateforme par abonnement**, avec ses propres tarifs dans `src/data/offre-clubs/pricing.ts` (demande explicite du propriétaire). Une note d’exception a été ajoutée à la règle 8 ; elle ne touche ni les offres de l’agence ni le moteur `src/domain/devis/`.
- **Témoignage TCSG** : le prompt demandait un texte provisoire marqué « À COMPLÉTER ». Il n’est **pas affiché** (page destinée à des e-mails de prospection) : tant que `REFERENCE.temoignage` est `null`, la page montre la référence factuelle (club réel, fondateur vice-président, lien vers la réalisation). Le marqueur « À COMPLÉTER » est dans la config.
- **Captures de la démo** : la démo (vercel.app) est injoignable depuis l’environnement de travail. Aperçus = maquettes HTML/CSS illustratives, légendées « club fictif », jamais présentées comme des captures. Les liens directs vers un écran précis de la démo ne sont pas connus : `DEMO_ECRANS` est vide, tout renvoie vers `/`, `/bureau`, `/demo`.
- **Coût par licencié** : l’exemple du prompt (« ≈ 3,40 € pour 220 licenciés ») est une approximation ; le calcul donne 756 € ÷ 220 = **3,44 €**.
- **Délai de mise en place** : aucun délai n’est annoncé (règle 8) ; « délai précisé au devis ».

## Identité légale
- `src/config/company.ts` est la source unique ; `SITE.entreprise` en dérive (PDF, devis, mentions, CGV, JSON-LD, llms, pied de page). Libellé légal : « Mathéo REBOUL EI — Stackup Agency » (nom commercial au registre : Stackup-Agency).
- « Début d’activité » remplacé par « Immatriculation : RNE, 19 octobre 2026 » (seule date fournie). `foundingDate` du JSON-LD = cette date.
- **TVA** : « TVA non applicable, art. 293 B du CGI » conservée, commentaire `TODO à confirmer` dans `company.ts`.
- Médiateur de la consommation et assurance RC pro : toujours `[à compléter]` (non fournis).

## Prix et calcul
- Une seule source (`pricing.ts`, zod). Pack = somme −15 % (mise en place à la dizaine, abonnement à l’euro) : les 5 lignes du tableau du prompt sont reproduites exactement (test).
- Catégorie = licenciés de la **saison en cours** ; la moyenne des trois saisons ne sert qu’à signaler une baisse (< 90 %).
- Options : ordre du catalogue = ordre de traitement (un pré-requis précède son option) ; référencement local et régional s’excluent (le premier choisi l’emporte) ; une option indisponible est grisée dans l’interface et retirée avec avertissement par le calcul.
- Heures d’accompagnement supplémentaires et pages créées sont comprises dans la **mise en place** (donc payables en 3 fois).
- Paiement annuel : abonnement annuel = 12 × mensuel × 0,9, arrondi à l’euro, payé le premier mois.
- « Devis sur mesure » : déclenché par les cases « besoin particulier » ou par un premier rendez-vous en présentiel au-delà de 30 km (le reste de l’estimation reste affiché).
- Les prix sont écrits dans les textes par **jetons** `{{club:…}}` ; le vérificateur `scripts/clubs/verifier-contenus.mjs` refuse tout montant ou pourcentage en chiffres.

## Simulateur
- Une seule page à cinq étapes (tout visible, rien de masqué) plutôt qu’un assistant : plus simple pour un public de bénévoles, et accessible sans JavaScript pour le contenu. L’état est dans l’URL (`?l=220&f=s…`), lue côté serveur (la page est donc dynamique).
- E-mail : le prix est **recalculé côté serveur** (jamais lu du navigateur) ; Resend comme le reste du site ; sans clé, journalisé (202).

## Légal
- CGV plateforme : **propositions** à valider par un juriste (préavis de 2 mois, mise en demeure de 15 jours, révision des prix annoncée 2 mois avant, juridiction du siège) — paramètres dans `CGV_PLATEFORME`. Paragraphe d’information sur la reconduction rédigé ; **aucune automatisation** de reconduction ou de relance n’existe.
- Sous-traitants ultérieurs : Vercel (hébergement), Resend (e-mails), fournisseur de base de données et fournisseur d’IA **à désigner** ; localisations « à confirmer avant la signature » affichées en l’état dans l’annexe.
- Prospection : paragraphe dans la politique de confidentialité (intérêt légitime, 3 ans, opposition) ; `/desinscription` envoie un e-mail à l’agence et journalise ; **la liste de suppression est à tenir à la main**.

## Honnêteté (appliquée par script)
- « Import et export des fichiers ADOC » partout ; jamais « connecté », « partenaire FFT », logos FFT/ADOC/Ten’Up. Mention « ni affilié ni approuvé » en pied de chaque page de l’offre.
- Pas de SMS, pas d’accès physiques aux courts, pas de nom de concurrent, pas de statistique, pas de localisation des données, pas de durée chiffrée.

## SEO
- Voir `SEO.md`. Un sitemap dédié (`clubs`). Titres ≤ 60, une page par intention, pages locales sans contenu commun.
