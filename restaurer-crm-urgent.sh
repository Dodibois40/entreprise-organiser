#!/bin/bash

echo "🔄 RESTAURATION URGENTE du CRM..."

# Configuration FTP
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

# Reconstruire le frontend
echo "📦 Reconstruction..."
cd frontend && npm run build && cd ..

# Créer dossier de restauration
rm -rf restore && mkdir restore

# Copier les fichiers
cp -r frontend/dist/* restore/

# .htaccess minimal
cat > restore/.htaccess << 'EOF'
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]
EOF

# Upload
echo "📤 Upload de restauration..."
lftp -c "
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd entreprise-organiser
lcd restore
mirror --reverse --verbose .
quit
"

echo "✅ CRM RESTAURÉ !"
echo "URL: https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/" 