import { Matrix4, PerspectiveCamera } from 'three'

/** 1 unité monde = 100 px CSS au plan z = 0. */
export const PX_PAR_UNITE = 100
/** Distance de la caméra perspective au plan de la pile. */
export const DISTANCE = 6.5

/**
 * CAMÉRA MÉLANGÉE — la matrice de projection est l'interpolation, élément par
 * élément, de l'orthographique (blend = 1) et de la perspective (blend = 0).
 * Les deux cadrent la même hauteur au plan z = 0 : la bascule est continue,
 * sans saut ni coupure.
 */
export class BlendCamera extends PerspectiveCamera {
  /* Pas d'initialiseurs de champs : le constructeur de PerspectiveCamera
     appelle updateProjectionMatrix() avant qu'ils ne soient posés. */
  blend!: number
  width!: number
  height!: number
  private ortho!: Matrix4
  private persp!: Matrix4

  setSize(w: number, h: number) {
    this.width = w
    this.height = h
    this.aspect = w / h
    this.updateProjectionMatrix()
  }

  override updateProjectionMatrix() {
    this.ortho ??= new Matrix4()
    this.persp ??= new Matrix4()
    this.blend ??= 1
    this.width ??= 1440
    this.height ??= 900
    const hw = this.width / PX_PAR_UNITE / 2
    const hh = this.height / PX_PAR_UNITE / 2
    const near = 0.1
    const far = 60
    this.ortho.makeOrthographic(-hw, hw, hh, -hh, near, far)
    const fov = 2 * Math.atan(hh / DISTANCE)
    const top = near * Math.tan(fov / 2)
    const right = top * (this.width / this.height)
    this.persp.makePerspective(-right, right, top, -top, near, far)
    const a = this.ortho.elements
    const b = this.persp.elements
    const e = this.projectionMatrix.elements
    for (let i = 0; i < 16; i++) e[i] = b[i]! + (a[i]! - b[i]!) * this.blend
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert()
  }
}
