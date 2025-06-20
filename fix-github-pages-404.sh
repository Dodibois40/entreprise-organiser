#!/bin/bash

# Correction erreur 404 GitHub Pages
echo "🔧 Correction erreur 404 GitHub Pages..."

# 1. Corriger la configuration Vite
echo "⚙️ Correction configuration Vite..."
cd frontend

# Configuration Vite corrigée pour GitHub Pages
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',  // Chemin relatif au lieu d'absolu
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

echo "📦 Rebuild avec configuration corrigée..."
rm -rf dist
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erreur de build ! Arrêt."
    exit 1
fi

cd ..

# 2. Mettre à jour le dossier docs
echo "📋 Mise à jour dossier docs..."
rm -rf docs
mkdir docs
cp -r frontend/dist/* docs/

# Configuration GitHub Pages
touch docs/.nojekyll
cp docs/index.html docs/404.html

# 3. Vérifier les fichiers critiques
echo "🔍 Vérification des fichiers..."
if [ -f "docs/index.html" ]; then
    echo "✅ index.html présent"
else
    echo "❌ index.html manquant !"
    exit 1
fi

echo "📊 Fichiers dans docs/:"
ls -la docs/ | head -10

# 4. Push rapide
echo "📤 Push de la correction..."
git add .
git commit -m "🔧 Fix GitHub Pages 404 - Configuration Vite corrigée

- base: './' au lieu de '/entreprise-organiser/'
- Chemins relatifs pour GitHub Pages
- Rebuild complet des assets"

git push origin master

echo ""
echo "✅ CORRECTION APPLIQUÉE !"
echo ""
echo "⏳ Attendre 2-3 minutes que GitHub Pages se mette à jour"
echo ""
echo "🔗 Testez ensuite :"
echo "   https://Dodibois40.github.io/entreprise-organiser/"
echo ""
echo "🔍 Si le problème persiste :"
echo "   1. Videz le cache (Ctrl+F5)"
echo "   2. Essayez en navigation privée"
echo "   3. Vérifiez la console (F12)" 