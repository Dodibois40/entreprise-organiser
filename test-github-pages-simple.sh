#!/bin/bash

# Test GitHub Pages ultra-simple
echo "🧪 Test GitHub Pages ultra-simple..."

# 1. Créer un index.html minimal qui fonctionne
echo "📝 Création index.html minimal..."
cat > docs/index.html << 'EOF'
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test CRM - GitHub Pages</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            text-align: center;
            max-width: 600px;
        }
        h1 { color: #333; margin-bottom: 20px; }
        .status { padding: 15px; margin: 20px 0; border-radius: 8px; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .btn {
            background: #007bff;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin: 10px;
        }
        .btn:hover { background: #0056b3; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🏢 CRM Entreprise Organiser</h1>
        
        <div class="status success">
            ✅ GitHub Pages fonctionne parfaitement !
        </div>
        
        <p><strong>Configuration :</strong> ✅ Déployé depuis /docs sur master</p>
        <p><strong>URL :</strong> https://Dodibois40.github.io/entreprise-organiser/</p>
        
        <button class="btn" onclick="loadFullCRM()">🚀 Charger le CRM complet</button>
        <a href="./debug-auth.html" class="btn">🔍 Debug</a>
        
        <div id="loading" style="display:none; margin-top: 20px;">
            <p>⏳ Chargement du CRM complet...</p>
        </div>
    </div>

    <script>
        function loadFullCRM() {
            document.getElementById('loading').style.display = 'block';
            
            // Test de chargement des assets
            const script = document.createElement('script');
            script.src = './assets/index-ak4EEpgl.js';
            script.type = 'module';
            
            script.onload = function() {
                alert('✅ CRM chargé avec succès !');
            };
            
            script.onerror = function() {
                alert('❌ Erreur de chargement du CRM. Vérifiez la console (F12).');
            };
            
            document.head.appendChild(script);
        }
        
        // Vérifier la disponibilité des assets
        fetch('./assets/index-ak4EEpgl.js')
            .then(response => {
                if (response.ok) {
                    document.body.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                    console.log('✅ Assets accessibles');
                } else {
                    console.error('❌ Assets non accessibles:', response.status);
                }
            })
            .catch(error => {
                console.error('❌ Erreur fetch assets:', error);
            });
    </script>
</body>
</html>
EOF

# 2. Push immédiat
echo "📤 Push test simple..."
git add docs/index.html
git commit -m "🧪 Test GitHub Pages - Version ultra-simple"
git push origin master

echo ""
echo "✅ TEST DÉPLOYÉ !"
echo ""
echo "🔗 Testez maintenant :"
echo "   https://Dodibois40.github.io/entreprise-organiser/"
echo ""
echo "📋 Ce test va :"
echo "   ✅ Confirmer que GitHub Pages fonctionne"
echo "   ✅ Tester l'accès aux assets"
echo "   ✅ Permettre le debug"
echo ""
echo "⏳ Attendre 1-2 minutes puis recharger la page" 