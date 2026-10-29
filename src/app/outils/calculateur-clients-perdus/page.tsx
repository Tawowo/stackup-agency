/**
 * /outils/calculateur-clients-perdus — un calcul à hypothèses transparentes,
 * jamais une promesse. L'outil est un îlot client ; le texte, la FAQ et les
 * données structurées sont rendus côté serveur.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import Accordeon from '@/components/editorial/Accordeon'
import CalculateurClientsPerdus from '@/experiences/outils/CalculateurClientsPerdus'
import { JsonLd, ORIGINE, faqPage, filAriane, meta } from '@/lib/seo'
import '@/experiences/outils/calculateur-clients-perdus.css'

export const metadata = meta({
  titre: 'Calculateur de clients perdus sans site internet',
  description: 'Estimez le manque à gagner d’un site absent ou peu visible à partir de vos propres hypothèses : calcul détaillé et sensibilité. Gratuit, sans envoi.',
  chemin: '/outils/calculateur-clients-perdus',
})

const FAQ = [
  { q: 'Cet outil est-il une prévision de mon chiffre d’affaires ?', r: 'Non. Il multiplie six nombres que vous saisissez vous-même et vous montre ce que ces hypothèses impliquent. Si elles sont trop optimistes, le résultat l’est aussi : il sert à raisonner, pas à promettre.' },
  { q: 'Où trouver le nombre de recherches par mois ?', r: 'Dans Google Keyword Planner (accessible avec un compte Google Ads, sans obligation de lancer une campagne), qui donne souvent des fourchettes. Avec un site existant, la Search Console indique les impressions réelles de vos pages.' },
  { q: 'Que mettre si je n’ai pas encore de site ?', r: 'Zéro pour la part actuelle, ou la part que vous obtenez par votre fiche Google. Pour les autres taux, partez de vos appels et de vos devis : combien de demandes vous reçoivent, combien aboutissent.' },
  { q: 'Pourquoi le résultat change-t-il autant quand je modifie un taux ?', r: 'Parce que le calcul est une suite de multiplications : chaque taux agit sur tout ce qui suit. Le tableau de sensibilité montre ce que donne le résultat quand chaque taux est divisé par deux.' },
  { q: 'Mes données sont-elles envoyées quelque part ?', r: 'Non. Le calcul s’exécute dans votre navigateur, rien n’est transmis ni conservé sur nos serveurs. Si vous fermez la page, les valeurs saisies disparaissent.' },
  { q: 'Un site garantit-il ces clients supplémentaires ?', r: 'Non, et aucun prestataire sérieux ne peut le garantir. Un site visible et clair augmente vos chances d’être trouvé et contacté ; le résultat dépend de la concurrence, de votre offre et de votre réactivité.' },
]

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Calculateur de clients perdus sans site internet',
            url: `${ORIGINE}/outils/calculateur-clients-perdus`,
            description: 'Calcul à hypothèses saisies par le visiteur du manque à gagner mensuel d’une activité sans site ou avec un site peu visible, avec détail des étapes et analyse de sensibilité.',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Tout navigateur web',
            browserRequirements: 'JavaScript',
            inLanguage: 'fr',
            isAccessibleForFree: true,
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
            provider: { '@id': `${ORIGINE}/#agence` },
          },
          filAriane([
            { nom: 'Accueil', chemin: '/' },
            { nom: 'Outils', chemin: '/outils' },
            { nom: 'Clients perdus', chemin: '/outils/calculateur-clients-perdus' },
          ]),
          faqPage(FAQ.map((f) => ({ q: f.q, a: f.r }))),
        ]}
      />
      <Document
        moment="outils-clients-perdus"
        forme="cadran"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/outils', nom: 'Outils' },
          { href: '/outils/calculateur-clients-perdus', nom: 'Clients perdus' },
        ]}
        etiquette="Outil gratuit · calcul dans votre navigateur"
        titre="Combien de clients perdez-vous sans site visible ?"
        chapo="Saisissez vos propres hypothèses : le calcul s’écrit étape par étape et donne un ordre de grandeur, jamais une promesse. Rien n’est envoyé."
        large
      >
        <CalculateurClientsPerdus />

        <div className="su-ccp-texte su-prose">
          <p>
            <strong>Ce calculateur ne contient aucun chiffre de marché : il enchaîne six nombres que vous choisissez, et vous montre ce qu’ils impliquent.</strong> Plus ces nombres viennent de relevés réels, plus l’ordre de grandeur final est utile. S’ils sont devinés, il ne vaut pas mieux qu’une intuition écrite proprement.
          </p>

          <h2>Comment relever vos vraies données ?</h2>
          <p>
            Pour les recherches, ouvrez Google Keyword Planner (inclus dans un compte Google Ads, sans obligation de dépenser) et saisissez votre métier avec votre ville, par exemple « plombier » ou « coiffeur » suivi du nom de la commune. L’outil affiche souvent des fourchettes plutôt que des valeurs exactes : prenez une valeur prudente et additionnez les formulations proches.
          </p>
          <p>
            Si vous avez déjà un site, la Search Console, gratuite, indique pour chaque requête le nombre d’impressions (combien de fois votre page est apparue) et de clics. Vos clics rapportés au volume de recherches donnent la part que vous obtenez aujourd’hui. Votre fiche Google Business Profile affiche, elle, les appels, les demandes d’itinéraire et les clics vers votre site.
          </p>
          <p>
            Pour les contacts et les ventes, le meilleur relevé est le vôtre : notez pendant quelques semaines chaque appel, message et demande de devis, et demandez « comment m’avez-vous trouvé ? ». Un carnet suffit. Le taux de transformation, vous le connaissez déjà : sur dix devis envoyés, combien sont signés.
          </p>
          <p>
            Pour la valeur d’un client, prenez vos dernières factures et calculez ce qu’il vous reste après vos coûts directs. Un coiffeur ou une boulangère compteront plusieurs passages dans l’année si la clientèle revient ; un paysagiste ou un plombier, plutôt le chantier lui-même. Dans le doute, retenez la valeur la plus basse : c’est la plus honnête.
          </p>

          <h2>Pourquoi les hypothèses comptent plus que la formule</h2>
          <p>
            La formule est une simple multiplication, et c’est justement le piège : une erreur sur un taux se répercute sur tout le reste. Diviser par deux la part de visiteurs qui vous contactent divise le résultat par deux. Réduire la part atteignable pèse davantage encore, car elle se soustrait à ce que vous obtenez déjà. Le tableau de sensibilité sous l’outil sert à cela : regarder la fourchette plausible, pas un chiffre isolé.
          </p>
          <p>
            Prenez l’habitude de tester une version pessimiste et une version raisonnable. Notez aussi sur quoi repose chaque nombre : relevé, estimation ou simple impression. Un résultat bâti sur six impressions n’a pas le même poids qu’un résultat bâti sur trois relevés. Si, même avec des taux divisés par deux, l’écart reste significatif pour votre activité, la question vaut d’être creusée. S’il disparaît, le sujet n’est peut-être pas prioritaire pour vous.
          </p>

          <h2>Ce qu’un site peut faire, et ce qu’il ne peut pas faire</h2>
          <p>
            Un site clair peut vous rendre trouvable sur les recherches qui vous concernent, rassurer un visiteur (qui vous êtes, ce que vous faites, où, comment vous joindre) et faciliter le contact par un numéro cliquable ou un formulaire court. Pour un artisan, un commerçant ou un cabinet, c’est souvent la première chose qu’un client vérifie avant d’appeler.
          </p>
          <p>
            Il ne peut pas créer une demande qui n’existe pas, ni vous garantir une place sur Google : le classement dépend de la concurrence locale, de la qualité de vos pages et du temps. Il ne remplace pas non plus la réactivité au téléphone, la qualité de votre travail ni le bouche-à-oreille. Un site mal fait ou jamais mis à jour peut même desservir.
          </p>

          <h2>Quelles erreurs de raisonnement éviter ?</h2>
          <ul>
            <li>
              <strong>Compter toutes les recherches.</strong> Les curieux, les concurrents, les étudiants et les habitants d’autres communes ne sont pas vos clients. Gardez celles d’une personne prête à vous appeler.
            </li>
            <li>
              <strong>Confondre visite et contact.</strong> Beaucoup de visiteurs regardent et repartent. Le taux de contact se mesure, il ne se suppose pas.
            </li>
            <li>
              <strong>Oublier la concurrence.</strong> La part que vous gagnez, un autre professionnel la perd : l’ensemble des parts ne peut pas dépasser la totalité des recherches.
            </li>
            <li>
              <strong>Mélanger chiffre d’affaires et marge.</strong> Un client rapporte ce qu’il vous laisse après vos coûts, pas son montant facturé.
            </li>
            <li>
              <strong>Compter deux fois.</strong> Les clients que vous obtenez déjà par le bouche-à-oreille ne sont pas des clients perdus.
            </li>
            <li>
              <strong>Prendre l’exemple pour une moyenne.</strong> Les valeurs de « Voir un exemple » sont fictives : elles montrent le fonctionnement, rien d’autre.
            </li>
          </ul>

          <h2>Quelle suite donner à ce résultat ?</h2>
          <p>
            Commencez par ce que vous pouvez vérifier. Faites <Link href="/outils/audit-site">mesurer votre site actuel</Link> si vous en avez un : vitesse, accessibilité et bases du référencement. Si votre clientèle est surtout locale, la <Link href="/services/referencement-local">visibilité locale</Link> (fiche Google, pages par commune, avis) est souvent le levier le plus direct.
          </p>
          <p>
            Si le constat est qu’il vous manque un site, ou qu’il n’est plus à la hauteur, la <Link href="/services/creation-de-site-internet">création de site internet</Link> détaille la démarche, et l’<Link href="/tarifs">estimateur de prix</Link> vous donne un ordre de grandeur de l’investissement, à comparer sereinement à votre propre résultat ci-dessus. Pour en parler avec Mathéo Reboul, <Link href="/contact">écrivez-lui</Link> : l’échange est sans engagement. Retrouvez aussi <Link href="/outils">tous les outils gratuits</Link>.
          </p>
        </div>

        <section className="su-ccp-faq" aria-labelledby="su-ccp-faq">
          <h2 id="su-ccp-faq" className="su-display">
            Questions fréquentes
          </h2>
          <Accordeon questions={FAQ} />
        </section>
      </Document>
    </>
  )
}
