/**
 * MENTIONS LÉGALES — reprises de l'ancien site, dans le gabarit Document.
 * Identité et contact lus dans config/site ; ce que l'ancien site ne disait
 * pas de façon sûre reste marqué « à compléter », jamais inventé.
 */
import Link from 'next/link'
import Document from '@/gabarits/document/Document'
import { SITE } from '@/config/site'
import { JsonLd, filAriane, meta } from '@/lib/seo'

export const metadata = meta({
  titre: 'Mentions légales — Stackup Agency',
  description: 'Mentions légales du site stackup-agency.fr : éditeur, directeur de la publication, hébergeur, propriété intellectuelle, responsabilité et droit applicable.',
  chemin: '/mentions-legales',
})

const SOMMAIRE = [
  { id: 'editeur', titre: 'Éditeur du site' },
  { id: 'publication', titre: 'Directeur de la publication' },
  { id: 'hebergeur', titre: 'Hébergeur du site' },
  { id: 'messagerie', titre: 'Messagerie' },
  { id: 'propriete', titre: 'Propriété intellectuelle' },
  { id: 'responsabilite', titre: 'Responsabilité' },
  { id: 'donnees', titre: 'Données personnelles et cookies' },
  { id: 'droit', titre: 'Droit applicable' },
  { id: 'contact', titre: 'Contact' },
]

export default function MentionsLegales() {
  return (
    <>
      <JsonLd data={filAriane([{ nom: 'Accueil', chemin: '/' }, { nom: 'Mentions légales', chemin: '/mentions-legales' }])} />
      <Document
        moment="doc-mentions"
        ariane={[
          { href: '/', nom: 'Accueil' },
          { href: '/mentions-legales', nom: 'Mentions légales' },
        ]}
        etiquette="Informations légales"
        titre="Mentions légales"
        chapo="Qui édite ce site, qui l’héberge, et ce que vous pouvez en faire."
        maj="30 octobre 2026"
        sommaire={SOMMAIRE}
      >
        <h2 id="editeur">Éditeur du site</h2>
        <p>
          Le site <strong>stackup-agency.fr</strong> est édité par {SITE.nom}.
        </p>
        <ul>
          <li>
            <strong>Nom commercial :</strong> {SITE.nom}
          </li>
          <li>
            <strong>Fondateur :</strong> {SITE.fondateur}
          </li>
          <li>
            <strong>Forme juridique et titulaire :</strong> {SITE.entreprise.forme}, {SITE.entreprise.exploitant} ({SITE.entreprise.identite})
          </li>
          <li>
            <strong>Adresse :</strong> {SITE.entreprise.adresse}
          </li>
          <li>
            <strong>E-mail :</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          </li>
          <li>
            <strong>Téléphone :</strong> <a href={SITE.telephoneLien}>{SITE.telephone}</a>
          </li>
          <li>
            <strong>SIREN / SIRET :</strong> {SITE.entreprise.siren} / {SITE.entreprise.siret}
          </li>
          <li>
            <strong>Code APE (NAF) :</strong> {SITE.entreprise.ape}
          </li>
          <li>
            <strong>Immatriculation :</strong> {SITE.entreprise.immatriculation}
          </li>
          <li>
            <strong>TVA :</strong> {SITE.mentions.tva}
          </li>
        </ul>

        <h2 id="publication">Directeur de la publication</h2>
        <p>{SITE.fondateur}</p>

        <h2 id="hebergeur">Hébergeur du site</h2>
        <p>Le site stackup-agency.fr est hébergé par :</p>
        <ul>
          <li>
            <strong>Vercel Inc.</strong>
          </li>
          <li>340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis</li>
          <li>
            <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
              vercel.com
            </a>
          </li>
        </ul>

        <h2 id="messagerie">Messagerie</h2>
        <p>Les adresses e-mail professionnelles de {SITE.nom} sont hébergées par :</p>
        <ul>
          <li>
            <strong>OVH SAS</strong>
          </li>
          <li>2 rue Kellermann, 59100 Roubaix</li>
          <li>
            <a href="https://ovhcloud.com" target="_blank" rel="noopener noreferrer">
              ovhcloud.com
            </a>
          </li>
        </ul>

        <h2 id="propriete">Propriété intellectuelle</h2>
        <p>
          L’ensemble des éléments de ce site (structure, textes, images, logo, charte graphique, code source) est la propriété exclusive de {SITE.nom}, sauf mention contraire. Toute reproduction, représentation, modification ou adaptation, totale ou partielle, quel que soit le procédé, est interdite sans autorisation écrite préalable et constitue une contrefaçon au sens des articles L. 335-2 et suivants du Code de la propriété intellectuelle.
        </p>
        <p>Les réalisations présentées sur le site sont des démonstrations, étiquetées comme telles.</p>

        <h2 id="responsabilite">Responsabilité</h2>
        <p>
          {SITE.nom} s’efforce d’assurer l’exactitude et la mise à jour des informations diffusées sur ce site, sans pouvoir en garantir l’exhaustivité. {SITE.nom} ne saurait être tenue responsable d’une imprécision, d’une omission, ni d’un dommage direct ou indirect résultant de l’accès au site ou de l’utilisation des informations qu’il contient.
        </p>
        <p>Les liens vers des sites tiers n’engagent pas la responsabilité de {SITE.nom} quant à leur contenu.</p>

        <h2 id="donnees">Données personnelles et cookies</h2>
        <p>
          Les données transmises par le formulaire de contact sont traitées comme le décrit la <Link href="/politique-confidentialite">politique de confidentialité</Link>. Le fonctionnement du site au regard des cookies est détaillé sur la page <Link href="/cookies">cookies</Link>.
        </p>

        <h2 id="droit">Droit applicable</h2>
        <p>Le site et les présentes mentions légales sont soumis au droit français. En cas de litige, et après tentative de résolution amiable, les tribunaux français sont seuls compétents.</p>

        <h2 id="contact">Contact</h2>
        <p>
          Pour toute question relative au site ou à son contenu : <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <p>
          Voir aussi : <Link href="/cgv">conditions générales de vente</Link>, <Link href="/politique-confidentialite">politique de confidentialité</Link>, <Link href="/contact">contact</Link>.
        </p>
      </Document>
    </>
  )
}
