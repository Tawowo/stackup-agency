/**
 * LES PLAQUES — tout ce qui est en 3D dans le film est une plaque.
 *
 * 1. Le RUBAN du logo : les tracés relevés sur public/Logo_Stackup-Agency.png
 *    (repris tels quels de src/webgl/bande/geometrie.ts), extrudés sans biseau.
 *    Le brin navy est coupé en deux plaques le long du pli : le logo se lit
 *    alors comme trois plaques (navy, navy, ambre) qui, assemblées, redonnent
 *    exactement la silhouette d'origine.
 * 2. Les MURS : un écran découpé en tuiles. Chaque tuile porte sa portion de
 *    texture sur la face avant ET sur la face arrière : la tuile peut se
 *    retourner et révéler l'écran suivant (pliage), exploser, s'assembler.
 * 3. Le RIDEAU : des plaques qui balaient l'écran, pour les transitions.
 */
import * as THREE from "three";
import { C3 } from "./monde.js";
import { alea } from "./outils.js";

/* ── Le ruban ─────────────────────────────────────────────────────────── */

export const RUBAN_NAVY = "M144 1 L144 49 L50 88 L145 125 L144 171 L87 148 L1 115 L0 68 L4 60 Z";
export const RUBAN_AMBRE = "M87 148 L144 171 L144 173 L1 228 L1 181 Z";
// Coupe au pli : le bord inférieur du brin haut (144,49)→(50,88), prolongé
// jusqu'au bord gauche, y tombe en (0,87 ; 108,7).
const BRIN_HAUT = [[144, 1], [144, 49], [50, 88], [0.87, 108.7], [0, 68], [4, 60]];
const BRIN_MILIEU = [[50, 88], [145, 125], [144, 171], [87, 148], [1, 115], [0.87, 108.7]];
const BRIN_AMBRE = [[87, 148], [144, 171], [144, 173], [1, 228], [1, 181]];

export const HAUTEUR_RUBAN = 4;
const X0 = 0, X1 = 145, Y0 = 1, Y1 = 228;
const ECH = HAUTEUR_RUBAN / (Y1 - Y0);
export const LARGEUR_RUBAN = (X1 - X0) * ECH;

function forme(points) {
  const f = new THREE.Shape();
  points.forEach(([x, y], i) => {
    const mx = (x - X0 - (X1 - X0) / 2) * ECH;
    const my = (Y0 + (Y1 - Y0) / 2 - y) * ECH; // Y retourné (SVG → Three)
    if (i === 0) f.moveTo(mx, my);
    else f.lineTo(mx, my);
  });
  f.closePath();
  return f;
}

function extruder(points, profondeur) {
  const g = new THREE.ExtrudeGeometry(forme(points), { depth: profondeur, bevelEnabled: false, curveSegments: 1, steps: 1 });
  g.translate(0, 0, -profondeur / 2);
  g.computeVertexNormals();
  return g;
}

export const MAT = {
  navy: () => new THREE.MeshStandardMaterial({ color: C3.navy, roughness: 0.5, metalness: 0.2, emissive: 0x0d2c4c, emissiveIntensity: 0.25 }),
  ambre: () => new THREE.MeshStandardMaterial({ color: C3.ambre, roughness: 0.45, metalness: 0.1, emissive: 0xf69106, emissiveIntensity: 0.35 }),
  ivoire: () => new THREE.MeshStandardMaterial({ color: C3.ivoire, roughness: 0.6, emissive: 0xfffdf9, emissiveIntensity: 0.25 }),
  arete: () => new THREE.LineBasicMaterial({ color: C3.ivoire, transparent: true, opacity: 0.85, fog: true }),
};

/** Une plaque du ruban, avec son liseré ivoire sur les arêtes. */
function plaqueRuban(points, mat, profondeur) {
  const geo = extruder(points, profondeur);
  const m = new THREE.Mesh(geo, mat);
  const aretes = new THREE.LineSegments(new THREE.EdgesGeometry(geo, 20), MAT.arete());
  m.add(aretes);
  m.userData.aretes = aretes;
  return m;
}

/**
 * Le S : trois plaques + une pile de couches derrière (« impression 3D »).
 * Repère : centré sur l'origine, hauteur 4, face avant vers +z.
 */
export function creerRuban({ couches = 28, epaisseur = 0.22 } = {}) {
  const groupe = new THREE.Group();
  const navy = MAT.navy(), ambre = MAT.ambre();
  const plaques = [
    plaqueRuban(BRIN_HAUT, navy, epaisseur),
    plaqueRuban(BRIN_MILIEU, navy.clone(), epaisseur),
    plaqueRuban(BRIN_AMBRE, ambre, epaisseur),
  ];
  plaques.forEach((p) => groupe.add(p));
  // couches : silhouette entière, fine, empilée vers l'arrière
  const geoN = extruder([[144, 1], [144, 49], [50, 88], [145, 125], [144, 171], [87, 148], [1, 115], [0, 68], [4, 60]], 0.05);
  const geoA = extruder(BRIN_AMBRE, 0.05);
  const pile = [];
  const matCoucheN = new THREE.MeshStandardMaterial({ color: C3.navy, roughness: 0.6, metalness: 0.1, emissive: 0x0d2c4c, emissiveIntensity: 0.3, transparent: true });
  const matCoucheA = new THREE.MeshStandardMaterial({ color: C3.ambre, roughness: 0.5, emissive: 0xf69106, emissiveIntensity: 0.3, transparent: true });
  const matAreteC = new THREE.LineBasicMaterial({ color: C3.ivoire, transparent: true, opacity: 0.35 });
  const eN = new THREE.EdgesGeometry(geoN, 20), eA = new THREE.EdgesGeometry(geoA, 20);
  for (let i = 0; i < couches; i++) {
    const g = new THREE.Group();
    const a = new THREE.Mesh(geoN, matCoucheN);
    const b = new THREE.Mesh(geoA, matCoucheA);
    a.add(new THREE.LineSegments(eN, matAreteC));
    b.add(new THREE.LineSegments(eA, matAreteC));
    g.add(a, b);
    g.visible = false;
    groupe.add(g);
    pile.push(g);
  }
  return { groupe, plaques, pile, mats: { navy, ambre, matCoucheN, matCoucheA } };
}

/* ── Les murs de tuiles ───────────────────────────────────────────────── */

export class Mur {
  constructor({ largeur, hauteur, cols, rows, epaisseur = 0.05, ecart = 0.003, graine = 3 }) {
    this.largeur = largeur;
    this.hauteur = hauteur;
    this.cols = cols;
    this.rows = rows;
    this.groupe = new THREE.Group();
    this.face = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    this.dos = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
    this.bord = new THREE.MeshStandardMaterial({ color: C3.ivoire, emissive: 0xfffdf9, emissiveIntensity: 0.45, roughness: 0.5 });
    this.tuiles = [];
    const tw = largeur / cols, th = hauteur / rows;
    const r = alea(graine);
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const geo = new THREE.BoxGeometry(tw - ecart, th - ecart, epaisseur);
        const uv = geo.attributes.uv;
        const pos = geo.attributes.position;
        const u0 = i / cols, v0 = j / rows, du = 1 / cols, dv = 1 / rows;
        for (let k = 16; k < 24; k++) {
          const x = pos.getX(k) / (tw - ecart), y = pos.getY(k) / (th - ecart);
          if (k < 20) uv.setXY(k, u0 + (x + 0.5) * du, v0 + (y + 0.5) * dv); // face avant (+z)
          else uv.setXY(k, u0 + (x + 0.5) * du, v0 + (-y + 0.5) * dv); // face arrière, vue après retournement sur X
        }
        uv.needsUpdate = true;
        const m = new THREE.Mesh(geo, [this.bord, this.bord, this.bord, this.bord, this.face, this.dos]);
        const cx = -largeur / 2 + (i + 0.5) * tw;
        const cy = -hauteur / 2 + (j + 0.5) * th;
        m.position.set(cx, cy, 0);
        m.userData = {
          i, j, cx, cy,
          // distance au centre, normalisée : sert aux décalages en vague
          d: Math.hypot((i + 0.5) / cols - 0.5, (j + 0.5) / rows - 0.5) / 0.7071,
          r1: r(), r2: r(), r3: r(), r4: r(),
        };
        this.groupe.add(m);
        this.tuiles.push(m);
      }
    }
  }
  textures(face, dos) {
    const maj = (mat, tex, couleur) => {
      if (mat.map !== tex) {
        mat.map = tex;
        mat.needsUpdate = true;
      }
      mat.color.set(tex ? 0xffffff : couleur);
    };
    maj(this.face, face, C3.navy);
    maj(this.dos, dos, C3.navy);
  }
  /** Remet chaque tuile à sa place. */
  repos() {
    for (const m of this.tuiles) {
      m.position.set(m.userData.cx, m.userData.cy, 0);
      m.rotation.set(0, 0, 0);
      m.scale.set(1, 1, 1);
      m.visible = true;
    }
  }
  /**
   * Retournement en vague (pliage d'un écran vers le suivant).
   * s : 0 → 1, la vague balaie de haut en bas (sens « page qui tourne »).
   * tour : nombre de demi-tours déjà faits avant (0 ou 1).
   */
  retourner(s, tour = 0, { sens = "haut", amplitude = 0.35 } = {}) {
    for (const m of this.tuiles) {
      const u = m.userData;
      const ordre = sens === "haut" ? 1 - (u.j + 0.5) / this.rows : sens === "gauche" ? (u.i + 0.5) / this.cols : u.d;
      const a = Math.min(1, Math.max(0, (s * 1.6 - ordre * 0.6)));
      const e = a < 0.5 ? 4 * a * a * a : 1 - Math.pow(-2 * a + 2, 3) / 2;
      m.position.set(u.cx, u.cy, Math.sin(Math.PI * e) * amplitude);
      m.rotation.set(Math.PI * (tour + e), 0, 0);
      m.scale.set(1, 1, 1);
    }
  }
}

/* ── Le rideau : des plaques qui balaient l'écran (transition par la matière) ── */

export function creerRideau(camera, n = 46) {
  const groupe = new THREE.Group();
  camera.add(groupe);
  const r = alea(77);
  const mats = [MAT.navy(), MAT.navy(), MAT.ambre(), MAT.ivoire()];
  const geo = new THREE.BoxGeometry(1, 0.62, 0.05);
  const eg = new THREE.EdgesGeometry(geo);
  for (let i = 0; i < n; i++) {
    const m = new THREE.Mesh(geo, mats[i % 7 === 3 ? 2 : i % 11 === 5 ? 3 : i % 2]);
    m.add(new THREE.LineSegments(eg, MAT.arete()));
    m.userData = { y: r() * 2 - 1, z: 0.6 + r() * 1.4, retard: r() * 0.35, rot: (r() - 0.5) * 1.2, taille: 0.7 + r() * 0.9, spin: (r() - 0.5) * 2 };
    m.visible = false;
    groupe.add(m);
  }
  return groupe;
}

/**
 * Pose le rideau : s de 0 à 1 sur la durée du balayage. sens +1 = vers la
 * gauche. Au milieu (s ≈ 0,5), l'écran est entièrement couvert.
 */
export function poserRideau(rideau, camera, aspect, s, sens = 1) {
  const v = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
  for (const m of rideau.children) {
    const u = m.userData;
    const a = (s - u.retard * 0.5) / 0.65;
    if (a <= 0 || a >= 1) {
      m.visible = false;
      continue;
    }
    m.visible = true;
    const h = 2 * u.z * v, w = h * aspect;
    const x = sens * (1 - 2 * a) * (w * 0.5 + u.taille * h * 0.6);
    m.position.set(x, u.y * h * 0.55, -u.z);
    m.scale.setScalar(u.taille * h * 0.55);
    m.rotation.set(u.rot * 0.25, u.spin * 0.35 * (a - 0.5), u.rot * 0.6);
  }
}
