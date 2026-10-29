'use client'
/**
 * Calculateur « abonnement SaaS ou outil à vous » — cumul sur 3 et 5 ans, avec les chiffres du visiteur.
 * Aucun prix de concurrent n'est connu de l'outil : le visiteur saisit ce qu'il paie. Côté Stackup, seul le « à partir de »
 * du moteur de devis (et l'abonnement facultatif minimum) entre dans le calcul. Tout se passe dans le navigateur.
 */
import { useState } from 'react'
import Link from 'next/link'
import './calculateur-abonnement.css'

const euros = (n: number) => `${Math.round(n).toLocaleString('fr-FR')} €`
const lire = (v: string) => {
  const n = Number(v.replace(/\s/g, '').replace(',', '.'))
  return Number.isFinite(n) && n >= 0 ? n : 0
}

export default function CalculateurAbonnement({ prixOutil, aboMin, compact = false }: { prixOutil: number; aboMin: number; compact?: boolean }) {
  const [mensuel, setMensuel] = useState('')
  const [postes, setPostes] = useState('1')
  const [entree, setEntree] = useState('')
  const m = lire(mensuel)
  const p = Math.max(1, Math.round(lire(postes)))
  const e = lire(entree)
  const saisi = m > 0
  const saas = (ans: number) => m * p * 12 * ans + e
  const sansAbo = prixOutil
  const avecAbo = (ans: number) => prixOutil + aboMin * 12 * ans
  const lignes = [3, 5].map((ans) => ({ ans, saas: saas(ans), sansAbo, avecAbo: avecAbo(ans) }))
  const moisEquilibre = saisi ? Math.ceil(Math.max(0, prixOutil - e) / (m * p)) : 0

  return (
    <section className="su-abo" aria-labelledby="su-abo-t" data-compact={compact ? '1' : '0'}>
      <h2 id="su-abo-t" className="su-abo__titre">
        {compact ? 'Abonnement ou outil à vous : comparez avec vos chiffres' : 'Vos chiffres'}
      </h2>
      <div className="su-abo__champs">
        <label>
          <span>Ce que vous payez aujourd’hui par mois pour le logiciel ou la plateforme</span>
          <input inputMode="decimal" value={mensuel} onChange={(x) => setMensuel(x.target.value)} placeholder="par exemple 60" />
          <small>€ par mois et par utilisateur, hors taxes</small>
        </label>
        <label>
          <span>Nombre d’utilisateurs ou de postes</span>
          <input inputMode="numeric" value={postes} onChange={(x) => setPostes(x.target.value)} />
        </label>
        <label>
          <span>Frais d’installation ou de démarrage déjà payés (facultatif)</span>
          <input inputMode="decimal" value={entree} onChange={(x) => setEntree(x.target.value)} placeholder="0" />
          <small>€, une seule fois</small>
        </label>
      </div>
      <div className="su-abo__resultat" aria-live="polite">
        {saisi ? (
          <>
            <table>
              <caption className="sr-only">Coût cumulé selon la durée</caption>
              <thead>
                <tr>
                  <th scope="col">Sur…</th>
                  <th scope="col">Votre abonnement</th>
                  <th scope="col">Outil à vous, sans abonnement</th>
                  <th scope="col">Outil à vous, avec l’abonnement facultatif minimum</th>
                </tr>
              </thead>
              <tbody>
                {lignes.map((l) => (
                  <tr key={l.ans}>
                    <th scope="row">{l.ans} ans</th>
                    <td>{euros(l.saas)}</td>
                    <td>à partir de {euros(l.sansAbo)}</td>
                    <td>à partir de {euros(l.avecAbo)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p>
              {moisEquilibre > 0 && moisEquilibre < 600
                ? `À ce rythme, votre abonnement aura coûté autant que l’outil à vous (sans abonnement) au bout d’environ ${moisEquilibre} mois ; au-delà, chaque mois supplémentaire ne coûte plus rien côté outil.`
                : 'Avec ces chiffres, le montant de départ de l’outil est déjà atteint par votre abonnement.'}{' '}
              {saas(3) < avecAbo(3) ? 'Sur trois ans, votre abonnement actuel reste moins cher que l’outil avec abonnement : ce n’est pas toujours l’outil sur mesure le plus économique, c’est surtout un choix de propriété et d’adaptation.' : ''}
            </p>
          </>
        ) : (
          <p>Saisissez ce que vous payez par mois : le tableau se calcule dans votre navigateur, rien n’est envoyé.</p>
        )}
        <p className="su-abo__note">
          Les montants de l’outil sont des « à partir de » (le devis précis dépend des modules) ; l’abonnement facultatif couvre l’hébergement et le suivi. Le calcul ignore les limites de fonctionnalités de votre solution actuelle et le temps de changer d’outil.{' '}
          <Link href="/tarifs#estimer">Estimer mon outil</Link>
        </p>
      </div>
    </section>
  )
}
