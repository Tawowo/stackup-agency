import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { webgl } from '../core/webgl';
import { NUMBER, COLORS_VEC } from '../config';
import { env } from '../core/env';
import { clamp, lerp, seededRandom } from '../core/utils';

/**
 * Scène 4 — Le chiffre 400.
 * Le contour SVG se dessine au scroll (stroke), puis se remplit du
 * dégradé, pendant que 400 particules (exactement) convergent depuis les
 * bords pour former la silhouette du chiffre, avant d'exploser doucement
 * en constellation flottante. Légende : « appels pour lancer cette agence ».
 */
export function initNumber() {
  const section = document.getElementById('number')!;
  const svg = document.getElementById('number-svg')!;
  const stroke = document.getElementById('stroke-text') as unknown as SVGTextElement;
  const fill = document.getElementById('fill-text')!;
  const caption = document.getElementById('number-caption')!;

  // ── Contour SVG : dessin progressif via dashoffset ──────────────
  const DASH = 2600; // périmètre approché de « 400 » à cette taille
  stroke.style.strokeDasharray = String(DASH);
  stroke.style.strokeDashoffset = String(DASH);

  // ── Échantillonne la silhouette « 400 » (positions cibles) ──────
  const targets = sampleGlyphPoints('400', NUMBER.particles);

  // ── Système de particules Three.js (pixel-space) ────────────────
  const scene = new THREE.Scene();
  const { w, h } = webgl.size;
  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1000, 1000);

  const count = NUMBER.particles;
  const rand = seededRandom(7);
  const positions = new Float32Array(count * 3);
  const start = new Float32Array(count * 3); // bord d'écran
  const target = new Float32Array(count * 3); // silhouette
  const constel = new Float32Array(count * 3); // constellation flottante
  const phase = new Float32Array(count); // décalage individuel

  const glyphW = Math.min(w, 900) * 0.9;
  const glyphH = glyphW * (320 / 600);

  for (let i = 0; i < count; i++) {
    // Cible : point de la silhouette, centré et mis à l'échelle.
    const t = targets[i];
    const tx = (t.x - 0.5) * glyphW;
    const ty = -(t.y - 0.5) * glyphH;
    target[i * 3] = tx;
    target[i * 3 + 1] = ty;
    target[i * 3 + 2] = 0;

    // Départ : depuis un bord aléatoire de l'écran.
    const edge = Math.floor(rand() * 4);
    const ex = edge === 0 ? -w / 2 : edge === 1 ? w / 2 : (rand() - 0.5) * w;
    const ey = edge === 2 ? -h / 2 : edge === 3 ? h / 2 : (rand() - 0.5) * h;
    start[i * 3] = ex;
    start[i * 3 + 1] = ey;
    start[i * 3 + 2] = 0;

    // Constellation : autour de la cible, dispersée.
    const spread = 120 + rand() * 220;
    const ang = rand() * Math.PI * 2;
    constel[i * 3] = tx + Math.cos(ang) * spread;
    constel[i * 3 + 1] = ty + Math.sin(ang) * spread;
    constel[i * 3 + 2] = (rand() - 0.5) * 60;

    positions[i * 3] = ex;
    positions[i * 3 + 1] = ey;
    positions[i * 3 + 2] = 0;
    phase[i] = rand() * Math.PI * 2;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    size: env.isMobile ? 5 : 4,
    color: new THREE.Color().fromArray(COLORS_VEC.electric),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const points = new THREE.Points(geo, mat);
  scene.add(points);

  let progress = 0; // piloté par le scroll dans le pin
  let elapsedT = 0;

  const layer = webgl.register({
    scene,
    camera,
    active: false,
    resize: (rw, rh) => {
      camera.left = -rw / 2;
      camera.right = rw / 2;
      camera.top = rh / 2;
      camera.bottom = -rh / 2;
      camera.updateProjectionMatrix();
    },
    update: (dt) => {
      elapsedT += dt;
      const arr = geo.attributes.position.array as Float32Array;
      // 0→0.55 : convergence bords → silhouette.
      // 0.55→0.7 : maintien de la silhouette.
      // 0.7→1 : explosion douce en constellation + flottement.
      const conv = clamp(progress / 0.55);
      const explode = clamp((progress - 0.7) / 0.3);
      for (let i = 0; i < count; i++) {
        const j = i * 3;
        const sx = lerp(start[j], target[j], easeOut(conv));
        const sy = lerp(start[j + 1], target[j + 1], easeOut(conv));
        const cx = lerp(target[j], constel[j], explode);
        const cy = lerp(target[j + 1], constel[j + 1], explode);
        const cz = lerp(0, constel[j + 2], explode);
        // Flottement organique quand en constellation.
        const float = explode * 10;
        arr[j] = lerp(sx, cx, explode) + Math.sin(elapsedT * 0.6 + phase[i]) * float;
        arr[j + 1] = lerp(sy, cy, explode) + Math.cos(elapsedT * 0.5 + phase[i]) * float;
        arr[j + 2] = cz;
      }
      geo.attributes.position.needsUpdate = true;
      mat.opacity = 0.35 + 0.6 * conv;
    },
  });

  // ── Timeline pinnée : synchronise stroke + fill + particules ────
  if (env.reducedMotion) {
    stroke.style.strokeDashoffset = '0';
    gsap.set(fill, { opacity: 1 });
    gsap.set(caption, { opacity: 1 });
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onToggle: (self) => (layer.active = self.isActive),
      onUpdate: (self) => (progress = self.progress),
    });
    progress = 1;
    return;
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: '+=180%',
    pin: true,
    scrub: 0.8,
    anticipatePin: 1,
    onToggle: (self) => (layer.active = self.isActive),
    onUpdate: (self) => {
      progress = self.progress;
      // Tracé du contour sur la première moitié.
      const s = clamp(self.progress / NUMBER.strokeFraction);
      stroke.style.strokeDashoffset = String(DASH * (1 - s));
      // Remplissage dégradé une fois le contour tracé.
      gsap.set(fill, { opacity: clamp((self.progress - 0.4) / 0.25) });
      gsap.set(svg, { opacity: 1 - clamp((self.progress - 0.72) / 0.2) * 0.35 });
      gsap.set(caption, { opacity: clamp((self.progress - 0.5) / 0.2), y: (1 - clamp((self.progress - 0.5) / 0.2)) * 20 });
    },
  });
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Échantillonne `count` points à l'intérieur des glyphes d'un texte,
 * en rendant le texte sur un canvas 2D et en piochant les pixels opaques.
 * Retourne des coordonnées normalisées (0-1).
 */
function sampleGlyphPoints(text: string, count: number): { x: number; y: number }[] {
  const cw = 600;
  const ch = 320;
  const canvas = document.createElement('canvas');
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.font = '800 300px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, cw / 2, ch / 2 + 10);

  const data = ctx.getImageData(0, 0, cw, ch).data;
  const filled: { x: number; y: number }[] = [];
  // Balayage régulier ; on garde les pixels opaques.
  for (let y = 0; y < ch; y += 3) {
    for (let x = 0; x < cw; x += 3) {
      if (data[(y * cw + x) * 4 + 3] > 128) filled.push({ x: x / cw, y: y / ch });
    }
  }
  // Sélection uniforme de `count` points parmi les pixels remplis.
  const rand = seededRandom(99);
  const out: { x: number; y: number }[] = [];
  if (filled.length === 0) {
    for (let i = 0; i < count; i++) out.push({ x: rand(), y: rand() });
    return out;
  }
  for (let i = 0; i < count; i++) {
    out.push(filled[Math.floor(rand() * filled.length)]);
  }
  return out;
}
