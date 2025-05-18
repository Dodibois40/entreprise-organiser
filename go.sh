#!/bin/bash

# Lancement rapide

# Arrêter les serveurs existants
echo "Arrêt des serveurs existants..."
pkill -f "node" 2>/dev/null || true
sleep 1

# Lancer le backend
echo "Démarrage du backend..."
cd /home/dodo/Prog/entreprise-organiser/backend
npx nodemon src/index.js &
BACKEND_PID=$!

# Lancer le frontend
echo "Démarrage du frontend..."
cd /home/dodo/Prog/entreprise-organiser/frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "Serveurs démarrés!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5001"
echo ""
echo "Credentials admin: admin@example.com / admin123"
echo "Ctrl+C pour arrêter"

trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Serveurs arrêtés.'; exit" INT
wait 