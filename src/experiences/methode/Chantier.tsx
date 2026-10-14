/**
 * LE CHANTIER — un même projet de site (Menuiserie Aubert, fictif) qui évolue
 * au rythme du scroll, étape par étape : un croquis sur un carnet, la démo
 * dans un navigateur, le code qui s'écrit pendant que le design se construit,
 * la mise en ligne (barre d'adresse, cadenas), le suivi (voyants verts).
 * Chaque scène se découvre par découpe sur la précédente. `e` va de 0 à 5.
 */
import type { CSSProperties } from 'react'
import Navigateur from '@/components/maquettes/Navigateur'
import { Contenu } from '@/components/maquettes/blocs'
import { Picto } from '@/components/maquettes/illustrations'
import { EMPLACEMENTS } from '../offre/emplacements'

const PAGE = EMPLACEMENTS.page.slice(0, 6)
const clamp = (x: number) => Math.min(1, Math.max(0, x))

function Page({ q = 1, uid }: { q?: number; uid: string }) {
  return (
    <>
      {PAGE.map((e, i) => (
        <div
          key={i}
          className="mq-b"
          style={{ '--x': e.x, '--y': e.y, '--w': e.w, '--h': e.h, '--plaque': 'transparent', '--rv': clamp(q * 7 - i) } as CSSProperties}
        >
          <div className="mq-b__c" style={{ clipPath: 'inset(0 calc((1 - var(--rv)) * 100%) 0 0)', transition: 'none' }}>
            <Contenu role={e.role} ctx={{ uid: `${uid}-${i}` }} />
          </div>
        </div>
      ))}
    </>
  )
}

/** Le croquis à main levée : traits légèrement tremblés, tracés par `--q`. */
function Croquis({ q }: { q: number }) {
  const traits: { d: string; deb: number; fin: number }[] = [
    { d: 'M14 18 Q60 14 120 17 T226 16 L226 40 Q150 43 100 40 T14 42 Z', deb: 0, fin: 0.14 },
    { d: 'M24 26 q8 -8 16 0 q-8 8 -16 0 M150 29 h14 M174 29 h14 M198 29 h14', deb: 0.14, fin: 0.28 },
    { d: 'M128 52 L224 52 L224 128 L128 128 Z M128 52 L224 128 M224 52 L128 128', deb: 0.28, fin: 0.5 },
    { d: 'M16 58 q40 -4 100 0 M16 72 q40 -4 100 0 M16 86 q30 -3 80 0', deb: 0.5, fin: 0.68 },
    { d: 'M16 106 Q60 100 84 106 Q90 118 60 124 Q30 128 16 118 Z', deb: 0.68, fin: 0.82 },
    { d: 'M16 144 q46 -4 62 0 M16 156 h34 M30 168 q60 -10 110 -4', deb: 0.82, fin: 1 },
  ]
  return (
    <svg viewBox="0 0 240 180" className="mq-croquis" aria-hidden="true">
      {traits.map((t, i) => (
        <path key={i} d={t.d} pathLength={1} style={{ strokeDasharray: 1, strokeDashoffset: 1 - clamp((q - t.deb) / (t.fin - t.deb)) }} />
      ))}
    </svg>
  )
}

function Carnet({ q, petit = false }: { q: number; petit?: boolean }) {
  return (
    <div className={`mq-carnet${petit ? ' mq-carnet--petit' : ''}`}>
      <div className="mq-carnet__spirales">
        {Array.from({ length: 9 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
      <Croquis q={q} />
      <span className="mq-carnet__note su-mono">croquis · 1ʳᵉ réunion</span>
      <svg className="mq-crayon" viewBox="0 0 120 14" aria-hidden="true">
        <polygon points="0,7 12,1 112,1 112,13 12,13" fill="#e8b84a" />
        <polygon points="0,7 12,1 12,13" fill="#f1d9a6" />
        <polygon points="0,7 4,5 4,9" fill="#3b2a1a" />
        <rect x="100" y="1" width="12" height="12" fill="#c9702c" />
      </svg>
    </div>
  )
}

const CODE: string[] = [
  '<span class="t">&lt;header&gt;</span>',
  '  <span class="t">&lt;a</span> <span class="a">class</span>=<span class="s">"logo"</span><span class="t">&gt;</span>Aubert.<span class="t">&lt;/a&gt;</span>',
  '  <span class="t">&lt;nav&gt;</span>…<span class="t">&lt;/nav&gt;</span>',
  '<span class="t">&lt;/header&gt;</span>',
  '<span class="t">&lt;section</span> <span class="a">class</span>=<span class="s">"accueil"</span><span class="t">&gt;</span>',
  '  <span class="t">&lt;h1&gt;</span>Cuisines, escaliers…<span class="t">&lt;/h1&gt;</span>',
  '  <span class="t">&lt;img</span> <span class="a">src</span>=<span class="s">"escalier.avif"</span><span class="t">&gt;</span>',
  '  <span class="t">&lt;a</span> <span class="a">href</span>=<span class="s">"/devis"</span><span class="t">&gt;</span>Demander un devis<span class="t">&lt;/a&gt;</span>',
  '<span class="t">&lt;/section&gt;</span>',
  '<span class="c">/* style.css */</span>',
  '<span class="k">.accueil</span> { <span class="a">display</span>: <span class="s">grid</span>; }',
]

function Fabrique({ q }: { q: number }) {
  return (
    <div className="mq-fab">
      <div className="mq-fab__code">
        <div className="mq-code" style={{ position: 'relative', inset: 'auto', height: '100%', fontSize: '1.7cqw' }}>
          {CODE.map((l, i) => (
            <span key={i} className="mq-code__l" style={{ '--e': clamp(q * 1.15 * CODE.length - i) } as CSSProperties}>
              <span className="mq-code__n">{i + 1}</span>
              <span dangerouslySetInnerHTML={{ __html: l }} />
            </span>
          ))}
        </div>
      </div>
      <div className="mq-fab__page">
        <Navigateur url="menuiserie-aubert.fr/démo" ratio="16 / 10" cadenas={false}>
          <Page q={q} uid="chf3" />
        </Navigateur>
      </div>
    </div>
  )
}

const VOYANTS = ['Site en ligne', 'Certificat de sécurité valide', 'Sauvegarde de cette nuit', 'Vitesse de chargement', 'Formulaire de devis']

export function Chantier({ e }: { e: number }) {
  const r = (k: number) => clamp(e - (k - 1)) // révélation de la scène k (k ≥ 2)
  const q1 = clamp(e)
  const q2 = r(2)
  const q3 = r(3)
  const q4 = r(4)
  const q5 = r(5)
  const lisse = (x: number) => x * x * (3 - 2 * x)
  const cut = (x: number) => `inset(0 calc((1 - ${lisse(x).toFixed(4)}) * 100%) 0 0)`
  const url = 'menuiserie-aubert.fr'
  const lettres = Math.round(clamp(q4 * 2.2) * url.length)
  return (
    <div className="mq-chantier" aria-hidden="true">
      <div className="mq-sc mq-sc--1">
        <Carnet q={q1} />
      </div>
      <div className="mq-sc mq-sc--2" style={{ clipPath: cut(q2) }}>
        <div className="mq-demo">
          <Navigateur url="menuiserie-aubert.fr/démo" ratio="16 / 10" cadenas={false} className="mq-demo__fen">
            <Page uid="chf2" />
          </Navigateur>
          <span className="mq-demo__badge su-mono">Démo · avant de signer</span>
          <div className="mq-demo__carnet">
            <Carnet q={1} petit />
          </div>
        </div>
      </div>
      <div className="mq-sc mq-sc--3" style={{ clipPath: cut(q3) }}>
        <Fabrique q={q3} />
      </div>
      <div className="mq-sc mq-sc--4" style={{ clipPath: cut(q4) }}>
        <div className="mq-ligne-en">
          <Navigateur url="" ratio="16 / 10" cadenas={false} className="mq-en__fen">
            <div className="mq-en__page">
              <Page uid="chf4" />
              <div className="mq-en__nuit" style={{ opacity: 0.8 * (1 - lisse(clamp((q4 - 0.25) / 0.5))) }} />
            </div>
          </Navigateur>
          <div className="mq-en__adresse" style={{ gridArea: 'unset' }}>
            <span className="mq-en__cadenas" style={{ clipPath: `inset(0 ${q4 > 0.72 ? 0 : 100}% 0 0)` }}>
              <Picto nom="cadenas" />
            </span>
            <span className="mq-en__url">
              https://<b>{url.slice(0, lettres)}</b>
              <i className="mq-en__curseur" style={{ opacity: q4 < 0.9 ? 1 : 0 }} />
            </span>
          </div>
          <span className="mq-en__badge su-mono" style={{ clipPath: `inset(0 ${q4 > 0.86 ? 0 : 100}% 0 0)` }}>
            En ligne · certificat actif
          </span>
        </div>
      </div>
      <div className="mq-sc mq-sc--5" style={{ clipPath: cut(q5) }}>
        <div className="mq-sante">
          <p className="mq-sante__titre">
            <Picto nom="graphique" />
            Santé du site · menuiserie-aubert.fr
          </p>
          <ul>
            {VOYANTS.map((v, i) => (
              <li key={v} data-vert={q5 > 0.25 + i * 0.14 ? '1' : '0'}>
                <span className="mq-sante__led" />
                {v}
                <em>{q5 > 0.25 + i * 0.14 ? 'OK' : '…'}</em>
              </li>
            ))}
          </ul>
          <p className="mq-sante__pied">Nous surveillons. Vous êtes prévenu avant vos clients.</p>
        </div>
      </div>
      <span className="mq-chantier__etape su-mono">Étape {Math.min(5, Math.max(1, Math.floor(e + 0.5)))} / 5</span>
    </div>
  )
}
