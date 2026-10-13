/**
 * LE NUAGE — shaders.
 *
 * Trois partis pris qui font la différence entre « des points qui bougent »
 * et une métamorphose :
 *
 * 1. La transition est DÉCALÉE. Si toutes les particules partent ensemble,
 *    on voit un glissement de bloc. Décalées par leur rang, elles se
 *    déplacent en vague et la forme se défait puis se refait.
 *
 * 2. Elles voyagent EN ARC. Une interpolation linéaire donne un trajet mort.
 *    En poussant chaque particule vers l'extérieur au milieu de sa course,
 *    la forme explose puis se rassemble.
 *
 * 3. La turbulence est un champ ROTATIONNEL, pas du bruit ajouté. Les
 *    particules tournoient ensemble au lieu de grésiller chacune dans son
 *    coin.
 */

import { formesGLSL } from './formes.glsl'

export const nuageVertex = /* glsl */ `
  attribute vec3 aGraine;
  attribute float aRang;

  uniform float uTemps;
  uniform float uTotal;

  uniform int   uFormeA;
  uniform int   uFormeB;
  uniform float uMorph;        // 0 → forme A, 1 → forme B
  uniform float uAssemblage;   // 0 → 1 à l'arrivée sur la page

  uniform vec3  uPointeur;     // position du pointeur en espace monde
  uniform float uForcePointeur;
  uniform float uTurbulence;
  uniform float uTaille;
  uniform float uDpr;
  uniform float uEclat;        // impulsion ponctuelle (clic)

  varying float vProfondeur;
  varying float vVitesse;
  varying float vRang;
  varying float vEclat;

  ${formesGLSL}

  void main() {
    float n = aRang / uTotal;

    // ── Transition décalée ────────────────────────────────────────────────
    // Chaque particule a sa propre fenêtre de 65 % à l'intérieur de la
    // transition globale. Les premières sont arrivées quand les dernières
    // n'ont pas encore bougé.
    float retard = fract(aGraine.z * 3.7) * 0.35;
    float m = clamp((uMorph - retard) / 0.65, 0.0, 1.0);
    // Accélération puis décélération, franche des deux côtés.
    float e = m * m * (3.0 - 2.0 * m);

    vec3 a = forme(uFormeA, aGraine, aRang);
    vec3 b = forme(uFormeB, aGraine, aRang);
    vec3 p = mix(a, b, e);

    // ── Voyage en arc ─────────────────────────────────────────────────────
    // Au milieu de la course, la particule s'écarte de l'axe : la forme
    // enfle avant de se refermer.
    float transit = sin(e * 3.14159265);
    vec3 ecart = normalize(mix(a, b, 0.5) + 1e-4);
    p += ecart * transit * (1.6 + aGraine.y * 2.2);

    // ── Assemblage initial ────────────────────────────────────────────────
    // À l'arrivée sur la page, les particules viennent de loin, en vague.
    float arr = clamp((uAssemblage - retard * 1.4) / 0.6, 0.0, 1.0);
    float ea = 1.0 - pow(1.0 - arr, 3.0);
    p = mix(p * (1.0 + (1.0 - ea) * 5.0) + vec3(0.0, (1.0 - ea) * 6.0, 0.0), p, ea);

    // ── Turbulence rotationnelle ──────────────────────────────────────────
    vec3 volute = rotationnel(p * 0.16 + vec3(uTemps * 0.055, 0.0, uTemps * 0.03));
    float ampleur = uTurbulence * (0.35 + transit * 2.4) * (0.5 + aGraine.x);
    p += volute * ampleur;

    // Respiration lente au repos, pour que rien ne soit jamais figé.
    p += volute * sin(uTemps * 0.5 + aRang * 0.013) * 0.07;

    // ── Répulsion par le pointeur ─────────────────────────────────────────
    vec3 versPointeur = p - uPointeur;
    float dist = length(versPointeur);
    float influence = uForcePointeur * exp(-dist * dist * 0.055);
    p += normalize(versPointeur + 1e-4) * influence * 2.6;

    // ── Impulsion au clic ─────────────────────────────────────────────────
    float souffle = uEclat * exp(-dist * dist * 0.012);
    p += normalize(versPointeur + 1e-4) * souffle * 7.0;

    vec4 vue = modelViewMatrix * vec4(p, 1.0);

    vProfondeur = clamp((-vue.z - 6.0) / 26.0, 0.0, 1.0);
    vVitesse = transit;
    vRang = n;
    vEclat = influence + souffle;

    // Taille en pixels, atténuée par la distance. Les particules proches
    // deviennent des points francs, les lointaines un voile.
    // Dispersion resserrée : à 0.55–1.45 les grosses particules faisaient
    // des pâtés qui écrasaient le dessin de la forme. À 0.7–1.3 le nuage
    // garde du grain sans empâter.
    float taille = uTaille * (0.7 + aGraine.y * 0.6);
    taille *= 1.0 + transit * 0.7 + influence * 2.0;
    gl_PointSize = taille * uDpr * (24.0 / max(-vue.z, 1.0));

    gl_Position = projectionMatrix * vue;
  }
`

export const nuageFragment = /* glsl */ `
  precision highp float;

  uniform vec3  uMatiere;     // couleur dominante
  uniform vec3  uAccent;      // couleur de l'accent
  uniform vec3  uLumiere;     // couleur de la lumière rasante
  uniform float uNuit;        // 0 = plein jour, 1 = encre
  uniform float uOpacite;

  varying float vProfondeur;
  varying float vVitesse;
  varying float vRang;
  varying float vEclat;

  void main() {
    // Point rond avec un bord adouci. Un carré se voit immédiatement.
    vec2 d = gl_PointCoord - 0.5;
    float r2 = dot(d, d);
    if (r2 > 0.25) discard;

    // Deux profils de bord selon l'ambiance. De jour le point est net et
    // discret ; de nuit il porte un halo, ce qui lui donne sa qualité de
    // source lumineuse plutôt que de pastille.
    float net  = smoothstep(0.25, 0.05, r2);
    float halo = smoothstep(0.25, 0.0, r2);
    halo *= halo;
    float bord = mix(net, halo * 0.55 + net * 0.65, uNuit);

    // La profondeur éclaircit le jour, assombrit la nuit : dans les deux cas
    // le lointain recule.
    vec3 fond = mix(uMatiere, uMatiere * 1.45, vProfondeur);

    // Une particule sur sept porte l'accent : la couleur ponctue, elle ne
    // teinte pas tout.
    float marque = step(0.858, fract(vRang * 137.17));
    vec3 c = mix(fond, uAccent, marque * 0.85);

    // Pendant le transit, la matière chauffe : on voit l'énergie du passage.
    c = mix(c, uLumiere, vVitesse * 0.55);

    // Autour du pointeur, la matière s'illumine.
    c = mix(c, uLumiere, clamp(vEclat * 1.6, 0.0, 0.9));

    // Le lointain s'efface, de jour comme de nuit.
    //
    // La version précédente faisait l'inverse la nuit — l'alpha croissait
    // avec la profondeur, si bien que le fond du nuage brillait plus que son
    // avant et que la forme perdait tout relief. Corrigé : la profondeur
    // atténue toujours, un peu plus fort de nuit où l'additif cumule.
    float recul = 1.0 - vProfondeur * mix(0.5, 0.72, uNuit);
    float a = bord * uOpacite * recul;

    // Le transit rend la matière momentanément plus dense : la métamorphose
    // se voit aussi à la luminosité, pas seulement au déplacement.
    a *= 1.0 + vVitesse * 0.45;

    gl_FragColor = vec4(c, clamp(a, 0.0, 1.0));
  }
`
