#!/bin/bash

# Script pour créer un fichier .htaccess de redirection vers entreprise-organiser
echo "🔧 Création du fichier .htaccess pour redirection..."

# Créer le fichier .htaccess dans le dossier déployé
cat > deploy/.htaccess << 'EOF'
# Configuration pour rediriger vers entreprise-organiser
RewriteEngine On

# Redirection du domaine principal vers le dossier entreprise-organiser
RewriteCond %{REQUEST_URI} !^/entreprise-organiser/
RewriteCond %{REQUEST_URI} !^/$
RewriteRule ^(.*)$ /entreprise-organiser/$1 [L,R=301]

# Redirection de la racine vers entreprise-organiser
RewriteRule ^$ /entreprise-organiser/ [L,R=301]

# Configuration pour React Router (SPA)
<IfModule mod_rewrite.c>
    RewriteEngine On
    
    # Handle Angular and React Routes
    RewriteBase /entreprise-organiser/
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /entreprise-organiser/index.html [L]
</IfModule>

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

echo "✅ Fichier .htaccess créé avec succès !"
echo "📁 Emplacement : deploy/.htaccess"
echo ""
echo "📋 Instructions :"
echo "1. Uploadez ce fichier dans votre dossier /public_html/ sur O2Switch"
echo "2. Votre domaine redirigera automatiquement vers entreprise-organiser/"
echo "3. Testez en accédant à votre domaine" 