#!/bin/bash

echo "🛑 Arrêt de l'application Entreprise Organiser..."

# Arrêter les processus
echo "📋 Arrêt des serveurs..."
pkill -f "vite" 2>/dev/null || true
pkill -f "ts-node" 2>/dev/null || true

# Attendre l'arrêt complet
sleep 3

# Vérifier que les ports sont libérés
if ss -tulpn | grep -q ":3001"; then
    echo "⚠️  Le backend (port 3001) est encore actif"
else
    echo "✅ Backend arrêté"
fi

if ss -tulpn | grep -q ":5173"; then
    echo "⚠️  Le frontend (port 5173) est encore actif"
else
    echo "✅ Frontend arrêté"
fi

echo "🎯 Application arrêtée !" 