#!/bin/bash

# Diagnostic ULTIME - Fichier par fichier
echo "🔍 DIAGNOSTIC ULTIME - Identification de la cause exacte..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Créer un dossier de test minimal
echo "📁 Création du test minimal..."
rm -rf diagnostic-ultime
mkdir -p diagnostic-ultime

# 2. Test 1 : HTML ultra-simple (DOIT marcher)
echo "🧪 Test 1 : HTML ultra-simple..."
cat > diagnostic-ultime/test1-html.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test 1</title></head>
<body>
    <h1>Test 1 : HTML Simple</h1>
    <p>Si vous voyez ceci, HTML fonctionne !</p>
</body>
</html>
EOF

# 3. Test 2 : HTML avec CSS inline
echo "🧪 Test 2 : HTML avec CSS..."
cat > diagnostic-ultime/test2-css.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test 2</title>
    <style>
        body { background: #f0f8ff; font-family: Arial; padding: 20px; }
        h1 { color: #007bff; }
    </style>
</head>
<body>
    <h1>Test 2 : HTML + CSS</h1>
    <p>Si vous voyez ceci avec du style, CSS fonctionne !</p>
</body>
</html>
EOF

# 4. Test 3 : HTML avec JavaScript
echo "🧪 Test 3 : HTML avec JavaScript..."
cat > diagnostic-ultime/test3-js.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test 3</title></head>
<body>
    <h1>Test 3 : HTML + JavaScript</h1>
    <p id="result">JavaScript pas encore exécuté...</p>
    <script>
        document.getElementById('result').textContent = 'JavaScript fonctionne ! Date: ' + new Date().toLocaleString();
    </script>
</body>
</html>
EOF

# 5. Test 4 : Fichier CSS externe
echo "🧪 Test 4 : CSS externe..."
cat > diagnostic-ultime/test4.css << 'EOF'
body {
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
    color: white;
    font-family: Arial, sans-serif;
    padding: 20px;
}
h1 {
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
EOF

cat > diagnostic-ultime/test4-css-externe.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test 4</title>
    <link rel="stylesheet" href="test4.css">
</head>
<body>
    <h1>Test 4 : CSS Externe</h1>
    <p>Si vous voyez un dégradé coloré, CSS externe fonctionne !</p>
</body>
</html>
EOF

# 6. Test 5 : Fichier JavaScript externe
echo "🧪 Test 5 : JavaScript externe..."
cat > diagnostic-ultime/test5.js << 'EOF'
console.log('JavaScript externe chargé !');
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('js-result').innerHTML = 
        '<strong>JavaScript externe fonctionne !</strong><br>' +
        'Date: ' + new Date().toLocaleString();
});
EOF

cat > diagnostic-ultime/test5-js-externe.html << 'EOF'
<!DOCTYPE html>
<html>
<head>
    <title>Test 5</title>
</head>
<body>
    <h1>Test 5 : JavaScript Externe</h1>
    <div id="js-result">JavaScript externe pas encore chargé...</div>
    <script src="test5.js"></script>
</body>
</html>
EOF

# 7. Test 6 : Fichier JSON
echo "🧪 Test 6 : Fichier JSON..."
cat > diagnostic-ultime/test6.json << 'EOF'
{
    "test": "JSON fonctionne",
    "date": "2024-01-01",
    "status": "ok"
}
EOF

cat > diagnostic-ultime/test6-json.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test 6</title></head>
<body>
    <h1>Test 6 : Chargement JSON</h1>
    <div id="json-result">Chargement JSON...</div>
    <script>
        fetch('test6.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('json-result').innerHTML = 
                    'JSON chargé : ' + data.test + ' - ' + data.date;
            })
            .catch(error => {
                document.getElementById('json-result').innerHTML = 
                    'Erreur JSON : ' + error.message;
            });
    </script>
</body>
</html>
EOF

# 8. Test 7 : Gros fichier (pour tester les limites)
echo "🧪 Test 7 : Gros fichier..."
cat > diagnostic-ultime/test7-gros.html << 'EOF'
<!DOCTYPE html>
<html>
<head><title>Test 7</title></head>
<body>
    <h1>Test 7 : Gros Fichier</h1>
    <p>Ce fichier contient beaucoup de texte pour tester les limites...</p>
EOF

# Ajouter du contenu répétitif
for i in {1..100}; do
    echo "    <p>Ligne $i - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>" >> diagnostic-ultime/test7-gros.html
done

echo "</body></html>" >> diagnostic-ultime/test7-gros.html

# 9. Page d'index pour tous les tests
echo "🏠 Création de la page d'index des tests..."
cat > diagnostic-ultime/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Diagnostic Ultime</title>
    <style>
        body { font-family: Arial; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 20px; border-radius: 8px; }
        .test-link { 
            display: block; 
            padding: 10px; 
            margin: 5px 0; 
            background: #007bff; 
            color: white; 
            text-decoration: none; 
            border-radius: 4px; 
        }
        .test-link:hover { background: #0056b3; }
        .status { padding: 10px; margin: 10px 0; border-radius: 4px; }
        .success { background: #d4edda; color: #155724; }
        .error { background: #f8d7da; color: #721c24; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🔍 Diagnostic Ultime O2Switch</h1>
        
        <div class="status success">
            <strong>✅ Cette page s'affiche</strong><br>
            Donc le serveur O2Switch fonctionne partiellement !
        </div>
        
        <h2>🧪 Tests à effectuer dans l'ordre :</h2>
        
        <a href="test1-html.html" class="test-link">Test 1 : HTML Ultra-Simple</a>
        <a href="test2-css.html" class="test-link">Test 2 : HTML + CSS Inline</a>
        <a href="test3-js.html" class="test-link">Test 3 : HTML + JavaScript</a>
        <a href="test4-css-externe.html" class="test-link">Test 4 : CSS Externe</a>
        <a href="test5-js-externe.html" class="test-link">Test 5 : JavaScript Externe</a>
        <a href="test6-json.html" class="test-link">Test 6 : Chargement JSON</a>
        <a href="test7-gros.html" class="test-link">Test 7 : Gros Fichier</a>
        
        <div class="status error">
            <strong>📋 Instructions :</strong><br>
            Testez chaque lien dans l'ordre. Le premier qui ne marche pas nous dira où est le problème !
        </div>
    </div>
</body>
</html>
EOF

# 10. Upload des tests
echo "📤 Upload des tests diagnostiques..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd diagnostic-ultime
mirror --reverse --delete --verbose .
quit
"

echo ""
echo "✅ Tests diagnostiques uploadés !"
echo ""
echo "🔗 URL PRINCIPALE :"
echo "https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/"
echo ""
echo "📋 PLAN D'ACTION :"
echo "1. Testez d'abord cette URL de base"
echo "2. Si elle marche, testez les liens un par un"
echo "3. Notez le PREMIER test qui échoue"
echo "4. Ça nous dira exactement où est le problème !"
echo ""
echo "🚨 Si même l'URL de base ne marche pas :"
echo "   → Problème de configuration serveur O2Switch"
echo "   → Il faut contacter leur support technique" 