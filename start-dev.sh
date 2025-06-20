#!/bin/bash

# Script de démarrage pour le développement
# Backend: http://localhost:8000
# Frontend: http://localhost:8080

echo "🚀 Démarrage des serveurs de développement..."
echo "📂 Backend: http://localhost:8000"
echo "🌐 Frontend: http://localhost:8080"
echo ""

# Fonction pour nettoyer les processus à l'arrêt
cleanup() {
    echo ""
    echo "⏹️  Arrêt des serveurs..."
    pkill -P $$
    exit 0
}

# Capturer Ctrl+C pour nettoyer proprement
trap cleanup SIGINT SIGTERM

# Démarrer le backend en arrière-plan
echo "🔧 Démarrage du backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Attendre un peu que le backend démarre
sleep 3

# Démarrer le frontend en arrière-plan
echo "🎨 Démarrage du frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Serveurs démarrés avec succès !"
echo "📝 Backend API: http://localhost:8000/api"
echo "📊 Swagger Docs: http://localhost:8000/api/docs"
echo "🌐 Frontend: http://localhost:8080"
echo ""
echo "💡 Appuyez sur Ctrl+C pour arrêter les serveurs"

# Attendre que les processus se terminent
wait $BACKEND_PID $FRONTEND_PID 