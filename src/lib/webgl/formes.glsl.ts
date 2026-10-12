/**
 * LES FORMES — géométrie procédurale calculée dans le vertex shader.
 *
 * Chaque particule connaît sa graine (`aGraine`) et son rang (`aRang`). Une
 * forme est une fonction (graine, rang) → position. Aucune position n'est
 * stockée en mémoire : passer d'une forme à l'autre ne coûte qu'un uniforme.
 *
 * C'est ce qui rend la métamorphose possible à 60 000 particules sans tampon
 * de positions : on n'interpole pas des données, on interpole deux fonctions.
 */

export const formesGLSL = /* glsl */ `
  #define PI 6.2831853

  // ── Bruit de valeur 3D, pour les turbulences ────────────────────────────
  float alea(vec3 p) {
    return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453);
  }

  float bruit(vec3 p) {
    vec3 i = floor(p);
    vec3 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float n = mix(
      mix(mix(alea(i), alea(i + vec3(1,0,0)), f.x),
          mix(alea(i + vec3(0,1,0)), alea(i + vec3(1,1,0)), f.x), f.y),
      mix(mix(alea(i + vec3(0,0,1)), alea(i + vec3(1,0,1)), f.x),
          mix(alea(i + vec3(0,1,1)), alea(i + vec3(1,1,1)), f.x), f.y),
      f.z);
    return n;
  }

  // Gradient du bruit → champ de vitesse sans divergence (curl).
  // Produit des volutes au lieu d'une agitation aléatoire : c'est la
  // différence entre « de la poussière » et « de la matière en mouvement ».
  vec3 rotationnel(vec3 p) {
    const float e = 0.12;
    float n1 = bruit(p + vec3(0.0, e, 0.0)) - bruit(p - vec3(0.0, e, 0.0));
    float n2 = bruit(p + vec3(0.0, 0.0, e)) - bruit(p - vec3(0.0, 0.0, e));
    float n3 = bruit(p + vec3(e, 0.0, 0.0)) - bruit(p - vec3(e, 0.0, 0.0));
    return normalize(vec3(n1 - n2, n2 - n3, n3 - n1) + 1e-5);
  }

  // ── 0 · LA DISPERSION ───────────────────────────────────────────────────
  // Avant l'assemblage, après la dissolution. Coquille sphérique irrégulière,
  // creuse au centre pour que le titre reste lisible au travers.
  vec3 formeDispersion(vec3 g, float rang) {
    float r = 9.0 + g.z * 7.0;
    float th = g.x * PI;
    float ph = acos(clamp(g.y * 2.0 - 1.0, -1.0, 1.0));
    return vec3(r * sin(ph) * cos(th), r * cos(ph) * 0.8, r * sin(ph) * sin(th));
  }

  // ── 1 · LE MONOLITHE ────────────────────────────────────────────────────
  // Des plaques empilées, vissées sur leur hauteur. Les particules se posent
  // sur le PÉRIMÈTRE de chaque plaque : on lit des arêtes, pas un volume flou.
  vec3 formeMonolithe(vec3 g, float rang) {
    // 26 plateaux séparés par du vide, et non 52 couches jointives.
    //
    // La version précédente donnait une colonne lisse : les couches se
    // touchaient, le regard n'y lisait aucune structure. En les espaçant et
    // en les épaississant, la silhouette redevient ce que le nom de l'agence
    // désigne — un empilement. On voit les plateaux, donc on voit qu'on a
    // construit quelque chose.
    const float plateaux = 26.0;
    float c = floor(g.x * plateaux);
    float t = c / (plateaux - 1.0);

    // Rythme délibéré plutôt que bruit : large à la base, resserré au tiers,
    // puis une reprise vers le sommet. Une silhouette se dessine, elle ne se
    // tire pas au hasard.
    float largeur =
      2.35
      - 0.78 * smoothstep(0.0, 0.42, t)
      + 0.52 * smoothstep(0.52, 0.86, t)
      - 0.60 * smoothstep(0.88, 1.0, t);
    float prof = largeur * 0.66;

    // Le plateau a une épaisseur : les particules se répartissent sur sa
    // tranche, pas sur une ligne. C'est ce qui lui donne de la matière.
    float epaisseur = 0.16;

    float per = 2.0 * (largeur + prof);
    float d = fract(g.y * 3.0) * per;

    vec2 p;
    if (d < largeur)                      p = vec2(d - largeur * 0.5, prof * 0.5);
    else if (d < largeur + prof)          p = vec2(largeur * 0.5, prof * 0.5 - (d - largeur));
    else if (d < 2.0 * largeur + prof)    p = vec2(largeur * 0.5 - (d - largeur - prof), -prof * 0.5);
    else                                  p = vec2(-largeur * 0.5, -prof * 0.5 + (d - 2.0 * largeur - prof));

    // Vrille progressive : 1,2 rad du bas au sommet. Assez pour que deux
    // plateaux voisins ne se superposent jamais exactement, pas assez pour
    // que l'empilement parte en torsade.
    float ang = t * 1.2;
    float ca = cos(ang), sa = sin(ang);
    vec2 r = vec2(p.x * ca - p.y * sa, p.x * sa + p.y * ca);

    // Hauteur totale 9, centrée : le sommet et la base gardent de l'air dans
    // le cadre au lieu de sortir par les bords.
    float y = t * 9.0 - 4.5 + (fract(g.z * 7.3) - 0.5) * epaisseur;
    return vec3(r.x, y, r.y);
  }

  // ── 2 · LA MAQUETTE ─────────────────────────────────────────────────────
  // Les mêmes particules dessinent une page web en fil de fer : barre de
  // navigation, titre, image, trois cartes, pied de page. C'est le moment où
  // l'abstrait devient concret — le métier de l'agence, littéralement.
  vec3 formeMaquette(vec3 g, float rang) {
    // 8 blocs : (centre x, centre y, demi-largeur, demi-hauteur)
    float b = floor(g.x * 8.0);
    vec4 blocs[8];
    blocs[0] = vec4( 0.0,  4.30, 5.40, 0.30);  // barre de navigation
    blocs[1] = vec4(-2.60, 2.70, 2.70, 0.70);  // titre
    blocs[2] = vec4(-3.20, 1.35, 2.10, 0.26);  // accroche
    blocs[3] = vec4(-4.10, 0.35, 1.20, 0.34);  // bouton
    blocs[4] = vec4( 2.80, 2.00, 2.50, 2.00);  // visuel
    blocs[5] = vec4(-3.60,-1.80, 1.70, 1.15);  // carte 1
    blocs[6] = vec4( 0.00,-1.80, 1.70, 1.15);  // carte 2
    blocs[7] = vec4( 3.60,-1.80, 1.70, 1.15);  // carte 3

    vec4 bl = blocs[int(b)];
    float per = 4.0 * (bl.z + bl.w);
    float d = fract(g.y * 5.0) * per;

    vec2 p;
    float l2 = bl.z * 2.0, h2 = bl.w * 2.0;
    if (d < l2)                 p = vec2(-bl.z + d, bl.w);
    else if (d < l2 + h2)       p = vec2(bl.z, bl.w - (d - l2));
    else if (d < 2.0*l2 + h2)   p = vec2(bl.z - (d - l2 - h2), -bl.w);
    else                        p = vec2(-bl.z, -bl.w + (d - 2.0*l2 - h2));

    // Léger relief : les blocs ne sont pas tous dans le même plan.
    float z = (b - 3.5) * 0.22 + (g.z - 0.5) * 0.12;
    return vec3(bl.x + p.x, bl.y + p.y - 0.6, z);
  }

  // ── 3 · LE NOYAU ────────────────────────────────────────────────────────
  // Sphère dense et structurée : le logiciel métier, compact et plein.
  // Les particules se rangent sur une spirale de Fibonacci — réparties
  // uniformément, sans l'agglutinement aux pôles d'un tirage naïf.
  vec3 formeNoyau(vec3 g, float rang) {
    float n = 60000.0;
    float i = rang + 0.5;
    float ph = acos(1.0 - 2.0 * i / n);
    float th = PI * 0.6180339887 * i;

    // Coquilles concentriques : la surface est dense, l'intérieur respire.
    float couche = floor(g.z * 3.0);
    float r = 3.4 - couche * 0.72;

    // Ondulation de surface : le noyau n'est pas une bille lisse.
    r += sin(th * 6.0) * cos(ph * 5.0) * 0.14;

    return vec3(r * sin(ph) * cos(th), r * cos(ph), r * sin(ph) * sin(th));
  }

  // ── 4 · LE FLUX ─────────────────────────────────────────────────────────
  // Un ruban qui serpente : les données qui circulent entre les outils.
  vec3 formeFlux(vec3 g, float rang) {
    float t = g.x;
    float u = t * PI;

    // Courbe maîtresse — un nœud ouvert, pas un simple cercle.
    vec3 c = vec3(
      sin(u) * 5.2 + sin(u * 2.0) * 1.6,
      sin(u * 3.0) * 2.1,
      cos(u) * 4.4 + cos(u * 2.0) * 1.2
    );

    // Section du ruban : plat, pas tubulaire — il doit capter la lumière.
    float a = fract(g.y * 7.0) * PI;
    vec3 n1 = normalize(vec3(cos(u), 0.0, -sin(u)));
    vec3 n2 = vec3(0.0, 1.0, 0.0);
    float largeur = 0.85 + sin(u * 4.0) * 0.25;

    return c + n1 * cos(a) * largeur + n2 * sin(a) * 0.16 + (g.z - 0.5) * 0.1;
  }

  // ── Sélecteur ───────────────────────────────────────────────────────────
  vec3 forme(int id, vec3 g, float rang) {
    if (id == 0) return formeDispersion(g, rang);
    if (id == 1) return formeMonolithe(g, rang);
    if (id == 2) return formeMaquette(g, rang);
    if (id == 3) return formeNoyau(g, rang);
    return formeFlux(g, rang);
  }
`
