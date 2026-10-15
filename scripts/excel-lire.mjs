/** Affiche des onglets de l’Excel des tarifs : node scripts/excel-lire.mjs "Contrat" "Abonnements" */
import ExcelJS from 'exceljs'
const wb = new ExcelJS.Workbook()
await wb.xlsx.readFile('docs/tarifs/Grille-tarifaire-Stackup.xlsx')
console.log(wb.worksheets.map((w) => w.name).join(' | '))
for (const nom of process.argv.slice(2)) {
  const ws = wb.getWorksheet(nom)
  console.log('=====', nom)
  ws.eachRow((row, n) => {
    const v = row.values.slice(1).map((c) => (c && typeof c === 'object' ? (c.result ?? c.text ?? JSON.stringify(c)) : c)).filter((c) => c !== null && c !== undefined && c !== '')
    if (v.length) console.log(n, '|', v.join(' ¦ '))
  })
}
