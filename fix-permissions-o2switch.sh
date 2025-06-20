#!/bin/bash

# Correction des permissions O2Switch
echo "🔧 Correction des permissions O2Switch..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

# Corriger les permissions via FTP
echo "📋 Correction des permissions..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd entreprise-organiser

# Permissions pour les fichiers HTML (644)
chmod 644 *.html
chmod 644 *.css
chmod 644 *.js
chmod 644 *.json

# Permissions pour les dossiers (755)
chmod 755 assets
chmod 755 pdf-worker

# Permissions pour les fichiers dans assets
cd assets
chmod 644 *
cd ..

# Permissions pour .htaccess (644)
chmod 644 .htaccess

quit
"

echo "✅ Permissions corrigées !"
echo ""
echo "🔗 Testez maintenant :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/" 