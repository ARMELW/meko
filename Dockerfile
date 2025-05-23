# Image de base
FROM node:20-alpine
WORKDIR /app

# Copie des fichiers
COPY . .

# Installation des dependances
RUN npm install

# Renommer le .env
RUN cp .env.production .env

# Exposer le port
EXPOSE 5173

# Lancer avec --host, indispensable pour que Vite accepte des connexions extérieures (pas uniquement sur localhost)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
