#!/bin/bash

# Déploiement Netlify corrigé - Version 2.0
echo "🚀 Déploiement Netlify CORRIGÉ..."

# 1. Vérifier que le build fonctionne
echo "🔧 Vérification du build..."
cd frontend

# Restaurer la config Vite originale (sans les problèmes)
echo "⚙️ Configuration Vite pour Netlify..."
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['lucide-react']
        }
      }
    }
  },
  server: {
    port: 3000
  },
  optimizeDeps: {
    include: ['react-pdf']
  }
})
EOF

# Build propre
echo "📦 Build pour Netlify..."
rm -rf dist node_modules/.vite
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur de build ! Arrêt."
    exit 1
fi

cd ..

# 2. Préparer le package Netlify
echo "📋 Préparation package Netlify..."
rm -rf netlify-deploy-fixed
mkdir netlify-deploy-fixed
cp -r frontend/dist/* netlify-deploy-fixed/

# 3. Configuration Netlify spécifique
echo "⚙️ Configuration Netlify..."

# _redirects pour SPA
cat > netlify-deploy-fixed/_redirects << 'EOF'
# Redirections pour SPA React
/* /index.html 200
EOF

# netlify.toml pour optimisation
cat > netlify-deploy-fixed/netlify.toml << 'EOF'
[build]
  publish = "."

[[headers]]
  for = "/*.js"
  [headers.values]
    Content-Type = "application/javascript"
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.css"
  [headers.values]
    Content-Type = "text/css"
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
EOF

# 4. Créer l'archive pour Netlify Drop
echo "📦 Création archive Netlify..."
cd netlify-deploy-fixed
zip -r ../crm-netlify-fixed.zip . -x "*.DS_Store" "*.git*"
cd ..

# 5. Statistiques
echo ""
echo "📊 STATISTIQUES :"
echo "   📁 Taille archive : $(du -h crm-netlify-fixed.zip | cut -f1)"
echo "   📄 Fichiers : $(find netlify-deploy-fixed -type f | wc -l)"
echo ""

echo "✅ PACKAGE NETLIFY PRÊT !"
echo ""
echo "🎯 ÉTAPES SUIVANTES :"
echo ""
echo "1. 🌐 Aller sur : https://app.netlify.com/drop"
echo ""
echo "2. 📤 Glisser-déposer le fichier :"
echo "   📁 $(pwd)/crm-netlify-fixed.zip"
echo ""
echo "3. ⏳ Attendre le déploiement (30-60 secondes)"
echo ""
echo "4. 🔗 Récupérer votre URL Netlify"
echo ""
echo "📋 AVANTAGES de cette version :"
echo "   ✅ Configuration optimisée pour Netlify"
echo "   ✅ Headers MIME corrects"
echo "   ✅ Routage SPA fonctionnel"
echo "   ✅ Compression et cache optimisés"
echo ""
echo "🆘 SI PROBLÈME :"
echo "   - Vérifiez la console du navigateur"
echo "   - Testez en navigation privée"
echo "   - Contactez-moi avec l'URL Netlify" 