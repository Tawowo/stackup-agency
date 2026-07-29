/** Boîte à outils mathématique partagée. */

export const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export const map = (v: number, inMin: number, inMax: number, outMin: number, outMax: number) =>
  outMin + ((v - inMin) * (outMax - outMin)) / (inMax - inMin);

/** Interpolation exponentielle indépendante du framerate. */
export const damp = (a: number, b: number, lambda: number, dt: number) =>
  lerp(a, b, 1 - Math.exp(-lambda * dt));

/** Parse "#RRGGBB" OU "rgb(r, g, b)" → [r,g,b] normalisé 0-1. */
export const parseColor = (c: string): [number, number, number] => {
  if (c.startsWith('rgb')) {
    const m = c.match(/[\d.]+/g);
    if (m && m.length >= 3) return [+m[0] / 255, +m[1] / 255, +m[2] / 255];
  }
  const h = c.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
};

export const hexToRgb = parseColor;

/** Interpolation entre deux couleurs (hex ou rgb), retour "rgb(...)". */
export const mixHex = (a: string, b: string, t: number) => {
  const ca = parseColor(a);
  const cb = parseColor(b);
  const r = Math.round(lerp(ca[0], cb[0], t) * 255);
  const g = Math.round(lerp(ca[1], cb[1], t) * 255);
  const bl = Math.round(lerp(ca[2], cb[2], t) * 255);
  return `rgb(${r}, ${g}, ${bl})`;
};

/** PRNG déterministe (mulberry32) — pour des trajectoires reproductibles. */
export const seededRandom = (seed: number) => {
  let s = seed >>> 0;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
