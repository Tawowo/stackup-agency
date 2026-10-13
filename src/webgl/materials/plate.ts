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
varying float vDos;
varying float vFlip;
varying vec2 vUv;

void main() {
  Inst I = instance(position);
  vFace = abs(normal.z);
  vDos = step(normal.z, -0.5);
  vFlip = I.flip;
  vUv = uv;
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
uniform float uClair;

varying vec3 vNormal;
varying vec3 vWorld;
varying vec3 vLocal;
varying vec3 vRight;
varying vec3 vUp;
varying float vIndex;
varying float vLens;
varying float vDim;
varying float vFace;
varying float vDos;
varying float vFlip;
varying vec2 vUv;

const vec3 NAVY = vec3(0.051, 0.173, 0.298);
const vec3 NAVY_CLAIR = vec3(0.110, 0.290, 0.471);
const vec3 CLAIR = vec3(0.90, 0.925, 0.96);
const vec3 CLAIR_OMBRE = vec3(0.66, 0.72, 0.80);
const vec3 AMBRE = vec3(0.965, 0.569, 0.024);
const vec3 AMBRE_CLAIR = vec3(1.0, 0.722, 0.302);

/* La face « produit » : au dos d'une plaque basculée, un écran — barre de
   titre navy, lignes de texte, un bouton ambre, une ligne de balayage. */
vec3 produit(vec2 uv, float t) {
  vec2 p = uv;
  vec3 fond = vec3(0.98, 0.975, 0.96);
  vec3 col = fond;
  float barre = step(0.84, p.y);
  col = mix(col, NAVY, barre);
  // Trois pastilles dans la barre.
  float past = 0.0;
  for (int i = 0; i < 3; i++) past += 1.0 - smoothstep(0.018, 0.024, distance(p, vec2(0.05 + float(i) * 0.05, 0.92)));
  col = mix(col, vec3(0.86, 0.9, 0.95), past * barre);
  // Lignes de texte (hauteur variable), gris doux.
  float ligne = 0.0;
  for (int i = 0; i < 4; i++) {
    float y = 0.7 - float(i) * 0.13;
    float w = 0.55 + 0.3 * fract(sin(float(i) * 12.9) * 43758.5);
    ligne += step(abs(p.y - y), 0.03) * step(0.08, p.x) * step(p.x, 0.08 + w);
  }
  col = mix(col, vec3(0.73, 0.77, 0.82), min(ligne, 1.0));
  // Un bouton ambre, à droite en bas.
  vec2 b = abs(p - vec2(0.8, 0.14)) - vec2(0.12, 0.05);
  float bouton = 1.0 - smoothstep(-0.005, 0.005, max(b.x, b.y));
  col = mix(col, AMBRE, bouton);
  // Balayage.
  float scan = exp(-pow((p.y - fract(t * 0.25)) * 12.0, 2.0)) * 0.12;
  col += scan;
  return col;
}

void main() {
  bool ambre = vIndex > 1.5 && vIndex < 2.5;
  // Sur fond sombre : plaques claires + ambre (la version blanche du logo) ;
  // sur ivoire : navy + ambre (la version d'origine).
  float clair = uNuit * uClair;
  vec3 navy = mix(NAVY, CLAIR, clair);
  vec3 navyClair = mix(NAVY_CLAIR, CLAIR_OMBRE, clair);
  vec3 base = ambre ? AMBRE : navy;
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
  col = mix(col, ambre ? AMBRE_CLAIR : navyClair, side * 0.4);
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
  col = mix(col, ambre ? AMBRE_CLAIR : mix(navyClair, AMBRE_CLAIR, 0.45), lit * uEdge);

  // Balayage lumineux : une bande d'ambre parcourt la pile.
  float scanY = mix(uBox.x, uBox.y, uScan);
  float band = exp(-pow((vWorld.y - scanY) / 0.18, 2.0)) * uBreath;
  col += uAccent * band * 0.22;

  // Lentille du pointeur.
  col += uAccent * vLens * 0.15;

  // Sur ivoire, les plaques gardent leur couleur franche (navy, ambre du logo) ;
  // sur fond sombre, les plaques claires gardent leur blanc (pas de surexposition).
  col = mix(col, base * (0.95 + 0.25 * diff), (1.0 - uNuit) * (ambre ? 0.85 : 0.5));
  // Plaques claires : exposition contenue, ombres fraîches (bleutées), jamais de blanc brûlé.
  vec3 clairOmbre = mix(vec3(0.62, 0.68, 0.78), base, 0.35);
  col = mix(col, mix(clairOmbre, base, 0.45 + 0.55 * diff), clair * (ambre ? 0.0 : 0.8));

  // Face produit : au dos d'une plaque basculée.
  float dos = vDos * vFace * smoothstep(0.5, 0.6, vFlip);
  col = mix(col, produit(vUv, uTime) * (0.75 + 0.3 * diff), dos);

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
