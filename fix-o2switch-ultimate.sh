#!/bin/bash

# Solution ultime pour O2Switch
echo "🚨 Solution ultime pour O2Switch..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

cd deploy-fixed

# 1. Renommer les fichiers .js en .txt
echo "📝 Renommage des fichiers JS..."
mv assets/index.js assets/index.txt
mv assets/pdf.worker-DxB4owEd.js assets/pdf.worker-DxB4owEd.txt

# 2. Modifier l'index.html pour charger les .txt comme JS
echo "🔧 Modification index.html..."
sed -i 's/assets\/index\.js/assets\/index.txt/g' index.html
sed -i 's/assets\/pdf\.worker-DxB4owEd\.js/assets\/pdf.worker-DxB4owEd.txt/g' index.html

# 3. Créer un .htaccess qui traite les .txt comme du JS
echo "⚙️ .htaccess pour .txt comme JS..."
cat > .htaccess << 'EOF'
# Configuration O2Switch - Fichiers .txt comme JavaScript
AddType application/javascript .txt
AddType text/css .css

# Headers pour les fichiers .txt
<FilesMatch "\.txt$">
    Header set Content-Type "application/javascript"
</FilesMatch>

RewriteEngine On
RewriteBase /entreprise-organiser/

# Fichiers statiques
RewriteRule ^assets/ - [L]
RewriteRule \.(txt|css|json|svg|png|jpg|jpeg|gif|ico)$ - [L]

# SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.html [L]
EOF

cd ..

# 4. Upload de la solution ultime
echo "📤 Déploiement solution ultime..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-fixed
mirror --reverse --delete --verbose .
quit
"

echo ""
echo "✅ Solution ultime déployée !"
echo ""
echo "🧪 Test des fichiers .txt..."
sleep 2
curl -I "https://www.lamanufacturedubois.com/entreprise-organiser/assets/index.txt" 2>/dev/null | head -5

echo ""
echo "🔄 VIDEZ LE CACHE et testez :"
echo "https://www.lamanufacturedubois.com/entreprise-organiser/" 