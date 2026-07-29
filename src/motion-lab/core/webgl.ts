import * as THREE from 'three';
import { env } from './env';
import { MOBILE_SHADER_SCALE } from '../config';

/**
 * Un layer WebGL = une scène Three.js + sa caméra, enregistrée auprès
 * du renderer unique. Chaque scène du site fournit son propre layer,
 * mais il n'y a qu'UN SEUL canvas / contexte WebGL sur toute la page
 * (contrainte perf : pas un canvas par section).
 */
export interface WebGLLayer {
  scene: THREE.Scene;
  camera: THREE.Camera;
  /** Rendu uniquement quand actif (piloté par ScrollTrigger). */
  active: boolean;
  /** Appelé chaque frame avant le rendu. */
  update?: (dt: number, elapsed: number) => void;
  /** Appelé au resize (px CSS, pas devicePixelRatio). */
  resize?: (w: number, h: number) => void;
}

class WebGLCore {
  renderer!: THREE.WebGLRenderer;
  canvas!: HTMLCanvasElement;
  private layers: WebGLLayer[] = [];
  private width = 0;
  private height = 0;

  init() {
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'webgl';
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: !env.isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    // Résolution réduite sur mobile : shaders "simplifiés", pas de surchauffe.
    const scale = env.isMobile ? MOBILE_SHADER_SCALE : 1;
    this.renderer.setPixelRatio(env.dpr * scale);
    this.renderer.autoClear = false;
    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });
  }

  register(layer: WebGLLayer) {
    this.layers.push(layer);
    if (this.width) layer.resize?.(this.width, this.height);
    return layer;
  }

  private resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.renderer.setSize(this.width, this.height, false);
    this.layers.forEach((l) => l.resize?.(this.width, this.height));
  }

  /** Rendu de toutes les couches actives — appelé par la boucle maîtresse. */
  render(dt: number, elapsed: number) {
    this.renderer.clear();
    for (const layer of this.layers) {
      if (!layer.active) continue;
      layer.update?.(dt, elapsed);
      this.renderer.render(layer.scene, layer.camera);
    }
  }

  get size() {
    return { w: this.width, h: this.height };
  }
}

export const webgl = new WebGLCore();
