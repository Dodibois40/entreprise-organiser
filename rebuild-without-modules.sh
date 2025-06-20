#!/bin/bash

# Reconstruction sans modules ES6 pour O2Switch
echo "🔧 Reconstruction CRM sans modules ES6..."

# Configuration
FTP_HOST="volant.o2switch.net"
FTP_USER="cexe9174"
FTP_PASS="rm9q-Pagd-QKP!"
REMOTE_DIR="entreprise-organiser"

# 1. Modifier la configuration Vite pour éviter les modules
echo "⚙️ Configuration Vite compatible O2Switch..."
cd frontend

# Backup de la config existante
cp vite.config.js vite.config.js.backup 2>/dev/null || true

# Créer une config Vite compatible
cat > vite.config.js << 'EOF'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    target: 'es2015',
    rollupOptions: {
      output: {
        format: 'iife',
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 3000
  }
})
EOF

echo "📦 Reconstruction avec nouvelle config..."
npm run build

cd ..

# 2. Créer un .htaccess encore plus simple
echo "⚙️ .htaccess ultra-simple..."
cat > .htaccess << 'EOF'
# Configuration ultra-simple pour O2Switch
AddType application/javascript .js
AddType text/css .css

RewriteEngine On
RewriteBase /entreprise-organiser/

# Fichiers statiques - STOP
RewriteRule ^assets/ - [L]
RewriteRule \.(js|css|json|svg|png|jpg|jpeg|gif|ico)$ - [L]

# SPA
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . index.html [L]
EOF

# 3. Copier les nouveaux fichiers
echo "📋 Préparation déploiement..."
rm -rf deploy-fixed
mkdir deploy-fixed
cp -r frontend/dist/* deploy-fixed/
cp .htaccess deploy-fixed/

# 4. Upload
echo "📤 Déploiement version corrigée..."
lftp -c "
set ftp:ssl-allow no
set ssl:verify-certificate no
open -u $FTP_USER,$FTP_PASS $FTP_HOST
cd $REMOTE_DIR
lcd deploy-fixed
mirror --reverse --delete --verbose .
quit
"

echo ""
echo "✅ Version corrigée déployée !"
echo ""
echo "🔄 VIDEZ LE CACHE (Ctrl+Shift+R) et testez :"
echo "https://www.lamanufacturedubois.com/entreprise-organiser/" 