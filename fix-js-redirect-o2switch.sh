#!/bin/bash

# Fix redirection JavaScript vers index.html
echo "🔧 Correction redirection JavaScript..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# Créer un .htaccess ULTRA-SPÉCIFIQUE
echo "⚙️ Création .htaccess anti-redirection JS..."
cat > htaccess-no-js-redirect.txt << 'EOF'
# STOP REDIRECTION DES FICHIERS JS !
# Configuration spéciale pour O2Switch

# Types MIME ABSOLUS
AddType application/javascript .js
AddType text/css .css
AddType application/json .json

# RÈGLE ABSOLUE : NE JAMAIS TOUCHER AUX FICHIERS .js
RewriteEngine On
RewriteBase /entreprise-organiser/

# PRIORITÉ ABSOLUE : Fichiers assets (JS, CSS, etc.)
RewriteRule ^assets/.*\.(js|css|json)$ - [L,E=no-gzip:1]

# Autres fichiers statiques
RewriteRule ^.*\.(js|css|json|svg|png|jpg|jpeg|gif|ico|woff2)$ - [L]

# SPA redirect SEULEMENT pour les vraies routes (pas de fichiers)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteCond %{REQUEST_URI} !^/entreprise-organiser/assets/
RewriteCond %{REQUEST_URI} !\.(js|css|json|svg|png|jpg|jpeg|gif|ico|woff2)$
RewriteRule ^(.*)$ index.html [L]

# Headers forcés pour JavaScript
<FilesMatch "\.js$">
    Header set Content-Type "application/javascript"
    Header unset Content-Encoding
</FilesMatch>
EOF

# Upload immédiat
echo "📤 Upload correction..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
put htaccess-no-js-redirect.txt .htaccess
quit
"

# Test immédiat
echo "🧪 Test correction..."
sleep 2
curl -I "https://www.lamanufacturedubois.com/entreprise-organiser/assets/" 2>/dev/null | head -5

echo ""
echo "✅ Correction appliquée !"
echo ""
echo "🔄 VIDEZ LE CACHE DU NAVIGATEUR (Ctrl+Shift+R) et retestez !" 