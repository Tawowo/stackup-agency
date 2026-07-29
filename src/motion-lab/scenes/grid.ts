import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GRID, EASE } from '../config';
import { env } from '../core/env';
import { scroll } from '../core/scroll';

gsap.registerPlugin(Flip);

/**
 * Scène 6 — La grille magnétique.
 * Chaque carte est attirée par le curseur (magnétisme), un spotlight
 * suit la souris (le reste en semi-obscurité), bordure en dégradé conique
 * rotatif au survol. Au clic : expansion plein écran en transition FLIP,
 * puis repli.
 */
export function initGrid() {
  const section = document.getElementById('grid')!;
  const wrap = document.getElementById('grid-cards')!;
  const backdrop = document.getElementById('grid-backdrop')!;
  const cards = Array.from(section.querySelectorAll<HTMLElement>('.grid__card'));

  // Révélation à l'entrée dans le viewport. On part d'un état caché
  // explicite et on joue une seule fois quand la section approche ;
  // `onRefresh` garantit la visibilité si on arrive déjà dans la scène
  // (deep-link, restauration de scroll) sans jamais rester bloqué à 0.
  gsap.set(cards, { y: 60, autoAlpha: 0 });
  const reveal = () =>
    gsap.to(cards, {
      y: 0,
      autoAlpha: 1,
      duration: 0.9,
      ease: EASE.smooth,
      stagger: 0.08,
      overwrite: true,
    });
  ScrollTrigger.create({
    trigger: section,
    start: 'top 85%',
    once: true,
    onEnter: reveal,
    onRefresh: (self) => {
      if (self.progress > 0) reveal();
    },
  });

  // ── Magnétisme + spotlight (désactivés sur tactile) ─────────────
  if (!env.isTouch && !env.isMobile) {
    cards.forEach((card) => {
      const xTo = gsap.quickTo(card, 'x', { duration: 0.5, ease: EASE.spring });
      const yTo = gsap.quickTo(card, 'y', { duration: 0.5, ease: EASE.spring });
      let angleTween: gsap.core.Tween | null = null;

      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        const mx = e.clientX - r.left;
        const my = e.clientY - r.top;
        // Spotlight : position locale du halo.
        card.style.setProperty('--mx', `${mx}px`);
        card.style.setProperty('--my', `${my}px`);
        card.style.setProperty('--spot', `${GRID.spotlightRadius}px`);
        // Magnétisme : décalage vers le curseur.
        const dx = (mx - r.width / 2) / (r.width / 2);
        const dy = (my - r.height / 2) / (r.height / 2);
        xTo(dx * GRID.magnetStrength);
        yTo(dy * GRID.magnetStrength);
      });

      card.addEventListener('pointerenter', () => {
        wrap.dataset.focused = '1';
        card.dataset.lit = '1';
        // Bordure conique en rotation continue.
        angleTween = gsap.to(card, {
          '--angle': '360deg',
          duration: 4,
          ease: 'none',
          repeat: -1,
        });
      });

      card.addEventListener('pointerleave', () => {
        wrap.dataset.focused = '0';
        card.dataset.lit = '0';
        angleTween?.kill();
        gsap.set(card, { '--angle': '0deg' });
        xTo(0);
        yTo(0);
      });
    });
  }

  // ── Clic : expansion plein écran FLIP, puis repli ───────────────
  let openCard: HTMLElement | null = null;

  const open = (card: HTMLElement) => {
    if (openCard) return;
    openCard = card;
    scroll.stop();
    const state = Flip.getState(card, { props: 'padding,borderRadius' });
    card.classList.add('is-open');
    gsap.set(card, { x: 0, y: 0, clearProps: 'transform' });
    backdrop.classList.add('is-active');
    gsap.to(backdrop, { opacity: 1, duration: 0.4 });
    Flip.from(state, {
      duration: env.reducedMotion ? 0.2 : 0.65,
      ease: EASE.glide,
      absolute: true,
    });
  };

  const close = () => {
    if (!openCard) return;
    const card = openCard;
    const state = Flip.getState(card, { props: 'padding,borderRadius' });
    card.classList.remove('is-open');
    Flip.from(state, {
      duration: env.reducedMotion ? 0.2 : 0.55,
      ease: EASE.glide,
      absolute: true,
      onComplete: () => scroll.start(),
    });
    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.4,
      onComplete: () => backdrop.classList.remove('is-active'),
    });
    openCard = null;
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => (openCard === card ? close() : open(card)));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (openCard === card) { close(); } else { open(card); }
      }
    });
  });
  backdrop.addEventListener('click', close);
  window.addEventListener('keydown', (e) => e.key === 'Escape' && close());
}
