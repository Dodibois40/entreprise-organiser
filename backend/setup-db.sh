#!/bin/bash

# Script d'installation et de configuration de PostgreSQL pour l'application Entreprise Organiser

echo "Installation et configuration de PostgreSQL..."

# Vérifier si PostgreSQL est déjà installé
if command -v psql &>/dev/null; then
  echo "PostgreSQL est déjà installé."
else
  echo "Installation de PostgreSQL..."
  sudo apt update
  sudo apt install -y postgresql postgresql-contrib
fi

# Démarrer le service PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

echo "Configuration de la base de données..."

# Créer l'utilisateur et la base de données
sudo -u postgres psql -c "CREATE USER postgres WITH PASSWORD 'password' SUPERUSER;" || true
sudo -u postgres psql -c "CREATE DATABASE entreprise_organiser;" || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE entreprise_organiser TO postgres;" || true

echo "Base de données configurée avec succès."

echo "Création des tables et configuration initiale..."
# Exécuter le script de migration
sudo -u postgres psql -d entreprise_organiser -f prisma/migrations/init.sql

echo "Configuration de la base de données terminée."
echo "Vous pouvez maintenant lancer l'application avec 'npm run dev'." 