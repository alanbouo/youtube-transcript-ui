FROM node:18 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Vérifier la structure du répertoire de build
RUN ls -la /app/dist

FROM nginx:alpine

# Copier la configuration NGINX personnalisée
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Vérifier le contenu avant la copie
RUN ls -la /usr/share/nginx/html

# Copier les fichiers construits
COPY --from=builder /app/dist /usr/share/nginx/html

# Vérifier le contenu après la copie
RUN ls -la /usr/share/nginx/html

# Définir les permissions
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chmod -R 755 /usr/share/nginx/html

# Vérifier les permissions
RUN ls -la /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Démarrer NGINX
CMD ["nginx", "-g", "daemon off;"]