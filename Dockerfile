# Étape 1 : Build
FROM node:20-alpine AS builder
WORKDIR /app

# Copier les fichiers package.json + lock d'abord (optimisation du cache Docker)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code
COPY . .

# Copier le .env.production vers .env
RUN cp .env.production .env

# Construire l'application
RUN npm run build

# Étape 2 : Runtime (production)
FROM node:20-alpine AS runner
WORKDIR /app

# Copier uniquement le résultat du build + dépendances nécessaires
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Exposer le port (Vite preview utilise 5173 par défaut, sauf si tu configures)
EXPOSE 5173

# Lancer en mode preview (production)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
