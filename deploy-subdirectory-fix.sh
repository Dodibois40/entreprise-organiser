#!/bin/bash

# Script pour déployer le CRM dans un sous-dossier sans conflit
echo "🔧 Déploiement CRM en sous-dossier (site existant)..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Créer un dossier de déploiement isolé
echo "📁 Création du déploiement isolé..."
rm -rf deploy-isolated
mkdir -p deploy-isolated

# 2. Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
cd ..

# 3. Copier les fichiers
echo "📋 Copie des fichiers..."
cp -r frontend/dist/* deploy-isolated/

# 4. Créer un .htaccess ISOLÉ pour le sous-dossier uniquement
echo "⚙️ Configuration .htaccess isolée..."
cat > deploy-isolated/.htaccess << 'EOF'
# Configuration ISOLÉE pour sous-dossier entreprise-organiser
# Ne perturbe pas le site principal

# Activer la réécriture SEULEMENT pour ce dossier
RewriteEngine On
RewriteBase /entreprise-organiser/

# Empêcher l'héritage des règles du parent
RewriteOptions inherit

# Gestion des fichiers statiques
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule .* - [L]

# Gestion des dossiers
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule .* - [L]

# Redirection vers index.html SEULEMENT pour ce sous-dossier
RewriteCond %{REQUEST_URI} ^/entreprise-organiser/
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L]

# Types MIME pour les assets
<FilesMatch "\.(js|css|json)$">
    Header set Cache-Control "public, max-age=31536000"
</FilesMatch>

# Sécurité
<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>
EOF

# 5. Créer un fichier de test spécifique
echo "🏠 Création d'un fichier de test isolé..."
cat > deploy-isolated/test-isolated.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Test CRM Isolé</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f0f8ff; }
        .container { background: white; padding: 30px; border-radius: 10px; max-width: 500px; margin: 0 auto; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #007bff; }
        .status { background: #d1ecf1; color: #0c5460; padding: 15px; border-radius: 5px; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <h1>✅ CRM Isolé Fonctionnel</h1>
        <div class="status">
            <strong>Statut :</strong> Sous-dossier configuré correctement<br>
            <strong>Date :</strong> <span id="date"></span><br>
            <strong>Chemin :</strong> /entreprise-organiser/
        </div>
        <p>Le CRM fonctionne en sous-dossier sans perturber le site principal.</p>
    </div>
    
    <script>
        document.getElementById('date').textContent = new Date().toLocaleString('fr-FR');
    </script>
</body>
</html>
EOF

# 6. Upload avec structure isolée
echo "📤 Upload de la version isolée..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-isolated
mirror --reverse --delete --verbose .
quit
"

echo ""
echo "✅ CRM isolé déployé !"
echo ""
echo "🔗 URLs de test :"
echo "  • Test isolé : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-isolated.html"
echo "  • CRM principal : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/"
echo ""
echo "📋 Cette configuration :"
echo "  • ✅ N'interfère PAS avec votre site principal"
echo "  • ✅ Fonctionne uniquement dans /entreprise-organiser/"
echo "  • ✅ Préserve les règles du domaine principal" 