#!/bin/bash

# Test dans un autre dossier
echo "🧪 Test dans un autre dossier..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

# Créer un fichier de test ultra-simple
mkdir -p test-autre-dossier
cat > test-autre-dossier/test-simple.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test Autre Dossier</title></head>
<body>
    <h1>Test dans un autre dossier</h1>
    <p>Si cette page s'affiche, le problème est spécifique au dossier entreprise-organiser !</p>
    <p>Date : <script>document.write(new Date().toLocaleString());</script></p>
</body>
</html>
EOF

# Upload dans un dossier différent
echo "📤 Upload dans le dossier 'test-crm'..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
mkdir -p test-crm
cd test-crm
lcd test-autre-dossier
put test-simple.html
quit
"

echo ""
echo "✅ Test uploadé dans un autre dossier !"
echo ""
echo "🔗 URL de test :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/test-crm/test-simple.html"
echo ""
echo "📋 Si cette URL marche :"
echo "  → Le problème est spécifique au dossier 'entreprise-organiser'"
echo "  → Il y a peut-être un fichier caché qui pose problème"
echo ""
echo "📋 Si cette URL ne marche pas non plus :"
echo "  → Problème général sur votre hébergement O2Switch"
echo "  → Contactez absolument le support technique" 