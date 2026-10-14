/**
 * LES CINQ CALQUES d'un vrai site (Menuiserie Aubert, fictif) — chacun montre
 * concrètement ce qu'il est : le design (couleurs, typo, boutons), le contenu
 * (textes et photos seuls), le code (de vraies lignes), les données (un
 * tableau de clients), l'hébergement (adresse, certificat, serveur).
 * La fenêtre « Design » porte aussi le site fini : à la fusion des calques,
 * les textes et la photo viennent se poser dessus (découpe pilotée par `--merge`).
 */
import Navigateur from '@/components/maquettes/Navigateur'
import { Contenu } from '@/components/maquettes/blocs'
import { PhotoEscalier, Picto } from '@/components/maquettes/illustrations'
import { EMPLACEMENTS } from '../offre/emplacements'

const PAGE = EMPLACEMENTS.page

function Bloc({ i, children }: { i: number; children: React.ReactNode }) {
  const e = PAGE[i]!
  return (
    <div className="mq-b" style={{ '--x': e.x, '--y': e.y, '--w': e.w, '--h': e.h, '--plaque': 'transparent' } as React.CSSProperties}>
      <div className="mq-b__c">{children}</div>
    </div>
  )
}

/** Le site tel qu'il sera fini : posé sur le calque Design, révélé par la fusion. */
function SiteFini({ uid }: { uid: string }) {
  return (
    <div className="mq-reel">
      {PAGE.slice(0, 6).map((e, i) => (
        <Bloc key={i} i={i}>
          <Contenu role={e.role} ctx={{ uid: `${uid}-${i}` }} />
        </Bloc>
      ))}
    </div>
  )
}

export function CalqueDesign({ uid }: { uid: string }) {
  return (
    <Navigateur url="menuiserie-aubert.fr" ratio="16 / 10">
      <div className="mq-greek">
        <Bloc i={0}>
          <div className="mq-nav">
            <span className="mq-logo">
              Aubert<i>.</i>
            </span>
            <span className="mq-barre" style={{ width: '9cqw' }} />
            <span className="mq-barre" style={{ width: '9cqw' }} />
            <span className="mq-barre" style={{ width: '7cqw' }} />
            <span className="mq-btn mq-btn--nu" />
          </div>
        </Bloc>
        <Bloc i={1}>
          <div className="mq-hero">
            <span className="mq-barre mq-barre--vert" style={{ width: '16cqw' }} />
            <span className="mq-barre mq-barre--epaisse" style={{ width: '40cqw' }} />
            <span className="mq-barre mq-barre--epaisse" style={{ width: '36cqw' }} />
            <span className="mq-barre mq-barre--epaisse" style={{ width: '28cqw' }} />
            <span className="mq-barre" style={{ width: '40cqw' }} />
            <span className="mq-barre" style={{ width: '30cqw' }} />
            <span className="mq-btn mq-btn--nu" style={{ alignSelf: 'flex-start', width: '17cqw' }} />
          </div>
        </Bloc>
        <Bloc i={2}>
          <div className="mq-photo-nu">
            <Picto nom="cube" />
          </div>
        </Bloc>
        <div className="mq-tokens">
          <span className="mq-pastille" style={{ background: '#fbf6ec' }} />
          <span className="mq-pastille" style={{ background: '#8a5a2b' }} />
          <span className="mq-pastille" style={{ background: '#2f6f5e' }} />
          <span className="mq-pastille" style={{ background: '#d9701c' }} />
          <span className="mq-aa">Aa</span>
          <span className="mq-fonte">Poppins · Inter</span>
          <span className="mq-btn mq-btn--nu" style={{ width: '12cqw' }} />
          <span className="mq-btn mq-btn--contour mq-btn--nu" style={{ width: '12cqw' }} />
        </div>
      </div>
      <SiteFini uid={uid} />
    </Navigateur>
  )
}

export function CalqueContenu({ uid }: { uid: string }) {
  return (
    <Navigateur url="textes-et-photos" cadenas={false} ratio="16 / 10">
      <div className="mq-brut">
        <div>
          <p className="mq-brut__t1">Cuisines, escaliers et rangements sur mesure</p>
          <p>Un atelier, un artisan, des meubles dessinés pour votre maison.</p>
          <p className="mq-brut__t2">Trois savoir-faire</p>
          <p>Cuisines, dessinées à la pièce. Escaliers en chêne, hêtre ou frêne. Rangements : placards et dressings.</p>
          <small>Demander un devis</small>
        </div>
        <div>
          <div className="mq-brut__photo">
            <PhotoEscalier id={`${uid}-brut`} />
          </div>
          <div className="mq-brut__alt">alt = « Escalier en chêne dans la lumière d’une verrière »</div>
        </div>
      </div>
    </Navigateur>
  )
}

const LIGNES: [string, string][] = [
  ['<span class="t">&lt;header</span> <span class="a">class</span>=<span class="s">"entete"</span><span class="t">&gt;</span>', ''],
  ['  <span class="t">&lt;a</span> <span class="a">class</span>=<span class="s">"logo"</span><span class="t">&gt;</span>Aubert.<span class="t">&lt;/a&gt;</span>', ''],
  ['  <span class="t">&lt;nav&gt;</span>…<span class="t">&lt;/nav&gt;</span>', ''],
  ['<span class="t">&lt;/header&gt;</span>', ''],
  ['<span class="t">&lt;main</span> <span class="a">class</span>=<span class="s">"accueil"</span><span class="t">&gt;</span>', ''],
  ['  <span class="t">&lt;h1&gt;</span>Cuisines, escaliers et', ''],
  ['       rangements sur mesure<span class="t">&lt;/h1&gt;</span>', ''],
  ['  <span class="t">&lt;p&gt;</span>Un atelier, un artisan…<span class="t">&lt;/p&gt;</span>', ''],
  ['  <span class="t">&lt;a</span> <span class="a">class</span>=<span class="s">"bouton"</span> <span class="a">href</span>=<span class="s">"/devis"</span><span class="t">&gt;</span>', ''],
  ['    Demander un devis', ''],
  ['  <span class="t">&lt;/a&gt;</span>', ''],
  ['<span class="t">&lt;/main&gt;</span>', ''],
  ['<span class="c">/* bouton.css */</span>', ''],
  ['<span class="k">.bouton</span> { <span class="a">background</span>: <span class="s">#d9701c</span>; }', ''],
]

export function CalqueCode() {
  return (
    <Navigateur url="index.html" cadenas={false} ratio="16 / 10">
      <div className="mq-code">
        {LIGNES.map(([l], i) => (
          <span key={i} className="mq-code__l" style={{ '--e': 1 } as React.CSSProperties}>
            <span className="mq-code__n">{i + 1}</span>
            <span dangerouslySetInnerHTML={{ __html: l }} />
          </span>
        ))}
      </div>
    </Navigateur>
  )
}

const CLIENTS: [string, string, string, string, string][] = [
  ['M. Dupont', 'Tours', '2 480 €', 'Accepté', ''],
  ['Mme Roux', 'Joué-lès-Tours', '6 900 €', 'Envoyé', 'o'],
  ['Mairie de Luynes', 'Luynes', '14 200 €', 'Brouillon', 'b'],
  ['Martin SARL', 'Saint-Cyr', '1 150 €', 'Accepté', ''],
  ['Mme Petit', 'Amboise', '3 780 €', 'Envoyé', 'o'],
]

export function CalqueDonnees() {
  return (
    <Navigateur url="base-de-donnees" cadenas={false} ratio="16 / 10">
      <div className="mq-donnees">
        <div className="mq-onglets">
          <span data-on="1">Clients · 148</span>
          <span>Commandes · 36</span>
          <span>Rendez-vous · 12</span>
        </div>
        <table className="mq-table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Ville</th>
              <th>Dernier devis</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {CLIENTS.map(([n, v, d, s, c]) => (
              <tr key={n}>
                <td>{n}</td>
                <td>{v}</td>
                <td>{d}</td>
                <td>
                  <em className={c}>{s}</em>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Navigateur>
  )
}

export function CalqueHebergement() {
  return (
    <Navigateur url="serveur" cadenas={false} ratio="16 / 10">
      <div className="mq-serveur">
        <div className="mq-adresse-grande">
          <Picto nom="cadenas" />
          https://menuiserie-aubert.fr
          <em>Certificat actif</em>
        </div>
        <div className="mq-rack">
          {[0, 1, 2].map((i) => (
            <div key={i} className="mq-unite">
              <span className="mq-led" />
              <span className="mq-led mq-led--b" />
              <span className="mq-unite__fentes" />
            </div>
          ))}
        </div>
        <div className="mq-coches">
          {['Nom de domaine', 'Certificat de sécurité', 'Sauvegardes', 'Mises à jour'].map((c) => (
            <span key={c}>
              <Picto nom="coche" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </Navigateur>
  )
}
