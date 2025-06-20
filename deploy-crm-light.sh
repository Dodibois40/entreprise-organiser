#!/bin/bash

# Script pour déployer une version allégée du CRM
echo "🚀 Déploiement CRM version allégée..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
cd ..

# 2. Créer un dossier allégé
echo "📁 Création de la version allégée..."
rm -rf deploy-light
mkdir -p deploy-light

# 3. Copier seulement les fichiers essentiels
echo "📋 Copie des fichiers essentiels..."
cp frontend/dist/index.html deploy-light/
cp -r frontend/dist/assets deploy-light/ 2>/dev/null || true

# 4. Créer un .htaccess ultra-simple
echo "⚙️ Configuration .htaccess simple..."
cat > deploy-light/.htaccess << 'EOF'
# Configuration ultra-simple
DirectoryIndex index.html
RewriteEngine On
RewriteBase /entreprise-organiser/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /entreprise-organiser/index.html [L]
EOF

# 5. Modifier l'index.html pour pointer vers une API externe si nécessaire
echo "🔧 Optimisation de l'index.html..."
# On garde l'index.html tel quel pour l'instant

# 6. Upload
echo "📤 Upload de la version allégée..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-light
put index.html
put .htaccess
mirror --reverse assets assets
quit
"

echo ""
echo "✅ Version allégée déployée !"
echo ""
echo "🔗 Testez maintenant :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/"
echo ""
echo "📋 Si ça fonctionne :"
echo "• Le problème venait des gros fichiers JS"
echo "• On peut optimiser le build React"
echo ""
echo "📋 Si ça ne fonctionne toujours pas :"
echo "• Le problème vient du .htaccess ou de React Router" 