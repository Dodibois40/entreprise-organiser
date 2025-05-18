#!/bin/bash

# Arrêter tous les processus node en cours
echo "Arrêt des serveurs existants..."
pkill -f node
sleep 2

# Création de deux terminaux
echo "Démarrage du backend dans ce terminal..."
echo "DÉMARREZ UN AUTRE TERMINAL pour exécuter la commande suivante:"
echo -e "\033[1;32m cd ~/Prog/entreprise-organiser/frontend && npm run dev \033[0m"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur backend à tout moment"
echo ""
echo "Démarrage du backend en 5 secondes..."
sleep 5

# Exécution directe du backend
cd backend
exec node src/index.js 