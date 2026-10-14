#!/usr/bin/env bash
# Copy the sukreenhana/ folder into the AKCREATIVE-DESIGN/sukreenhana repo (files at the root).
# Prerequisites: the AKCREATIVE-DESIGN org and an EMPTY sukreenhana repo exist, and you have push access.
# Usage: bash AKCREATIVE/pindah-sukreenhana.sh [org] [repo]
set -euo pipefail
ORG="${1:-AKCREATIVE-DESIGN}"
REPO="${2:-sukreenhana}"
SRC="$(cd "$(dirname "$0")/../sukreenhana" && pwd)"
TMP="$(mktemp -d)"

cp -R "$SRC"/. "$TMP"/
cd "$TMP"
# Deployment guide for the new location: web directory is now "/"
sed -i 's#\*\*Web directory:\*\* `/sukreenhana`.*#**Web directory:** `/` (files are at the repo root).#' README.md
sed -i 's#Repository: `adilamaxxan/hassanhamid.my`. Branch: .*#Repository: `'"$ORG/$REPO"'`. Branch: `main`.#' README.md

git init -q -b main
git add .
git commit -qm "Initial commit: Sukreen Hana academic website"
git remote add origin "https://github.com/$ORG/$REPO.git"
git push -u origin main
echo "Done: https://github.com/$ORG/$REPO"
