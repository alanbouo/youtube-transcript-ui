#!/bin/sh

echo "Starting initialization script..."

# Afficher les processus en cours
echo "Current processes:"
ps aux

# Afficher les ports en écoute
echo "Listening ports:"
netstat -tlnp

# Arrêter toute instance existante de Nginx
echo "Stopping any existing Nginx instances..."
nginx -s stop 2>/dev/null || true

# Attendre que le port soit libéré
echo "Waiting for port 9000 to be free..."
while netstat -tln | grep :9000; do
  echo "Port 9000 still in use, waiting..."
  sleep 1
done

echo "Port 9000 is now free."

# Vérifier la configuration de Nginx
echo "Checking Nginx configuration..."
nginx -t

# Démarrer Nginx
echo "Starting Nginx..."
nginx -g 'daemon off;'