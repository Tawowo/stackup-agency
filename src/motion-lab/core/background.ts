import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COLORS } from '../config';
import { mixHex } from './utils';

/**
 * Transitions de couleur de fond orchestrées sur tout le parcours.
 * Le scroll raconte une journée : clair → navy → clair → navy profond.
 *
 * Piloté par SECTION (et non par une fraction globale devinée) : chaque
 * scène déclare sa couleur, un ScrollTrigger fait le fondu quand elle
 * atteint le centre. Robuste aux sections pinnées qui allongent le scroll.
 * Le manifeste gère lui-même son dégradé clair→navy (voir manifesto.ts).
 */
const SCENE_BG: Record<string, string> = {
  hero: COLORS.light, // couvert par le fluide, mais cohérent
  gallery: COLORS.navy,
  number: COLORS.navyDeep,
  tunnel: COLORS.navy,
  grid: COLORS.light, // retour à la lumière
  final: COLORS.navyDeep, // navy profond + fluide or
};

class BackgroundJourney {
  private root = document.documentElement;
  private current: string = COLORS.light;

  init() {
    this.root.style.setProperty('--bg', COLORS.light);
    for (const [id, color] of Object.entries(SCENE_BG)) {
      const el = document.getElementById(id);
      if (!el) continue;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 45%',
        onEnter: () => this.to(color),
        onEnterBack: () => this.to(color),
      });
    }
  }

  /** Fondu de la couleur de fond courante vers `target`. */
  to(target: string) {
    const from = this.current;
    if (from === target) return;
    const o = { t: 0 };
    gsap.to(o, {
      t: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      overwrite: true,
      onUpdate: () => {
        const c = mixHex(from, target, o.t);
        this.root.style.setProperty('--bg', c);
        this.current = c;
      },
      onComplete: () => (this.current = target),
    });
  }

  /** Écrit directement --bg (utilisé par le scrub du manifeste). */
  set(color: string) {
    this.root.style.setProperty('--bg', color);
    this.current = color;
  }
}

export const background = new BackgroundJourney();
