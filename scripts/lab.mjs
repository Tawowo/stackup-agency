/** Ouvre le banc d'essai : lance `next dev` et affiche l'URL de /lab. */
import { spawn } from 'node:child_process'
const p = spawn('npx', ['next', 'dev'], { stdio: 'inherit' })
console.log('\n  Banc d’essai : http://localhost:3000/lab\n')
process.on('SIGINT', () => p.kill())
