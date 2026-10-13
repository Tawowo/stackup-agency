import { DoubleSide, ShaderMaterial } from 'three'
import type { StackUniforms } from '../engine'
import { HASH, INSTANCE, ROT } from './glsl'

const vertex = /* glsl */ `
${ROT}
${INSTANCE}
varying vec3 vNormal;
varying vec3 vWorld;
varying vec3 vLocal;
varying vec3 vRight;
varying vec3 vUp;
varying float vIndex;
varying float vLens;
varying float vDim;
varying float vFace;

void main() {
  Inst I = instance(position);
  vFace = abs(normal.z);
  mat3 M = mat3(modelMatrix);
  vNormal = normalize(M * (I.R * normal));
  vRight = normalize(M * (I.R * vec3(1.0, 0.0, 0.0)));
  vUp = normalize(M * (I.R * vec3(0.0, 1.0, 0.0)));
  vec4 wp = modelMatrix * vec4(I.world, 1.0);
  vWorld = wp.xyz;
  vLocal = position;
  vIndex = aIndex;
  vLens = I.lens;
  vDim = I.dim;
  gl_Position = projectionMatrix * viewMatrix * wp;
}
`

const fragment = /* glsl */ `
precision highp float;
${HASH}
uniform float uTime;
uniform float uScan;
uniform float uNuit;
uniform vec3 uAccent;
uniform vec3 uLight;
uniform vec2 uBox;
uniform float uAmbient;
uniform float uKey;
uniform float uFresnel;
uniform float uEdge;
uniform float uPlaqueW;
uniform float uPlaqueH;
uniform float uPente;
uniform float uBreath;
uniform float uGrain;
uniform float uIsoDim;

varying vec3 vNormal;
varying vec3 vWorld;
varying vec3 vLocal;
varying vec3 vRight;
varying vec3 vUp;
varying float vIndex;
varying float vLens;
varying float vDim;
varying float vFace;

const vec3 NAVY = vec3(0.051, 0.173, 0.298);
const vec3 NAVY_CLAIR = vec3(0.110, 0.290, 0.471);
const vec3 AMBRE = vec3(0.965, 0.569, 0.024);
const vec3 AMBRE_CLAIR = vec3(1.0, 0.722, 0.302);

void main() {
  bool ambre = vIndex > 1.5 && vIndex < 2.5;
  vec3 base = ambre ? AMBRE : NAVY;
  vec3 N = normalize(vNormal);
  if (!gl_FrontFacing) N = -N;
  vec3 L = normalize(-uLight);
  vec3 V = normalize(cameraPosition - vWorld);
  float diff = max(dot(N, L), 0.0);

  // Lumière clé ambrée (la seule source), ambiance froide.
  vec3 key = mix(vec3(1.0), uAccent * 1.4, 0.35);
  vec3 col = base * (uAmbient + uKey * diff * key);

  // Fresnel discret : les arêtes vues en biais reprennent l'ambre.
  float fres = pow(1.0 - max(dot(N, V), 0.0), 4.0);
  col += uAccent * fres * uFresnel * (ambre ? 0.35 : 1.0);

  // Faces latérales (l'épaisseur) : métal brossé, un peu plus clair, éclairé.
  float side = 1.0 - vFace;
  col = mix(col, ambre ? AMBRE_CLAIR : NAVY_CLAIR, side * 0.4);
  col += uAccent * side * diff * 0.25;

  // Arête éclairée sur la face : un liseré fin du côté de la lumière.
  float k = tan(uPente);
  float W = uPlaqueW * 0.5;
  float H = uPlaqueH * 0.5;
  float dTop = (H - (vLocal.y - k * vLocal.x)) / sqrt(1.0 + k * k);
  float dBot = ((vLocal.y - k * vLocal.x) + H) / sqrt(1.0 + k * k);
  float dL = vLocal.x + W;
  float dR = W - vLocal.x;
  float rim = 0.012 * uPlaqueW;
  vec3 oTop = normalize(-k * vRight + vUp);
  vec3 oL = -vRight;
  vec3 oR = vRight;
  vec3 oBot = -oTop;
  float lit = 0.0;
  lit += (1.0 - smoothstep(0.0, rim, dTop)) * max(dot(oTop, L), 0.0);
  lit += (1.0 - smoothstep(0.0, rim, dBot)) * max(dot(oBot, L), 0.0);
  lit += (1.0 - smoothstep(0.0, rim, dL)) * max(dot(oL, L), 0.0);
  lit += (1.0 - smoothstep(0.0, rim, dR)) * max(dot(oR, L), 0.0);
  lit = min(lit, 1.0) * vFace;
  col = mix(col, ambre ? AMBRE_CLAIR : mix(NAVY_CLAIR, AMBRE_CLAIR, 0.45), lit * uEdge);

  // Balayage lumineux : une bande d'ambre parcourt la pile.
  float scanY = mix(uBox.x, uBox.y, uScan);
  float band = exp(-pow((vWorld.y - scanY) / 0.18, 2.0)) * uBreath;
  col += uAccent * band * 0.22;

  // Lentille du pointeur.
  col += uAccent * vLens * 0.15;

  // Sur ivoire, les plaques gardent leur couleur franche (navy, ambre du logo).
  col = mix(col, base * (0.95 + 0.25 * diff), (1.0 - uNuit) * (ambre ? 0.85 : 0.5));

  // Isolation : les autres s'assombrissent.
  col *= 1.0 - vDim * uIsoDim;

  // Grain fin (bruit bleu approché), 2-3 %.
  if (uGrain > 0.5) {
    float g = hash12(gl_FragCoord.xy + vec2(fract(uTime * 0.37) * 97.0, 0.0)) - 0.5;
    col += g * 0.03;
  }

  gl_FragColor = vec4(col, 1.0);
}
`

export function plateMaterial(u: StackUniforms, plaque: { largeur: number; hauteur: number; pente: number }) {
  return new ShaderMaterial({
    vertexShader: vertex,
    fragmentShader: fragment,
    uniforms: {
      ...u,
      uPlaqueW: { value: plaque.largeur },
      uPlaqueH: { value: plaque.hauteur },
      uPente: { value: plaque.pente },
    },
    side: DoubleSide,
  })
}
