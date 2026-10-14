import Link from 'next/link'
import { LIGNES } from '@/config/tarifs.generated'
import { prixLigne, uniteLigne } from './format'
import './tarifs-blocs.css'

/** Services à la carte, pour qui a déjà un site (onglet « À la carte » de l'Excel). */
export default function ALaCarte() {
  const lignes = LIGNES.filter((l) => l.famille === 'carte')
  if (!lignes.length) return null
  const groupes: { titre: string; lignes: typeof lignes }[] = []
  for (const l of lignes) {
    const titre = l.groupe.charAt(0) + l.groupe.slice(1).toLowerCase()
    const g = groupes.find((x) => x.titre === titre)
    if (g) g.lignes.push(l)
    else groupes.push({ titre, lignes: [l] })
  }
  return (
    <section id="a-la-carte" className="su-tg su-tg--carte" aria-labelledby="su-carte-t" data-nuit="0">
      <div className="su-tg__enveloppe">
        <h2 id="su-carte-t" className="su-display su-tg__titre">
          Vous avez déjà un site ? Services à la carte
        </h2>
        <p className="su-tg__intro">Un audit, une accélération, une mise en conformité, une heure d’aide : choisissez seulement ce dont vous avez besoin.</p>
        {groupes.map((g) => (
          <div key={g.titre} className="su-tg__groupe">
            <h3 className="su-tg__groupe-titre su-mono">{g.titre}</h3>
            <ul className="su-tg__liste">
              {g.lignes.map((l) => (
                <li key={l.code} className="su-tg__ligne">
                  <div>
                    <p className="su-tg__ligne-nom">{l.libelle}</p>
                    {l.description && <p className="su-tg__ligne-texte">{l.description}</p>}
                  </div>
                  <p className="su-tg__ligne-prix su-tabular">
                    {prixLigne(l)}
                    {uniteLigne(l) && <span> · {uniteLigne(l)}</span>}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="su-tg__note">
          Prix nets, TVA non applicable (art. 293 B du CGI). Besoin d’une refonte complète ? <Link href="/tarifs#estimer">Estimez-la ici</Link>.
        </p>
      </div>
    </section>
  )
}
