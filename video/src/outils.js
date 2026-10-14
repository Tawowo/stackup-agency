/**
 * Outils de temps : tout le film est une fonction pure du temps.
 * Aucune horloge, aucun hasard non semé (règle de déterminisme HyperFrames).
 */

export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, s) => a + (b - a) * s;
export const prog = (t, a, b) => (b === a ? (t >= b ? 1 : 0) : clamp((t - a) / (b - a)));
export const smooth = (s) => s * s * (3 - 2 * s);

/* Courbes. « pose » = la courbe du site (--su-pose : cubic-bezier(.16,.84,.28,1)) :
   décélération franche, sans rebond — une plaque qu'on dépose sur une pile. */
export const E = {
  lin: (s) => s,
  in2: (s) => s * s,
  out2: (s) => 1 - (1 - s) * (1 - s),
  in3: (s) => s * s * s,
  out3: (s) => 1 - Math.pow(1 - s, 3),
  inout2: (s) => (s < 0.5 ? 2 * s * s : 1 - Math.pow(-2 * s + 2, 2) / 2),
  inout3: (s) => (s < 0.5 ? 4 * s * s * s : 1 - Math.pow(-2 * s + 2, 3) / 2),
  out4: (s) => 1 - Math.pow(1 - s, 4),
  in4: (s) => s * s * s * s,
  out5: (s) => 1 - Math.pow(1 - s, 5),
  inout4: (s) => (s < 0.5 ? 8 * s * s * s * s : 1 - Math.pow(-2 * s + 2, 4) / 2),
  outExpo: (s) => (s >= 1 ? 1 : 1 - Math.pow(2, -10 * s)),
  inExpo: (s) => (s <= 0 ? 0 : Math.pow(2, 10 * s - 10)),
  inoutExpo: (s) =>
    s <= 0 ? 0 : s >= 1 ? 1 : s < 0.5 ? Math.pow(2, 20 * s - 10) / 2 : (2 - Math.pow(2, -20 * s + 10)) / 2,
  outBack: (s, k = 1.4) => 1 + (k + 1) * Math.pow(s - 1, 3) + k * Math.pow(s - 1, 2),
  pose: bezier(0.16, 0.84, 0.28, 1),
  glisse: bezier(0.33, 0, 0.1, 1),
  sortie: bezier(0.5, 0, 0.75, 0),
};

/** Évalue une cubic-bezier CSS (x1,y1,x2,y2) par Newton. */
export function bezier(x1, y1, x2, y2) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const X = (u) => ((ax * u + bx) * u + cx) * u;
  const dX = (u) => (3 * ax * u + 2 * bx) * u + cx;
  const Y = (u) => ((ay * u + by) * u + cy) * u;
  return (s) => {
    if (s <= 0) return 0;
    if (s >= 1) return 1;
    let u = s;
    for (let i = 0; i < 6; i++) {
      const d = dX(u);
      if (Math.abs(d) < 1e-6) break;
      u -= (X(u) - s) / d;
    }
    return Y(clamp(u));
  };
}

/** Segment animé : 0 avant a, 1 après b, courbe entre les deux. */
export const seg = (t, a, b, e = E.inout3) => e(prog(t, a, b));

/**
 * Piste d'images clés : [[t, valeur, courbe?], …]. Valeur scalaire ou tableau.
 * La courbe d'un point s'applique au segment qui y ARRIVE.
 */
export function piste(cles) {
  return (t) => {
    if (t <= cles[0][0]) return cles[0][1];
    for (let i = 1; i < cles.length; i++) {
      const [t1, v1, e = E.inout3] = cles[i];
      const [t0, v0] = cles[i - 1];
      if (t <= t1) {
        const s = e(prog(t, t0, t1));
        if (Array.isArray(v0)) return v0.map((x, k) => lerp(x, v1[k], s));
        return lerp(v0, v1, s);
      }
    }
    return cles[cles.length - 1][1];
  };
}

/** Générateur pseudo-aléatoire semé (mulberry32). */
export function alea(graine = 1) {
  let a = graine >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Bruit lisse 1D déterministe (somme de sinus incommensurables) : la dérive
   permanente de la caméra, pour qu'aucun plan ne soit jamais immobile. */
export const derive = (t, graine = 0) =>
  Math.sin(t * 0.73 + graine * 1.7) * 0.5 + Math.sin(t * 1.31 + graine * 2.3) * 0.3 + Math.sin(t * 2.11 + graine) * 0.2;
