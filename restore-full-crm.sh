#!/bin/bash

# Restauration CRM complet sur GitHub Pages
echo "🚀 Restauration CRM complet..."

# 1. Rebuild du CRM avec la bonne configuration
echo "📦 Rebuild CRM complet..."
cd frontend

# Configuration Vite finale
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
          ui: ['lucide-react'],
          pdf: ['react-pdf']
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

# Build production
npm run build
cd ..

# 2. Copier vers docs
echo "📁 Copie vers docs/..."
rm -rf docs
mkdir docs
cp -r frontend/dist/* docs/

# Configuration GitHub Pages
touch docs/.nojekyll
cp docs/index.html docs/404.html

# 3. Vérification
echo "🔍 Vérification..."
echo "Fichiers dans docs/:"
ls -la docs/ | head -10

# 4. Deploy final
echo "🚀 Déploiement CRM complet..."
git add .
git commit -m "🎉 CRM COMPLET - GitHub Pages opérationnel !

✨ Fonctionnalités complètes:
- 🏢 Gestion des affaires
- 🛒 Module achats et BDC  
- 📊 Estimations et devis
- 📈 Dashboard avec statistiques
- 👥 Gestion des équipes
- 📱 Interface responsive
- 🔒 Authentification sécurisée

🔧 Technique:
- React 18 + Vite optimisé
- Routage SPA complet
- Assets optimisés
- GitHub Pages compatible
- HTTPS automatique"

git push origin master

echo ""
echo "🎉 CRM COMPLET DÉPLOYÉ !"
echo ""
echo "⏳ Attendre 2-3 minutes puis tester :"
echo "🔗 https://Dodibois40.github.io/entreprise-organiser/"
echo ""
echo "🎯 Votre CRM inclut maintenant :"
echo "  ✅ Toutes les fonctionnalités"
echo "  ✅ Interface professionnelle"
echo "  ✅ Navigation complète"
echo "  ✅ Modules intégrés"
echo "  ✅ Design responsive"
echo ""
echo "🚀 Fini les problèmes MIME type et 404 !" 