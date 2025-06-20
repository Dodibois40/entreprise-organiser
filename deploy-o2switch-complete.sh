#!/bin/bash

# Script de déploiement complet pour O2Switch avec configuration BDD
echo "🚀 Déploiement complet sur O2Switch..."

# Configuration FTP
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
FTP_PORT="21"
REMOTE_DIR="entreprise-organiser"

# Vérifier si lftp est installé
if ! command -v lftp &> /dev/null; then
    echo "⚠️  lftp n'est pas installé. Installation..."
    sudo apt-get update && sudo apt-get install -y lftp
fi

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

# Copier le fichier .env de production
cp env.production deploy/backend/.env

# Copier les fichiers de configuration
cp docker-compose.yml deploy/ 2>/dev/null || true
cp nginx.conf deploy/ 2>/dev/null || true

# Créer le dossier uploads avec les bonnes permissions
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

# Gzip compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
EOF

# 5. Créer un package.json pour le backend de production
cat > deploy/backend/package-production.json << 'EOF'
{
  "name": "backend-production",
  "version": "1.0.0",
  "description": "Backend pour l'application Organiseur d'Entreprise - Production",
  "main": "src/main.js",
  "scripts": {
    "start": "node src/main.js",
    "prisma:deploy": "prisma migrate deploy",
    "prisma:generate": "prisma generate",
    "prisma:seed": "node prisma/seed.js"
  },
  "dependencies": {
    "@nestjs/common": "^11.1.1",
    "@nestjs/config": "^4.0.2",
    "@nestjs/core": "^11.1.1",
    "@nestjs/jwt": "^11.0.0",
    "@nestjs/passport": "^11.0.5",
    "@nestjs/platform-express": "^11.1.3",
    "@nestjs/swagger": "^11.2.0",
    "@prisma/client": "^6.8.2",
    "bcrypt": "^6.0.0",
    "bcryptjs": "^3.0.2",
    "body-parser": "^1.20.2",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "exceljs": "^4.4.0",
    "express": "^4.18.2",
    "firebase-admin": "^13.4.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^2.0.1",
    "nodemailer": "^7.0.3",
    "passport": "^0.7.0",
    "passport-jwt": "^4.0.1",
    "prisma": "^6.8.2",
    "uuid": "^11.1.0"
  }
}
EOF

# 6. Créer un fichier de démarrage Node.js
cat > deploy/backend/start.js << 'EOF'
// Script de démarrage pour O2Switch
const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Démarrage de l\'application sur O2Switch...');

// Installer les dépendances si nécessaire
try {
    console.log('📦 Vérification des dépendances...');
    execSync('npm install --production', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
    console.error('❌ Erreur lors de l\'installation des dépendances:', error.message);
}

// Générer le client Prisma
try {
    console.log('🔧 Génération du client Prisma...');
    execSync('npx prisma generate', { stdio: 'inherit', cwd: __dirname });
} catch (error) {
    console.error('❌ Erreur lors de la génération Prisma:', error.message);
}

// Démarrer l'application
try {
    console.log('🌟 Démarrage de l\'application...');
    require('./src/main.js');
} catch (error) {
    console.error('❌ Erreur lors du démarrage:', error.message);
    process.exit(1);
}
EOF

echo "🌐 Upload des fichiers vers O2Switch..."

# Upload via LFTP
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
    echo ""
    echo "📁 Structure uploadée :"
    echo "/$REMOTE_DIR/"
    echo "  ├── index.html (frontend)"
    echo "  ├── assets/ (CSS, JS)"
    echo "  ├── .htaccess"
    echo "  ├── backend/"
    echo "  │   ├── .env (configuration BDD)"
    echo "  │   ├── src/ (application)"
    echo "  │   ├── prisma/ (migrations)"
    echo "  │   └── start.js (démarrage)"
    echo "  └── uploads/"
    echo ""
    echo "🔗 Votre application est uploadée sur O2Switch !"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Connectez-vous à votre panneau O2Switch"
    echo "2. Assurez-vous que PostgreSQL est activé"
    echo "3. Créez la base de données si ce n'est pas fait"
    echo "4. Exécutez le script de configuration BDD :"
    echo "   ./setup-database-o2switch.sh"
    echo "5. Configurez votre domaine pour pointer vers entreprise-organiser/"
    echo "6. Testez votre application"
    
else
    echo "❌ Erreur lors de l'upload FTP"
    exit 1
fi

# Nettoyage
echo "🧹 Nettoyage des fichiers temporaires..."
rm -rf deploy

echo "🎉 Déploiement terminé !" 