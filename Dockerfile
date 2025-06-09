# Dockerfile multi-stage pour Entreprise Organiser
# Stage 1: Build des applications
FROM node:18-alpine AS builder

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY package*.json ./
COPY backend/package*.json ./backend/
COPY frontend/package*.json ./frontend/

# Installer toutes les dépendances
RUN npm ci

# Copier le code source
COPY backend/ ./backend/
COPY frontend/ ./frontend/

# Build du backend
WORKDIR /app/backend
RUN npm run build

# Build du frontend
WORKDIR /app/frontend
RUN npm run build

# Stage 2: Runtime pour le backend
FROM node:18-alpine AS backend

# Créer un utilisateur non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nestjs -u 1001

# Créer le répertoire de travail
WORKDIR /app

# Copier les fichiers de package
COPY backend/package*.json ./
RUN npm ci --only=production

# Copier les fichiers de build
COPY --from=builder /app/backend/dist ./dist
COPY --from=builder /app/backend/prisma ./prisma

# Générer le client Prisma
RUN npx prisma generate

# Changer le propriétaire des fichiers
RUN chown -R nestjs:nodejs /app
USER nestjs

# Exposer le port
EXPOSE 3001

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3001

# Commande de démarrage
CMD ["node", "dist/main"]

# Stage 3: Serveur web pour le frontend
FROM nginx:alpine AS frontend

# Copier la configuration nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copier les fichiers buildés du frontend
COPY --from=builder /app/frontend/dist /usr/share/nginx/html

# Exposer le port
EXPOSE 80

# Commande de démarrage
CMD ["nginx", "-g", "daemon off;"]
