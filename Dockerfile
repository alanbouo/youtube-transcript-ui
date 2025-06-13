FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Vérifier que le build a réussi
RUN ls -la /app/dist

FROM nginx:alpine

# Copier la configuration NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Créer le répertoire des logs avec les bonnes permissions
RUN mkdir -p /var/log/nginx/ && \
    touch /var/log/nginx/access.log /var/log/nginx/error.log && \
    chown -R nginx:nginx /var/log/nginx/ && \
    chmod -R 755 /var/log/nginx/

# Copier les fichiers construits
COPY --from=builder /app/dist /usr/share/nginx/html

# Vérifier que les fichiers ont été copiés
RUN ls -la /usr/share/nginx/html

# Définir les permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer NGINX en avant-plan
CMD ["nginx", "-g", "daemon off;"]