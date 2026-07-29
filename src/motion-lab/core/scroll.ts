import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SMOOTH, LERP } from '../config';
import { env } from './env';
import { clamp, damp } from './utils';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cœur du mouvement : Lenis pour le smooth scroll, branché sur le
 * ticker GSAP et ScrollTrigger. Expose une vélocité normalisée et
 * lissée que TOUTES les scènes consomment (skew, distorsion, marquees).
 */
class ScrollCore {
  lenis!: Lenis & { destroy?: () => void };
  /** Vélocité brute (px/frame) fournie par Lenis. */
  rawVelocity = 0;
  /** Vélocité normalisée et lissée [-1, 1] — la source de vérité du site. */
  velocity = 0;
  /** Progression globale du parcours [0, 1]. */
  progress = 0;

  private smoothVel = 0;

  init() {
    this.lenis = new Lenis({
      lerp: env.reducedMotion ? 1 : SMOOTH.lerp,
      wheelMultiplier: SMOOTH.wheelMultiplier,
      touchMultiplier: SMOOTH.touchMultiplier,
      smoothWheel: !env.reducedMotion,
      // Sur tactile on laisse le scroll natif (perf + galerie snap).
      syncTouch: false,
    });

    this.lenis.on('scroll', (e: { velocity: number; progress: number }) => {
      this.rawVelocity = e.velocity;
      this.progress = e.progress;
      ScrollTrigger.update();
    });

    // Un seul RAF pilote Lenis ET GSAP — pas de boucles concurrentes.
    gsap.ticker.add((time) => this.lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /** Appelé chaque frame par la boucle de rendu pour lisser la vélocité. */
  update(dt: number) {
    // Normalise ~1 pour ~40px/frame, borné, puis lisse (micro-physique).
    const target = clamp(this.rawVelocity / 40, -1, 1);
    this.smoothVel = damp(this.smoothVel, target, LERP.velocity * 60, dt);
    this.velocity = this.smoothVel;
    // Amortissement quand la molette s'arrête (Lenis ne remet pas à zéro).
    this.rawVelocity *= 0.9;
  }

  scrollTo(target: string | number | HTMLElement, opts?: { immediate?: boolean }) {
    this.lenis.scrollTo(target, opts);
  }

  stop() {
    this.lenis.stop();
  }
  start() {
    this.lenis.start();
  }
}

export const scroll = new ScrollCore();
