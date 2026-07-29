import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FINAL, EASE } from '../config';
import { env } from '../core/env';
import { fluid } from './fluid';
import { splitChars } from './text';

/**
 * Scène 7 — Le final.
 * Le fluide WebGL du héro revient, mais en OR. « Prêt à construire ? »
 * s'assemble lettre à lettre. Un CTA unique, magnétique, entouré d'un
 * anneau de particules en orbite. L'email en marquee discret dans le footer.
 */
export function initFinal() {
  const section = document.getElementById('final')!;
  const titleEl = document.getElementById('final-title')!;
  const cta = document.getElementById('final-cta')!;
  const btn = document.getElementById('final-btn')!;
  const marquee = document.getElementById('final-marquee')!;

  titleEl.textContent = FINAL.headline;
  const chars = splitChars(titleEl);
  gsap.set(chars, { yPercent: 120, opacity: 0 });

  // ── Le fluide revient, doré, quand le final entre à l'écran ─────
  ScrollTrigger.create({
    trigger: section,
    start: 'top 80%',
    end: 'bottom top',
    onToggle: (self) => {
      fluid.setActive(self.isActive);
      fluid.setGold(self.isActive ? 1 : 0);
    },
  });

  // ── Assemblage du titre ─────────────────────────────────────────
  gsap.to(chars, {
    yPercent: 0,
    opacity: 1,
    duration: env.reducedMotion ? 0.3 : 1,
    ease: EASE.reveal,
    stagger: env.reducedMotion ? 0 : FINAL.letterStagger,
    scrollTrigger: { trigger: section, start: 'top 60%' },
  });

  // ── Anneau de particules en orbite (DOM léger, pas de 2e canvas) ─
  const orbit = document.createElement('div');
  orbit.className = 'final__orbit';
  const n = env.isMobile ? Math.round(FINAL.orbitParticles * 0.6) : FINAL.orbitParticles;
  for (let i = 0; i < n; i++) {
    const dot = document.createElement('span');
    const a = (i / n) * Math.PI * 2;
    const rr = 84 + (i % 3) * 5;
    dot.style.transform = `translate(-50%, -50%) rotate(${a}rad) translateX(${rr}px)`;
    dot.style.opacity = `${0.3 + (i % 5) * 0.14}`;
    orbit.appendChild(dot);
  }
  cta.insertBefore(orbit, btn);
  if (!env.reducedMotion) {
    gsap.to(orbit, { rotation: 360, duration: 18, ease: 'none', repeat: -1 });
    gsap.to(orbit, { scale: 1.06, duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  }

  // ── CTA magnétique ──────────────────────────────────────────────
  if (!env.isTouch && !env.isMobile) {
    const xTo = gsap.quickTo(btn, 'x', { duration: 0.5, ease: EASE.spring });
    const yTo = gsap.quickTo(btn, 'y', { duration: 0.5, ease: EASE.spring });
    const oxTo = gsap.quickTo(orbit, 'x', { duration: 0.6, ease: EASE.spring });
    const oyTo = gsap.quickTo(orbit, 'y', { duration: 0.6, ease: EASE.spring });
    cta.addEventListener('pointermove', (e) => {
      const r = cta.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      xTo(dx * 0.4);
      yTo(dy * 0.4);
      oxTo(dx * 0.18);
      oyTo(dy * 0.18);
    });
    cta.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
      oxTo(0);
      oyTo(0);
    });
  }

  btn.addEventListener('click', () => {
    window.location.href = `mailto:${FINAL.email}`;
  });

  // ── Marquee email discret ───────────────────────────────────────
  const unit = document.createElement('span');
  unit.style.display = 'flex';
  for (let i = 0; i < 8; i++) {
    const a = document.createElement('a');
    a.href = `mailto:${FINAL.email}`;
    a.textContent = FINAL.email;
    a.setAttribute('data-cursor', 'link');
    unit.appendChild(a);
    const sep = document.createElement('span');
    sep.textContent = '✦';
    sep.style.opacity = '0.4';
    unit.appendChild(sep);
  }
  marquee.appendChild(unit);
  const clone = unit.cloneNode(true) as HTMLElement;
  marquee.appendChild(clone);
  if (!env.reducedMotion) {
    gsap.to(marquee, {
      xPercent: -50,
      duration: 24,
      ease: 'none',
      repeat: -1,
    });
  }
}
