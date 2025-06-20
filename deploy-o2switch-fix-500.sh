#!/bin/bash

# Script spécialisé pour corriger les erreurs 500 sur O2Switch
echo "🚨 Correction des erreurs 500 sur O2Switch..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Nettoyer complètement le dossier deploy
echo "🧹 Nettoyage complet..."
rm -rf deploy
mkdir -p deploy

# 2. Construire le frontend avec configuration fixe
echo "📦 Construction du frontend..."
cd frontend
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erreur lors de la construction du frontend"
    exit 1
fi
cd ..

# 3. Copier le frontend vers deploy
echo "📁 Copie du frontend..."
cp -r frontend/dist/* deploy/

# 4. Créer un fichier .htaccess simplifié pour O2Switch
echo "🔧 Création du .htaccess simplifié..."
cat > deploy/.htaccess << 'EOF'
# Configuration simplifiée pour O2Switch
RewriteEngine On

# Configuration pour React Router (SPA)
RewriteBase /entreprise-organiser/
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /entreprise-organiser/index.html [L]

# Types MIME
AddType application/javascript .js
AddType text/css .css
AddType application/json .json

# Headers de sécurité
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
EOF

# 5. Créer une page d'accueil de test
echo "🏠 Création d'une page de test..."
cat > deploy/test.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test - Entreprise Organiser</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
        .container { background: white; padding: 40px; border-radius: 10px; max-width: 600px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #28a745; }
        .status { background: #d4edda; color: #155724; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ Test de Connexion O2Switch</h1>
        <div class="status">
            <strong>Statut :</strong> Serveur fonctionnel<br>
            <strong>Date :</strong> <span id="date"></span><br>
            <strong>URL :</strong> <span id="url"></span>
        </div>
        <p>Si vous voyez cette page, votre serveur O2Switch fonctionne correctement.</p>
        <a href="/entreprise-organiser/" class="btn">Accéder au CRM</a>
        <a href="/entreprise-organiser/index.html" class="btn">Index Direct</a>
    </div>
    
    <script>
        document.getElementById('date').textContent = new Date().toLocaleString('fr-FR');
        document.getElementById('url').textContent = window.location.href;
    </script>
</body>
</html>
EOF

# 6. Créer un index.php de diagnostic
echo "🔍 Création d'un fichier de diagnostic PHP..."
cat > deploy/diagnostic.php << 'EOF'
<?php
header('Content-Type: application/json');

$diagnostic = [
    'status' => 'OK',
    'timestamp' => date('Y-m-d H:i:s'),
    'server' => $_SERVER['SERVER_NAME'] ?? 'Unknown',
    'php_version' => phpversion(),
    'document_root' => $_SERVER['DOCUMENT_ROOT'] ?? 'Unknown',
    'script_name' => $_SERVER['SCRIPT_NAME'] ?? 'Unknown',
    'request_uri' => $_SERVER['REQUEST_URI'] ?? 'Unknown',
    'method' => $_SERVER['REQUEST_METHOD'] ?? 'Unknown',
    'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown'
];

echo json_encode($diagnostic, JSON_PRETTY_PRINT);
?>
EOF

# 7. Créer des pages d'erreur personnalisées
echo "📄 Création des pages d'erreur..."
cat > deploy/error500.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Erreur 500 - Entreprise Organiser</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f8f9fa; }
        .error-container { background: white; padding: 40px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #dc3545; }
        p { color: #666; margin: 20px 0; }
        .btn { background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 20px; }
        .debug { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; font-family: monospace; font-size: 12px; }
    </style>
</head>
<body>
    <div class="error-container">
        <h1>🚧 Erreur 500</h1>
        <p>Une erreur interne du serveur s'est produite.</p>
        <p>Nous travaillons à résoudre ce problème.</p>
        <div class="debug">
            <strong>Debug Info:</strong><br>
            Timestamp: <span id="timestamp"></span><br>
            URL: <span id="current-url"></span>
        </div>
        <a href="/entreprise-organiser/test.html" class="btn">Page de Test</a>
        <a href="/entreprise-organiser/" class="btn">Réessayer</a>
    </div>
    
    <script>
        document.getElementById('timestamp').textContent = new Date().toISOString();
        document.getElementById('current-url').textContent = window.location.href;
    </script>
</body>
</html>
EOF

# 8. Upload via FTP avec gestion d'erreurs améliorée
echo "📤 Upload des fichiers vers O2Switch..."

# Vérifier si lftp est disponible
if command -v lftp &> /dev/null; then
    echo "Utilisation de lftp..."
    lftp -c "
    set ftp:ssl-allow no
    set ssl:verify-certificate no
    open -u $FTP_USER,$FTP_PASS $FTP_HOST
    cd $REMOTE_DIR
    lcd deploy
    mirror --reverse --delete --verbose .
    quit
    "
else
    echo "lftp non disponible, utilisation de ftp..."
    # Créer un fichier de commandes FTP
    cat > ftp_upload.txt << EOF
open $FTP_HOST
user $FTP_USER $FTP_PASS
cd $REMOTE_DIR
lcd deploy
prompt off
mput *
put test.html
put diagnostic.php
put error500.html
put .htaccess
quit
EOF
    
    ftp -inv < ftp_upload.txt
    rm ftp_upload.txt
fi

echo ""
echo "✅ Déploiement terminé !"
echo ""
echo "🔗 URLs de test :"
echo "  • Page principale : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/"
echo "  • Page de test : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test.html"
echo "  • Diagnostic : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/diagnostic.php"
echo ""
echo "📋 Si l'erreur 500 persiste :"
echo "1. Vérifiez la page de test en premier"
echo "2. Consultez le diagnostic PHP"
echo "3. Contactez le support O2Switch si nécessaire" 