#!/bin/bash

# .htaccess ultra-simple
echo "⚙️ Création d'un .htaccess ultra-simple..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

# Créer un .htaccess minimal
mkdir -p htaccess-simple
cat > htaccess-simple/.htaccess << 'EOF'
# .htaccess ULTRA-SIMPLE pour O2Switch
# Aucune règle complexe

# Types MIME de base seulement
AddType text/html .html
AddType text/css .css
AddType application/javascript .js

# Pas de RewriteEngine = Pas d'erreur 500
EOF

# Upload du .htaccess simple
echo "📤 Upload du .htaccess simple..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd entreprise-organiser
lcd htaccess-simple
put .htaccess
quit
"

echo "✅ .htaccess ultra-simple uploadé !"
echo ""
echo "🔗 Testez maintenant :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/" 