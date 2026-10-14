'use client'
/**
 * LE MONDE DES OUTILS — un établi : les quatre outils posés côte à côte, chacun
 * en miniature VRAIE : la jauge de l'audit (aiguille qui balaie), les nuanciers
 * du studio de style, la fiche du cahier des charges qui se coche, la pile de
 * documents. Cartes cliquables vers chaque outil.
 */
import Link from 'next/link'
import { Picto } from '@/components/maquettes/illustrations'
import './mondes.css'

const C = 2 * Math.PI * 34
const ANNEAU = [
  { nom: 'Performance', v: 86 },
  { nom: 'Accessibilité', v: 94 },
  { nom: 'SEO', v: 91 },
]

export default function MondeOutils() {
  return (
    <div className="mw-outils" role="group" aria-label="Aperçu des quatre outils">
      <Link href="/outils/audit-site" className="mw-outil mw-outil--audit">
        <span className="mw-outil__titre su-mono">Audit de site</span>
        <svg viewBox="0 0 240 90" aria-hidden="true">
          {ANNEAU.map((a, i) => (
            <g key={a.nom} transform={`translate(${40 + i * 80} 44)`}>
              <circle r="34" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="7" />
              <circle r="34" fill="none" stroke="#FFB84D" strokeWidth="7" strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C * (1 - a.v / 100)} transform="rotate(-90)" className="mw-anneau" style={{ '--i': i } as React.CSSProperties} />
              <text textAnchor="middle" dy="6" fontSize="19" fontWeight="700" fill="#fff" fontFamily="var(--su-font-display), sans-serif">
                {a.v}
              </text>
            </g>
          ))}
        </svg>
        <span className="mw-outil__note">Exemple de résultat</span>
      </Link>
      <Link href="/outils/studio-de-style" className="mw-outil mw-outil--studio">
        <span className="mw-outil__titre su-mono">Studio de style</span>
        <div className="mw-nuanciers" aria-hidden="true">
          {[
            ['#fbf6ec', '#8a5a2b', '#2f6f5e', '#d9701c'],
            ['#f1efe6', '#16384d', '#3d7f9e', '#f2b64b'],
            ['#fdf2f4', '#7a2f55', '#c9566f', '#2a3a59'],
          ].map((rang, i) => (
            <div key={i} className="mw-nuancier" style={{ '--i': i } as React.CSSProperties}>
              {rang.map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
              <b>Aa</b>
            </div>
          ))}
        </div>
        <span className="mw-outil__note">Palette, typo, mise en page</span>
      </Link>
      <Link href="/ressources/cahier-des-charges" className="mw-outil mw-outil--cahier">
        <span className="mw-outil__titre su-mono">Cahier des charges</span>
        <ul className="mw-fiche" aria-hidden="true">
          {['Votre activité', 'Les pages voulues', 'Les fonctions', 'Le budget de départ', 'Vos exemples'].map((t, i) => (
            <li key={t} style={{ '--i': i } as React.CSSProperties}>
              <span className="mw-case">
                <Picto nom="coche" />
              </span>
              {t}
            </li>
          ))}
        </ul>
        <span className="mw-outil__note">À imprimer ou envoyer</span>
      </Link>
      <Link href="/ressources/documents" className="mw-outil mw-outil--docs">
        <span className="mw-outil__titre su-mono">Documents</span>
        <div className="mw-pile" aria-hidden="true">
          {['Devis', 'Contrat', 'CGV'].map((t, i) => (
            <span key={t} className="mw-feuille" style={{ '--i': i } as React.CSSProperties}>
              <b>{t}</b>
              <i />
              <i />
              <i />
            </span>
          ))}
        </div>
        <span className="mw-outil__note">Modèles à venir</span>
      </Link>
    </div>
  )
}
