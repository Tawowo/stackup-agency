/**
 * LES PROGRAMMES DE « DU CODE AU PIXEL » — pour chaque service, de vraies
 * lignes de code (le genre de composant qu'on écrit pour ce site) et, pour
 * chaque ligne, le groupe de plaques qu'elle produit dans la forme compilée
 * (−1 : ligne de structure, sans plaque propre).
 */
import type { LayoutName } from '@/webgl/layouts'

export interface Ligne {
  code: string
  groupe: number
}

export interface Programme {
  slug: string
  fichier: string
  forme: LayoutName
  titre: string
  ligne: string
  offre: 'une-page' | 'multi-pages' | 'boutique' | 'outil'
  lignes: Ligne[]
}

export const PROGRAMMES: Programme[] = [
  {
    slug: 'site-vitrine',
    fichier: 'app/page.tsx',
    forme: 'page',
    titre: 'Une page vitrine',
    ligne: 'Votre métier, vos prestations, un bouton pour vous joindre.',
    offre: 'une-page',
    lignes: [
      { code: "import { EnTete, Hero, Prestations, Contact } from '@/blocs'", groupe: -1 },
      { code: '', groupe: -1 },
      { code: 'export default function Accueil() {', groupe: -1 },
      { code: '  return (', groupe: -1 },
      { code: '    <Page marque={menuiserieDubois}>', groupe: -1 },
      { code: "      <EnTete menu={['Prestations', 'Réalisations', 'Contact']} />", groupe: 0 },
      { code: '      <Hero titre="Menuiserie sur mesure à Tours" photo={atelier} />', groupe: 1 },
      { code: '      <Prestations liste={prestations} colonnes={2} />', groupe: 2 },
      { code: '      <Contact action="Demander un devis" carte="Tours" />', groupe: 3 },
      { code: '    </Page>', groupe: -1 },
      { code: '  )', groupe: -1 },
      { code: '}', groupe: -1 },
    ],
  },
  {
    slug: 'site-multi-pages',
    fichier: 'app/(site)/layout.tsx',
    forme: 'multi',
    titre: 'Un site de plusieurs pages',
    ligne: 'Une page par prestation, un blog, une structure pensée pour Google.',
    offre: 'multi-pages',
    lignes: [
      { code: 'export const pages = [', groupe: -1 },
      { code: "  { chemin: '/', gabarit: Accueil },", groupe: 1 },
      { code: "  { chemin: '/prestations/[slug]', gabarit: Prestation },", groupe: 2 },
      { code: "  { chemin: '/blog', gabarit: Journal },", groupe: 2 },
      { code: ']', groupe: -1 },
      { code: '', groupe: -1 },
      { code: 'export default function Site({ children }) {', groupe: -1 },
      { code: '  return (', groupe: -1 },
      { code: '    <>', groupe: -1 },
      { code: '      <Navigation pages={pages} />', groupe: 0 },
      { code: '      {children}', groupe: 1 },
      { code: '      <Contact toujoursVisible />', groupe: 3 },
      { code: '    </>', groupe: -1 },
      { code: '  )', groupe: -1 },
      { code: '}', groupe: -1 },
    ],
  },
  {
    slug: 'site-ecommerce',
    fichier: 'app/boutique/page.tsx',
    forme: 'boutique',
    titre: 'Une boutique en ligne',
    ligne: 'Un catalogue, un panier, le paiement — sans commission sur vos ventes.',
    offre: 'boutique',
    lignes: [
      { code: 'export default async function Boutique() {', groupe: -1 },
      { code: "  const produits = await catalogue.lister({ enStock: true })", groupe: 1 },
      { code: '  return (', groupe: -1 },
      { code: '    <Rayon>', groupe: -1 },
      { code: '      <EnTete recherche filtres={categories} />', groupe: 0 },
      { code: '      {produits.map((p) => (', groupe: 1 },
      { code: '        <Fiche key={p.id} photo={p.photo} nom={p.nom}', groupe: 1 },
      { code: '               prix={p.prix} stock={p.stock} />', groupe: 2 },
      { code: '      ))}', groupe: -1 },
      { code: '      <Panier paiement={stripe} retrait="click-and-collect" />', groupe: 3 },
      { code: '    </Rayon>', groupe: -1 },
      { code: '  )', groupe: -1 },
      { code: '}', groupe: -1 },
    ],
  },
  {
    slug: 'systeme-gestion',
    fichier: 'app/atelier/tableau-de-bord.tsx',
    forme: 'logiciel',
    titre: 'Un outil de gestion',
    ligne: 'Devis, factures, planning, stocks : les modules dont votre métier a besoin.',
    offre: 'outil',
    lignes: [
      { code: 'const modules = [', groupe: -1 },
      { code: '  devis(),', groupe: 1 },
      { code: '  factures({ relances: true }),', groupe: 2 },
      { code: '  planning({ equipes: 3 }),', groupe: 3 },
      { code: '  clients(),', groupe: 4 },
      { code: '  stocks({ alerte: 5 }),', groupe: 5 },
      { code: '  rendezVous({ rappels: "sms" }),', groupe: 6 },
      { code: '  caisse(),', groupe: 7 },
      { code: '  statistiques(),', groupe: 8 },
      { code: ']', groupe: -1 },
      { code: '', groupe: -1 },
      { code: 'export default function Atelier() {', groupe: -1 },
      { code: '  return <TableauDeBord modules={modules} donnees={vosDonnees} />', groupe: 9 },
      { code: '}', groupe: -1 },
    ],
  },
]
