# Étape 1 : build de l'app Vite
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Étape 2 : image nginx pour servir le contenu
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 9000

CMD ["nginx", "-g", "daemon off;"]
