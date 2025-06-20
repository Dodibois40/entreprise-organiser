#!/bin/bash

# Script de déploiement simplifié pour O2Switch
echo "🚀 Déploiement simplifié sur O2Switch..."

# Configuration FTP
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du frontend"
    exit 1
fi
cd ..

# 2. Construire le backend
echo "📦 Construction du backend..."
cd backend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du backend"
    exit 1
fi
cd ..

# 3. Créer un fichier de commandes FTP
cat > ftp_commands.txt << EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
cd $REMOTE_DIR
lcd frontend/dist
mput *
prompt
mput *
cd ..
lcd ../../backend/dist
mkdir backend
cd backend
mput *
prompt
mput *
quit
EOF

echo "🌐 Upload des fichiers vers O2Switch..."
ftp -n < ftp_commands.txt

# Nettoyage
rm ftp_commands.txt

echo "✅ Upload terminé ! Vérifiez votre hébergement O2Switch." 