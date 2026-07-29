import * as THREE from 'three';
import vert from '../shaders/fluidVert';
import frag from '../shaders/fluidFrag';
import { webgl, WebGLLayer } from '../core/webgl';
import { scroll } from '../core/scroll';
import { COLORS_VEC, HERO } from '../config';
import { damp } from '../core/utils';

/**
 * Le fluide/brouillard signature. Un seul plein écran, réutilisé :
 * navy-electric pour le héro (scène 1), or pour le final (scène 7).
 * Réagit à la souris (distorsion locale + traînée qui s'estompe).
 */
class Fluid {
  layer!: WebGLLayer;
  private mat!: THREE.ShaderMaterial;
  private mouse = new THREE.Vector2(0.5, 0.5);
  private mouseTarget = new THREE.Vector2(0.5, 0.5);
  private force = 0;
  private goldTarget = 0;

  init() {
    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    this.mat = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: this.mouse },
        uMouseForce: { value: 0 },
        uColorA: { value: new THREE.Color().fromArray(COLORS_VEC.navyDeep) },
        uColorB: { value: new THREE.Color().fromArray(COLORS_VEC.electric) },
        uColorHi: { value: new THREE.Color().fromArray(COLORS_VEC.light) },
        uIntensity: { value: 0 },
        uGold: { value: 0 },
      },
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.mat);
    scene.add(quad);

    this.layer = webgl.register({
      scene,
      camera,
      active: false,
      update: (dt, elapsed) => this.update(dt, elapsed),
      resize: (w, h) => this.mat.uniforms.uResolution.value.set(w, h),
    });

    window.addEventListener(
      'pointermove',
      (e) => {
        this.mouseTarget.set(e.clientX / window.innerWidth, 1 - e.clientY / window.innerHeight);
        this.force = HERO.fluidMouseForce; // impulsion, s'estompe ensuite
      },
      { passive: true }
    );
  }

  /** Bascule navy ↔ or (0 = héro, 1 = final). */
  setGold(v: number) {
    this.goldTarget = v;
  }

  setActive(v: boolean) {
    this.layer.active = v;
  }

  private update(dt: number, elapsed: number) {
    const u = this.mat.uniforms;
    u.uTime.value = elapsed;
    // Suivi doux de la souris + estompage de la traînée.
    this.mouse.x = damp(this.mouse.x, this.mouseTarget.x, 8, dt);
    this.mouse.y = damp(this.mouse.y, this.mouseTarget.y, 8, dt);
    this.force = damp(this.force, 0, 1.6, dt);
    u.uMouseForce.value = this.force;
    u.uIntensity.value = Math.abs(scroll.velocity);

    // Interpolation navy → or (le fluide "revient" doré au final).
    const g = damp(u.uGold.value as number, this.goldTarget, 3, dt);
    u.uGold.value = g;
    (u.uColorA.value as THREE.Color)
      .fromArray(COLORS_VEC.navyDeep)
      .lerp(new THREE.Color().fromArray(COLORS_VEC.navy), g);
    (u.uColorB.value as THREE.Color)
      .fromArray(COLORS_VEC.electric)
      .lerp(new THREE.Color().fromArray(COLORS_VEC.gold), g);
    (u.uColorHi.value as THREE.Color)
      .fromArray(COLORS_VEC.light)
      .lerp(new THREE.Color().fromArray(COLORS_VEC.gold), g * 0.6);
  }
}

export const fluid = new Fluid();
