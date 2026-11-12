# Static SPA, prebuilt locally (vite 5.2). No build step in the image: the VPS
# only ships files, so a broken toolchain on the host cannot break a deploy.
FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/share/nginx/html/

EXPOSE 8080
