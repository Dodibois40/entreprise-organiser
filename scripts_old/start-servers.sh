#!/bin/bash

# Afficher un message de démarrage
echo "Démarrage des serveurs de l'application Entreprise Organiser..."

# Fonction pour arrêter les serveurs en cas d'interruption
function cleanup {
  echo "Arrêt des serveurs..."
  kill $(jobs -p) 2>/dev/null
  exit
}

# Détecter Ctrl+C pour arrêter proprement
trap cleanup SIGINT SIGTERM

# Méthode 1: Utiliser concurrently depuis node_modules local (préféré)
if [ -f "node_modules/.bin/concurrently" ]; then
  echo "Démarrage avec concurrently local..."
  ./node_modules/.bin/concurrently --kill-others \
    --names "BACKEND,FRONTEND" \
    --prefix "{name}" \
    --prefix-colors "cyan.bold,green.bold" \
    "cd backend && npm run dev" \
    "cd frontend && npm run dev"

# Méthode 2: Démarrer les serveurs en parallèle avec des processus en arrière-plan
else
  echo "Concurrently non disponible, démarrage standard..."
  (cd backend && npm run dev) &
  backend_pid=$!
  
  # Attendre un peu pour que le backend démarre
  sleep 2
  
  (cd frontend && npm run dev) &
  frontend_pid=$!
  
  echo "Serveurs démarrés en arrière-plan."
  echo "- Backend PID: $backend_pid"
  echo "- Frontend PID: $frontend_pid"
  echo "- Backend URL: http://localhost:5001"
  echo "- Frontend URL: http://localhost:3000"
  
  wait
fi 