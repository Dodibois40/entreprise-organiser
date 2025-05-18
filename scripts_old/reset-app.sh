#!/bin/bash

echo "Réinitialisation de l'application..."

# Arrêter les serveurs existants
echo "Arrêt des serveurs existants..."
pkill -f node
sleep 2

# Nettoyer le cache
echo "Nettoyage des caches..."
rm -rf frontend/node_modules/.vite
rm -rf frontend/.eslintcache
rm -rf frontend/.cache

# Démarrer le backend
echo "Démarrage du backend..."
cd backend
npm run dev & 
BACKEND_PID=$!
cd ..
sleep 3

# Démarrer le frontend
echo "Démarrage du frontend..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo ""
echo "🚀 Application redémarrée avec succès!"
echo "- Backend: http://localhost:5001"
echo "- Frontend: http://localhost:3000"
echo ""
echo "IMPORTANT: Veuillez vider le cache de votre navigateur (Ctrl+F5) et supprimer les données localStorage"
echo "Pour supprimer les données localStorage, ouvrez les DevTools (F12),"
echo "allez dans l'onglet Application -> Local Storage et cliquez sur 'Clear All'"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter les serveurs"

wait 