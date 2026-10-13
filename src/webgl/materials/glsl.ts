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

export const HASH = /* glsl */ `
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`

/**
 * Transformation d'instance partagée par le matériau des plaques et celui de
 * l'ombre : morph A→B en arc avec retard, respiration, lentille du pointeur,
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

uniform float uTime;
uniform float uMorph;
uniform float uArc;
uniform float uDelay;
uniform float uEpaisseur;
uniform float uBreath;
uniform float uOrtho;
uniform float uIsolate;
uniform float uPointerActive;
uniform vec3 uPointer;
uniform vec4 uExclu;
uniform float uExcluActive;

struct Inst { vec3 world; mat3 R; float lens; float dim; float scale; };

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
  e.y += sin(3.14159265 * t) * (aSeed - 0.5) * 1.2;
  float sc = mix(aScaleA, aScaleB, t);

  // Respiration : ±1,5 % d'échelle (période 6 s, déphasée), et un va-et-vient
  // en profondeur. En orthographique, les trois plaques du logo ne respirent
  // qu'en profondeur : la silhouette reste exacte.
  float ph = uTime * 1.0471976 + aSeed * 6.2831853;
  float logoPlate = step(aIndex, 2.5);
  float inPlane = 1.0 - uOrtho * logoPlate;
  float breath = 1.0 + 0.015 * sin(ph) * uBreath * inPlane;
  float zb = 0.035 * sin(ph) * uBreath;

  // Lentille : les plaques sous le pointeur se soulèvent de 6 % et s'allument.
  float pd = distance(pos.xy, uPointer.xy);
  float lens = uPointerActive * smoothstep(0.7, 0.0, pd);

  // Isolation d'une strate : les autres s'écartent et s'assombrissent.
  float iso = step(0.0, uIsolate);
  float other = iso * (1.0 - step(abs(aGroup - uIsolate), 0.5));
  pos.x += other * sign(pos.x + 0.001) * 0.35;
  pos.z -= other * 0.4;

  // Contournement de la zone du titre : en vol, une plaque qui entre dans le
  // rectangle d'exclusion est repoussée hors de lui, par le côté le plus
  // proche, avec un poids lisse (pas de saut au bord).
  if (uExcluActive > 0.5) {
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

  mat3 R = rotXYZ(e);
  vec3 local = position * vec3(1.0, 1.0, uEpaisseur) * sc * breath;
  vec3 world = R * local + pos;
  world.z += zb + lens * 0.09;

  Inst r;
  r.world = world;
  r.R = R;
  r.lens = lens;
  r.dim = other;
  r.scale = sc;
  return r;
}
`
