#!/bin/sh

# Arrêter toute instance existante de Nginx
nginx -s stop 2>/dev/null || true

# Attendre que le port soit libéré
while netstat -tln | grep :9000; do
  echo "Waiting for port 9000 to be free..."
  sleep 1
done

# Démarrer Nginx
nginx -g 'daemon off;'