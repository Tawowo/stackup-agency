'use client'
/** LE SOL — un plan posé à plat, à la hauteur uSolY, centré sur la pile (vertex shader). */
import { useEffect, useMemo } from 'react'
import { PlaneGeometry } from 'three'
import { stackUniforms } from '../engine'
import { solMaterial } from '../materials/sol'

export default function Sol() {
  const u = stackUniforms()
  const geo = useMemo(() => new PlaneGeometry(90, 90), [])
  const mat = useMemo(() => solMaterial(u), [u])
  useEffect(() => () => {
    geo.dispose()
    mat.dispose()
  }, [geo, mat])
  return <mesh geometry={geo} material={mat} rotation={[-Math.PI / 2, 0, 0]} renderOrder={-2} frustumCulled={false} />
}
