import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HERO, EASE } from '../config';
import { env } from '../core/env';
import { fluid } from './fluid';
import { splitChars } from './text';

/**
 * Scène 1 — Héro WebGL.
 * Fond : le fluide navy-electric (fluid.ts). Par-dessus, "STACKUP" :
 * chaque lettre arrive par un masque avec rotation 3D, puis respire.
 * Le texte est en blend avec le shader (voir .hero__title mix-blend).
 */
export function initHero() {
  const section = document.getElementById('hero')!;
  const titleEl = document.getElementById('hero-title')!;

  titleEl.textContent = 'STACKUP';
  const chars = splitChars(titleEl);

  // Le fluide est actif tant que le héro est à l'écran.
  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: (self) => fluid.setActive(self.isActive),
    onEnter: () => fluid.setGold(0),
    onEnterBack: () => fluid.setGold(0),
  });

  if (env.reducedMotion) {
    gsap.set(chars, { opacity: 1 });
    return;
  }

  // Entrée : chaque lettre monte derrière un masque avec rotation 3D.
  gsap.set(chars, {
    yPercent: 120,
    rotateX: -75,
    opacity: 0,
    transformOrigin: '50% 100%',
  });
  gsap.set(titleEl, { perspective: 800 });

  const tl = gsap.timeline({ delay: 0.15 });
  tl.to(chars, {
    yPercent: 0,
    rotateX: 0,
    opacity: 1,
    duration: HERO.letterDuration,
    ease: EASE.reveal,
    stagger: HERO.letterStagger,
  });

  // Respiration organique : micro-scale décalé par lettre, en boucle.
  tl.add(() => {
    chars.forEach((c, i) => {
      gsap.to(c, {
        scale: 1 + HERO.breathAmount,
        duration: HERO.breathDuration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: i * 0.12,
      });
    });
  }, '-=0.3');

  // Parallax de sortie : le titre s'éloigne quand on quitte le héro.
  gsap.to(titleEl, {
    yPercent: -30,
    opacity: 0.2,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });

  // L'indicateur de scroll pulse.
  gsap.to('.hero__scroll', {
    y: 8,
    opacity: 0.5,
    duration: 1.1,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
  });
}
