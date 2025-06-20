#!/bin/bash

# Script de test minimal pour diagnostiquer O2Switch
echo "🔍 Test minimal O2Switch - Diagnostic approfondi..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Créer un dossier de test minimal
echo "📁 Création du dossier de test minimal..."
rm -rf test-minimal
mkdir -p test-minimal

# 2. Créer une page HTML ultra-simple
echo "🏠 Création d'une page de test ultra-simple..."
cat > test-minimal/index.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Test O2Switch</title>
</head>
<body>
    <h1>✅ Test O2Switch Réussi</h1>
    <p>Si vous voyez cette page, O2Switch fonctionne !</p>
    <p>Timestamp: <script>document.write(new Date())</script></p>
</body>
</html>
EOF

# 3. Créer un fichier .htaccess minimal
echo "🔧 Création d'un .htaccess minimal..."
cat > test-minimal/.htaccess << 'EOF'
# Configuration minimale
DirectoryIndex index.html
Options -Indexes
EOF

# 4. Créer un fichier PHP de test
echo "🐘 Création d'un test PHP..."
cat > test-minimal/test.php << 'EOF'
<?php
echo "✅ PHP fonctionne sur O2Switch !<br>";
echo "Date: " . date('Y-m-d H:i:s') . "<br>";
echo "Version PHP: " . phpversion() . "<br>";
echo "Serveur: " . $_SERVER['SERVER_NAME'] . "<br>";
?>
EOF

# 5. Créer un fichier de test JSON
echo "📄 Création d'un test JSON..."
cat > test-minimal/test.json << 'EOF'
{
    "status": "OK",
    "message": "O2Switch fonctionne",
    "timestamp": "2025-06-20"
}
EOF

# 6. Upload via FTP
echo "📤 Upload des fichiers de test..."

if command -v lftp &> /dev/null; then
    echo "Utilisation de lftp pour upload minimal..."
    lftp -c "
    set ftp:ssl-allow no
    set ssl:verify-certificate no
    open -u $FTP_USER,$FTP_PASS $FTP_HOST
    cd $REMOTE_DIR
    lcd test-minimal
    put index.html
    put .htaccess
    put test.php
    put test.json
    quit
    "
else
    echo "Utilisation de ftp standard..."
    cat > ftp_minimal.txt << EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
cd $REMOTE_DIR
lcd test-minimal
put index.html
put .htaccess
put test.php
put test.json
quit
EOF
    
    ftp -inv < ftp_minimal.txt
    rm ftp_minimal.txt
fi

echo ""
echo "✅ Test minimal déployé !"
echo ""
echo "🔗 URLs de test à vérifier dans l'ordre :"
echo "1. HTML simple : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/index.html"
echo "2. Test PHP : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test.php"
echo "3. Test JSON : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test.json"
echo ""
echo "📋 Diagnostic :"
echo "• Si HTML fonctionne = Serveur OK"
echo "• Si PHP fonctionne = PHP OK"
echo "• Si JSON fonctionne = Types MIME OK"
echo ""
echo "❌ Si toutes les pages donnent erreur 500 = Problème de configuration serveur O2Switch" 