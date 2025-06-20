#!/bin/bash

# Déploiement GitHub Pages - CRM Entreprise Organiser
echo "🚀 Déploiement GitHub Pages..."

# 1. Configuration Vite pour GitHub Pages
echo "⚙️ Configuration pour GitHub Pages..."
cd frontend

# Vite config optimisée pour GitHub Pages
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/entreprise-organiser/',
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

# Build pour GitHub Pages
echo "📦 Build pour GitHub Pages..."
rm -rf dist
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur de build ! Arrêt."
    exit 1
fi

cd ..

# 2. Préparer le dossier GitHub Pages
echo "📋 Préparation dossier GitHub Pages..."
rm -rf docs
mkdir docs
cp -r frontend/dist/* docs/

# 3. Configuration GitHub Pages
echo "⚙️ Configuration GitHub Pages..."

# Fichier CNAME (optionnel si vous avez un domaine)
# echo "votre-domaine.com" > docs/CNAME

# Fichier .nojekyll pour éviter les problèmes Jekyll
touch docs/.nojekyll

# 404.html pour SPA routing
cp docs/index.html docs/404.html

# 4. Initialiser le repo Git (si pas déjà fait)
echo "🔧 Configuration Git..."
if [ ! -d ".git" ]; then
    git init
    echo "node_modules/" > .gitignore
    echo "dist/" >> .gitignore
    echo ".env*" >> .gitignore
    echo "*.log" >> .gitignore
fi

# 5. Commit et push
echo "📤 Commit et push..."
git add .
git commit -m "🚀 Déploiement CRM sur GitHub Pages

- Interface React complète
- Gestion des affaires, achats, devis
- Optimisé pour GitHub Pages
- SPA routing configuré"

# 6. Instructions pour GitHub
echo ""
echo "✅ PRÉPARATION TERMINÉE !"
echo ""
echo "🎯 ÉTAPES SUIVANTES SUR GITHUB :"
echo ""
echo "1. 🌐 Créer un nouveau repository :"
echo "   - Aller sur : https://github.com/new"
echo "   - Nom : entreprise-organiser"
echo "   - Public ou Privé (au choix)"
echo "   - NE PAS initialiser avec README"
echo ""
echo "2. 📤 Pousser votre code :"
echo "   git remote add origin https://github.com/VOTRE-USERNAME/entreprise-organiser.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. ⚙️ Activer GitHub Pages :"
echo "   - Aller dans Settings > Pages"
echo "   - Source : Deploy from a branch"
echo "   - Branch : main"
echo "   - Folder : /docs"
echo "   - Cliquer Save"
echo ""
echo "4. ⏳ Attendre 2-5 minutes"
echo ""
echo "5. 🔗 Votre CRM sera disponible à :"
echo "   https://VOTRE-USERNAME.github.io/entreprise-organiser/"
echo ""
echo "📋 AVANTAGES GitHub Pages :"
echo "   ✅ Gratuit et illimité"
echo "   ✅ HTTPS automatique"
echo "   ✅ Support SPA avec 404.html"
echo "   ✅ Intégration Git complète"
echo "   ✅ Mises à jour automatiques"
echo ""
echo "🔄 MISES À JOUR FUTURES :"
echo "   1. Modifier votre code"
echo "   2. ./deploy-github-pages.sh"
echo "   3. git add . && git commit -m 'Mise à jour'"
echo "   4. git push"
echo "   5. GitHub Pages se met à jour automatiquement !" 