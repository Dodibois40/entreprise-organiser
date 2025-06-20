#!/bin/bash

# Script de déploiement corrigé pour O2Switch
echo "🚀 Début du déploiement sur O2Switch (version corrigée)..."

# Configuration FTP
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
FTP_PORT="21"
REMOTE_DIR="entreprise-organiser"

# 1. Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du frontend"
    exit 1
fi
cd ..

# 2. Construire le backend
echo "📦 Construction du backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du backend"
    exit 1
fi
cd ..

# 3. Créer le dossier de déploiement
echo "📁 Préparation des fichiers de déploiement..."
rm -rf deploy
mkdir -p deploy

# Copier les fichiers du frontend buildé
cp -r frontend/dist/* deploy/

# Créer le dossier backend dans deploy
mkdir -p deploy/backend

# Copier les fichiers du backend buildé
cp -r backend/dist/* deploy/backend/
cp -r backend/prisma deploy/backend/
cp backend/package.json deploy/backend/
cp backend/.env* deploy/backend/ 2>/dev/null || true

# Copier les fichiers de configuration
cp docker-compose.yml deploy/ 2>/dev/null || true
cp nginx.conf deploy/ 2>/dev/null || true

# Créer le dossier uploads
mkdir -p deploy/uploads

# 4. Créer un fichier .htaccess pour le frontend
cat > deploy/.htaccess << 'EOF'
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle React Router
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# 5. Tester la connexion FTP d'abord
echo "🔍 Test de connexion FTP..."
lftp -c "
set ftp:ssl-allow no
set net:timeout 10
set net:max-retries 3
open -u $FTP_USER,$FTP_PASS $FTP_HOST
pwd
ls
quit
"

echo "🌐 Upload des fichiers vers O2Switch..."

# Upload via LFTP avec correction du chemin
lftp -c "
set ftp:ssl-allow no
set net:timeout 10
set net:max-retries 3
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
mirror -R deploy/ ./
quit
"

if [ $? -eq 0 ]; then
    echo "✅ Déploiement réussi !"
    echo "🔗 Votre application devrait être accessible sur votre domaine O2Switch"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Configurez votre base de données sur O2Switch"
    echo "2. Ajustez les variables d'environnement si nécessaire"
    echo "3. Testez l'application"
    echo ""
    echo "📁 Structure uploadée :"
    echo "/$REMOTE_DIR/"
    echo "  ├── index.html (frontend)"
    echo "  ├── assets/ (CSS, JS)"
    echo "  ├── .htaccess"
    echo "  ├── backend/"
    echo "  └── uploads/"
else
    echo "❌ Erreur lors de l'upload FTP"
    exit 1
fi

# Nettoyage
echo "🧹 Nettoyage des fichiers temporaires..."
rm -rf deploy

echo "🎉 Déploiement terminé !" 