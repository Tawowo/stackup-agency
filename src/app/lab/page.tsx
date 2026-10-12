'use client'

/**
 * Banc de mesure du MONOLITHE — Phase 4.
 *
 * Cette page n'est pas une vitrine : elle existe pour produire des chiffres.
 * Elle affiche en direct le palier de qualité choisi par le moniteur, le temps
 * de trame moyen mesuré, et expose ces valeurs sur `window.__SU_LAB` pour
 * qu'un script Playwright les relève sans dépendre d'une lecture d'écran.
 *
 * Accessible via /lab — en `noindex`, hors sitemap.
 */

import { useEffect, useRef, useState } from 'react'
import type { ControleMonolithe } from '@/lib/webgl/monolithe'
import type { Palier } from '@/lib/webgl/quality'

interface Releve {
  palier: string
  tempsTrame: number
  fps: number
  webgl: boolean
  mouvementReduit: boolean
  instances: number
  ecoule: number
}

declare global {
  interface Window {
    __SU_LAB?: Releve
  }
}

export default function Lab() {
  const hote = useRef<HTMLDivElement>(null)
  const controle = useRef<ControleMonolithe | null>(null)
  const [releve, setReleve] = useState<Releve | null>(null)
  const [desassemblage, setDesassemblage] = useState(0)
  const [diagnostic, setDiagnostic] = useState<string>('initialisation…')

  useEffect(() => {
    const element = hote.current
    if (!element) return
    let annule = false
    let intervalle: ReturnType<typeof setInterval> | undefined
    const depart = performance.now()

    async function demarrer() {
      const [{ creerMonolithe }, { webglDisponible, mouvementReduit, reglagesPour }] =
        await Promise.all([
          import('@/lib/webgl/monolithe'),
          import('@/lib/webgl/quality'),
        ])

      const webgl = webglDisponible()
      const reduit = mouvementReduit()

      if (!webgl) {
        setDiagnostic('WebGL indisponible — le repli CSS serait affiché en production.')
        return
      }
      if (reduit) {
        setDiagnostic('prefers-reduced-motion actif — la scène est volontairement désactivée.')
        return
      }

      const instance = creerMonolithe(element!)
      if (!instance) {
        setDiagnostic('Création du contexte WebGL refusée par le navigateur.')
        return
      }
      if (annule) {
        instance.detruire()
        return
      }

      controle.current = instance
      setDiagnostic('scène active')

      intervalle = setInterval(() => {
        const dpr = window.devicePixelRatio || 1
        const r = reglagesPour(instance.palier() as Palier, dpr)
        const t = instance.tempsTrame()
        const valeurs: Releve = {
          palier: instance.palier(),
          tempsTrame: Math.round(t * 100) / 100,
          fps: Math.round(1000 / t),
          webgl,
          mouvementReduit: reduit,
          instances: r.instances,
          ecoule: Math.round(performance.now() - depart),
        }
        window.__SU_LAB = valeurs
        setReleve(valeurs)
      }, 500)
    }

    demarrer()

    return () => {
      annule = true
      if (intervalle) clearInterval(intervalle)
      controle.current?.detruire()
      controle.current = null
      delete window.__SU_LAB
    }
  }, [])

  useEffect(() => {
    controle.current?.setDesassemblage(desassemblage)
  }, [desassemblage])

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6">
      <h1 className="text-2xl font-bold text-[#1E3A5F] mb-1">Banc de mesure — LE MONOLITHE</h1>
      <p className="text-sm text-[#64748B] mb-6">
        Page technique interne, non indexée. Les relevés ci-dessous sont mesurés dans ce navigateur.
      </p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        <div
          className="relative rounded-xl overflow-hidden border border-[#1E3A5F]/10"
          style={{ height: 'min(70vh, 620px)', background: '#FFFDF9' }}
        >
          <div ref={hote} className="su-scene" />
        </div>

        <aside className="su-strate su-strate--levee p-5 text-sm self-start">
          <p className="su-surtitre mb-4">Relevés</p>
          <p className="mb-4 text-[#64748B]" data-diagnostic>{diagnostic}</p>

          {releve ? (
            <dl className="space-y-2 font-mono text-[13px]">
              {([
                ['palier', releve.palier],
                ['instances', String(releve.instances)],
                ['temps de trame', `${releve.tempsTrame.toFixed(2)} ms`],
                ['cadence', `${releve.fps} fps`],
                ['écoulé', `${(releve.ecoule / 1000).toFixed(1)} s`],
              ] as const).map(([cle, valeur]) => (
                <div key={cle} className="flex justify-between gap-4 border-b border-[#1E3A5F]/10 pb-1.5">
                  <dt className="text-[#64748B]">{cle}</dt>
                  <dd className="font-semibold text-[#1E3A5F]">{valeur}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-[#64748B]">aucun relevé</p>
          )}

          <label className="block mt-6">
            <span className="text-[#1E3A5F] font-semibold">
              Désassemblage : {desassemblage.toFixed(2)}
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={desassemblage}
              onChange={(e) => setDesassemblage(Number(e.target.value))}
              className="w-full mt-2 accent-[#F59E0B]"
            />
          </label>
        </aside>
      </div>
    </div>
  )
}
