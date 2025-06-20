#!/bin/bash

# Mise à jour GitHub Pages - Repository existant
echo "🚀 Mise à jour GitHub Pages pour repository existant..."

# Configuration pour le repository existant
GITHUB_USER="Dodibois40"
GITHUB_EMAIL="dorianlacanau@gmail.com"
GITHUB_REPO="entreprise-organiser"

# 1. Configurer Git si nécessaire
echo "⚙️ Configuration Git..."
git config user.name "$GITHUB_USER"
git config user.email "$GITHUB_EMAIL"

# 2. Vérifier la remote origin
echo "🔗 Vérification remote origin..."
if git remote get-url origin >/dev/null 2>&1; then
    echo "✅ Remote origin déjà configurée"
    git remote -v
else
    echo "📎 Ajout remote origin..."
    git remote add origin https://github.com/$GITHUB_USER/$GITHUB_REPO.git
fi

# 3. Configuration Vite pour GitHub Pages
echo "⚙️ Configuration Vite pour GitHub Pages..."
cd frontend

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

# 4. Build pour GitHub Pages
echo "📦 Build optimisé pour GitHub Pages..."
rm -rf dist
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur de build ! Arrêt."
    exit 1
fi

cd ..

# 5. Mettre à jour le dossier docs
echo "📋 Mise à jour dossier docs..."
rm -rf docs
mkdir docs
cp -r frontend/dist/* docs/

# Configuration GitHub Pages
touch docs/.nojekyll
cp docs/index.html docs/404.html

# 6. Commit et push vers le repository existant
echo "📤 Push vers GitHub..."

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "🚀 Mise à jour CRM pour GitHub Pages

✨ Nouvelles fonctionnalités:
- Interface React optimisée
- Gestion complète des affaires
- Module achats et BDC
- Estimation et devis
- Dashboard avec statistiques
- Design responsive
- Configuration GitHub Pages

🔧 Corrections:
- Types MIME JavaScript
- Routage SPA
- Optimisation des performances
- Compression des assets

📱 Compatibilité:
- GitHub Pages complète
- HTTPS automatique
- Mobile responsive"

# Push vers GitHub
echo "📤 Push vers le repository..."
git push origin main

if [ $? -ne 0 ]; then
    echo "🔄 Tentative avec master..."
    git push origin master
fi

echo ""
echo "✅ MISE À JOUR TERMINÉE !"
echo ""
echo "🎯 PROCHAINES ÉTAPES :"
echo ""
echo "1. 🌐 Aller sur votre repository :"
echo "   https://github.com/$GITHUB_USER/$GITHUB_REPO"
echo ""
echo "2. ⚙️ Activer GitHub Pages :"
echo "   - Cliquer sur Settings"
echo "   - Aller dans Pages (menu de gauche)"
echo "   - Source : Deploy from a branch"
echo "   - Branch : main (ou master)"
echo "   - Folder : /docs"
echo "   - Cliquer Save"
echo ""
echo "3. ⏳ Attendre 2-5 minutes"
echo ""
echo "4. 🔗 Votre CRM sera disponible à :"
echo "   https://$GITHUB_USER.github.io/$GITHUB_REPO/"
echo ""
echo "📊 STATISTIQUES :"
echo "   📁 Fichiers dans docs/ : $(find docs -type f | wc -l)"
echo "   📦 Taille totale : $(du -sh docs | cut -f1)"
echo ""
echo "🔄 MISES À JOUR FUTURES :"
echo "   1. Modifier votre code"
echo "   2. ./deploy-github-pages-update.sh"
echo "   3. Les changements apparaîtront automatiquement !" 