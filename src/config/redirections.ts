/**
 * REDIRECTIONS 301 — générées par scripts/redirections.mjs (ne pas éditer à la main).
 * 71 reprises de l'ancien site + 61 pour les pages retirées en V5.
 */
import type { Redirect } from 'next/dist/lib/load-custom-routes'

export const REDIRECTIONS: Redirect[] = [
  {
    "source": "/offre-rentree",
    "destination": "/tarifs",
    "permanent": true
  },
  {
    "source": "/:path*",
    "has": [
      {
        "type": "host",
        "value": "www.stackup-agency.fr"
      }
    ],
    "destination": "https://stackup-agency.fr/:path*",
    "permanent": true
  },
  {
    "source": "/en",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/blog/pourquoi-votre-restaurant-a-besoin-dun-site-web-en-2026",
    "destination": "/blog/pourquoi-votre-restaurant-perd-des-clients-sans-site-web",
    "permanent": true
  },
  {
    "source": "/blog/avis-clients-google-strategie",
    "destination": "/blog/avis-google-strategie-complete",
    "permanent": true
  },
  {
    "source": "/blog/hebergement-web-comment-choisir",
    "destination": "/blog/hebergement-web-choisir",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-google-maps-premier",
    "destination": "/blog/seo-local-google-maps-2026",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-artisan",
    "destination": "/blog/seo-local-artisan-batiment-2026",
    "permanent": true
  },
  {
    "source": "/blog/programme-fidelite-restaurant-guide",
    "destination": "/blog/fidelisation-clients-restaurant",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-amboise",
    "destination": "/agence-web/amboise",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-anet",
    "destination": "/agence-web/anet",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-angers",
    "destination": "/agence-web/angers",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-blois",
    "destination": "/agence-web/blois",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-caen",
    "destination": "/agence-web/caen",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-chateaudun",
    "destination": "/agence-web/chateaudun",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-chinon",
    "destination": "/agence-web/chinon",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-evreux",
    "destination": "/agence-web/evreux",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-le-mans",
    "destination": "/agence-web/le-mans",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-nantes",
    "destination": "/agence-web/nantes",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-nogent-le-rotrou",
    "destination": "/agence-web/nogent-le-rotrou",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-rambouillet",
    "destination": "/agence-web/rambouillet",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-rouen",
    "destination": "/agence-web/rouen",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-saumur",
    "destination": "/agence-web/saumur",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-vendome",
    "destination": "/agence-web/vendome",
    "permanent": true
  },
  {
    "source": "/blog/agence-web-vernouillet",
    "destination": "/agence-web/vernouillet",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-chartres",
    "destination": "/agence-web/chartres",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-dreux",
    "destination": "/agence-web/dreux",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-orleans",
    "destination": "/agence-web/orleans",
    "permanent": true
  },
  {
    "source": "/blog/seo-local-tours",
    "destination": "/agence-web/tours",
    "permanent": true
  },
  {
    "source": "/blog/site-web-auto-ecole-reservation",
    "destination": "/creation-site-internet/auto-ecole",
    "permanent": true
  },
  {
    "source": "/blog/site-web-avocat-expert-comptable",
    "destination": "/creation-site-internet/avocat",
    "permanent": true
  },
  {
    "source": "/blog/site-web-bijouterie-horlogerie",
    "destination": "/creation-site-internet/bijouterie-horlogerie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-boulangerie-patisserie",
    "destination": "/creation-site-internet/boulangerie-patisserie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-brasserie-bar",
    "destination": "/creation-site-internet/brasserie-bar",
    "permanent": true
  },
  {
    "source": "/blog/site-web-cabinet-medical-kine",
    "destination": "/creation-site-internet/cabinet-medical",
    "permanent": true
  },
  {
    "source": "/blog/site-web-cafe-salon-the",
    "destination": "/creation-site-internet/cafe-salon-the",
    "permanent": true
  },
  {
    "source": "/blog/site-web-carreleur-sol",
    "destination": "/creation-site-internet/carreleur-sol",
    "permanent": true
  },
  {
    "source": "/blog/site-web-cave-vins-spiritueux",
    "destination": "/creation-site-internet/cave-vins-spiritueux",
    "permanent": true
  },
  {
    "source": "/blog/site-web-chauffagiste-climatisation",
    "destination": "/creation-site-internet/chauffagiste-climatisation",
    "permanent": true
  },
  {
    "source": "/blog/site-web-cosmetiques-naturels",
    "destination": "/creation-site-internet/cosmetiques-naturels",
    "permanent": true
  },
  {
    "source": "/blog/site-web-couvreur-charpentier",
    "destination": "/creation-site-internet/couvreur-charpentier",
    "permanent": true
  },
  {
    "source": "/blog/site-web-electricien",
    "destination": "/creation-site-internet/electricien",
    "permanent": true
  },
  {
    "source": "/blog/site-web-epicerie-fine",
    "destination": "/creation-site-internet/epicerie-fine",
    "permanent": true
  },
  {
    "source": "/blog/site-web-fleuriste-vente-en-ligne",
    "destination": "/creation-site-internet/fleuriste",
    "permanent": true
  },
  {
    "source": "/blog/site-web-hotel-chambres-hotes",
    "destination": "/creation-site-internet/hotel-chambres-hotes",
    "permanent": true
  },
  {
    "source": "/blog/site-web-informatique-telephonie",
    "destination": "/creation-site-internet/magasin-informatique",
    "permanent": true
  },
  {
    "source": "/blog/site-web-jardinerie-animalerie",
    "destination": "/creation-site-internet/jardinerie-animalerie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-jouets-loisirs-creatifs",
    "destination": "/creation-site-internet/magasin-jouets",
    "permanent": true
  },
  {
    "source": "/blog/site-web-kebab-fast-food",
    "destination": "/creation-site-internet/kebab-fast-food",
    "permanent": true
  },
  {
    "source": "/blog/site-web-librairie-independante",
    "destination": "/creation-site-internet/librairie-papeterie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-librairie-papeterie",
    "destination": "/creation-site-internet/librairie-papeterie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-macon-renovateur",
    "destination": "/creation-site-internet/macon-renovateur",
    "permanent": true
  },
  {
    "source": "/blog/site-web-magasin-sport-loisirs",
    "destination": "/creation-site-internet/magasin-sport",
    "permanent": true
  },
  {
    "source": "/blog/site-web-maison-decoration",
    "destination": "/creation-site-internet/boutique-decoration",
    "permanent": true
  },
  {
    "source": "/blog/site-web-menuisier-ebeniste",
    "destination": "/creation-site-internet/menuisier-ebeniste",
    "permanent": true
  },
  {
    "source": "/blog/site-web-optique-lunetterie",
    "destination": "/creation-site-internet/opticien",
    "permanent": true
  },
  {
    "source": "/blog/site-web-paysagiste-jardinier",
    "destination": "/creation-site-internet/paysagiste-jardinier",
    "permanent": true
  },
  {
    "source": "/blog/site-web-peintre-decorateur",
    "destination": "/creation-site-internet/peintre-decorateur",
    "permanent": true
  },
  {
    "source": "/blog/site-web-pharmacie-parapharmacie",
    "destination": "/creation-site-internet/pharmacie-parapharmacie",
    "permanent": true
  },
  {
    "source": "/blog/site-web-pizzeria",
    "destination": "/creation-site-internet/pizzeria",
    "permanent": true
  },
  {
    "source": "/blog/site-web-plombier",
    "destination": "/creation-site-internet/plombier",
    "permanent": true
  },
  {
    "source": "/blog/site-web-restaurant-gastronomique",
    "destination": "/creation-site-internet/restaurant-gastronomique",
    "permanent": true
  },
  {
    "source": "/blog/site-web-salon-coiffure-esthetique",
    "destination": "/creation-site-internet/salon-coiffure",
    "permanent": true
  },
  {
    "source": "/blog/site-web-serrurier-depannage",
    "destination": "/creation-site-internet/serrurier-depannage",
    "permanent": true
  },
  {
    "source": "/blog/site-web-sport-outdoor",
    "destination": "/creation-site-internet/magasin-sport",
    "permanent": true
  },
  {
    "source": "/blog/site-web-tabac-presse",
    "destination": "/creation-site-internet/tabac-presse",
    "permanent": true
  },
  {
    "source": "/blog/site-web-traiteur-evenementiel",
    "destination": "/creation-site-internet/traiteur-evenementiel",
    "permanent": true
  },
  {
    "source": "/blog/site-web-vetements-enfants",
    "destination": "/creation-site-internet/vetements-enfants",
    "permanent": true
  },
  {
    "source": "/ressources/modele-devis",
    "destination": "/ressources/documents",
    "permanent": true
  },
  {
    "source": "/ressources/modele-facture",
    "destination": "/ressources/documents",
    "permanent": true
  },
  {
    "source": "/motion-lab",
    "destination": "/",
    "permanent": true
  },
  {
    "source": "/laboratoire",
    "destination": "/solutions",
    "permanent": true
  },
  {
    "source": "/laboratoire/:path*",
    "destination": "/solutions",
    "permanent": true
  },
  {
    "source": "/configurateur",
    "destination": "/tarifs#estimer",
    "permanent": true
  },
  {
    "source": "/devis",
    "destination": "/tarifs#estimer",
    "permanent": true
  },
  {
    "source": "/outils/studio-de-style",
    "destination": "/tarifs#estimer",
    "permanent": true
  },
  {
    "source": "/blog/site-vitrine-449-inclus",
    "destination": "/blog/site-vitrine-inclus",
    "permanent": true
  },
  {
    "source": "/blog/idee-mise-en-ligne-10-jours-methode",
    "destination": "/blog",
    "permanent": true
  },
  {
    "source": "/tarifs/:plan",
    "destination": "/tarifs",
    "permanent": true
  },
  {
    "source": "/services/marketing-digital",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/services/maintenance-support",
    "destination": "/tarifs",
    "permanent": true
  },
  {
    "source": "/services/redaction-blog-seo",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/realisations/demo-videaste",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/chateau-lumieres",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/maison-elise",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/au-pain-dore",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/prestige-immo",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/lolivier-dashboard",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/realisations/chateau-fleury",
    "destination": "/realisations",
    "permanent": true
  },
  {
    "source": "/solutions/commande-en-ligne-livraison",
    "destination": "/solutions/click-and-collect",
    "permanent": true
  },
  {
    "source": "/solutions/galerie-client-photographe",
    "destination": "/solutions",
    "permanent": true
  },
  {
    "source": "/services/site-association",
    "destination": "/services",
    "permanent": true
  },
  {
    "source": "/agence-web/orleans",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/chartres",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/dreux",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/bourges",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/vierzon",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/chateaudun",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/nantes",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/laval",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/caen",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/rouen",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/evreux",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/alencon",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/lisieux",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/rambouillet",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/anet",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/vernouillet",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/nogent-le-rotrou",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/chateauroux",
    "destination": "/agence-web/departement/indre",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/loiret",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/eure-et-loir",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/cher",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/deux-sevres",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/yonne",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/nievre",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/allier",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/creuse",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/agence-web/departement/orne",
    "destination": "/zones-intervention",
    "permanent": true
  },
  {
    "source": "/blog/categorie/creation-sites",
    "destination": "/blog/categorie/creation",
    "permanent": true
  },
  {
    "source": "/blog/categorie/design",
    "destination": "/blog/categorie/creation",
    "permanent": true
  },
  {
    "source": "/blog/categorie/technique",
    "destination": "/blog/categorie/creation",
    "permanent": true
  },
  {
    "source": "/blog/categorie/performance",
    "destination": "/blog/categorie/creation",
    "permanent": true
  },
  {
    "source": "/blog/categorie/ecommerce",
    "destination": "/blog/categorie/commerce",
    "permanent": true
  },
  {
    "source": "/blog/categorie/applications-metier",
    "destination": "/blog/categorie/outils",
    "permanent": true
  },
  {
    "source": "/blog/categorie/digital",
    "destination": "/blog/categorie/outils",
    "permanent": true
  },
  {
    "source": "/blog/categorie/ia",
    "destination": "/blog/categorie/outils",
    "permanent": true
  },
  {
    "source": "/blog/categorie/professions-liberales",
    "destination": "/blog/categorie/artisans",
    "permanent": true
  },
  {
    "source": "/blog/categorie/marketing",
    "destination": "/blog/categorie/strategie",
    "permanent": true
  },
  {
    "source": "/blog/categorie/entrepreneuriat",
    "destination": "/blog/categorie/strategie",
    "permanent": true
  },
  {
    "source": "/blog/categorie/redaction",
    "destination": "/blog/categorie/strategie",
    "permanent": true
  },
  {
    "source": "/blog/categorie/juridique",
    "destination": "/blog/categorie/strategie",
    "permanent": true
  }
]
