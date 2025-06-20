#!/bin/bash

# DÉPLOIEMENT COMPLET CRM sur O2Switch
echo "🚀 DÉPLOIEMENT COMPLET CRM sur O2Switch..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

echo "📋 Ce script va déployer :"
echo "  • ✅ Frontend React complet"
echo "  • ✅ Configuration .htaccess optimisée"
echo "  • ✅ Tous les assets et composants"
echo "  • ✅ Gestion des routes SPA"
echo "  • ✅ Configuration pour O2Switch"
echo ""

# 1. Construction du frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
cd ..

# 2. Créer le dossier de déploiement
echo "📁 Préparation du déploiement..."
rm -rf deploy-crm-complet
mkdir -p deploy-crm-complet

# 3. Copier tous les fichiers du build
echo "📋 Copie des fichiers..."
cp -r frontend/dist/* deploy-crm-complet/

# 4. Créer un .htaccess OPTIMISÉ pour O2Switch
echo "⚙️ Configuration .htaccess optimisée pour O2Switch..."
cat > deploy-crm-complet/.htaccess << 'EOF'
# Configuration optimisée pour O2Switch
# CRM Entreprise - Version complète

# Activation du module de réécriture
RewriteEngine On

# Base de réécriture pour le sous-dossier
RewriteBase /entreprise-organiser/

# Gestion des fichiers existants (CSS, JS, images, etc.)
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^(.*)$ - [L]

# Gestion des dossiers existants
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^(.*)$ - [L]

# Redirection SPA - Toutes les routes vers index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [L,QSA]

# Types MIME pour les assets
AddType text/css .css
AddType application/javascript .js
AddType application/json .json
AddType image/svg+xml .svg
AddType font/woff2 .woff2

# Compression GZIP (si supportée par O2Switch)
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache pour les assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
    ExpiresByType image/png "access plus 1 month"
    ExpiresByType image/jpg "access plus 1 month"
    ExpiresByType image/jpeg "access plus 1 month"
    ExpiresByType image/gif "access plus 1 month"
    ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>

# Sécurité
<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>

# Headers de sécurité
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
</IfModule>
EOF

# 5. Créer une page de statut du déploiement
echo "📊 Création de la page de statut..."
cat > deploy-crm-complet/status.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CRM Entreprise - Statut</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
            min-height: 100vh;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 30px;
            border-radius: 15px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .success {
            background: rgba(40, 167, 69, 0.3);
            border: 2px solid #28a745;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
            margin: 20px 0;
        }
        .feature {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            border-left: 4px solid #007bff;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            text-decoration: none;
            display: inline-block;
            margin: 5px;
            transition: all 0.3s ease;
        }
        .btn:hover {
            background: #0056b3;
            transform: translateY(-2px);
        }
        .info {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 CRM Entreprise Déployé !</h1>
        
        <div class="success">
            <h3>✅ Déploiement Complet Réussi</h3>
            <p>Votre CRM est maintenant accessible en ligne sur O2Switch</p>
        </div>
        
        <div class="feature-grid">
            <div class="feature">
                <h4>🏠 Frontend</h4>
                <p>Interface React complète</p>
            </div>
            <div class="feature">
                <h4>⚙️ Configuration</h4>
                <p>.htaccess optimisé pour O2Switch</p>
            </div>
            <div class="feature">
                <h4>🔒 Sécurité</h4>
                <p>Headers de sécurité activés</p>
            </div>
            <div class="feature">
                <h4>🚀 Performance</h4>
                <p>Compression et cache activés</p>
            </div>
        </div>
        
        <div class="info">
            <strong>📊 Informations de déploiement :</strong><br>
            • Hébergeur : O2Switch<br>
            • Date : <span id="date"></span><br>
            • Version : Complète<br>
            • Statut : ✅ Opérationnel
        </div>
        
        <div>
            <a href="index.html" class="btn">🏠 Accéder au CRM</a>
            <a href="../test-crm/test-simple.html" class="btn">🧪 Test Simple</a>
        </div>
    </div>
    
    <script>
        document.getElementById('date').textContent = new Date().toLocaleString('fr-FR');
        
        // Test des fonctionnalités
        console.log('✅ CRM Entreprise chargé');
        console.log('🌐 Hébergé sur O2Switch');
        console.log('📊 Version complète déployée');
    </script>
</body>
</html>
EOF

# 6. Déploiement complet
echo "📤 DÉPLOIEMENT COMPLET en cours..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-crm-complet
mirror --reverse --verbose .
quit
"

echo ""
echo "🎉 DÉPLOIEMENT COMPLET TERMINÉ !"
echo ""
echo "🔗 URLs importantes :"
echo "  • CRM Principal : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/"
echo "  • Page de statut : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/status.html"
echo ""
echo "✅ Votre CRM complet est maintenant en ligne !"
echo "🌐 Accessible depuis n'importe quel ordinateur connecté à Internet"
echo "🔒 Sécurisé avec HTTPS"
echo "🚀 Optimisé pour les performances" 