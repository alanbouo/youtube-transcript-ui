# Étape 1 : Build Vite
FROM node:20-alpine as builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Étape 2 : Serveur nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9000
CMD ["nginx", "-g", "daemon off;"]
