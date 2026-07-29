import { MOBILE_BREAKPOINT } from '../config';

/**
 * État global de l'environnement d'exécution.
 * Détecté une fois au démarrage, relu partout — évite de recalculer
 * matchMedia dans chaque scène.
 */
class Environment {
  isMobile = false;
  isTouch = false;
  reducedMotion = false;
  dpr = 1;

  private listeners = new Set<() => void>();

  init() {
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isTouch = window.matchMedia('(pointer: coarse)').matches;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.measure();

    window.addEventListener('resize', () => this.measure(), { passive: true });

    // La préférence de mouvement peut changer en direct.
    window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
      this.reducedMotion = e.matches;
    });
  }

  private measure() {
    const wasMobile = this.isMobile;
    this.isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    if (wasMobile !== this.isMobile) this.listeners.forEach((fn) => fn());
  }

  onBreakpointChange(fn: () => void) {
    this.listeners.add(fn);
  }
}

export const env = new Environment();
