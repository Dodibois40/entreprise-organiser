#!/bin/bash

# Suppression des redirections automatiques O2Switch
echo "🔍 Recherche et suppression des redirections automatiques..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

echo "📋 Recherche des fichiers de redirection..."

# 1. Vérifier le .htaccess dans le répertoire racine
echo "🔍 Vérification du .htaccess racine..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
get .htaccess htaccess-racine.txt 2>/dev/null || echo 'Pas de .htaccess racine'
quit
"

# 2. Vérifier les redirections dans le dossier public_html
echo "🔍 Vérification du dossier public_html..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd public_html 2>/dev/null || echo 'Pas de dossier public_html'
get .htaccess htaccess-public.txt 2>/dev/null || echo 'Pas de .htaccess dans public_html'
quit
"

# 3. Lister tous les fichiers à la racine
echo "📁 Liste des fichiers à la racine..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
ls -la > liste-fichiers-racine.txt
quit
"

# 4. Créer un .htaccess de nettoyage pour la racine
echo "🧹 Création d'un .htaccess de nettoyage..."
cat > htaccess-clean.txt << 'EOF'
# .htaccess nettoyé - Suppression des redirections automatiques
# CRM Entreprise - O2Switch

# Pas de redirection automatique vers le domaine principal
# RewriteEngine Off (temporairement pour tester)

# Types MIME de base seulement
AddType text/html .html
AddType text/css .css
AddType application/javascript .js
AddType application/json .json

# Pas de règles de redirection
EOF

# 5. Vérifier s'il y a des redirections dans le sous-domaine
echo "🔍 Test de redirection sur le sous-domaine..."
curl -I "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/" > test-redirection.txt 2>&1 || echo "Erreur de connexion"

echo ""
echo "📋 DIAGNOSTIC DES REDIRECTIONS :"
echo ""

# Afficher les résultats
if [ -f "htaccess-racine.txt" ]; then
    echo "📄 Contenu du .htaccess racine :"
    cat htaccess-racine.txt
    echo ""
fi

if [ -f "htaccess-public.txt" ]; then
    echo "📄 Contenu du .htaccess public_html :"
    cat htaccess-public.txt
    echo ""
fi

if [ -f "test-redirection.txt" ]; then
    echo "🔍 Headers de redirection :"
    cat test-redirection.txt
    echo ""
fi

echo "📋 SOLUTIONS POSSIBLES :"
echo ""
echo "1️⃣ SUPPRIMER LE .htaccess RACINE :"
echo "   lftp -c \"open -u $FTP_USER,$FTP_PASS $FTP_HOST; rm .htaccess; quit\""
echo ""
echo "2️⃣ REMPLACER PAR UN .htaccess PROPRE :"
echo "   lftp -c \"open -u $FTP_USER,$FTP_PASS $FTP_HOST; put htaccess-clean.txt .htaccess; quit\""
echo ""
echo "3️⃣ VÉRIFIER L'ESPACE CLIENT O2SWITCH :"
echo "   → Redirections de domaine"
echo "   → Alias de domaine"
echo "   → Configuration DNS"
echo ""

# 6. Option de suppression automatique
echo "🤖 Voulez-vous supprimer automatiquement le .htaccess racine ? (y/n)"
read -r response
if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "🗑️ Suppression du .htaccess racine..."
    lftp -c "
    set ftp:ssl-allow no
    set ssl:verify-certificate no
    open -u $FTP_USER,$FTP_PASS $FTP_HOST
    rm .htaccess
    quit
    "
    echo "✅ .htaccess racine supprimé !"
    echo "🔗 Testez maintenant : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-reset.html"
fi 