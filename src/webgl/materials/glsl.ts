/** Morceaux GLSL communs. */
export const ROT = /* glsl */ `
mat3 rotXYZ(vec3 e) {
  float cx = cos(e.x), sx = sin(e.x);
  float cy = cos(e.y), sy = sin(e.y);
  float cz = cos(e.z), sz = sin(e.z);
  mat3 Rx = mat3(1., 0., 0., 0., cx, sx, 0., -sx, cx);
  mat3 Ry = mat3(cy, 0., -sy, 0., 1., 0., sy, 0., cy);
  mat3 Rz = mat3(cz, sz, 0., -sz, cz, 0., 0., 0., 1.);
  return Rz * Ry * Rx;
}
`

export const NOISE = /* glsl */ `
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise(vec2 p) {
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash21(i), hash21(i + vec2(1, 0)), u.x), mix(hash21(i + vec2(0, 1)), hash21(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) { float v = 0.0; float a = 0.5; for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.03; a *= 0.5; } return v; }
float gridLine(float c, float w) {
  float d = abs(fract(c - 0.5) - 0.5) / max(fwidth(c), 1e-4);
  return 1.0 - min(d / w, 1.0);
}
`

/** La torche : lentille interpolée entre l'impact au sol et l'impact à la profondeur de la pile. */
export const TORCHE = /* glsl */ `
uniform vec3 uProbe;
uniform vec3 uProbeDeep;
uniform float uProbeRadius;
uniform float uProbeActive;
uniform float uSolY;
float probeLens(vec3 wp) {
  float k = clamp((wp.y - uSolY) / 2.4, 0.0, 1.5);
  vec3 c = mix(uProbe, uProbeDeep, k);
  return uProbeActive * (1.0 - smoothstep(uProbeRadius * 0.55, uProbeRadius * 0.95, distance(wp.xz, c.xz)));
}
`

export const HASH = /* glsl */ `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`

/**
 * Transformation d'instance partagée par le matériau des plaques et celui de
 * l'ombre : morph A→B en arc avec retard, cisaillement, lentille du pointeur (lumière),
 * isolation. Produit `world` (repère du groupe) et la matrice de rotation.
 */
export const INSTANCE = /* glsl */ `
attribute float aIndex;
attribute float aSeed;
attribute float aGroup;
attribute float aDelay;
attribute vec3 aPosA;
attribute vec3 aRotA;
attribute float aScaleA;
attribute vec3 aPosB;
attribute vec3 aRotB;
attribute float aScaleB;
attribute float aShearA;
attribute float aShearB;
attribute float aFlip;

uniform float uTime;
uniform float uMorph;
uniform float uArc;
uniform float uDelay;
uniform float uEpaisseur;
uniform float uBreath;
uniform float uOrtho;
uniform float uIsolate;
uniform float uIsoPush;
uniform float uPointerActive;
uniform vec3 uPointer;
uniform vec4 uExclu;
uniform float uExcluActive;
uniform float uFlash;

struct Inst { vec3 world; mat3 R; float lens; float dim; float scale; float flip; float flash; };

Inst instance(vec3 position) {
  float d = aDelay * uDelay;
  float t = clamp((uMorph - d) / max(1.0 - uDelay, 1e-3), 0.0, 1.0);
  t = t * t * (3.0 - 2.0 * t);
  vec3 pos = mix(aPosA, aPosB, t);
  float dist = distance(aPosA, aPosB);
  float arc = sin(3.14159265 * t) * uArc * min(dist, 3.0);
  pos.y += arc * (0.45 + 0.55 * aSeed);
  pos.z += arc * 0.35;
  vec3 e = mix(aRotA, aRotB, t);
  // En vol, la plaque tourne un peu sur elle-même.
  // (sauf pendant l'impression : la couche descend à plat, déjà alignée)
  e.y += sin(3.14159265 * t) * (aSeed - 0.5) * 1.2 * (1.0 - uFlash) * min(uArc / 0.6, 1.0);
  float sc = mix(aScaleA, aScaleB, t);
  float shear = mix(aShearA, aShearB, t);

  // Aucune respiration, aucune dérive : au repos, chaque plaque est RIGIDE. Seules
  // la lumière et la caméra vivent (le S du logo est un objet, pas un organisme).

  // Lentille : les plaques sous le pointeur se soulèvent de 6 % et s'allument.
  float pd = distance(pos.xy, uPointer.xy);
  float lens = uPointerActive * smoothstep(0.7, 0.0, pd);

  // Isolation d'une strate : les autres s'écartent et s'assombrissent.
  float iso = step(0.0, uIsolate);
  float other = iso * (1.0 - step(abs(aGroup - uIsolate), 0.5));
  pos.x += other * sign(pos.x + 0.001) * uIsoPush;
  pos.z -= other * uIsoPush * 1.15;

  // Contournement de la zone du titre : en vol, une plaque qui entre dans le
  // rectangle d'exclusion est repoussée hors de lui, par le côté le plus
  // proche, avec un poids lisse (pas de saut au bord).
  if (uExcluActive > 0.5 && uFlash < 0.5) {
    float fly = sin(3.14159265 * t) * step(0.001, dist);
    vec2 c = 0.5 * (uExclu.xy + uExclu.zw);
    vec2 hd = 0.5 * (uExclu.zw - uExclu.xy);
    vec2 dd = abs(pos.xy - c) - hd;
    float m = max(dd.x, dd.y);
    float w = fly * (1.0 - smoothstep(-0.05, 0.45, m));
    float dx = pos.x - c.x;
    float cibleX = hd.x + 0.3;
    pos.x += sign(dx + 1e-4) * max(0.0, cibleX - abs(dx)) * w;
    pos.z -= 0.6 * w;
  }

  // Bascule (clic) : la plaque pivote sur son axe long et avance vers le spectateur.
  mat3 R = rotXYZ(e) * rotXYZ(vec3(0.0, 3.14159265 * aFlip, 0.0));
  // Cisaillement : la pente propre de la bande du logo, extrémités toujours verticales.
  vec3 sheared = vec3(position.x, position.y + shear * position.x, position.z);
  vec3 local = sheared * vec3(1.0, 1.0, uEpaisseur) * sc;
  vec3 world = R * local + pos;
  world.z += sin(3.14159265 * aFlip) * 0.45 * sc;

  Inst r;
  r.world = world;
  r.R = R;
  r.lens = lens;
  r.dim = other;
  r.scale = sc;
  r.flip = aFlip;
  // Pose d'une couche (hero « impression ») : la plaque s'allume à l'instant où elle se pose,
  // puis s'éteint en quelques couches. Fonction du morph seul : piloté par le scroll.
  float pose = uMorph - (d + 1.0 - uDelay);
  float approche = clamp(1.0 - abs(pose) / 0.03, 0.0, 1.0);
  r.flash = uFlash * step(0.001, distance(aPosA, aPosB)) * (step(0.0, pose) * exp(-pose * 22.0) + approche * 0.4);
  return r;
}
`
