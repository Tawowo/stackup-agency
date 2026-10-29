'use client'
/**
 * /outils/generateur-mentions-legales — LE GÉNÉRATEUR. Un formulaire à gauche,
 * le texte des mentions légales qui se compose en direct à droite. Tout se
 * passe dans le navigateur : aucune donnée n'est envoyée. Le modèle vide est
 * déjà dans le HTML rendu côté serveur ; rien n'est masqué par défaut.
 */
import { cloneElement, useId, useMemo, useRef, useState } from 'react'
import Action from '@/components/ui/Action'
import './generateur-mentions.css'

type Statut = 'ei' | 'micro' | 'societe' | 'liberale'
type Tva = 'applicable' | 'non'

interface Champs {
  statut: Statut
  nom: string
  adresse: string
  identifiant: string
  email: string
  telephone: string
  site: string
  directeur: string
  forme: string
  capital: string
  rcs: string
  ordre: string
  numeroOrdre: string
  hebergeur: string
  hebergeurAdresse: string
  hebergeurTel: string
  tva: Tva
  tvaNumero: string
  reglementee: string
  mediation: string
}

const VIDE: Champs = {
  statut: 'ei',
  nom: '',
  adresse: '',
  identifiant: '',
  email: '',
  telephone: '',
  site: '',
  directeur: '',
  forme: '',
  capital: '',
  rcs: '',
  ordre: '',
  numeroOrdre: '',
  hebergeur: '',
  hebergeurAdresse: '',
  hebergeurTel: '',
  tva: 'non',
  tvaNumero: '',
  reglementee: '',
  mediation: '',
}

const STATUTS: { id: Statut; nom: string }[] = [
  { id: 'ei', nom: 'Entrepreneur individuel' },
  { id: 'micro', nom: 'Micro-entrepreneur' },
  { id: 'societe', nom: 'Société (forme et capital)' },
  { id: 'liberale', nom: 'Profession libérale réglementée' },
]

interface Rubrique {
  titre: string
  lignes: string[]
}

/** Valeur saisie, ou un repère entre crochets à compléter. */
const ou = (v: string, repere: string) => (v.trim() ? v.trim() : `[${repere}]`)

function composer(c: Champs): Rubrique[] {
  const nom = ou(c.nom, c.statut === 'societe' ? 'dénomination sociale' : 'nom et prénom')
  const site = c.site.trim() ? c.site.trim() : '[adresse du site]'
  const adresse = ou(c.adresse, c.statut === 'societe' ? 'adresse du siège social' : 'adresse')
  const identifiant = ou(c.identifiant, 'numéro SIREN ou SIRET')

  const editeur: string[] = []
  if (c.statut === 'ei') editeur.push(`Le site ${site} est édité par ${nom}, entrepreneur individuel.`)
  if (c.statut === 'micro') editeur.push(`Le site ${site} est édité par ${nom}, entrepreneur individuel sous le régime de la micro-entreprise.`)
  if (c.statut === 'societe') editeur.push(`Le site ${site} est édité par ${nom}, ${ou(c.forme, 'forme juridique')} au capital de ${ou(c.capital, 'montant du capital')} euros.`)
  if (c.statut === 'liberale') editeur.push(`Le site ${site} est édité par ${nom}, exerçant une profession libérale réglementée.`)
  editeur.push(`${c.statut === 'societe' ? 'Siège social' : 'Adresse'} : ${adresse}`)
  editeur.push(`SIREN / SIRET : ${identifiant}`)
  if (c.statut === 'societe' && c.rcs.trim()) editeur.push(`Immatriculation : ${c.rcs.trim()}`)
  if (c.statut === 'liberale') {
    editeur.push(`Ordre ou organisme professionnel : ${ou(c.ordre, 'ordre ou organisme')}`)
    editeur.push(`Numéro d’inscription : ${ou(c.numeroOrdre, 'numéro')}`)
  }
  editeur.push(c.tva === 'applicable' ? `TVA : applicable, numéro de TVA intracommunautaire ${ou(c.tvaNumero, 'numéro de TVA')}` : 'TVA non applicable, article 293 B du CGI.')
  editeur.push(`Adresse électronique : ${ou(c.email, 'adresse e-mail')}`)
  editeur.push(`Téléphone : ${ou(c.telephone, 'numéro de téléphone')}`)

  const rubriques: Rubrique[] = [{ titre: 'Éditeur du site', lignes: editeur }]

  rubriques.push({
    titre: 'Directeur de la publication',
    lignes: [`Le directeur de la publication est ${c.directeur.trim() ? c.directeur.trim() : c.nom.trim() ? c.nom.trim() : '[nom du directeur de la publication]'}.`],
  })

  rubriques.push({
    titre: 'Hébergeur',
    lignes: [`Le site est hébergé par ${ou(c.hebergeur, 'nom de l’hébergeur')}.`, `Adresse : ${ou(c.hebergeurAdresse, 'adresse de l’hébergeur')}`, `Téléphone : ${ou(c.hebergeurTel, 'téléphone de l’hébergeur')}`],
  })

  if (c.reglementee.trim()) {
    rubriques.push({ titre: 'Activité réglementée', lignes: [c.reglementee.trim()] })
  }

  if (c.mediation.trim()) {
    rubriques.push({
      titre: 'Médiation de la consommation',
      lignes: [`En cas de litige avec un consommateur, vous pouvez recourir gratuitement au médiateur suivant : ${c.mediation.trim()}`],
    })
  }

  rubriques.push({
    titre: 'Propriété intellectuelle',
    lignes: [
      `Les textes, images, logos, graphismes, vidéos et plus généralement tous les éléments présents sur ce site sont protégés par le droit de la propriété intellectuelle. Sauf mention contraire, ils sont la propriété de ${c.nom.trim() ? c.nom.trim() : '[nom ou dénomination]'} ou utilisés avec l’autorisation de leurs titulaires.`,
      'Toute reproduction, représentation, modification ou réutilisation, totale ou partielle, sans autorisation écrite préalable est interdite.',
    ],
  })

  rubriques.push({
    titre: 'Données personnelles',
    lignes: [
      `Les informations que vous transmettez par les formulaires ou par message (par exemple votre nom, votre adresse électronique, votre téléphone) servent à répondre à votre demande. Le responsable du traitement est ${c.nom.trim() ? c.nom.trim() : '[nom ou dénomination]'}.`,
      `Vous disposez d’un droit d’accès, de rectification, d’effacement, d’opposition et de limitation sur vos données. Pour les exercer, écrivez à ${ou(c.email, 'adresse e-mail')}. Vous pouvez aussi saisir la CNIL (cnil.fr).`,
      'Pour le détail des données traitées, de leur finalité et de leur durée de conservation, consultez la politique de confidentialité : [adresse de votre page de politique de confidentialité].',
    ],
  })

  rubriques.push({
    titre: 'Cookies',
    lignes: [
      'Ce site peut déposer des cookies ou des traceurs sur votre appareil. Ceux qui ne sont pas nécessaires au fonctionnement du site ne sont déposés qu’avec votre accord, que vous pouvez retirer à tout moment.',
      'Pour en savoir plus : [adresse de votre page sur les cookies, ou précisez ici ceux que le site utilise].',
    ],
  })

  rubriques.push({
    titre: 'Contact',
    lignes: [`Pour toute question sur ce site : ${ou(c.email, 'adresse e-mail')}${c.telephone.trim() ? `, ${c.telephone.trim()}` : ''}.`, 'Dernière mise à jour : [date].'],
  })

  return rubriques
}

function enTexte(r: Rubrique[]): string {
  return ['MENTIONS LÉGALES', ...r.map((x) => `${x.titre.toUpperCase()}\n${x.lignes.join('\n')}`)].join('\n\n')
}

function Champ({ id, label, aide, children }: { id: string; label: string; aide?: string; children: React.ReactElement<{ 'aria-describedby'?: string }> }) {
  return (
    <div className="su-gm__champ">
      <label htmlFor={id} className="su-gm__label">
        {label}
      </label>
      {aide ? cloneElement(children, { 'aria-describedby': `${id}-aide` }) : children}
      {aide && (
        <p id={`${id}-aide`} className="su-gm__aide">
          {aide}
        </p>
      )}
    </div>
  )
}

export default function GenerateurMentions() {
  const base = useId()
  const [c, setC] = useState<Champs>(VIDE)
  const [retour, setRetour] = useState('')
  const minuteur = useRef<ReturnType<typeof setTimeout> | null>(null)
  const rubriques = useMemo(() => composer(c), [c])
  const texte = useMemo(() => enTexte(rubriques), [rubriques])

  const id = (s: string) => `${base}-${s}`
  const maj = <K extends keyof Champs>(k: K) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setC((p) => ({ ...p, [k]: e.target.value }))
  const saisie = (k: keyof Champs, extra: Partial<React.InputHTMLAttributes<HTMLInputElement>> = {}) => ({
    id: id(k),
    value: c[k],
    onChange: maj(k),
    className: 'su-gm__champ-saisie',
    maxLength: 300,
    ...extra,
  })

  const zone = (k: keyof Champs) => ({ id: id(k), value: c[k], onChange: maj(k), className: 'su-gm__champ-saisie', maxLength: 600 })

  const annoncer = (m: string) => {
    setRetour(m)
    if (minuteur.current) clearTimeout(minuteur.current)
    minuteur.current = setTimeout(() => setRetour(''), 6000)
  }

  const copier = async () => {
    try {
      await navigator.clipboard.writeText(texte)
      annoncer('Texte copié dans le presse-papiers.')
    } catch {
      const cible = document.getElementById(id('copie')) as HTMLTextAreaElement | null
      if (cible) {
        cible.select()
        const ok = document.execCommand('copy')
        annoncer(ok ? 'Texte copié dans le presse-papiers.' : 'La copie a échoué : sélectionnez le texte et copiez-le avec Ctrl + C.')
      } else {
        annoncer('La copie a échoué : sélectionnez le texte et copiez-le avec Ctrl + C.')
      }
    }
  }

  const societe = c.statut === 'societe'
  const liberale = c.statut === 'liberale'

  return (
    <div className="su-gm">
      <form className="su-plaque su-plaque--ivoire su-gm__form" onSubmit={(e) => e.preventDefault()} aria-label="Renseignements pour vos mentions légales" autoComplete="off">
        <p className="su-gm__confiance">
          <strong>Rien ne quitte votre navigateur.</strong> Ce que vous saisissez n’est ni envoyé, ni enregistré, ni conservé : fermez la page et tout disparaît.
        </p>

        <fieldset className="su-gm__groupe">
          <legend className="su-mono su-gm__legende">1 · Votre statut</legend>
          <div className="su-gm__radios">
            {STATUTS.map((s) => (
              <label key={s.id} className="su-gm__radio">
                <input type="radio" name={id('statut')} value={s.id} checked={c.statut === s.id} onChange={() => setC((p) => ({ ...p, statut: s.id }))} />
                <span>{s.nom}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="su-gm__groupe">
          <legend className="su-mono su-gm__legende">2 · L’éditeur du site</legend>
          <Champ id={id('nom')} label={societe ? 'Dénomination sociale' : 'Nom et prénom'}>
            <input {...saisie('nom')} type="text" autoComplete="off" />
          </Champ>
          {societe && (
            <>
              <Champ id={id('forme')} label="Forme juridique" aide="Par exemple SARL, SAS, EURL.">
                <input {...saisie('forme')} type="text" />
              </Champ>
              <Champ id={id('capital')} label="Capital social (en euros)">
                <input {...saisie('capital')} type="text" inputMode="numeric" />
              </Champ>
              <Champ id={id('rcs')} label="Immatriculation (facultatif)" aide="Par exemple : RCS de votre ville, ou répertoire des métiers.">
                <input {...saisie('rcs')} type="text" />
              </Champ>
            </>
          )}
          {liberale && (
            <>
              <Champ id={id('ordre')} label="Ordre ou organisme professionnel" aide="Le nom de l’ordre, de la chambre ou de l’autorité dont vous dépendez.">
                <input {...saisie('ordre')} type="text" />
              </Champ>
              <Champ id={id('numeroOrdre')} label="Numéro d’inscription">
                <input {...saisie('numeroOrdre')} type="text" />
              </Champ>
            </>
          )}
          <Champ id={id('adresse')} label={societe ? 'Adresse du siège social' : 'Adresse'}>
            <input {...saisie('adresse')} type="text" autoComplete="off" />
          </Champ>
          <Champ id={id('identifiant')} label="SIREN ou SIRET" aide="Sur votre avis de situation INSEE.">
            <input {...saisie('identifiant')} type="text" inputMode="numeric" />
          </Champ>
          <Champ id={id('site')} label="Adresse du site (facultatif)">
            <input {...saisie('site')} type="text" inputMode="url" spellCheck={false} placeholder="mon-site.fr" />
          </Champ>
          <Champ id={id('email')} label="Adresse e-mail de contact">
            <input {...saisie('email')} type="email" spellCheck={false} />
          </Champ>
          <Champ id={id('telephone')} label="Téléphone">
            <input {...saisie('telephone')} type="tel" />
          </Champ>
          <Champ id={id('directeur')} label="Directeur de la publication" aide="Laissez vide si c’est vous : le nom ci-dessus sera repris.">
            <input {...saisie('directeur')} type="text" />
          </Champ>
        </fieldset>

        <fieldset className="su-gm__groupe">
          <legend className="su-mono su-gm__legende">3 · L’hébergeur</legend>
          <Champ id={id('hebergeur')} label="Nom de l’hébergeur" aide="Le prestataire qui stocke votre site : il figure dans votre contrat ou sur sa facture.">
            <input {...saisie('hebergeur')} type="text" />
          </Champ>
          <Champ id={id('hebergeurAdresse')} label="Adresse de l’hébergeur">
            <input {...saisie('hebergeurAdresse')} type="text" />
          </Champ>
          <Champ id={id('hebergeurTel')} label="Téléphone de l’hébergeur">
            <input {...saisie('hebergeurTel')} type="tel" />
          </Champ>
        </fieldset>

        <fieldset className="su-gm__groupe">
          <legend className="su-mono su-gm__legende">4 · TVA</legend>
          <div className="su-gm__radios">
            <label className="su-gm__radio">
              <input type="radio" name={id('tva')} value="non" checked={c.tva === 'non'} onChange={() => setC((p) => ({ ...p, tva: 'non' }))} />
              <span>TVA non applicable (art. 293 B du CGI)</span>
            </label>
            <label className="su-gm__radio">
              <input type="radio" name={id('tva')} value="applicable" checked={c.tva === 'applicable'} onChange={() => setC((p) => ({ ...p, tva: 'applicable' }))} />
              <span>TVA applicable</span>
            </label>
          </div>
          {c.tva === 'applicable' && (
            <Champ id={id('tvaNumero')} label="Numéro de TVA intracommunautaire">
              <input {...saisie('tvaNumero')} type="text" spellCheck={false} />
            </Champ>
          )}
        </fieldset>

        <fieldset className="su-gm__groupe">
          <legend className="su-mono su-gm__legende">5 · À ajouter si cela vous concerne</legend>
          <Champ id={id('reglementee')} label="Activité réglementée" aide="Autorisation, qualification ou diplôme exigé pour votre activité : l’autorité qui l’a délivrée et le numéro.">
            <textarea {...zone('reglementee')} rows={3} />
          </Champ>
          <Champ id={id('mediation')} label="Médiateur de la consommation" aide="Si vous vendez à des particuliers : nom du médiateur et son site internet.">
            <textarea {...zone('mediation')} rows={2} />
          </Champ>
        </fieldset>
      </form>

      <section className="su-gm__sortie" aria-labelledby={id('titre')}>
        <div className="su-gm__entete">
          <h2 id={id('titre')} className="su-display su-gm__h2">
            Votre texte
          </h2>
          <div className="su-gm__actions">
            <Action type="button" onClick={copier}>
              Copier
            </Action>
            <Action type="button" variante="contour" onClick={() => window.print()}>
              Imprimer
            </Action>
          </div>
        </div>
        <p className="su-gm__statut" role="status" aria-live="polite">
          {retour}
        </p>
        <p className="su-gm__avertissement">
          Ce texte est un modèle : il ne remplace pas un conseil juridique. Les mentions exigées dépendent de votre activité et de votre situation. Remplacez les repères entre crochets et faites relire le résultat si vous avez un doute.
        </p>
        <article className="su-gm__texte" id={id('apercu')} aria-label="Aperçu des mentions légales">
          <h3 className="su-display su-gm__titre-doc">Mentions légales</h3>
          {rubriques.map((r) => (
            <section key={r.titre}>
              <h4 className="su-gm__rubrique">{r.titre}</h4>
              {r.lignes.map((l, i) => (
                <p key={i}>{l}</p>
              ))}
            </section>
          ))}
        </article>
        <textarea id={id('copie')} className="su-gm__copie" value={texte} readOnly tabIndex={-1} aria-hidden="true" />
      </section>
    </div>
  )
}
