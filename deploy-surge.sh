#!/bin/bash

# Déploiement ULTRA-RAPIDE sur Surge.sh
echo "⚡ Déploiement ULTRA-RAPIDE sur Surge.sh..."

# 1. Installer Surge si pas déjà fait
if ! command -v surge &> /dev/null; then
    echo "📦 Installation de Surge..."
    npm install -g surge
fi

# 2. Construire le projet
echo "📦 Construction du CRM..."
cd frontend
npm run build
cd ..

# 3. Créer un fichier 200.html pour les SPA (Surge)
echo "⚙️ Configuration SPA pour Surge..."
cp frontend/dist/index.html frontend/dist/200.html

# 4. Déploiement immédiat
echo "🚀 Déploiement en cours..."
cd frontend/dist

# Générer un nom de domaine aléatoire
DOMAIN_NAME="crm-entreprise-$(date +%s).surge.sh"

echo "🌐 Déploiement sur : $DOMAIN_NAME"
surge . $DOMAIN_NAME

echo ""
echo "✅ CRM déployé avec succès !"
echo ""
echo "🔗 Votre CRM est accessible à :"
echo "https://$DOMAIN_NAME"
echo ""
echo "🎉 Accessible partout dans le monde en HTTPS !"
echo "⚡ Déploiement terminé en moins de 2 minutes !" 