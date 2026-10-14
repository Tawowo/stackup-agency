#!/usr/bin/env bash
# Contrôle d'un plan : rendu basse définition, une image toutes les 0,25 s, planche-contact.
#   scripts/qc.sh <format 16x9|9x16|1x1> <plan> [montage] [debut fin]
set -euo pipefail
cd "$(dirname "$0")/.."
FORMAT=${1:-16x9}; PLAN=${2:-1}; MONTAGE=${3:-complet}
EXTRA=""
[ $# -ge 5 ] && EXTRA="--debut $4 --fin $5"
node scripts/build.mjs --apercu "$FORMAT" --plan "$PLAN" --montage "$MONTAGE" --echelle 0.5 $EXTRA
SORTIE=qc/$FORMAT-$MONTAGE-plan$PLAN
mkdir -p qc
npx hyperframes render formats/apercu --fps 30 --quality draft --output "$SORTIE.mp4" --quiet >/dev/null 2>&1 || npx hyperframes render formats/apercu --fps 30 --quality draft --output "$SORTIE.mp4"
DEBUT=$(node -e "const s=require('./script.json');const m=s.montages['$MONTAGE'];const p=m.plans.find(x=>x.plan==$PLAN);console.log(process.argv[1]||p.debut)" "${4:-}")
N=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$SORTIE.mp4")
COLS=6
ROWS=$(python3 -c "import math;print(math.ceil($N*4/$COLS))")
ffmpeg -loglevel error -y -i "$SORTIE.mp4" -vf "fps=4,scale=480:-2,drawtext=text='$DEBUT + %{pts\:flt}':x=6:y=6:fontsize=20:fontcolor=yellow:box=1:boxcolor=black@0.6,tile=${COLS}x${ROWS}" -frames:v 1 "$SORTIE.png"
echo "$SORTIE.mp4 ($N s) → $SORTIE.png"
