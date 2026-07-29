import { gsap } from 'gsap';
import { LERP } from '../config';
import { env } from './env';
import { damp } from './utils';

type CursorMode = 'default' | 'link' | 'view' | 'arrow' | 'cta';

/**
 * Curseur custom global : un point réactif + un anneau retardé (lerp).
 * Se transforme selon le contexte (liens, cartes « VOIR », flèches de
 * galerie). Le curseur natif est masqué sur desktop, jamais sur tactile.
 */
class Cursor {
  private root!: HTMLElement;
  private dot!: HTMLElement;
  private ring!: HTMLElement;
  private label!: HTMLElement;

  private tx = 0;
  private ty = 0;
  private dotX = 0;
  private dotY = 0;
  private ringX = 0;
  private ringY = 0;
  private mode: CursorMode = 'default';
  private visible = false;
  enabled = false;

  init() {
    // Désactivé sur tactile/mobile : le curseur custom n'a pas de sens.
    if (env.isTouch || env.isMobile) return;
    this.enabled = true;
    document.documentElement.classList.add('has-custom-cursor');

    this.root = document.createElement('div');
    this.root.className = 'cursor';
    this.root.innerHTML = `
      <div class="cursor__ring"></div>
      <div class="cursor__dot"></div>
      <span class="cursor__label"></span>
    `;
    document.body.appendChild(this.root);
    this.ring = this.root.querySelector('.cursor__ring')!;
    this.dot = this.root.querySelector('.cursor__dot')!;
    this.label = this.root.querySelector('.cursor__label')!;

    window.addEventListener('pointermove', (e) => this.onMove(e), { passive: true });
    window.addEventListener('pointerdown', () => this.press(true));
    window.addEventListener('pointerup', () => this.press(false));
    document.addEventListener('mouseleave', () => this.setVisible(false));
    document.addEventListener('mouseenter', () => this.setVisible(true));

    this.bindTargets();
  }

  private onMove(e: PointerEvent) {
    this.tx = e.clientX;
    this.ty = e.clientY;
    if (!this.visible) this.setVisible(true);
  }

  private setVisible(v: boolean) {
    this.visible = v;
    gsap.to(this.root, { autoAlpha: v ? 1 : 0, duration: 0.3 });
  }

  private press(down: boolean) {
    gsap.to(this.ring, { scale: down ? 0.7 : 1, duration: 0.3, ease: 'power3.out' });
  }

  /** Détecte les éléments interactifs via [data-cursor]. */
  private bindTargets() {
    const setFrom = (el: Element | null) => {
      const target = el?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        const mode = (target.dataset.cursor as CursorMode) || 'link';
        this.set(mode, target.dataset.cursorLabel);
      } else {
        this.set('default');
      }
    };
    window.addEventListener('pointerover', (e) => setFrom(e.target as Element), { passive: true });
  }

  set(mode: CursorMode, label = '') {
    if (mode === this.mode && this.label.textContent === label) return;
    this.mode = mode;
    this.root.dataset.mode = mode;
    this.label.textContent = label;
  }

  update(dt: number) {
    if (!this.enabled) return;
    // Le point suit vite, l'anneau traîne (retard = personnalité).
    this.dotX = damp(this.dotX, this.tx, LERP.cursorDot * 60, dt);
    this.dotY = damp(this.dotY, this.ty, LERP.cursorDot * 60, dt);
    this.ringX = damp(this.ringX, this.tx, LERP.cursorRing * 60, dt);
    this.ringY = damp(this.ringY, this.ty, LERP.cursorRing * 60, dt);
    this.dot.style.transform = `translate3d(${this.dotX}px, ${this.dotY}px, 0)`;
    this.ring.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
    this.label.style.transform = `translate3d(${this.ringX}px, ${this.ringY}px, 0)`;
  }
}

export const cursor = new Cursor();
