# frontend/Dockerfile

# Étape de build Angular
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Étape serveur Nginx pour servir Angular
FROM nginx:alpine
COPY --from=build /app/dist/cafe-mangement3-frontend /usr/share/nginx/html

# Copie du fichier nginx.conf personnalisé
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
