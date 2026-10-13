import { Color, ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { HASH, NOISE, TORCHE } from './glsl'

/**
 * LE SOL — le plan d'atelier de la Fabrique : grille technique (1 unité, 5 unités),
 * cotes au pointillé, bords fondus ; se révèle sous la torche (liseré) ; se dissout
 * par bruit fractal avec un front fin (`fwidth`) pendant une traversée ; reçoit la
 * lumière ambre de la pile (halo au sol) et son ombre (dessinée à part).
 */
const vertex = /* glsl */ `
uniform float uSolY;
uniform vec4 uStack;
varying vec3 vWorld;
void main() {
  // Le plan est posé à plat (rotation −90° en x) ; sa hauteur et son centre
  // suivent la pile sans aucun calcul CPU.
  vec4 wp = modelMatrix * vec4(position, 1.0);
  wp.x += uStack.x;
  wp.y = uSolY;
  vWorld = wp.xyz;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`
const fragment = /* glsl */ `
precision highp float;
${HASH}
${NOISE}
${TORCHE}
uniform float uTime;
uniform float uNuit;
uniform vec3 uAccent;
uniform vec4 uStack;
uniform float uDissolve;
uniform float uWall;
uniform vec3 uBase;
uniform vec3 uLigne;
varying vec3 vWorld;
void main() {
  if (uWall < 0.5) discard;
  vec2 p = vWorld.xz;
  // Repère centré sur la pile ; la maille suit son échelle, bornée (40 à 130 px).
  float ech = clamp(uStack.z, 0.4, 1.3);
  vec2 g = (p - vec2(uStack.x, 0.0)) / ech;
  float tex = fbm(p * 0.35) * 0.5;
  vec3 fond = mix(vec3(0.961, 0.945, 0.910), uBase, uNuit);
  vec3 col = fond * (0.92 + tex * 0.3);
  // Grille fine (1) et grille forte (5), en unités de la pile.
  float g1 = max(gridLine(g.x, 0.7), gridLine(g.y, 0.7));
  float g5 = max(gridLine(g.x * 0.2, 1.1), gridLine(g.y * 0.2, 1.1));
  vec3 ligne = mix(vec3(0.63, 0.67, 0.72), uLigne, uNuit);
  col += ligne * (g1 * 0.16 + g5 * 0.38);
  // Axe de la pile : une cote pointillée.
  float axe = (1.0 - smoothstep(0.0, fwidth(g.x) * 1.5, abs(g.x))) * step(0.5, fract(g.y * 2.0));
  col += uAccent * axe * 0.35;
  // La lumière du logo au sol : une flaque chaude autour du pied de la pile.
  float d0 = length(p - vec2(uStack.x, 0.6 * uStack.z)) / (2.6 * max(uStack.z, 0.5));
  col += mix(uAccent, vec3(1.0), 0.5) * exp(-d0 * d0) * 0.26 * mix(0.3, 1.0, uNuit);
  // Bords fondus : le sol se perd dans le ciel vers le fond, et sur les côtés.
  vec2 gp = (p - vec2(uStack.x, 0.0)) / max(uStack.z, 0.5);
  float edge = (1.0 - smoothstep(0.4, 13.0, -gp.y)) * (1.0 - smoothstep(5.0, 10.0, abs(gp.x))) * smoothstep(5.5, 3.0, gp.y);
  // Torche : liseré et révélation.
  float dl = distance(p, uProbe.xz);
  float lens = uProbeActive * (1.0 - smoothstep(uProbeRadius * 0.6, uProbeRadius, dl));
  float rim = uProbeActive * exp(-pow((dl - uProbeRadius) * 7.0, 2.0));
  col += ligne * lens * (g1 * 0.35 + g5 * 0.25) + uAccent * (rim * 0.12 + lens * 0.06);
  // Dissolution par bruit fractal (0 = plein, 1 = retiré), avec un front fin lumineux.
  float n = fbm(gp * 0.6 + 3.1);
  float th = uDissolve * 1.15;
  float cut = smoothstep(th - 0.06, th, n);
  float front = (1.0 - smoothstep(0.0, fwidth(n) * 2.0 + 0.004, abs(n - th))) * step(0.001, uDissolve) * step(uDissolve, 0.98);
  front *= 0.3 + 0.7 * uNuit;
  col += uAccent * front * 0.8;
  float base = mix(0.55, 0.92, uNuit);
  // Une forme petite et haute (le noyau du seuil, le logo en coin) n'a pas de sol :
  // à cette échelle il ne ferait qu'une bande sombre au milieu de l'écran.
  float presence = smoothstep(0.5, 0.95, uStack.z) * (1.0 - smoothstep(-0.6, 0.4, uSolY));
  float alpha = (edge * cut * base + front * edge) * presence;
  gl_FragColor = vec4(col, alpha);
}
`
export function solMaterial(u: StackUniforms) {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: { ...u, uBase: { value: new Color('#132C4E') }, uLigne: { value: new Color('#5B8BC0') } },
    transparent: true,
    depthWrite: false,
  })
}
