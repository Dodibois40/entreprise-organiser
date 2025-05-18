#!/bin/bash

# Arrêter tous les processus en cours
killall node 2>/dev/null || true
sleep 1

# Se positionner dans le bon répertoire
cd "$(dirname "$0")"

# Nettoyer les caches Vite
rm -rf frontend/node_modules/.vite frontend/.vite 2>/dev/null || true

# Démarrer le backend
echo "Démarrage du backend..."
cd backend
npm run dev & 
BACKEND_PID=$!
cd ..

# Attendre 2 secondes
sleep 2

# Démarrer le frontend
echo "Démarrage du frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!

echo "Les deux serveurs sont démarrés :"
echo "- Backend (PID: $BACKEND_PID) sur http://localhost:5001"
echo "- Frontend (PID: $FRONTEND_PID) sur http://localhost:3000"
echo ""
echo "Appuyez sur Ctrl+C pour terminer ce script (les serveurs continueront de fonctionner)"

# Garder le script en exécution pour voir les logs
wait 