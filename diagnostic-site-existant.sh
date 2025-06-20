#!/bin/bash

# Script de diagnostic pour site existant
echo "🔍 Diagnostic des conflits avec site existant..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"

# 1. Créer des fichiers de diagnostic
echo "📋 Création des fichiers de diagnostic..."
mkdir -p diagnostic-site

# Test de base
cat > diagnostic-site/diagnostic-base.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Diagnostic Site Existant</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .test { background: white; margin: 10px 0; padding: 15px; border-left: 4px solid #007bff; }
        .success { border-color: #28a745; }
        .error { border-color: #dc3545; }
    </style>
</head>
<body>
    <h1>🔍 Diagnostic Site Existant</h1>
    
    <div class="test success">
        <h3>✅ Accès au sous-dossier</h3>
        <p>Ce fichier est accessible depuis /entreprise-organiser/</p>
    </div>
    
    <div class="test">
        <h3>📂 Structure détectée</h3>
        <p><strong>Chemin actuel :</strong> <span id="path"></span></p>
        <p><strong>Référent :</strong> <span id="referrer"></span></p>
        <p><strong>User Agent :</strong> <span id="userAgent"></span></p>
    </div>
    
    <div class="test">
        <h3>🔗 Tests de navigation</h3>
        <ul>
            <li><a href="../">⬆️ Retour au site principal</a></li>
            <li><a href="./">🏠 Dossier CRM actuel</a></li>
            <li><a href="test.html">📄 Test HTML simple</a></li>
        </ul>
    </div>
    
    <script>
        document.getElementById('path').textContent = window.location.pathname;
        document.getElementById('referrer').textContent = document.referrer || 'Accès direct';
        document.getElementById('userAgent').textContent = navigator.userAgent;
    </script>
</body>
</html>
EOF

# Test .htaccess
cat > diagnostic-site/test-htaccess.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test .htaccess</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .status { padding: 10px; margin: 10px 0; border-radius: 5px; }
        .ok { background: #d4edda; color: #155724; }
        .warning { background: #fff3cd; color: #856404; }
    </style>
</head>
<body>
    <h1>🔧 Test Configuration .htaccess</h1>
    
    <div class="status ok">
        <strong>✅ Fichier accessible</strong><br>
        Le .htaccess ne bloque pas l'accès aux fichiers HTML
    </div>
    
    <div class="status warning">
        <strong>⚠️ À vérifier</strong><br>
        Si vous voyez cette page, les règles de réécriture fonctionnent partiellement
    </div>
    
    <h3>🧪 Tests supplémentaires :</h3>
    <ul>
        <li><a href="inexistant">Test redirection vers fichier inexistant</a></li>
        <li><a href="app/test">Test route SPA</a></li>
        <li><a href="api/test">Test route API</a></li>
    </ul>
</body>
</html>
EOF

# Test PHP (si disponible)
cat > diagnostic-site/test-php.php << 'EOF'
<?php
header('Content-Type: text/html; charset=utf-8');
?>
<!DOCTYPE html>
<html>
<head>
    <title>Test PHP</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        .info { background: #e7f3ff; padding: 15px; margin: 10px 0; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🐘 Test PHP</h1>
    
    <div class="info">
        <h3>📊 Informations serveur :</h3>
        <p><strong>PHP Version :</strong> <?php echo phpversion(); ?></p>
        <p><strong>Serveur :</strong> <?php echo $_SERVER['SERVER_SOFTWARE'] ?? 'Non défini'; ?></p>
        <p><strong>Document Root :</strong> <?php echo $_SERVER['DOCUMENT_ROOT'] ?? 'Non défini'; ?></p>
        <p><strong>Script Name :</strong> <?php echo $_SERVER['SCRIPT_NAME'] ?? 'Non défini'; ?></p>
        <p><strong>Request URI :</strong> <?php echo $_SERVER['REQUEST_URI'] ?? 'Non défini'; ?></p>
    </div>
    
    <div class="info">
        <h3>📂 Structure de dossiers :</h3>
        <pre><?php 
        $dir = __DIR__;
        echo "Dossier actuel : $dir\n";
        echo "Contenu :\n";
        $files = scandir($dir);
        foreach($files as $file) {
            if($file != '.' && $file != '..') {
                echo "  - $file\n";
            }
        }
        ?></pre>
    </div>
    
    <div class="info">
        <h3>🔍 Variables d'environnement :</h3>
        <pre><?php
        foreach($_SERVER as $key => $value) {
            if(strpos($key, 'HTTP_') === 0 || strpos($key, 'REQUEST_') === 0) {
                echo "$key = $value\n";
            }
        }
        ?></pre>
    </div>
</body>
</html>
EOF

# Upload des fichiers de diagnostic
echo "📤 Upload des fichiers de diagnostic..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd entreprise-organiser
lcd diagnostic-site
put diagnostic-base.html
put test-htaccess.html
put test-php.php
quit
"

echo ""
echo "✅ Fichiers de diagnostic uploadés !"
echo ""
echo "🔗 URLs de diagnostic :"
echo "  • Diagnostic base : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/diagnostic-base.html"
echo "  • Test .htaccess : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-htaccess.html"
echo "  • Test PHP : https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test-php.php"
echo ""
echo "📋 Testez ces URLs pour identifier le problème exact !" 