#!/bin/bash

# Script de diagnostic et correction des erreurs O2Switch
echo "🔍 Diagnostic des erreurs O2Switch..."

# 1. Vérifier les ports locaux
echo "📊 Ports utilisés localement :"
netstat -tulpn | grep :800 || echo "Aucun port 800x utilisé"

# 2. Arrêter tous les processus Node.js
echo "🛑 Arrêt des processus Node.js..."
pkill -f node || true
pkill -f npm || true

# 3. Nettoyer les ports
echo "🧹 Nettoyage des ports..."
for port in 8000 8080 8081 8082 8083 8084; do
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
done

# 4. Créer un fichier .env de production corrigé
echo "⚙️ Création du fichier .env de production..."
cat > backend/.env.production << 'EOF'
# Configuration de production O2Switch
NODE_ENV=production

# Base de données PostgreSQL O2Switch
DATABASE_URL="postgresql://cexe9174_cexe9174:rm9q-Pagd-QKP!@volant.o2switch.net:5432/cexe9174_cexe9174"

# JWT Configuration
JWT_SECRET="o2switch-entreprise-organiser-jwt-secret-2025"

# Upload Configuration
UPLOAD_PATH="/home/cexe9174/entreprise-organiser/uploads"

# CORS Configuration
FRONTEND_URL="https://addon-lamanufacturedubois.com.cexe9174.odns.fr"
CORS_ORIGIN="https://addon-lamanufacturedubois.com.cexe9174.odns.fr"

# Port (O2Switch gère automatiquement)
PORT=8000

# SSL Configuration pour production
SSL_ENABLED=true
EOF

# 5. Créer un fichier de configuration Apache corrigé
echo "🔧 Création de la configuration Apache..."
cat > deploy/.htaccess << 'EOF'
# Configuration Apache pour O2Switch
RewriteEngine On

# Force HTTPS (O2Switch)
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Gestion des erreurs
ErrorDocument 500 /error500.html
ErrorDocument 404 /error404.html

# Configuration pour React Router (SPA)
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configuration MIME
AddType application/javascript .js
AddType text/css .css

# Compression
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

# Cache
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
</IfModule>
EOF

# 6. Créer une page d'erreur personnalisée
echo "📄 Création des pages d'erreur..."
cat > deploy/error500.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur 500 - Entreprise Organiser</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
        .error-container { background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #e74c3c; }
        p { color: #666; margin: 20px 0; }
        .btn { background: #3498db; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>🚧 Maintenance en cours</h1>
        <p>Le service Entreprise Organiser est temporairement indisponible.</p>
        <p>Nous travaillons à résoudre ce problème rapidement.</p>
        <a href="/" class="btn">Réessayer</a>
    </div>
</body>
</html>
EOF

# 7. Créer un script de déploiement corrigé
echo "🚀 Préparation du déploiement corrigé..."

# Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
cd ..

# Copier les fichiers vers deploy
echo "📁 Copie des fichiers..."
rm -rf deploy/frontend
mkdir -p deploy
cp -r frontend/dist/* deploy/

# Créer la structure backend pour O2Switch
echo "🔧 Préparation du backend..."
mkdir -p deploy/api
cp -r backend/dist/* deploy/api/ 2>/dev/null || true
cp -r backend/node_modules deploy/api/ 2>/dev/null || true
cp backend/.env.production deploy/api/.env 2>/dev/null || true
cp -r backend/prisma deploy/api/ 2>/dev/null || true

echo ""
echo "✅ Diagnostic et correction terminés !"
echo ""
echo "📋 Prochaines étapes :"
echo "1. Testez localement : npm run dev"
echo "2. Redéployez avec : ./deploy-o2switch-complete.sh"
echo "3. Vérifiez les logs sur O2Switch"
echo ""
echo "🔗 URL de test : https://addon-lamanufacturedubois.com.cexe9174.odns.fr" 