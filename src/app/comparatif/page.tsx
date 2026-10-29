import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Action from '@/components/ui/Action'
import { JsonLd, filAriane, meta } from '@/lib/seo'
import { COMPARATIFS } from '@/data/piliers/comparatifs'

export const metadata = meta({
  titre: 'Comparatifs : plateforme ou sur mesure, comment choisir',
  description: 'Wix, WordPress, Shopify, Planity, TheFork, Uber Eats, logiciels de devis : dix comparatifs honnêtes, sans prix de concurrent, pour choisir en connaissance de cause.',
  chemin: '/comparatif',
})

export default function Page() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Comparatifs', chemin: '/comparatif' }])} />
      <Document
        moment="comparatifs"
        ariane={[{ href: '/', nom: 'Accueil' }, { href: '/comparatif', nom: 'Comparatifs' }]}
        etiquette="Comparatifs"
        titre="Plateforme ou sur mesure : comment choisir"
        chapo="Une plateforme est souvent le bon choix pour démarrer ; un site ou un outil sur mesure l’est quand il faut garder ses clients, ses données et sa marge. Chaque comparatif dit où chaque solution gagne, sans dénigrer ni afficher de prix de tiers."
        entete={
          <p className="su-pil__actions">
            <Action href="/tarifs#estimer">Estimer mon projet</Action>
            <Action href="/contact?a=appel" variante="contour">
              Appel gratuit de 30 min
            </Action>
          </p>
        }
      >
        <>
          <h2>Les dix comparatifs</h2>
          <ul>
            {COMPARATIFS.map((c) => (
              <li key={c.chemin}>
                <Link href={c.chemin}>{c.nom}</Link> — {c.pour}.
              </li>
            ))}
          </ul>
          <h2>Comment lire ces pages</h2>
          <p>
            Aucun prix, aucune commission ni statistique d’un service tiers n’y figure : ils changent et ne sont pas les nôtres à garantir. Pour chaque cas, vous trouvez les situations où la plateforme est préférable, celles où le sur mesure l’emporte, et un tableau de critères vérifiables : propriété des données, coûts récurrents, personnalisation, dépendance.
          </p>
          <p>
            Pour comparer à votre situation, utilisez l’<Link href="/tarifs#estimer">estimateur de prix</Link> et le <Link href="/outils/calculateur-abonnement-saas">calculateur abonnement ou sur mesure</Link>, qui prennent vos chiffres et non les nôtres.
          </p>
        </>
      </Document>
    </>
  )
}
