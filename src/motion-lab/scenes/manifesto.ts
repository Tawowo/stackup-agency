import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MANIFESTO, EASE, COLORS } from '../config';
import { env } from '../core/env';
import { seededRandom, mixHex } from '../core/utils';
import { background } from '../core/background';
import { splitChars } from './text';

/**
 * Scène 2 — Le manifeste en scroll épinglé.
 * Trois phrases s'enchaînent : chacune se désintègre en caractères qui
 * s'envolent (rotation + trajectoire aléatoire contrôlée) pendant que la
 * suivante s'assemble depuis le flou. Le fond global glisse vers le navy
 * (géré par core/background.ts via la progression).
 */
export function initManifesto() {
  const section = document.getElementById('manifesto')!;
  const lines = Array.from(section.querySelectorAll<HTMLElement>('.manifesto__line'));
  const rand = seededRandom(42);

  const lineChars = lines.map((line) => splitChars(line));

  if (env.reducedMotion) {
    // Variante calme : simple fondu enchaîné sans pin.
    lines.forEach((l, i) => gsap.set(l, { opacity: i === 0 ? 1 : 0 }));
    ScrollTrigger.create({
      trigger: section,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => background.set(COLORS.navyDeep),
      onUpdate: (self) => {
        const idx = Math.min(lines.length - 1, Math.floor(self.progress * lines.length));
        lines.forEach((l, i) => gsap.to(l, { opacity: i === idx ? 1 : 0, duration: 0.3 }));
      },
    });
    return;
  }

  // Le fond glisse du clair au navy profond sur toute la durée du pin.
  ScrollTrigger.create({
    trigger: section,
    start: 'top top',
    end: `+=${MANIFESTO.pinScreens * 100}%`,
    scrub: true,
    onUpdate: (self) =>
      background.set(mixHex(COLORS.light, COLORS.navyDeep, self.progress)),
  });

  // Précalcule les trajectoires d'envol de chaque caractère.
  const scatter = lineChars.map((chars) =>
    chars.map(() => ({
      x: (rand() - 0.5) * MANIFESTO.scatterForce * 2,
      y: (rand() - 0.5) * MANIFESTO.scatterForce * 2 - 60,
      r: (rand() - 0.5) * 320,
    }))
  );

  // État initial : tout est flou/dispersé sauf préparé pour l'assemblage.
  lineChars.forEach((chars) => {
    gsap.set(chars, { opacity: 0, filter: 'blur(14px)', y: 40, scale: 0.9 });
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: `+=${MANIFESTO.pinScreens * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  });

  // Chaque phrase occupe un créneau ; assemblage court en début de
  // créneau, désintégration juste avant l'arrivée de la suivante —
  // une seule phrase domine à la fois, avec un bref fondu croisé.
  const seg = 1 / lines.length;
  lines.forEach((_, i) => {
    const chars = lineChars[i];
    const base = i * seg;

    // Assemblage depuis le flou.
    tl.to(
      chars,
      {
        opacity: 1,
        filter: 'blur(0px)',
        y: 0,
        scale: 1,
        duration: seg * 0.5,
        ease: EASE.reveal,
        stagger: { each: 0.015, from: 'start' },
      },
      base
    );

    // Désintégration (sauf la dernière phrase : « Scrollez. » reste).
    if (i < lines.length - 1) {
      tl.to(
        chars,
        {
          x: (idx) => scatter[i][idx].x,
          y: (idx) => scatter[i][idx].y,
          rotation: (idx) => scatter[i][idx].r,
          opacity: 0,
          filter: 'blur(6px)',
          duration: seg * 0.45,
          ease: EASE.anticipate,
          stagger: { each: 0.012, from: 'random' },
        },
        base + seg * 0.8
      );
    }
  });
}
