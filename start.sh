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

echo "Démarrage des serveurs pour Entreprise Organiser"

# Aller à la racine du projet
cd $(dirname $0)

# Arrêter les serveurs déjà en cours
echo "Arrêt des serveurs existants..."
pkill -f "node.*backend" || true
pkill -f "node.*vite" || true
sleep 2

# Démarrer le backend
echo "Démarrage du backend..."
cd backend
NODE_ENV=development npx nodemon src/index.js &
BACKEND_PID=$!
echo "Backend démarré (PID: $BACKEND_PID)"

# Attendre que le backend soit prêt
sleep 3

# Démarrer le frontend
echo "Démarrage du frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo "Frontend démarré (PID: $FRONTEND_PID)"

echo ""
echo "Serveurs démarrés :"
echo "Backend : http://localhost:5001"
echo "Frontend : http://localhost:5173"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"

# Attendre que l'utilisateur arrête le script
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Serveurs arrêtés.'; exit" INT
wait 