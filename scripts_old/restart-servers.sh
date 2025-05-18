#!/bin/bash

# Afficher un message
echo "Redémarrage des serveurs de l'application Entreprise Organiser..."

# Arrêter tous les processus en cours
echo "Arrêt des serveurs en cours..."
pkill -f "node.*/nodemon"
pkill -f "node.*/vite"

# Attendre que tous les processus soient terminés
sleep 2

# Nettoyer les caches
echo "Nettoyage des caches..."
rm -rf frontend/node_modules/.vite
rm -rf frontend/.vite

# Démarrer le serveur backend
echo "Démarrage du serveur backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Attendre que le backend soit démarré
sleep 3

# Démarrer le serveur frontend
echo "Démarrage du serveur frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo "Serveurs démarrés avec succès!"
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Pour arrêter tous les serveurs: pkill -f 'node.*/nodemon' && pkill -f 'node.*/vite'"
echo ""
echo "Appuyez sur Ctrl+C pour terminer ce script (les serveurs continueront de fonctionner)"

# Attendre
wait 