#!/bin/bash

# RESET COMPLET O2Switch - Repartir à zéro
echo "🧹 RESET COMPLET O2Switch - Repartir à zéro..."

# Configuration O2Switch
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

echo "🔥 SUPPRESSION TOTALE de tous les fichiers..."
echo "⚠️  Ceci va SUPPRIMER TOUT dans le dossier entreprise-organiser"
echo "📋 Appuyez sur ENTRÉE pour continuer ou CTRL+C pour annuler..."
read

# Suppression complète du dossier
echo "🗑️ Suppression du dossier entreprise-organiser..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
rm -rf entreprise-organiser
quit
"

# Recréation du dossier vide
echo "📁 Création d'un dossier vide..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
mkdir entreprise-organiser
quit
"

# Test de base - fichier HTML ultra-simple
echo "🧪 Test de base - fichier HTML simple..."
mkdir -p test-reset
cat > test-reset/test-reset.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test Reset O2Switch</title></head>
<body>
    <h1>✅ O2Switch Reset Réussi</h1>
    <p>Le serveur fonctionne parfaitement !</p>
    <p>Date : <script>document.write(new Date().toLocaleString());</script></p>
</body>
</html>
EOF

# Upload du test
echo "📤 Upload du test de base..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd entreprise-organiser
lcd test-reset
put test-reset.html
quit
"

echo ""
echo "✅ RESET COMPLET TERMINÉ !"
echo ""
echo "🔗 Testez cette URL :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-reset.html"
echo ""
echo "📋 Si cette URL marche :"
echo "  • ✅ O2Switch fonctionne parfaitement"
echo "  • ✅ On peut déployer le CRM complet"
echo "  • ✅ Le problème était les anciens fichiers"
echo ""
echo "🚀 Prêt pour le déploiement du CRM complet !" 