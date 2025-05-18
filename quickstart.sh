#!/bin/bash

# Script de démarrage rapide
echo "Démarrage rapide des serveurs..."

# Arrêt des serveurs existants
pkill -f "node.*backend" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
sleep 1

# Chemins absolus des répertoires
BACKEND_DIR="/home/dodo/Prog/entreprise-organiser/backend"
FRONTEND_DIR="/home/dodo/Prog/entreprise-organiser/frontend"

# Correction du problème d'API dans le frontend
echo "Correction des chemins d'API..."
sed -i 's|/auth/|/api/auth/|g' "$FRONTEND_DIR/src/services/authService.js"

# Problème leftIcon
echo "Correction du problème leftIcon..."
sed -i 's/leftIcon=/lefticon=/g' "$FRONTEND_DIR/src/pages/auth/Login.jsx"

# Démarrage direct des serveurs avec les chemins absolus
echo "Démarrage du backend..."
cd "$BACKEND_DIR"
NODE_ENV=development npx nodemon src/index.js &
BACKEND_PID=$!

# Attendre un peu pour que le backend démarre
sleep 1

# Démarrer le frontend directement
echo "Démarrage du frontend..."
cd "$FRONTEND_DIR"
npm run dev &
FRONTEND_PID=$!

# Informations
echo ""
echo "Serveurs démarrés!"
echo "Frontend: http://localhost:5173"
echo "Backend: http://localhost:5001"
echo ""
echo "Credentials admin:"
echo "Email: admin@example.com"
echo "Password: admin123"
echo ""
echo "Ctrl+C pour arrêter"

# Gestion de l'arrêt propre
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Serveurs arrêtés.'; exit" INT
wait 