'use client'
/**
 * LE SOL DE L'ÉBOULIS — la 404 couche des plaques au sol ; le moteur, lui, pose
 * le sol sous des plaques debout. Tant que la forme courante est `eboulis`, on
 * remonte le sol au ras des plaques couchées (marge calculée par le layout) ;
 * dès qu'elle change, ou que la page se démonte, la marge par défaut revient.
 * Aucune trame : un abonnement au store, rien d'autre.
 */
import { useEffect } from 'react'
import { PARAMS_DEFAUT, useScene } from '@/webgl/store'
import { margeSolEboulis } from '@/webgl/layouts/eboulis'

export default function SolEboulis() {
  useEffect(() => {
    const marge = margeSolEboulis()
    const appliquer = (layout: string) => {
      const voulue = layout === 'eboulis' ? marge : PARAMS_DEFAUT.solMarge
      if (useScene.getState().params.solMarge !== voulue) useScene.getState().setParams({ solMarge: voulue })
    }
    appliquer(useScene.getState().layout)
    const fin = useScene.subscribe((s, avant) => {
      if (s.layout !== avant.layout) appliquer(s.layout)
    })
    return () => {
      fin()
      useScene.getState().setParams({ solMarge: PARAMS_DEFAUT.solMarge })
    }
  }, [])
  return null
}
