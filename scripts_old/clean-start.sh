#!/bin/bash

echo "Nettoyage et démarrage complet de l'application..."

# S'assurer qu'on est dans le bon répertoire
cd "$(dirname "$0")"

# Tuer tous les processus existants
echo "Arrêt des processus existants..."
killall node 2>/dev/null || true
sleep 1

# Nettoyer les caches
echo "Nettoyage des caches..."
rm -rf frontend/node_modules/.vite frontend/.vite

# Démarrer le backend
echo "Démarrage du backend..."
cd backend
node src/index.js &
BACKEND_PID=$!
echo "Backend démarré avec PID $BACKEND_PID"
cd ..

# Attendre que le backend démarre
sleep 2

# Démarrer le frontend
echo "Démarrage du frontend..."
cd frontend
npx vite --force &
FRONTEND_PID=$!
echo "Frontend démarré avec PID $FRONTEND_PID"

echo ""
echo "🚀 Application démarrée !"
echo "- Backend: http://localhost:5001"
echo "- Frontend: http://localhost:3000"
echo ""
echo "Pour arrêter les serveurs: killall node"

# Attendre la fin
wait 