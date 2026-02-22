#!/usr/bin/env bash
# Cloudflare Pages: copy repo root into dist for Wrangler deploy
set -e
mkdir -p dist
# Copy all site files; exclude .git, dist, node_modules, and config files
for item in css js assets blog locations services *.html favicon.svg robots.txt sitemap.xml; do
  [ -e "$item" ] && cp -r "$item" dist/ 2>/dev/null || true
done
