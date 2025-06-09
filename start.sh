#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}     DÉMARRAGE DES SERVEURS           ${NC}"
echo -e "${BLUE}======================================${NC}"

# Vérification de Docker plus robuste
echo "🛠️  Vérification de Docker..."
if ! command -v docker &> /dev/null || ! docker info &> /dev/null; then
  echo "❌ Docker n'est pas installé ou le démon Docker n'est pas en cours d'exécution."
  exit 1
fi
echo "✅ Docker est installé et en cours d'exécution."

# Détecter la bonne commande Docker Compose
if docker compose version &> /dev/null; then
  DOCKER_COMPOSE_CMD="docker compose"
elif command -v docker-compose &> /dev/null; then
  DOCKER_COMPOSE_CMD="docker-compose"
else
  echo "❌ Docker Compose n'est pas installé. Installe-le puis réessaye."
  exit 1
fi

echo "🔎 Vérification du conteneur PostgreSQL..."
if docker ps --format '{{.Names}}' | grep -q '^entreprise_organiser_pg$'; then
  echo "✅ Le conteneur PostgreSQL est déjà démarré."
else
  echo "🚀 Démarrage du conteneur PostgreSQL..."
  $DOCKER_COMPOSE_CMD up -d
fi

echo "🔎 Vérification de PM2..."
if ! command -v pm2 &> /dev/null; then
  echo "❌ PM2 n'est pas installé. Installation en cours..."
  npm install -g pm2
fi

if pm2 list | grep -q "backend"; then
  echo "🔄 Redémarrage du backend (port 5001)..."
  pm2 restart backend
else
  echo "🚀 Lancement du backend (port 5001)..."
  cd backend && pm2 start npm --name "backend" -- run start && cd ..
fi

# Lancer le frontend (Vite) seulement si pas déjà lancé
if pgrep -f "vite" > /dev/null; then
  echo "🔄 Le frontend tourne déjà (port 5173)."
else
  echo "🚀 Lancement du frontend (port 5173)..."
  cd frontend
  npm run dev &
  cd ..
fi

echo "✅ Tous les serveurs sont lancés !"
echo "➡️ Backend : http://localhost:5001"
echo "➡️ Frontend : http://localhost:5173"
echo "➡️ PostgreSQL : port 5433 (localhost)"
echo ""
echo "📡 Pour suivre les logs du backend : pm2 logs backend"

# Attendre que l'utilisateur arrête le script
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Serveurs arrêtés.'; exit" INT
wait 