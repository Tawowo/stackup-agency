'use client'
/** LE CIEL — un quad plein écran, dessiné en premier, sans test de profondeur. */
import { useEffect, useMemo } from 'react'
import { PlaneGeometry } from 'three'
import { stackUniforms } from '../engine'
import { cielMaterial } from '../materials/ciel'

export default function Ciel() {
  const u = stackUniforms()
  const geo = useMemo(() => new PlaneGeometry(2, 2), [])
  const mat = useMemo(() => cielMaterial(u), [u])
  useEffect(() => () => {
    geo.dispose()
    mat.dispose()
  }, [geo, mat])
  return <mesh geometry={geo} material={mat} renderOrder={-3} frustumCulled={false} />
}
