/**
 * LA FABRIQUE — le monde 3D commun à tous les plans.
 *
 * Atelier numérique de nuit : sol quadrillé en perspective, lumière ambre
 * comme unique source franche, flux de particules de données, halos. Le ciel
 * (dégradé navy) et le code vivant sont en CSS derrière un canvas transparent.
 *
 * Contraintes de rendu mesurées : pas d'ombres portées ni de passe de
 * profondeur de champ (×6 sur le temps de rendu en WebGL logiciel). La
 * profondeur passe par le brouillard, le bokeh d'avant-plan et la lumière.
 */
import * as THREE from "three";
import { alea, clamp } from "./outils.js";

export const C3 = {
  nuit: 0x0b1e36,
  nuit2: 0x102a4a,
  navyLogo: 0x0d2c4c,
  navy: 0x1e3a5f,
  ambre: 0xf69106,
  ivoire: 0xfffdf9,
  orClair: 0xfbbf24,
};

export const SOL_Y = -2.6;

export function creerMonde(canvas, L, H) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(1);
  renderer.setSize(L, H, false);
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(C3.nuit, 14, 46);
  const camera = new THREE.PerspectiveCamera(36, L / H, 0.05, 200);

  // ── Lumières : l'ambre est la source ; le reste n'est que du rebond.
  const hemi = new THREE.HemisphereLight(0x9fb8dd, 0x0b1e36, 0.85);
  scene.add(hemi);
  const cle = new THREE.DirectionalLight(C3.ambre, 2.4);
  cle.position.set(-6, 7, 5); // lumière rasante, −18° comme sur le site
  scene.add(cle);
  const contre = new THREE.DirectionalLight(0xcfe0ff, 0.55);
  contre.position.set(5, 3, -6);
  scene.add(contre);
  const source = new THREE.PointLight(C3.ambre, 0, 30, 1.6); // la lumière qui jaillit
  scene.add(source);

  const monde = { renderer, scene, camera, L, H, aspect: L / H, hemi, cle, contre, source };
  monde.sol = creerSol(scene);
  monde.halo = creerHalos(scene);
  monde.flux = creerFlux(scene);
  monde.bokeh = creerBokeh(scene);
  monde.flou = creerFlou(renderer, L, H);
  return monde;
}

/* ── CADRAGE ─────────────────────────────────────────────────────────────
   La caméra se décrit par ce qu'elle doit montrer, pas par sa position :
   une cible, un angle (lacet, tangage), et une boîte (largeur × hauteur en
   unités monde) qui doit tenir dans le cadre. La distance se déduit du
   format. C'est ce qui permet aux mêmes plans de se recomposer en 9:16 et
   en 1:1 sans réécrire chaque mouvement. */
export function cadrer(monde, { cible, lacet = 0, tangage = 0, roulis = 0, boite = [4, 2.5], marge = 1.08, fov = 36, decalage = [0, 0], remplir = false }) {
  const cam = monde.camera;
  cam.fov = fov;
  const v = Math.tan(THREE.MathUtils.degToRad(fov / 2));
  const dH = (boite[1] / 2) / v;
  const dL = (boite[0] / 2) / (v * monde.aspect);
  // remplir : la boîte couvre tout le cadre (quitte à être rognée)
  const d = (remplir ? Math.min(dH, dL) : Math.max(dH, dL)) * marge;
  const cy = Math.cos(tangage), sy = Math.sin(tangage);
  const dir = new THREE.Vector3(Math.sin(lacet) * cy, sy, Math.cos(lacet) * cy);
  const c = new THREE.Vector3(...cible);
  cam.position.copy(c).addScaledVector(dir, d);
  cam.up.set(Math.sin(roulis), Math.cos(roulis), 0);
  cam.lookAt(c);
  // décalage optique (déporte le sujet dans le cadre) en fraction du cadre
  if (decalage[0] || decalage[1]) {
    cam.setViewOffset(monde.L, monde.H, -decalage[0] * monde.L, decalage[1] * monde.H, monde.L, monde.H);
  } else cam.clearViewOffset();
  cam.updateProjectionMatrix();
  return d;
}

/* ── LE SOL : quadrillage en perspective, qui peut « s'allumer ». */
function creerSol(scene) {
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uAllume: { value: 0.35 },
      uCentre: { value: new THREE.Vector2(0, 0) },
      uAnneau: { value: 0 },
      uTemps: { value: 0 },
      uOpacite: { value: 1 },
    },
    vertexShader: `varying vec3 vP; void main(){ vec4 w = modelMatrix*vec4(position,1.); vP=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader: `
      varying vec3 vP; uniform float uAllume; uniform vec2 uCentre; uniform float uAnneau; uniform float uTemps; uniform float uOpacite;
      float grille(vec2 p, float pas, float ep){ vec2 g = abs(fract(p/pas-0.5)-0.5)/fwidth(p/pas); return 1.-min(min(g.x,g.y)/ep,1.); }
      void main(){
        vec2 p = vP.xz;
        float d = length(p - uCentre);
        float fin = grille(p, 0.5, 1.0);
        float maj = grille(p, 2.5, 1.4);
        float fondu = exp(-d*0.055);
        vec3 ivoire = vec3(1.0,0.99,0.976);
        vec3 ambre = vec3(0.965,0.569,0.024);
        float lueur = exp(-d*d*0.035) * uAllume;
        float anneau = exp(-pow(d - uAnneau, 2.0)*3.0) * step(0.01, uAnneau) * uAllume;
        vec3 col = ivoire * (fin*0.10 + maj*0.22) + ambre * (lueur*0.55 + anneau*0.9 + maj*lueur*0.8);
        float a = (fin*0.35 + maj*0.6) * fondu * (0.45+uAllume) + lueur*0.35 + anneau*0.6;
        gl_FragColor = vec4(col, clamp(a,0.,1.) * uOpacite);
      }`,
    extensions: { derivatives: true },
  });
  const sol = new THREE.Mesh(new THREE.PlaneGeometry(220, 220, 1, 1), mat);
  sol.rotation.x = -Math.PI / 2;
  sol.position.y = SOL_Y;
  sol.renderOrder = -2;
  scene.add(sol);
  return sol;
}

/* ── HALOS : sprites additifs (la lumière ambre qui jaillit, les sources). */
function texHalo(interne = "rgba(255,190,90,1)", externe = "rgba(246,145,6,0)") {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d");
  const r = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  r.addColorStop(0, interne);
  r.addColorStop(0.25, "rgba(246,145,6,0.55)");
  r.addColorStop(1, externe);
  g.fillStyle = r;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function creerHalos(scene) {
  const tex = texHalo();
  const mk = () => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0, fog: false }));
    s.renderOrder = 5;
    scene.add(s);
    return s;
  };
  return { principal: mk(), second: mk(), troisieme: mk() };
}

/* ── FLUX DE DONNÉES : particules sur des couloirs, entièrement calculées
   dans le shader à partir du temps (déterministe, et gratuit pour le CPU). */
function creerFlux(scene) {
  const N = 2600;
  const r = alea(42);
  const graine = new Float32Array(N * 4);
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    graine[i * 4] = r(); // phase
    graine[i * 4 + 1] = r(); // couloir
    graine[i * 4 + 2] = r(); // vitesse
    graine[i * 4 + 3] = r(); // taille
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aGraine", new THREE.BufferAttribute(graine, 4));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uTemps: { value: 0 },
      uIntensite: { value: 0.6 },
      uAspiration: { value: 0 }, // 1 = tout converge vers uPoint
      uPoint: { value: new THREE.Vector3() },
      uLiens: { value: 0 }, // flux qui relient les trois objets (plan 4)
      uA: { value: new THREE.Vector3(-4, 0, 0) },
      uB: { value: new THREE.Vector3(0, 0, 0) },
      uC: { value: new THREE.Vector3(4, 0, 0) },
      uEchelle: { value: 1 },
    },
    vertexShader: `
      attribute vec4 aGraine; uniform float uTemps; uniform float uAspiration; uniform vec3 uPoint;
      uniform float uLiens; uniform vec3 uA; uniform vec3 uB; uniform vec3 uC; uniform float uEchelle;
      varying float vA; varying float vAmbre;
      void main(){
        float ph = aGraine.x, cl = aGraine.y, v = 0.25 + aGraine.z*0.9;
        float s = fract(ph + uTemps*v*0.12);
        // couloirs : de grandes nappes horizontales qui traversent la Fabrique
        float lane = floor(cl*14.0);
        vec3 p = vec3(mix(-26.0, 26.0, s), -2.0 + lane*0.55 + sin(s*6.28+lane)*0.25, -18.0 + fract(cl*7.3)*26.0);
        // liens entre objets : la particule glisse le long A→B→C
        vec3 q = s < 0.5 ? mix(uA, uB, s*2.0) : mix(uB, uC, s*2.0-1.0);
        q += vec3(0.0, sin(s*12.0+ph*40.0)*0.08, cos(s*9.0+ph*30.0)*0.08);
        p = mix(p, q, uLiens * step(0.55, cl));
        // aspiration vers un point
        p = mix(p, uPoint, uAspiration * smoothstep(0.0, 1.0, uAspiration*1.2 - ph*0.2));
        vec4 mv = modelViewMatrix * vec4(p,1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = (2.0 + aGraine.w*4.0) * uEchelle * (10.0 / -mv.z);
        vA = smoothstep(0.0,0.1,s)*smoothstep(1.0,0.9,s);
        vAmbre = step(0.72, fract(cl*13.7));
      }`,
    fragmentShader: `
      uniform float uIntensite; varying float vA; varying float vAmbre;
      void main(){ vec2 d = gl_PointCoord-0.5; float a = smoothstep(0.5,0.0,length(d));
        vec3 col = mix(vec3(0.75,0.85,1.0), vec3(0.965,0.6,0.1), vAmbre);
        gl_FragColor = vec4(col*a, a*vA*uIntensite); }`,
  });
  const pts = new THREE.Points(geo, mat);
  pts.frustumCulled = false;
  scene.add(pts);
  return pts;
}

/* ── BOKEH : grosses taches floues tout près de l'objectif (fausse
   profondeur de champ, presque gratuite). */
function creerBokeh(scene) {
  const tex = texHalo("rgba(255,230,190,0.9)", "rgba(255,200,120,0)");
  const r = alea(9);
  const groupe = new THREE.Group();
  for (let i = 0; i < 18; i++) {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, transparent: true, opacity: 0.0, fog: false }));
    s.userData = { x: r() * 2 - 1, y: r() * 2 - 1, z: 0.2 + r() * 0.5, v: r(), taille: 0.04 + r() * 0.1, ambre: r() > 0.5 };
    if (!s.userData.ambre) s.material.color.set(0x9fc0ff);
    s.renderOrder = 20;
    groupe.add(s);
  }
  scene.add(groupe);
  return groupe;
}

/** Place le bokeh dans le repère de la caméra (il suit l'objectif). */
export function majBokeh(monde, t, intensite = 0.35) {
  const cam = monde.camera;
  const v = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
  monde.bokeh.children.forEach((s, i) => {
    const u = s.userData;
    const z = u.z * 2.2;
    const h = 2 * z * v, w = h * monde.aspect;
    const x = ((u.x + t * 0.03 * (u.v - 0.5) + 3) % 2) - 1;
    const y = u.y + Math.sin(t * 0.4 + i) * 0.05;
    const p = new THREE.Vector3(x * w * 0.6, y * h * 0.6, -z);
    p.applyMatrix4(cam.matrixWorld);
    s.position.copy(p);
    s.scale.setScalar(u.taille * h * 2.2);
    s.material.opacity = intensite * (0.25 + 0.5 * u.v);
  });
}

/* ── FLOU DE MOUVEMENT : on rend N sous-images légèrement décalées dans le
   temps et on en fait la moyenne. Réservé aux mouvements rapides : chaque
   sous-image coûte une image complète. */
function creerFlou(renderer, L, H) {
  const N = 4;
  const cibles = Array.from({ length: N }, () => new THREE.WebGLRenderTarget(L, H, { samples: 4, type: THREE.HalfFloatType }));
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    uniforms: { t0: { value: null }, t1: { value: null }, t2: { value: null }, t3: { value: null }, n: { value: 4 } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.,1.); }`,
    fragmentShader: `varying vec2 vUv; uniform sampler2D t0; uniform sampler2D t1; uniform sampler2D t2; uniform sampler2D t3; uniform float n;
      void main(){ vec4 c = texture2D(t0,vUv)+texture2D(t1,vUv);
        if(n>2.5) c += texture2D(t2,vUv); if(n>3.5) c += texture2D(t3,vUv);
        gl_FragColor = c/n;
        #include <tonemapping_fragment>
        #include <colorspace_fragment>
      }`,
    depthTest: false,
    depthWrite: false,
  });
  const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat);
  const sceneQuad = new THREE.Scene();
  sceneQuad.add(quad);
  const camQuad = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  return { cibles, mat, sceneQuad, camQuad, N };
}

/**
 * Rend l'image à l'instant t. `poser(t)` met toute la scène à l'instant t.
 * `obturation` (secondes) > 0 active le flou de mouvement.
 */
export function rendre(monde, t, poser, obturation = 0) {
  const { renderer, scene, camera, flou } = monde;
  if (obturation <= 0.0005) {
    poser(t);
    renderer.setRenderTarget(null);
    renderer.render(scene, camera);
    return;
  }
  const n = obturation > 0.02 ? 4 : 3;
  for (let i = 0; i < n; i++) {
    poser(t - (obturation * i) / (n - 1));
    renderer.setRenderTarget(flou.cibles[i]);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.render(scene, camera);
  }
  poser(t); // l'état du DOM et des écrans revient à l'instant exact
  flou.mat.uniforms.t0.value = flou.cibles[0].texture;
  flou.mat.uniforms.t1.value = flou.cibles[1].texture;
  flou.mat.uniforms.t2.value = flou.cibles[2].texture;
  flou.mat.uniforms.t3.value = flou.cibles[Math.min(3, n - 1)].texture;
  flou.mat.uniforms.n.value = n;
  renderer.setRenderTarget(null);
  renderer.clear();
  renderer.render(flou.sceneQuad, flou.camQuad);
}

export { clamp };
