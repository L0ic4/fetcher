# fetcher

Client HTTP dans le navigateur (Postman-like). Source : `L0ic4/fetcher` (public).

**URL** — https://fetcher.161.97.69.138.sslip.io
**Image** — `nginxinc/nginx-unprivileged:1.27-alpine`, `dist/` copié dans l'image : aucun
build Node sur le VPS.

## Redéployer après un changement de source

```sh
cd ~/Hermes/repos/fetcher
npm install                 # package-lock.json est désynchronisé, `npm ci` refuse
node ./node_modules/vite/bin/vite.js build
cp -r dist ~/Hermes/repos/VPS-CONTROL/apps/fetcher/
rsync -az ~/Hermes/repos/VPS-CONTROL/apps/fetcher/ vps:/home/loica/VPS-CONTROL/apps/fetcher/
ssh vps 'cd /home/loica/VPS-CONTROL/apps/fetcher && docker compose up -d --build'
```

## Notes

- Le CSP ouvre `connect-src *` : c'est la raison d'être de l'app (envoyer des requêtes
  arbitraires depuis le navigateur). Le reste du CSP reste fermé.
- CORS côté cible décide si la requête aboutit ; l'app affiche l'erreur telle quelle.
- `/healthz`, chemins inconnus en 404 (l'hôte est public et scanné).
