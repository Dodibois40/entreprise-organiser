#!/bin/bash

echo "🚀 Démarrage de l'application Entreprise Organiser..."

# Arrêter les processus existants
echo "📋 Nettoyage des processus existants..."
pkill -f "vite" 2>/dev/null || true
pkill -f "ts-node" 2>/dev/null || true
sleep 2

# Vérifier PostgreSQL
echo "🗄️  Vérification de PostgreSQL..."
if ! systemctl is-active --quiet postgresql; then
    echo "⚠️  PostgreSQL n'est pas démarré. Démarrage..."
    sudo systemctl start postgresql
fi

# Démarrer le backend
echo "🔧 Démarrage du backend (Port 3001)..."
cd backend
nohup npm run dev > backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Attendre que le backend soit prêt
echo "⏳ Attente du backend..."
for i in {1..30}; do
    if curl -s http://localhost:3001/auth/profile >/dev/null 2>&1; then
        echo "✅ Backend prêt !"
        break
    fi
    sleep 1
done

# Démarrer le frontend
echo "🎨 Démarrage du frontend (Port 5173)..."
cd frontend
nohup npm run dev > frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Attendre que le frontend soit prêt
echo "⏳ Attente du frontend..."
for i in {1..30}; do
    if curl -s http://localhost:5173 >/dev/null 2>&1; then
        echo "✅ Frontend prêt !"
        break
    fi
    sleep 1
done

echo ""
echo "🎉 Application démarrée avec succès !"
echo ""
echo "📍 Accès à l'application :"
echo "   Frontend : http://localhost:5173"
echo "   Backend  : http://localhost:3001"
echo ""
echo "👤 Comptes de test :"
echo "   Admin : admin@entreprise.com / admin123"
echo "   Chargé d'affaire : charge.affaire@entreprise.com / charge123"
echo "   Acheteur : acheteur@entreprise.com / acheteur123"
echo ""
echo "📋 Pour arrêter l'application :"
echo "   ./stop-app.sh"
echo ""
echo "📊 Logs en temps réel :"
echo "   Backend  : tail -f backend/backend.log"
echo "   Frontend : tail -f frontend/frontend.log" 