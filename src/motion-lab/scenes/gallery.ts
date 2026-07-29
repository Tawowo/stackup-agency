import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import vert from '../shaders/cardVert';
import frag from '../shaders/cardFrag';
import { webgl } from '../core/webgl';
import { scroll } from '../core/scroll';
import { GALLERY, EASE } from '../config';
import { env } from '../core/env';
import { clamp, damp } from '../core/utils';
import { splitChars } from './text';

interface Card {
  el: HTMLElement;
  mesh: THREE.Mesh;
  mat: THREE.ShaderMaterial;
  index: number;
  vel: number; // vélocité lissée par carte
  hover: number; // 0-1 lissé
  dim: number; // 0-1 lissé
  chars: HTMLElement[];
  tag: HTMLElement;
}

/**
 * Scène 3 — Galerie horizontale WebGL.
 * Le scroll vertical devient travelling horizontal (section pinnée).
 * Chaque carte DOM sert de proxy de position ; un plane WebGL se cale
 * sur sa bounding box et se courbe selon la VITESSE de scroll (retour
 * élastique au repos). Survol : zoom interne + autres cartes assombries
 * + titre en caractères staggerés.
 */
export function initGallery() {
  const section = document.getElementById('gallery')!;
  const track = document.getElementById('gallery-track')!;
  const cardsWrap = document.getElementById('gallery-cards')!;
  const cardEls = Array.from(section.querySelectorAll<HTMLElement>('.gallery__card'));

  const scene = new THREE.Scene();
  const { w, h } = webgl.size;
  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1000, 1000);

  const cards: Card[] = cardEls.map((el, i) => {
    const project = GALLERY.projects[i];
    const mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { value: 0 },
        uHue: { value: project.hue },
        uHover: { value: 0 },
        uDim: { value: 0 },
        uZoom: { value: GALLERY.hoverZoom },
        uVelocity: { value: 0 },
        uBend: { value: GALLERY.bendStrength * 0.01 },
      },
    });
    // Segmentée en Y pour que la courbure soit lisse.
    const geo = new THREE.PlaneGeometry(1, 1, 1, 20);
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const titleEl = el.querySelector<HTMLElement>('.g-title')!;
    return {
      el,
      mesh,
      mat,
      index: i,
      vel: 0,
      hover: 0,
      dim: 0,
      chars: splitChars(titleEl),
      tag: el.querySelector<HTMLElement>('.g-tag')!,
    };
  });

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
    update: (dt, elapsed) => syncCards(dt, elapsed),
  });

  let hovered = -1;

  const syncCards = (dt: number, elapsed: number) => {
    const size = webgl.size;
    const targetVel = clamp(scroll.velocity, -1, 1);
    for (const card of cards) {
      const r = card.el.getBoundingClientRect();
      // DOM (y bas) → WebGL (y haut, origine centre).
      const x = r.left + r.width / 2 - size.w / 2;
      const y = -(r.top + r.height / 2 - size.h / 2);
      card.mesh.position.set(x, y, 0);
      card.mesh.scale.set(r.width, r.height, 1);

      // Vélocité lissée par carte → courbure élastique.
      card.vel = damp(card.vel, targetVel, 6, dt);
      card.hover = damp(card.hover, hovered === card.index ? 1 : 0, 10, dt);
      card.dim = damp(card.dim, hovered !== -1 && hovered !== card.index ? GALLERY.dimAmount : 0, 8, dt);

      const u = card.mat.uniforms;
      u.uTime.value = elapsed;
      u.uVelocity.value = card.vel;
      u.uHover.value = card.hover;
      u.uDim.value = card.dim;
    }
  };

  // ── Survol : le titre apparaît en caractères staggerés ──────────
  const enter = (card: Card) => {
    hovered = card.index;
    gsap.to(card.chars, {
      yPercent: 0,
      duration: 0.55,
      ease: EASE.reveal,
      stagger: 0.035,
      overwrite: true,
    });
    gsap.to(card.tag, { opacity: 1, y: 0, duration: 0.45, ease: EASE.smooth });
  };
  const leave = (card: Card) => {
    if (hovered === card.index) hovered = -1;
    gsap.to(card.chars, {
      yPercent: 110,
      duration: 0.35,
      ease: EASE.smooth,
      stagger: { each: 0.02, from: 'end' },
      overwrite: true,
    });
    gsap.to(card.tag, { opacity: 0, y: 8, duration: 0.3 });
  };

  // Titres cachés sous le masque (.g-title overflow) jusqu'au survol.
  cards.forEach((card) => {
    gsap.set(card.chars, { yPercent: 110 });
    gsap.set(card.tag, { opacity: 0, y: 8 });
    card.el.addEventListener('pointerenter', () => enter(card));
    card.el.addEventListener('pointerleave', () => leave(card));
  });

  // ── Scroll : pin + travelling horizontal (desktop) ─────────────
  const activate = (v: boolean) => (layer.active = v);

  if (env.isMobile) {
    // Mobile : scroll tactile natif horizontal avec snap, pas de pin.
    section.classList.add('is-native');
    // Le layer reste actif tant que la section est visible.
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => activate(self.isActive),
    });
    return;
  }

  const amount = () => Math.max(0, track.scrollWidth - window.innerWidth);
  gsap.to(track, {
    x: () => -amount(),
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${amount()}`,
      pin: true,
      scrub: 0.8,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onToggle: (self) => activate(self.isActive),
    },
  });

  // Curseur "flèche" quand on survole la zone galerie (desktop).
  cardsWrap.setAttribute('data-cursor', 'arrow');
  cardsWrap.setAttribute('data-cursor-label', '↔');
}
