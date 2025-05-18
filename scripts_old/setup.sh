#!/bin/bash

# Afficher un message de démarrage
echo "Configuration de l'application Entreprise Organiser..."

# Installer les dépendances globales si nécessaire
echo "Installation des dépendances globales..."
npm install -g concurrently nodemon

# Installer les dépendances du backend
echo "Installation des dépendances du backend..."
cd backend
npm install
cd ..

# Installer les dépendances du frontend
echo "Installation des dépendances du frontend..."
cd frontend
npm install
cd ..

# Créer un fichier .env dans le dossier backend s'il n'existe pas
if [ ! -f backend/.env ]; then
  echo "Création du fichier .env pour le backend..."
  cat > backend/.env << EOF
PORT=5001
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/entreprise-organiser
JWT_SECRET=entreprise_organiser_secret_key_2025
JWT_EXPIRE=1d
CORS_ORIGIN=http://localhost:3000
EOF
fi

# Créer un fichier .env dans le dossier frontend s'il n'existe pas
if [ ! -f frontend/.env ]; then
  echo "Création du fichier .env pour le frontend..."
  cat > frontend/.env << EOF
VITE_API_URL=http://localhost:5001/api
EOF
fi

echo "Configuration terminée avec succès!"
echo "Pour démarrer les serveurs, exécutez: ./start-servers.sh" 