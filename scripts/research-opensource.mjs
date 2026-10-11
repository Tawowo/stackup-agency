#!/usr/bin/env node
/**
 * Harnais de recherche open source — Phase 2.
 *
 * Contrainte d'environnement : api.github.com et github.com (HTML) sont bloqués
 * par le proxy (403 / 400). En revanche raw.githubusercontent.com et
 * registry.npmjs.org répondent 200. Ce script exploite donc ces deux canaux
 * pour collecter des données RÉELLES, et journalise précisément ce qui a pu
 * être vérifié pour chaque dépôt (métadonnées seules vs fichiers lus).
 *
 * Sortie : docs/research-raw.json
 */
import fs from 'fs'

const NPM = 'https://registry.npmjs.org'
const RAW = 'https://raw.githubusercontent.com'

// Candidats : paquets npm (métadonnées + dépôt) et dépôts GitHub directs.
// Organisés par domaine technique de la mission.
const NPM_PACKAGES = [
  // Rendu 3D / WebGL / WebGPU
  'three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing',
  'postprocessing', 'three-stdlib', 'troika-three-text', 'maath', 'leva',
  'ogl', 'regl', 'twgl.js', 'pixi.js', 'babylonjs', '@use-gesture/react',
  'r3f-perf', 'three-mesh-bvh', 'meshoptimizer', 'draco3d', 'gltfpack',
  '@gltf-transform/core', 'camera-controls', 'zustand', 'glslify',
  // Shaders / bruit / math
  'simplex-noise', 'glsl-noise', 'gl-matrix', 'lygia',
  // Animation / scroll / orchestration
  'gsap', 'framer-motion', 'motion', '@theatre/core', '@theatre/studio',
  'lenis', '@studio-freight/lenis', 'locomotive-scroll', 'scrollama',
  'animejs', 'popmotion', 'tween.js', '@tweenjs/tween.js', 'react-spring',
  '@react-spring/web', 'react-use-gesture', 'split-type', 'splitting',
  'rematrix', 'framer-motion-3d', 'auto-animate', '@formkit/auto-animate',
  // Transitions de page / view transitions
  'next-view-transitions', '@barba/core', 'swup', 'highway.js',
  // Interface / accessibilité / composants
  '@radix-ui/react-dialog', '@radix-ui/react-tabs', '@radix-ui/react-accordion',
  'cmdk', 'vaul', 'sonner', 'react-aria', '@react-aria/focus', 'focus-trap',
  'tailwind-merge', 'clsx', 'class-variance-authority',
  // Données / visualisation
  'd3', 'd3-scale', 'd3-shape', 'd3-force', 'visx', 'recharts',
  'flubber', 'rough-notation',
  // Performance / mesure
  'web-vitals', 'stats.js', 'detect-gpu', 'comlink', 'workerpool',
  'partytown', '@builder.io/partytown',
  // Médias / assets
  'sharp', 'blurhash', 'thumbhash', 'plaiceholder',
  // Utilitaires d'interaction
  'hotkeys-js', 'tinykeys', 'embla-carousel', 'keen-slider',
  'matter-js', 'cannon-es', 'rapier2d', '@dimforge/rapier3d-compat',
]

// Dépôts GitHub explorés directement (fichiers réellement lus via raw)
const GH_REPOS = [
  // moteur / rendu
  ['mrdoob', 'three.js', 'dev', ['README.md', 'LICENSE', 'package.json']],
  ['pmndrs', 'react-three-fiber', 'master', ['README.md', 'LICENSE', 'package.json']],
  ['pmndrs', 'drei', 'master', ['README.md', 'LICENSE']],
  ['pmndrs', 'postprocessing', 'main', ['README.md']],
  ['pmndrs', 'maath', 'main', ['README.md', 'LICENSE']],
  ['pmndrs', 'zustand', 'main', ['readme.md', 'LICENSE']],
  ['pmndrs', 'detect-gpu', 'master', ['README.md', 'LICENSE']],
  ['oframe', 'ogl', 'master', ['README.md', 'LICENSE']],
  ['regl-project', 'regl', 'master', ['README.md', 'LICENSE']],
  ['greggman', 'twgl.js', 'master', ['README.md', 'LICENSE']],
  ['BabylonJS', 'Babylon.js', 'master', ['readme.md', 'license.md']],
  ['pixijs', 'pixijs', 'dev', ['README.md', 'LICENSE']],
  // shaders / bruit
  ['patriciogonzalezvivo', 'lygia', 'main', ['README.md', 'LICENSE']],
  ['ashima', 'webgl-noise', 'master', ['README.md', 'LICENSE']],
  ['stegu', 'webgl-noise', 'master', ['README.md', 'LICENSE']],
  ['jwagner', 'simplex-noise.js', 'main', ['README.md', 'LICENSE']],
  ['glslify', 'glslify', 'master', ['README.md', 'LICENSE']],
  ['toji', 'gl-matrix', 'master', ['README.md', 'LICENSE.md']],
  // typographie 3D
  ['protectwise', 'troika', 'main', ['README.md', 'LICENSE']],
  // animation / scroll
  ['greensock', 'GSAP', 'master', ['README.md', 'LICENSE.md', 'package.json']],
  ['motiondivision', 'motion', 'main', ['README.md', 'LICENSE.md']],
  ['theatre-js', 'theatre', 'main', ['README.md', 'LICENSE.md']],
  ['darkroomengineering', 'lenis', 'main', ['README.md', 'LICENSE']],
  ['locomotivemtl', 'locomotive-scroll', 'master', ['README.md', 'LICENSE']],
  ['russellsamora', 'scrollama', 'main', ['README.md', 'LICENSE']],
  ['juliangarnier', 'anime', 'master', ['README.md', 'LICENSE.md']],
  ['pmndrs', 'react-spring', 'main', ['README.md', 'LICENSE']],
  ['tweenjs', 'tween.js', 'main', ['README.md', 'LICENSE']],
  ['lukePeavey', 'SplitType', 'master', ['README.md', 'LICENSE']],
  ['shshaw', 'Splitting', 'master', ['README.md', 'LICENSE']],
  ['formkit', 'auto-animate', 'master', ['README.md', 'LICENSE']],
  // transitions de page
  ['barbajs', 'barba', 'master', ['README.md', 'LICENSE']],
  ['swup', 'swup', 'master', ['README.md', 'LICENSE']],
  ['shuding', 'next-view-transitions', 'main', ['README.md', 'license']],
  // UI / a11y
  ['radix-ui', 'primitives', 'main', ['README.md', 'LICENSE']],
  ['pacocoursey', 'cmdk', 'main', ['README.md', 'LICENSE.md']],
  ['emilkowalski', 'vaul', 'main', ['README.md', 'LICENSE']],
  ['emilkowalski', 'sonner', 'main', ['README.md', 'LICENSE']],
  ['adobe', 'react-spectrum', 'main', ['README.md', 'LICENSE']],
  ['focus-trap', 'focus-trap', 'master', ['README.md', 'LICENSE']],
  ['jamiebuilds', 'tinykeys', 'main', ['README.md', 'LICENSE']],
  ['davidjerleke', 'embla-carousel', 'master', ['README.md', 'LICENSE']],
  // dataviz
  ['d3', 'd3', 'main', ['README.md', 'LICENSE']],
  ['d3', 'd3-force', 'main', ['README.md', 'LICENSE']],
  ['d3', 'd3-shape', 'main', ['README.md', 'LICENSE']],
  ['airbnb', 'visx', 'master', ['README.md', 'LICENSE']],
  ['veltman', 'flubber', 'master', ['README.md', 'LICENSE']],
  ['rough-stuff', 'rough-notation', 'master', ['README.md', 'LICENSE']],
  // perf / workers
  ['GoogleChrome', 'web-vitals', 'main', ['README.md', 'LICENSE']],
  ['mrdoob', 'stats.js', 'master', ['README.md', 'LICENSE']],
  ['GoogleChromeLabs', 'comlink', 'main', ['README.md', 'LICENSE']],
  ['BuilderIO', 'partytown', 'main', ['README.md', 'LICENSE']],
  ['GoogleChromeLabs', 'quicklink', 'main', ['README.md', 'LICENSE']],
  // assets 3D
  ['KhronosGroup', 'glTF', 'main', ['README.md', 'LICENSE']],
  ['donmccurdy', 'glTF-Transform', 'main', ['README.md', 'LICENSE']],
  ['zeux', 'meshoptimizer', 'master', ['README.md', 'LICENSE.md']],
  ['google', 'draco', 'main', ['README.md', 'LICENSE']],
  ['google', 'model-viewer', 'master', ['README.md', 'LICENSE']],
  // physique
  ['liabru', 'matter-js', 'master', ['README.md', 'LICENSE']],
  ['pmndrs', 'cannon-es', 'master', ['README.md', 'LICENSE']],
  ['dimforge', 'rapier', 'master', ['README.md', 'LICENSE']],
  // images
  ['lovell', 'sharp', 'main', ['README.md', 'LICENSE']],
  ['woltapp', 'blurhash', 'master', ['README.md', 'LICENSE']],
  ['evanw', 'thumbhash', 'main', ['README.md', 'LICENSE']],
  ['joe-bell', 'plaiceholder', 'main', ['README.md', 'LICENSE']],
  // frameworks / outillage
  ['vercel', 'next.js', 'canary', ['packages/next/package.json', 'license.md']],
  ['tailwindlabs', 'tailwindcss', 'main', ['README.md', 'LICENSE']],
  ['microsoft', 'playwright', 'main', ['README.md', 'LICENSE']],
  ['GoogleChrome', 'lighthouse', 'main', ['readme.md', 'LICENSE']],
  // expériences créatives / références
  ['pmndrs', 'react-postprocessing', 'main', ['README.md', 'LICENSE']],
  ['pmndrs', 'gltfjsx', 'master', ['README.md', 'LICENSE']],
  ['pmndrs', 'uikit', 'main', ['README.md', 'LICENSE']],
  ['pmndrs', 'react-three-rapier', 'main', ['README.md', 'LICENSE']],
  ['verekia', 'majestic-nextjs-threejs-starter', 'main', ['README.md']],
  ['ektogamat', 'r3f-ultimate-boilerplate', 'main', ['README.md']],
  ['ektogamat', 'threejs-andy-boilerplate', 'main', ['README.md']],
  ['brunosimon', 'folio-2019', 'master', ['README.md', 'LICENSE']],
  ['brunosimon', 'my-room-in-3d', 'main', ['README.md', 'LICENSE']],
  ['brunosimon', 'threejs-journey', 'main', ['README.md']],
  ['lusionltd', 'lusion-threejs-experiments', 'main', ['README.md']],
  ['edankwan', 'the-spirit', 'master', ['README.md', 'LICENSE']],
  ['mattdesl', 'canvas-sketch', 'master', ['README.md', 'LICENSE.md']],
  ['spite', 'ccapture.js', 'master', ['README.md', 'LICENSE']],
  ['spite', 'THREE.MeshLine', 'master', ['README.md', 'LICENSE']],
  ['vaneenige', 'phenomenon', 'master', ['README.md', 'LICENSE']],
  ['luruke', 'barba.js', 'master', ['README.md']],
  ['winkerVSbecks', 'sketches', 'master', ['README.md']],
  ['jagracar', 'webgl-shader-examples', 'master', ['README.md']],
  ['Experience-Monks', 'three-glsl-sandbox', 'master', ['README.md']],
  ['marcofugaro', 'three-projected-material', 'master', ['README.md', 'LICENSE']],
  ['gsimone', 'r3f-stage', 'main', ['README.md']],
  ['emmelleppi', 'r3f-animated-mesh', 'main', ['README.md']],
  ['FarazzShaikh', 'THREE-CustomShaderMaterial', 'master', ['README.md', 'LICENSE']],
  ['CodyJasonBennett', 'four', 'main', ['README.md', 'LICENSE']],
  ['gkjohnson', 'three-mesh-bvh', 'master', ['README.md', 'LICENSE']],
  ['gkjohnson', 'three-gpu-pathtracer', 'main', ['README.md', 'LICENSE']],
  ['nicolaspanel', 'node-opencv', 'master', ['README.md']],
  ['mrdoob', 'glsl-sandbox', 'master', ['README.md']],
  ['pixijs', 'filters', 'main', ['README.md', 'LICENSE']],
  ['konvajs', 'konva', 'master', ['README.md', 'LICENSE']],
  ['fabricjs', 'fabric.js', 'master', ['README.md', 'LICENSE']],
  ['paperjs', 'paper.js', 'develop', ['README.md', 'LICENSE.txt']],
  ['processing', 'p5.js', 'main', ['README.md', 'LICENSE']],
  ['hughsk', 'glsl-hsv2rgb', 'master', ['readme.md', 'LICENSE.md']],
  ['dmnsgn', 'glsl-rotate', 'main', ['README.md', 'LICENSE.md']],
  ['w3c', 'csswg-drafts', 'main', ['README.md']],
  ['gpuweb', 'gpuweb', 'main', ['README.md', 'LICENSE.md']],
  ['w3c', 'wcag', 'main', ['README.md']],
  ['argyleink', 'open-props', 'main', ['README.md', 'LICENSE']],
  ['system-fonts', 'modern-font-stacks', 'main', ['README.md', 'LICENSE']],
]

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function get(url, asJson = false) {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) })
    if (!res.ok) return { ok: false, status: res.status }
    const body = asJson ? await res.json() : await res.text()
    return { ok: true, status: res.status, body }
  } catch (e) {
    return { ok: false, status: 0, error: String(e).slice(0, 80) }
  }
}

const results = { npm: [], github: [], meta: { startedAt: new Date().toISOString() } }

console.log(`→ Interrogation du registre npm : ${NPM_PACKAGES.length} paquets`)
for (const pkg of NPM_PACKAGES) {
  const r = await get(`${NPM}/${encodeURIComponent(pkg).replace('%40', '@')}`, true)
  if (!r.ok) {
    results.npm.push({ pkg, verified: false, status: r.status })
    process.stdout.write('x')
    continue
  }
  const d = r.body
  const latestTag = d['dist-tags']?.latest
  const latest = d.versions?.[latestTag] || {}
  results.npm.push({
    pkg,
    verified: true,
    latest: latestTag,
    license: latest.license || d.license || '?',
    description: (d.description || '').slice(0, 170),
    repository: latest.repository?.url || d.repository?.url || '',
    homepage: latest.homepage || d.homepage || '',
    unpackedSize: latest.dist?.unpackedSize ?? null,
    fileCount: latest.dist?.fileCount ?? null,
    deps: Object.keys(latest.dependencies || {}).length,
    peerDeps: Object.keys(latest.peerDependencies || {}),
    modified: d.time?.modified || null,
  })
  process.stdout.write('.')
  await sleep(40)
}
console.log('')

console.log(`→ Lecture de fichiers sources via raw.githubusercontent : ${GH_REPOS.length} dépôts`)
for (const [owner, repo, branch, files] of GH_REPOS) {
  const entry = { owner, repo, url: `https://github.com/${owner}/${repo}`, branch, filesRead: [], filesFailed: [] }
  for (const f of files) {
    const r = await get(`${RAW}/${owner}/${repo}/${branch}/${f}`)
    if (r.ok && r.body && !r.body.startsWith('404')) {
      const body = r.body
      entry.filesRead.push({
        path: f,
        bytes: body.length,
        head: body.slice(0, 260).replace(/\s+/g, ' ').trim(),
      })
      if (/licen[cs]e/i.test(f)) {
        const t = body.slice(0, 2500)
        entry.licenseDetected =
          /MIT License/i.test(t) ? 'MIT' :
          /Apache License/i.test(t) ? 'Apache-2.0' :
          /BSD 3-Clause/i.test(t) ? 'BSD-3-Clause' :
          /BSD 2-Clause/i.test(t) ? 'BSD-2-Clause' :
          /GNU GENERAL PUBLIC/i.test(t) ? 'GPL' :
          /Mozilla Public License/i.test(t) ? 'MPL-2.0' :
          /Creative Commons/i.test(t) ? 'CC' :
          /ISC License/i.test(t) ? 'ISC' : 'autre/à vérifier'
      }
      if (f.endsWith('package.json')) {
        try {
          const j = JSON.parse(body)
          entry.pkgLicense = j.license
          entry.pkgVersion = j.version
          entry.pkgName = j.name
        } catch {}
      }
    } else {
      entry.filesFailed.push({ path: f, status: r.status })
    }
    await sleep(30)
  }
  entry.verified = entry.filesRead.length > 0
  results.github.push(entry)
  process.stdout.write(entry.verified ? '.' : 'x')
}
console.log('')

results.meta.finishedAt = new Date().toISOString()
results.meta.npmVerified = results.npm.filter(r => r.verified).length
results.meta.npmTotal = results.npm.length
results.meta.ghVerified = results.github.filter(r => r.verified).length
results.meta.ghTotal = results.github.length
results.meta.ghFilesRead = results.github.reduce((n, r) => n + r.filesRead.length, 0)

fs.mkdirSync('docs', { recursive: true })
fs.writeFileSync('docs/research-raw.json', JSON.stringify(results, null, 1))

console.log('\n=== BILAN VÉRIFIÉ ===')
console.log(`npm      : ${results.meta.npmVerified}/${results.meta.npmTotal} paquets avec métadonnées réelles`)
console.log(`GitHub   : ${results.meta.ghVerified}/${results.meta.ghTotal} dépôts avec au moins un fichier lu`)
console.log(`Fichiers : ${results.meta.ghFilesRead} fichiers sources réellement téléchargés`)
