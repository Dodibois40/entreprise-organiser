#!/bin/bash

# Script de correction et démarrage complet
# Auteur: Assistant Claude
# Date: 18/05/2025

# Couleurs pour meilleure lisibilité
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  SCRIPT DE RÉPARATION ET DÉMARRAGE   ${NC}"
echo -e "${BLUE}======================================${NC}"

# 1. Vérifier et corriger la structure du projet
echo -e "${YELLOW}1. Vérification de la structure du projet...${NC}"

# Se placer dans le répertoire du script
cd "$(dirname "$0")"
CURRENT_DIR=$(pwd)
echo -e "Répertoire actuel: ${CURRENT_DIR}"

# 2. Corriger les fichiers d'API pour utiliser les bons préfixes
echo -e "${YELLOW}2. Correction des chemins d'API dans le frontend...${NC}"

# Vérifier et modifier le fichier authService.js si nécessaire
AUTHSERVICE_FILE="frontend/src/services/authService.js"
if [ -f "$AUTHSERVICE_FILE" ]; then
    echo -e "Correction des chemins d'API dans ${AUTHSERVICE_FILE}..."
    # Remplacer tous les appels /auth/ par /api/auth/
    sed -i 's|/auth/|/api/auth/|g' "$AUTHSERVICE_FILE"
    echo -e "${GREEN}✓ Chemins d'API corrigés${NC}"
else
    echo -e "${RED}✗ Fichier $AUTHSERVICE_FILE non trouvé${NC}"
fi

# 3. Corriger les problèmes de PropTypes
echo -e "${YELLOW}3. Correction des problèmes de PropTypes...${NC}"

# Vérifier et modifier les boutons avec leftIcon
LOGIN_FILE="frontend/src/pages/auth/Login.jsx"
if [ -f "$LOGIN_FILE" ]; then
    echo -e "Correction du problème leftIcon dans ${LOGIN_FILE}..."
    # Remplacer leftIcon par lefticon
    sed -i 's/leftIcon=/lefticon=/g' "$LOGIN_FILE"
    echo -e "${GREEN}✓ Problème leftIcon corrigé${NC}"
else
    echo -e "${RED}✗ Fichier $LOGIN_FILE non trouvé${NC}"
fi

# Créer l'adaptateur PropTypes si nécessaire
UTILS_DIR="frontend/src/utils"
PROP_TYPES_FILE="$UTILS_DIR/prop-types.js"
mkdir -p "$UTILS_DIR"

echo -e "Création de l'adaptateur PropTypes..."
cat > "$PROP_TYPES_FILE" << 'EOL'
// Ce fichier est un adaptateur pour les deux styles d'import de prop-types
import * as PropTypesModule from 'prop-types';

// Exporter tous les membres individuels
export const {
  array,
  bool,
  func,
  number,
  object,
  string,
  symbol,
  any,
  arrayOf,
  element,
  elementType,
  instanceOf,
  node,
  objectOf,
  oneOf,
  oneOfType,
  shape,
  exact
} = PropTypesModule;

// Exporter le module entier comme défaut pour la compatibilité
export default PropTypesModule;
EOL
echo -e "${GREEN}✓ Adaptateur PropTypes créé${NC}"

# 4. Arrêter tous les serveurs en cours
echo -e "${YELLOW}4. Arrêt des serveurs en cours...${NC}"
pkill -f "node.*backend" 2>/dev/null || true
pkill -f "node.*vite" 2>/dev/null || true
pkill -f "nodemon" 2>/dev/null || true
echo -e "${GREEN}✓ Tous les serveurs ont été arrêtés${NC}"
sleep 1

# 5. Installer les dépendances si nécessaires
echo -e "${YELLOW}5. Vérification des dépendances...${NC}"

# Backend
echo -e "Installation des dépendances backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✓ Les dépendances backend sont déjà installées${NC}"
fi

# Frontend
echo -e "Installation des dépendances frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    npm install
else
    echo -e "${GREEN}✓ Les dépendances frontend sont déjà installées${NC}"
fi

# Retour au répertoire principal
cd ..

# 6. Démarrer MongoDB si nécessaire
echo -e "${YELLOW}6. Vérification de MongoDB...${NC}"
if ! pgrep -x "mongod" > /dev/null; then
    echo -e "${RED}! MongoDB ne semble pas être en cours d'exécution${NC}"
    echo -e "${YELLOW}Tentative de démarrage de MongoDB...${NC}"
    sudo systemctl start mongod 2>/dev/null || mongod --dbpath ~/data/db --fork --logpath ~/mongodb.log 2>/dev/null || true
    sleep 2
    if ! pgrep -x "mongod" > /dev/null; then
        echo -e "${RED}⚠ Impossible de démarrer MongoDB automatiquement${NC}"
        echo -e "${YELLOW}Conseil: Démarrez MongoDB manuellement avec 'sudo systemctl start mongod'${NC}"
    else
        echo -e "${GREEN}✓ MongoDB démarré avec succès${NC}"
    fi
else
    echo -e "${GREEN}✓ MongoDB est déjà en cours d'exécution${NC}"
fi

# 7. Démarrer les serveurs
echo -e "${YELLOW}7. Démarrage des serveurs...${NC}"

# Backend
echo -e "Démarrage du serveur backend..."
cd backend
NODE_ENV=development npx nodemon src/index.js &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend démarré (PID: $BACKEND_PID)${NC}"

# Attendre que le backend soit prêt
sleep 3

# Frontend
echo -e "Démarrage du serveur frontend..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend démarré (PID: $FRONTEND_PID)${NC}"

# 8. Afficher les URLs et informations
echo -e "${BLUE}======================================${NC}"
echo -e "${GREEN}Serveurs démarrés avec succès!${NC}"
echo -e "${BLUE}======================================${NC}"
echo -e "Backend : ${YELLOW}http://localhost:5001${NC}"
echo -e "Frontend: ${YELLOW}http://localhost:5173${NC}"
echo -e ""
echo -e "${BLUE}Informations de connexion:${NC}"
echo -e "Email: ${YELLOW}admin@example.com${NC}"
echo -e "Mot de passe: ${YELLOW}admin123${NC}"
echo -e ""
echo -e "${YELLOW}Si ces identifiants ne fonctionnent pas, utilisez le lien 'Inscrivez-vous'${NC}"
echo -e "pour créer un nouveau compte."
echo -e ""
echo -e "${BLUE}======================================${NC}"
echo -e "${YELLOW}Appuyez sur Ctrl+C pour arrêter les serveurs${NC}"
echo -e "${BLUE}======================================${NC}"

# Attendre que l'utilisateur arrête le script
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo -e '${RED}Serveurs arrêtés.${NC}'; exit" INT
wait 