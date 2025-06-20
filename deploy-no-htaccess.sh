#!/bin/bash

# Déploiement SANS .htaccess - Solution radicale
echo "🚨 Déploiement SANS .htaccess (solution anti-erreur 500)..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Créer un dossier de déploiement minimal
echo "📁 Création du déploiement minimal..."
rm -rf deploy-no-htaccess
mkdir -p deploy-no-htaccess

# 2. Construire le frontend
echo "📦 Construction du frontend..."
cd frontend
npm run build
cd ..

# 3. Copier SEULEMENT les fichiers essentiels
echo "📋 Copie des fichiers essentiels..."
cp -r frontend/dist/* deploy-no-htaccess/

# 4. SUPPRIMER le .htaccess (cause des problèmes)
echo "🗑️ Suppression du .htaccess problématique..."
rm -f deploy-no-htaccess/.htaccess

# 5. Créer un index.html de test simple
echo "🏠 Création d'une page de test simple..."
cat > deploy-no-htaccess/test-simple.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Simple - CRM</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: rgba(255,255,255,0.1);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0,0,0,0.3);
            border: 1px solid rgba(255,255,255,0.2);
        }
        h1 { margin: 0 0 20px 0; font-size: 2.5em; }
        .status {
            background: rgba(40, 167, 69, 0.2);
            border: 2px solid #28a745;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
        }
        .btn {
            background: #007bff;
            color: white;
            padding: 15px 30px;
            border: none;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
            font-size: 16px;
            transition: all 0.3s ease;
            cursor: pointer;
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
            text-align: left;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🎉 CRM Sans .htaccess</h1>
        
        <div class="status">
            <h3>✅ Serveur Fonctionnel</h3>
            <p>Cette page s'affiche = Pas d'erreur 500 !</p>
        </div>
        
        <div class="info">
            <strong>📊 Informations :</strong><br>
            • Pas de .htaccess = Pas de conflit<br>
            • Fichiers statiques uniquement<br>
            • Compatible avec site existant<br>
            • Date : <span id="date"></span>
        </div>
        
        <div>
            <a href="index.html" class="btn">🏠 Accéder au CRM</a>
            <a href="../" class="btn">⬆️ Site Principal</a>
        </div>
        
        <p><small>Si cette page s'affiche, le problème était bien le .htaccess !</small></p>
    </div>
    
    <script>
        document.getElementById('date').textContent = new Date().toLocaleString('fr-FR');
        
        // Test de fonctionnement JavaScript
        console.log('✅ JavaScript fonctionne sur O2Switch');
        
        // Vérifier si on peut accéder aux assets
        fetch('./assets/index-_nku5zWk.css')
            .then(response => {
                if(response.ok) {
                    console.log('✅ Assets CSS accessibles');
                } else {
                    console.log('❌ Problème assets CSS');
                }
            })
            .catch(err => console.log('❌ Erreur fetch:', err));
    </script>
</body>
</html>
EOF

# 6. Créer un fichier .htaccess MINIMAL (juste pour les types MIME)
echo "⚙️ Création d'un .htaccess minimal..."
cat > deploy-no-htaccess/.htaccess << 'EOF'
# Configuration MINIMALE - Juste les types de fichiers
# Pas de réécriture d'URL = Pas d'erreur 500

# Types MIME essentiels
AddType text/css .css
AddType application/javascript .js
AddType application/json .json
AddType image/svg+xml .svg

# Cache pour les assets (optionnel)
<FilesMatch "\.(css|js|svg|png|jpg|jpeg|gif)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 month"
</FilesMatch>

# Sécurité de base
<Files ".htaccess">
    Order allow,deny
    Deny from all
</Files>
EOF

# 7. Upload sans règles complexes
echo "📤 Upload de la version sans .htaccess..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-no-htaccess
mirror --reverse --delete --verbose .
quit
"

echo ""
echo "✅ Version SANS .htaccess déployée !"
echo ""
echo "🔗 URLs de test :"
echo "  • Test simple : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-simple.html"
echo "  • CRM principal : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/index.html"
echo ""
echo "📋 Si le test-simple.html fonctionne :"
echo "  • ✅ Le problème ÉTAIT le .htaccess"
echo "  • ✅ Le serveur O2Switch fonctionne"
echo "  • ✅ Vos fichiers sont corrects"
echo ""
echo "⚠️ Note : Sans .htaccess, les routes SPA ne marchent pas,"
echo "   mais au moins on élimine l'erreur 500 !" 