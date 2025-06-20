#!/bin/bash

# Script pour déplacer les fichiers vers la racine du serveur O2Switch
echo "📁 Préparation du déplacement vers la racine..."

# Créer un dossier pour la racine du serveur
mkdir -p deploy/root-deployment

# Copier tous les fichiers du dossier deploy vers root-deployment
echo "📋 Copie des fichiers..."
cp -r deploy/* deploy/root-deployment/ 2>/dev/null || true

# Déplacer le contenu de entreprise-organiser vers la racine
if [ -d "deploy/root-deployment/entreprise-organiser" ]; then
    echo "🔄 Déplacement des fichiers vers la racine..."
    
    # Déplacer tous les fichiers de entreprise-organiser vers la racine
    mv deploy/root-deployment/entreprise-organiser/* deploy/root-deployment/ 2>/dev/null || true
    mv deploy/root-deployment/entreprise-organiser/.* deploy/root-deployment/ 2>/dev/null || true
    
    # Supprimer le dossier vide
    rmdir deploy/root-deployment/entreprise-organiser 2>/dev/null || true
fi

# Créer un nouveau .htaccess pour la racine
cat > deploy/root-deployment/.htaccess << 'EOF'
# Configuration pour React Router (SPA) - Racine
RewriteEngine On

# Configuration pour React Router
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Configuration MIME types
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
    AddType application/json .json
</IfModule>

# Configuration de sécurité
<IfModule mod_headers.c>
    Header always set X-Frame-Options DENY
    Header always set X-Content-Type-Options nosniff
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>

# Cache configuration
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
</IfModule>
EOF

echo "✅ Fichiers préparés pour déploiement à la racine !"
echo "📁 Dossier : deploy/root-deployment/"
echo ""
echo "📋 Instructions :"
echo "1. Uploadez tout le contenu de 'deploy/root-deployment/' vers '/public_html/' sur O2Switch"
echo "2. Votre CRM sera accessible directement via votre domaine"
echo "3. Frontend : https://votre-domaine.com"
echo "4. API : https://votre-domaine.com/backend/api/" 