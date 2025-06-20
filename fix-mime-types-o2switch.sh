#!/bin/bash

# Correction des types MIME pour O2Switch
echo "🔧 Correction des types MIME pour O2Switch..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# Créer un .htaccess avec types MIME corrects
echo "⚙️ Création du .htaccess avec types MIME corrects..."
cat > htaccess-mime-fix.txt << 'EOF'
# Configuration MIME pour O2Switch - CRM Entreprise
# Correction des erreurs de chargement des modules JavaScript

# Types MIME essentiels pour les modules JavaScript
AddType application/javascript .js
AddType application/javascript .mjs
AddType text/javascript .js
AddType application/json .json
AddType text/css .css
AddType image/svg+xml .svg
AddType font/woff2 .woff2

# Configuration spéciale pour les modules ES6
<FilesMatch "\.(js|mjs)$">
    Header set Content-Type "application/javascript"
</FilesMatch>

# Gestion des routes SPA
RewriteEngine On
RewriteBase /entreprise-organiser/

# NE PAS rediriger les fichiers JavaScript vers index.html !
RewriteCond %{REQUEST_FILENAME} \.(js|css|json|svg|woff2|png|jpg|jpeg|gif|ico)$ [NC]
RewriteRule ^(.*)$ - [L]

# Gestion des fichiers existants
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^(.*)$ - [L]

# Gestion des dossiers existants  
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*)$ - [L]

# Redirection SPA SEULEMENT pour les routes non-fichiers
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !\.(js|css|json|svg|woff2|png|jpg|jpeg|gif|ico)$ [NC]
RewriteRule ^(.*)$ index.html [L,QSA]

# Headers pour éviter la mise en cache des fichiers JavaScript pendant le debug
<FilesMatch "\.(js|css)$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
    Header set Pragma "no-cache"
    Header set Expires "0"
</FilesMatch>

# Sécurité
<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>
EOF

# Upload du .htaccess corrigé
echo "📤 Upload du .htaccess corrigé..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
put htaccess-mime-fix.txt .htaccess
quit
"

# Test des fichiers JavaScript
echo "🧪 Test des fichiers JavaScript..."
echo "🔍 Test du fichier vendor..."
curl -I "https://www.lamanufacturedubois.com/entreprise-organiser/assets/vendor-wO0UaXpn.js" 2>/dev/null | head -10

echo ""
echo "✅ .htaccess corrigé uploadé !"
echo ""
echo "🔗 Testez maintenant votre CRM :"
echo "https://www.lamanufacturedubois.com/entreprise-organiser/"
echo ""
echo "📋 Si les erreurs persistent :"
echo "  1. Videz le cache du navigateur (Ctrl+F5)"
echo "  2. Ouvrez les outils de développement (F12)"
echo "  3. Vérifiez l'onglet Network pour voir les types MIME" 