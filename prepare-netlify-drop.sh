#!/bin/bash

# Préparation pour Netlify Drop
echo "📦 Préparation pour Netlify Drop..."

# 1. Construire le projet
echo "🔨 Construction du CRM..."
cd frontend
npm run build
cd ..

# 2. Créer un dossier prêt pour le déploiement
echo "📁 Création du dossier de déploiement..."
rm -rf netlify-deploy
mkdir netlify-deploy

# 3. Copier tous les fichiers
echo "📋 Copie des fichiers..."
cp -r frontend/dist/* netlify-deploy/

# 4. Créer le fichier _redirects pour SPA
echo "⚙️ Configuration des redirects..."
cat > netlify-deploy/_redirects << 'EOF'
/*    /index.html   200
EOF

# 5. Créer un fichier README pour les instructions
echo "📋 Création des instructions..."
cat > netlify-deploy/README.txt << 'EOF'
INSTRUCTIONS POUR DÉPLOYER SUR NETLIFY :

1. Allez sur https://app.netlify.com/drop
2. Glissez-déposez TOUT le contenu de ce dossier sur la page
3. Attendez le déploiement (1-2 minutes)
4. Votre CRM sera accessible via l'URL fournie !

C'est tout ! Aucun compte requis pour tester.
EOF

# 6. Créer une archive ZIP pour faciliter l'upload
echo "📦 Création d'une archive ZIP..."
cd netlify-deploy
zip -r ../crm-netlify-deploy.zip .
cd ..

echo ""
echo "✅ Fichiers prêts pour Netlify Drop !"
echo ""
echo "🎯 DEUX OPTIONS :"
echo ""
echo "📁 Option 1 - Glisser-déposer :"
echo "   1. Allez sur https://app.netlify.com/drop"
echo "   2. Glissez le dossier 'netlify-deploy' sur la page"
echo ""
echo "📦 Option 2 - Archive ZIP :"
echo "   1. Allez sur https://app.netlify.com/drop"
echo "   2. Glissez le fichier 'crm-netlify-deploy.zip'"
echo ""
echo "⚡ Déploiement en 2 minutes, GRATUIT, HTTPS automatique !"
echo ""
echo "📂 Dossier prêt : ./netlify-deploy/"
echo "📦 Archive prête : ./crm-netlify-deploy.zip" 