/**
 * LES BLOCS — le contenu réel de chaque rôle de maquette. Un rôle = un bloc
 * d'interface reconnaissable (barre de navigation, photo, carte produit,
 * indicateur, planning…). Les maquettes (offres, calques, étapes) les placent.
 */
import type { CSSProperties } from 'react'
import { Objet, Picto, PhotoEscalier } from './illustrations'

export type Role =
  | 'vide'
  | 'nav'
  | 'hero'
  | 'photo'
  | 'carte-0'
  | 'carte-1'
  | 'carte-2'
  | 'menu'
  | 'fen-accueil'
  | 'fen-realisations'
  | 'fen-contact'
  | 'bout-entete'
  | 'produit-0'
  | 'produit-1'
  | 'produit-2'
  | 'produit-3'
  | 'produit-4'
  | 'produit-5'
  | 'panier'
  | 'dash-menu'
  | 'dash-haut'
  | 'kpi-0'
  | 'kpi-1'
  | 'kpi-2'
  | 'planning'
  | 'graphique'
  | 'liste'

export const PRODUITS = [
  { nom: 'Planche à découper', prix: 29, type: 'planche' as const, fond: '#f2e6d3' },
  { nom: 'Plateau rond', prix: 45, type: 'plateau' as const, fond: '#e9efe6' },
  { nom: 'Tabouret chêne', prix: 89, type: 'tabouret' as const, fond: '#f4e3d8' },
  { nom: 'Étagère murale', prix: 120, type: 'etagere' as const, fond: '#e8edf3' },
  { nom: 'Lampe de chevet', prix: 64, type: 'lampe' as const, fond: '#f6ecd0' },
  { nom: 'Bol tourné', prix: 24, type: 'bol' as const, fond: '#efe4f0' },
]

const CARTES = [
  { picto: 'armoire' as const, titre: 'Cuisines', ligne: 'Dessinées à la pièce' },
  { picto: 'escalier' as const, titre: 'Escaliers', ligne: 'Chêne, hêtre, frêne' },
  { picto: 'marteau' as const, titre: 'Rangements', ligne: 'Placards, dressings' },
]

const KPI = [
  { label: 'Chiffre du mois', val: '12 480 €', delta: '+8 % sur le mois dernier' },
  { label: 'Devis en attente', val: '5', delta: '2 à relancer' },
  { label: 'Rendez-vous demain', val: '3', delta: 'dont 1 sur chantier' },
]

export interface MetierBloc {
  /** « Plombier », « Pizzeria »… (nom affiché de l'entreprise fictive). */
  nom: string
  accroche: string
  etiquette: string
  cartes: string[]
  /** Pictogramme et teinte de la catégorie. */
  picto: 'couvert' | 'marteau' | 'sac' | 'etoile' | 'dossier' | 'calendrier' | 'cube'
  teinte: string
}

export interface ContexteBloc {
  /** Nombre d'articles dans le panier (boutique). */
  panier?: number
  /** Id unique par instance (ids SVG). */
  uid?: string
  /** Page de métier : remplace les textes de l'artisan fictif par ceux du métier. */
  metier?: MetierBloc
}

function Menu({ actif = 0 }: { actif?: number }) {
  const liens = ['Accueil', 'Savoir-faire', 'Réalisations', 'Blog', 'Contact']
  return (
    <div className="mq-nav">
      <span className="mq-logo">
        Aubert<i>.</i>
      </span>
      {liens.map((l, i) => (
        <span key={l} className="mq-lien" data-on={i === actif ? '1' : '0'}>
          {l}
        </span>
      ))}
    </div>
  )
}

function Fenetre({ chemin, children }: { chemin: string; children: React.ReactNode }) {
  return (
    <div className="mq-fenetre">
      <div className="mq-fenetre__haut">
        <i />
        <i />
        <i />
        <span>{chemin}</span>
      </div>
      <div className="mq-fenetre__page">{children}</div>
    </div>
  )
}

export function Contenu({ role, ctx = {} }: { role: Role; ctx?: ContexteBloc }) {
  const uid = ctx.uid ?? 'm'
  if (role === 'vide') return null
  const m = ctx.metier
  if (role === 'nav')
    return (
      <div className="mq-nav" style={m ? ({ '--mq-bois': m.teinte } as CSSProperties) : undefined}>
        <span className="mq-logo">
          {m ? m.nom : 'Aubert'}
          <i>.</i>
        </span>
        <span className="mq-lien">Savoir-faire</span>
        <span className="mq-lien">Réalisations</span>
        <span className="mq-lien">Contact</span>
        <span className="mq-btn">Devis</span>
      </div>
    )
  if (role === 'hero')
    return (
      <div className="mq-hero" style={m ? ({ '--mq-bois': m.teinte } as CSSProperties) : undefined}>
        <span className="mq-etiquette">{m ? m.etiquette : 'Menuiserie · Tours'}</span>
        {/* Texte décoratif de la maquette : rendu par CSS (data-t), ni titre ni texte indexable. */}
        <p className="mq-h1 mq-deco" data-t={m ? m.accroche : 'Cuisines, escaliers et rangements sur mesure'} style={m ? { fontSize: '3.7cqw' } : undefined} />
        <p className="mq-p">{m ? 'Votre site, pensé pour votre métier : clair, rapide, à votre image.' : 'Un atelier, un artisan, des meubles dessinés pour votre maison.'}</p>
        <span className="mq-btn" style={{ alignSelf: 'flex-start' }}>
          Demander un devis
        </span>
      </div>
    )
  if (role === 'photo' && m)
    return (
      <div className="mq-visuel" style={{ '--teinte': m.teinte } as CSSProperties}>
        <Picto nom={m.picto} />
      </div>
    )
  if (role === 'photo') return <PhotoEscalier id={`${uid}-ph`} />
  if (role.startsWith('carte-')) {
    const k = Number(role.slice(6))
    if (m) {
      const t = (m.cartes[k] ?? '').split(/[:—,(]/)[0]!.trim()
      return (
        <div className="mq-carte" style={{ '--mq-vert': m.teinte } as CSSProperties}>
          <Picto nom="coche" />
          <div>
            <b>{t}</b>
            <span>Inclus dans votre site</span>
          </div>
        </div>
      )
    }
    const c = CARTES[k]!
    return (
      <div className="mq-carte">
        <Picto nom={c.picto} />
        <div>
          <b>{c.titre}</b>
          <span>{c.ligne}</span>
        </div>
      </div>
    )
  }
  if (role === 'menu') return <Menu actif={0} />
  if (role === 'fen-accueil')
    return (
      <Fenetre chemin="/accueil">
        <div className="mq-mini-nav">
          <b>Aubert.</b>
          <span data-on="1">Accueil</span>
          <span>Réalisations</span>
          <span>Contact</span>
        </div>
        <div className="mq-mini-h">Cuisines, escaliers, rangements.</div>
        <div className="mq-mini-photo">
          <PhotoEscalier id={`${uid}-fa`} />
        </div>
        <span className="mq-mini-btn">Demander un devis</span>
      </Fenetre>
    )
  if (role === 'fen-realisations')
    return (
      <Fenetre chemin="/realisations">
        <div className="mq-mini-nav">
          <b>Aubert.</b>
          <span>Accueil</span>
          <span data-on="1">Réalisations</span>
          <span>Contact</span>
        </div>
        <div className="mq-mini-h">Nos réalisations</div>
        <div className="mq-grille-photos">
          {(['planche', 'tabouret', 'etagere', 'lampe', 'plateau', 'bol'] as const).map((t, i) => (
            <div key={t} style={{ background: PRODUITS[i]!.fond }}>
              <Objet type={t} />
            </div>
          ))}
        </div>
      </Fenetre>
    )
  if (role === 'fen-contact')
    return (
      <Fenetre chemin="/contact">
        <div className="mq-mini-nav">
          <b>Aubert.</b>
          <span>Accueil</span>
          <span>Réalisations</span>
          <span data-on="1">Contact</span>
        </div>
        <div className="mq-mini-h">Parlons de votre projet</div>
        <div className="mq-champ">Votre nom</div>
        <div className="mq-champ">Votre e-mail</div>
        <div className="mq-champ mq-champ--haut">Votre projet…</div>
        <span className="mq-mini-btn">Envoyer</span>
      </Fenetre>
    )
  if (role === 'bout-entete')
    return (
      <div className="mq-boutique-entete">
        <span className="mq-logo">
          Atelier du bois<i>.</i>
        </span>
        <span className="mq-recherche">
          <Picto nom="loupe" />
          Rechercher un objet
        </span>
        <span className="mq-panier-ic">
          <Picto nom="panier" />
          <span className="mq-badge" data-pop={ctx.panier ? '1' : '0'}>
            {ctx.panier ?? 0}
          </span>
        </span>
      </div>
    )
  if (role.startsWith('produit-')) {
    const k = Number(role.slice(8))
    const p = PRODUITS[k]!
    const dans = (ctx.panier ?? 0) > k
    return (
      <div className="mq-produit">
        <div className="mq-produit__img" style={{ '--fond': p.fond } as CSSProperties}>
          <Objet type={p.type} />
        </div>
        <div className="mq-produit__bas">
          <span className="mq-produit__nom">{p.nom}</span>
          <span className="mq-produit__prix">{p.prix} €</span>
          <span className="mq-ajout" data-ok={dans ? '1' : '0'}>
            {dans ? '✓' : '+'}
          </span>
        </div>
      </div>
    )
  }
  if (role === 'panier') {
    const n = ctx.panier ?? 0
    const total = PRODUITS.slice(0, n).reduce((s, p) => s + p.prix, 0)
    return (
      <div className="mq-panier">
        <div className="mq-sous-titre">Votre panier</div>
        {PRODUITS.slice(0, 4).map((p, i) => (
          <div key={p.nom} className="mq-ligne-panier" data-vide={i < n ? '0' : '1'}>
            <span>{p.nom}</span>
            <b>{p.prix} €</b>
          </div>
        ))}
        <div className="mq-total">
          <span>Total</span>
          <span>{total} €</span>
        </div>
        <span className="mq-btn" style={{ width: '100%' }}>
          Commander
        </span>
      </div>
    )
  }
  if (role === 'dash-menu')
    return (
      <div className="mq-dash-menu">
        <b>Gestion</b>
        {(
          [
            ['graphique', 'Tableau de bord', 1],
            ['dossier', 'Devis', 0],
            ['calendrier', 'Planning', 0],
            ['personnes', 'Clients', 0],
            ['cube', 'Stocks', 0],
          ] as const
        ).map(([ic, nom, on]) => (
          <span key={nom} data-on={on}>
            <Picto nom={ic} />
            {nom}
          </span>
        ))}
      </div>
    )
  if (role === 'dash-haut')
    return (
      <div className="mq-dash-haut">
        <span>Tableau de bord</span>
        <small>{m ? `${m.nom} · maquette` : 'Menuiserie Aubert · cette semaine'}</small>
      </div>
    )
  if (role.startsWith('kpi-')) {
    const k = KPI[Number(role.slice(4))]!
    return (
      <div className="mq-kpi">
        <small>{k.label}</small>
        <b>{k.val}</b>
        <i>{k.delta}</i>
      </div>
    )
  }
  if (role === 'planning') {
    const ev: [number, number, number, string, string][] = [
      [2, 2, 1, 'Chantier Dupont', '#2f6f5e'],
      [3, 3, 2, 'Pose escalier', '#8a5a2b'],
      [4, 4, 1, 'RDV devis', '#b85a0d'],
      [5, 2, 2, 'Atelier : cuisine Roux', '#1f4c97'],
      [6, 3, 1, 'Livraison', '#6a4aa0'],
    ]
    return (
      <div className="mq-planning">
        <span />
        {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven'].map((j) => (
          <span key={j} className="t">
            {j}
          </span>
        ))}
        {['8 h', '10 h', '14 h', '16 h'].map((h, i) => (
          <span key={h} className="h" style={{ gridRow: i + 2, gridColumn: 1 }}>
            {h}
          </span>
        ))}
        {ev.map(([col, row, span, nom, c], i) => (
          <span key={nom} className="e" style={{ gridColumn: col, gridRow: `${row} / span ${span}`, '--c': c, '--k': i } as CSSProperties}>
            {nom}
          </span>
        ))}
      </div>
    )
  }
  if (role === 'graphique')
    return (
      <div className="mq-graph">
        <small>Chiffre d’affaires, 8 semaines</small>
        <svg viewBox="0 0 120 50" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f69106" stopOpacity="0.35" />
              <stop offset="1" stopColor="#f69106" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 40 L17 34 L34 37 L51 26 L68 29 L85 17 L102 20 L120 8 V50 H0Z" fill={`url(#${uid}-g)`} />
          <path className="mq-trace" d="M0 40 L17 34 L34 37 L51 26 L68 29 L85 17 L102 20 L120 8" fill="none" stroke="#f69106" strokeWidth="1.6" vectorEffect="non-scaling-stroke" strokeLinejoin="round" pathLength={1} />
        </svg>
      </div>
    )
  if (role === 'liste')
    return (
      <div className="mq-liste">
        <div>
          <span>Devis 041 · Dupont</span>
          <em>Accepté</em>
        </div>
        <div>
          <span>Devis 042 · Mairie</span>
          <em className="o">Envoyé</em>
        </div>
        <div>
          <span>Facture 118 · Martin</span>
          <em>Payée</em>
        </div>
      </div>
    )
  return null
}
