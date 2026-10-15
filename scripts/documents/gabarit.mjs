/** GABARIT DES DOCUMENTS PDF — charte Stackup : navy, ambre, Poppins pour les titres, Inter pour le texte. */
import { readFileSync } from 'node:fs'

const b64 = (f) => readFileSync(f).toString('base64')
const police = (nom, fichier, poids) => `@font-face{font-family:'${nom}';src:url(data:font/woff2;base64,${b64(fichier)}) format('woff2');font-weight:${poids};font-style:normal}`

const CSS = `
${police('Inter', 'src/app/fonts/Inter-Variable.woff2', '100 900')}
${police('Poppins', 'src/app/fonts/poppins-latin-600-normal.woff2', '600')}
${police('Poppins', 'src/app/fonts/poppins-latin-700-normal.woff2', '700')}
:root{--navy:#0D2C4C;--encre:#0B1E36;--ambre:#F69106;--ambre-texte:#873A04;--ivoire:#FFFDF9;--creux:#F3EFE6;--gris:#455569;--trait:#D9D2C3}
@page{size:A4;margin:22mm 17mm 26mm 17mm}
*{box-sizing:border-box}
html{font-family:Inter,Arial,sans-serif;font-size:9.8pt;line-height:1.5;color:var(--encre)}
body{margin:0}
.couv{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:3px solid var(--ambre);padding-bottom:12px;margin-bottom:16px}
.couv img{height:46px}
.couv .ver{font-size:8.2pt;color:var(--gris);text-align:right;line-height:1.4}
h1{font-family:Poppins,sans-serif;font-weight:700;font-size:23pt;line-height:1.15;color:var(--navy);margin:0 0 4px}
.sous{font-size:11pt;color:var(--gris);margin:0 0 14px}
h2{font-family:Poppins,sans-serif;font-weight:600;font-size:12.5pt;color:var(--navy);margin:20px 0 6px;padding-left:9px;border-left:4px solid var(--ambre);break-after:avoid}
h3{font-family:Poppins,sans-serif;font-weight:600;font-size:10.6pt;color:var(--navy);margin:12px 0 3px;break-after:avoid}
p{margin:0 0 7px}
ul,ol{margin:0 0 8px;padding-left:18px}
li{margin:0 0 3px}
strong{color:var(--encre)}
a{color:var(--ambre-texte)}
table{border-collapse:collapse;width:100%;margin:6px 0 12px;font-size:9.2pt;break-inside:auto}
th{background:var(--navy);color:#fff;text-align:left;padding:5px 7px;font-weight:600}
td{padding:5px 7px;border-bottom:1px solid var(--trait);vertical-align:top}
tr{break-inside:avoid}
td.d,th.d{text-align:right;white-space:nowrap}
.encart{background:var(--creux);border-left:4px solid var(--ambre);padding:8px 11px;margin:8px 0 12px;break-inside:avoid}
.encart p:last-child{margin-bottom:0}
.alerte{background:#FFF1DC;border-left:4px solid var(--ambre-texte);padding:8px 11px;margin:8px 0 12px;break-inside:avoid}
.art{break-inside:avoid-page}
.art h3{margin-top:10px}
.champ{display:inline-block;min-width:150px;border-bottom:1px solid var(--encre);height:1.1em;vertical-align:baseline}
.champ.long{min-width:320px}
.ligne-champ{margin:7px 0}
.cases span{display:inline-block;width:11px;height:11px;border:1.4px solid var(--encre);margin-right:6px;vertical-align:-1px}
.sig{display:flex;gap:18px;margin-top:14px;break-inside:avoid}
.sig>div{flex:1;border:1px solid var(--trait);min-height:92px;padding:7px 9px;font-size:8.8pt}
.sig b{display:block;margin-bottom:3px}
.petit{font-size:8.3pt;color:var(--gris)}
.cartes{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:8px 0 12px}
.carte{border:1px solid var(--trait);border-top:4px solid var(--ambre);padding:8px 10px;break-inside:avoid}
.carte h3{margin-top:0}
.sautpage{break-before:page}
`

/** Enveloppe HTML complète d'un document. `corps` : le HTML du contenu. */
export function enveloppe({ titre, sousTitre, corps, ctx }) {
  const logo = `data:image/png;base64,${b64('public/Logo_Stackup-Agency.png')}`
  return `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${titre}</title><style>${CSS}</style></head><body>
<div class="couv"><img src="${logo}" alt="Stackup Agency"><div class="ver"><b>${ctx.e.identite}</b><br>${ctx.e.adresse}<br>${ctx.s.email} · ${ctx.s.telephone}<br>Version ${ctx.doc.version} · ${ctx.doc.dateVersion}</div></div>
<h1>${titre}</h1>${sousTitre ? `<p class="sous">${sousTitre}</p>` : ''}
${corps}
</body></html>`
}

/** Pied de page imprimé par Chromium sur chaque page. */
export function pied({ titre, revue, ctx }) {
  const relecture = revue && !ctx.doc.documentsValides ? `<div style="color:#873A04;font-weight:700">${ctx.doc.mentionRelecture}</div>` : ''
  return `<div style="font-family:Arial,sans-serif;font-size:7.6pt;color:#455569;width:100%;padding:0 17mm"><div style="display:flex;justify-content:space-between;border-top:1px solid #D9D2C3;padding-top:4px"><span>${ctx.e.identite} · SIRET ${ctx.e.siret} · ${titre} · version ${ctx.doc.version} du ${ctx.doc.dateVersion}</span><span style="white-space:nowrap;padding-left:10px">Page <span class="pageNumber"></span> / <span class="totalPages"></span></span></div>${relecture}</div>`
}
