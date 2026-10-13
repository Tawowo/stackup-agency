/**
 * Shaders du MONOLITHE.
 *
 * Écrits à la main plutôt que composés depuis `MeshStandardMaterial` : la
 * lumière rasante dont le site a besoin n'est pas un éclairage physiquement
 * correct, c'est un pic d'intensité sur les arêtes quasi tangentes. Un PBR
 * standard l'atténue précisément là où on le veut.
 *
 * L'angle -18° est le même que celui des dégradés CSS (`--su-angle-lumiere`),
 * passé en uniforme pour que la cohérence soit vérifiable et non approximative.
 */

export const monolitheVertex = /* glsl */ `
  attribute float aPhase;
  attribute float aNiveau;

  uniform float uTemps;
  uniform float uAssemblage;
  uniform float uDesassemblage;
  uniform vec2  uPointeur;

  varying vec3  vNormale;
  varying float vNiveau;
  varying float vFresnel;
  varying float vOpacite;
  varying float vHauteur;

  void main() {
    vec4 pos = instanceMatrix * vec4(position, 1.0);

    // ---- Assemblage : chaque strate se pose à son tour, de bas en haut ----
    // La fenêtre d'arrivée se déplace avec le niveau : les strates basses sont
    // déjà posées quand les hautes arrivent encore.
    float arrivee = clamp((uAssemblage - aNiveau * 0.55) / 0.45, 0.0, 1.0);
    // Décélération cubique : même famille de courbe que --su-pose.
    float pose = 1.0 - pow(1.0 - arrivee, 3.0);

    pos.y += (1.0 - pose) * 3.2;
    pos.x += (1.0 - pose) * 0.45;

    // ---- Respiration au repos ----
    // Déphasage par instance : la pile ondule au lieu de pulser en bloc.
    float respiration = sin(uTemps * 0.55 + aPhase * 6.2831853) * 0.028;
    pos.y += respiration * pose;
    pos.x += cos(uTemps * 0.38 + aPhase * 6.2831853) * 0.018 * pose;

    // ---- Désassemblage au défilement ----
    // Les strates s'écartent en alternance et s'élèvent : la structure se
    // délite au lieu de simplement disparaître en fondu.
    float sens = mod(floor(aNiveau * 37.0), 2.0) * 2.0 - 1.0;
    float ampleur = uDesassemblage * uDesassemblage;
    pos.x += ampleur * sens * (0.8 + aNiveau * 3.4);
    pos.y += ampleur * (aNiveau - 0.5) * 2.6;

    // ---- Parallaxe du pointeur ----
    // Les strates hautes réagissent davantage : la pile semble avoir une
    // inertie, les niveaux profonds sont « ancrés ».
    pos.x += uPointeur.x * (0.14 + aNiveau * 0.34);
    pos.y += uPointeur.y * (0.09 + aNiveau * 0.22);

    vec4 vue = modelViewMatrix * pos;

    // Pour des instances à échelle non uniforme mais sans cisaillement, la
    // matrice 3x3 de l'instance suffit à orienter correctement la normale.
    vNormale = normalize(normalMatrix * mat3(instanceMatrix) * normal);

    vec3 versCamera = normalize(-vue.xyz);
    vFresnel = pow(1.0 - abs(dot(vNormale, versCamera)), 2.6);

    vNiveau  = aNiveau;
    vHauteur = pos.y;
    vOpacite = pose * (1.0 - uDesassemblage * 0.9);

    gl_Position = projectionMatrix * vue;
  }
`

export const monolitheFragment = /* glsl */ `
  precision highp float;

  uniform vec3  uMatiere;
  uniform vec3  uOmbre;
  uniform vec3  uLumiere;
  uniform vec3  uRim;
  uniform float uTemps;
  uniform float uAngleLumiere;
  uniform float uEffets;

  varying vec3  vNormale;
  varying float vNiveau;
  varying float vFresnel;
  varying float vOpacite;
  varying float vHauteur;

  // Bruit de valeur sans texture : aucune requête réseau, aucun échantillonneur.
  float alea(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    // Direction de la lumière, dérivée de l'angle unique du site.
    // Composante dans le plan de l'écran : (cos α, sin α).
    // Composante vers le spectateur : faible, pour que l'éclairage reste rasant.
    vec2 plan = vec2(cos(uAngleLumiere), sin(uAngleLumiere));
    vec3 dirLumiere = normalize(vec3(-plan.x, -plan.y, 0.55));

    vec3 N = normalize(vNormale);

    // ---- Matière ---------------------------------------------------------
    // Gradient vertical : le haut de la pile capte davantage de lumière
    // ambiante. Sans lui, la silhouette est un aplat et perd tout volume.
    float hauteur = smoothstep(-3.8, 3.8, vHauteur);
    vec3 couleur = mix(uOmbre, uMatiere, 0.52 + 0.48 * hauteur);

    // Diffus doux, borné : la matière ne doit jamais virer au noir, sinon
    // elle « troue » le fond ivoire au lieu de s'y poser.
    float diffus = max(dot(N, dirLumiere), 0.0);
    couleur = mix(couleur, uMatiere * 1.22, diffus * 0.42);

    // ---- Le balayage ------------------------------------------------------
    // C'est la signature du site : une bande de lumière dorée qui remonte la
    // pile et révèle les strates une à une au lieu de les éclairer toutes en
    // permanence. Un éclairage statique rendait l'or invisible, noyé dans le
    // navy ; un or constant partout aurait fait un objet doré, pas une
    // structure révélée par la lumière.
    //
    // Gaussienne et non créneau : les bords d'un créneau se verraient comme
    // deux lignes nettes qui montent, ce qui lirait comme un balayage de
    // scanner — exactement le cliché à éviter.
    float tete = fract(uTemps * 0.085);
    float d = vNiveau - tete;
    // Distance circulaire : la bande ressort en bas pendant qu'elle sort en
    // haut, sans saut visible à la boucle.
    d = d - floor(d + 0.5);
    float bande = exp(-d * d * 240.0);

    // ---- Arêtes supérieures ----------------------------------------------
    // Les faces du dessus des plaques. Les éclairer séparément est ce qui fait
    // lire « une pile de strates » plutôt que « un volume torsadé » : chaque
    // couche se détache de celle du dessous par un liseré clair.
    float dessus = max(N.y, 0.0);
    couleur += uLumiere * pow(dessus, 3.0) * (0.22 + bande * 1.1);

    // La bande ne frôle pas les plaques, elle les traverse : la strate
    // qu'elle occupe s'illumine entièrement. À cet angle de caméra les faces
    // supérieures ne couvrent que quelques pixels — les éclairer seules
    // rendait le balayage invisible, ce qu'une capture a confirmé.
    // Dégradé de température dans la bande : cœur presque blanc, franges
    // ambrées. Une bande d'une seule teinte lisait comme un aplat de peinture
    // orange ; la lumière réelle se désature vers son centre d'intensité.
    vec3 coeur = mix(uLumiere, vec3(1.0, 0.97, 0.89), 0.78);
    couleur = mix(couleur, mix(uLumiere, coeur, bande) * 0.95, bande * 0.52);

    // Halo court autour de la bande : évite la découpe nette entre la strate
    // éclairée et sa voisine restée sombre.
    couleur += uLumiere * bande * bande * 0.22;

    // ---- Rasance ----------------------------------------------------------
    // Exposant élevé volontairement : la lumière rasante doit être une ligne,
    // pas un lavis. Un exposant faible saturait des plaques entières en orange
    // et détruisait la lecture navy de la matière.
    float rasance = pow(diffus, 36.0);
    couleur += uLumiere * rasance * (0.5 + bande * 1.1);

    // La bande réchauffe aussi très légèrement la matière qu'elle traverse,
    // sinon elle flotte au-dessus de l'objet au lieu de l'éclairer.
    couleur += uLumiere * bande * 0.085;

    // ---- Liseré de silhouette ---------------------------------------------
    // Teinte froide, pas dorée : sur fond ivoire, un contour chaud bave et
    // empâte le bord. Un bleu électrique découpe la forme proprement.
    couleur += uRim * pow(vFresnel, 1.5) * 0.3;

    if (uEffets > 0.5) {
      // Grain animé : casse les dégradés en bandes, visibles sur fond clair.
      float grain = alea(gl_FragCoord.xy + floor(uTemps * 24.0));
      couleur += (grain - 0.5) * 0.022;
    }

    gl_FragColor = vec4(couleur, vOpacite);
  }
`
