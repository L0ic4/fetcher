#!/bin/sh
# Build here, ship there, verify afterwards.
#
#   ./deploy.sh
#
# The VPS runs no toolchain and holds no source: it receives the built bundle and
# rebuilds one container. This is the same script CI runs (.github/workflows/deploy.yml),
# so a manual deploy and an automated deploy cannot drift apart.
set -eu

here=$(unset CDPATH; cd -- "$(dirname -- "$0")" && pwd)
host=${VPS_HOST:-vps}
remote=${VPS_DIR:-/home/loica/VPS-CONTROL/apps/fetcher}
url=${SITE_URL:-https://fetcher.161.97.69.138.sslip.io}

echo "==> dependencies"
# `npm ci` keeps the lockfile's platform-specific entries, and a lockfile written
# elsewhere leaves rollup without its native binary ("Cannot find module
# '@rollup/rollup-linux-x64-gnu'"). A fresh install resolves the right one.
rm -rf "$here/node_modules"
(cd "$here" && npm install --no-audit --no-fund)

echo "==> build"
(cd "$here" && npm run build)

echo "==> ship to $host:$remote"
ssh "$host" "mkdir -p $remote"
rsync -az --delete "$here/dist/" "$host:$remote/dist/"
rsync -az "$here/deploy/Dockerfile" "$here/deploy/nginx.conf" "$here/deploy/compose.yml" "$host:$remote/"

echo "==> rebuild container"
ssh "$host" "cd $remote && docker compose up -d --build"

echo "==> verify"
code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 25 "$url/")
[ "$code" = "200" ] || { echo "!! $url/ returned $code" >&2; exit 1; }
echo "ok  $url/  $code"
