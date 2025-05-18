#!/bin/bash

echo "Démarrage des serveurs en mode développement avec configuration optimisée..."

# Arrêter les serveurs existants
echo "Arrêt des serveurs existants..."
pkill -f "node"
sleep 2

# Variables d'environnement pour Vite
export VITE_API_URL=http://localhost:5001/api
export VITE_DEV_SERVER_PORT=3000
export VITE_DEV_SERVER_HOST=localhost
export FAST_REFRESH=true
export CHOKIDAR_USEPOLLING=true
export NODE_ENV=development

# Démarrer le backend en arrière-plan
echo "Démarrage du backend..."
cd backend
npm run dev &
BACKEND_PID=$!
cd ..
sleep 3

# Attendre que le backend soit bien démarré
echo "Vérification que le backend est bien démarré..."
sleep 2

# Démarrer le frontend
echo "Démarrage du frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "🚀 Serveurs démarrés avec succès!"
echo "- Backend PID: $BACKEND_PID"
echo "- Frontend PID: $FRONTEND_PID"
echo "- Backend: http://localhost:5001"
echo "- Frontend: http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs."

# Attendre l'interruption
wait 