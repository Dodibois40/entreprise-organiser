#!/bin/bash

# Déploiement gratuit sur Netlify
echo "🚀 Déploiement GRATUIT sur Netlify..."

# 1. Vérifier si Netlify CLI est installé
if ! command -v netlify &> /dev/null; then
    echo "📦 Installation de Netlify CLI..."
    npm install -g netlify-cli
fi

# 2. Construire le projet
echo "📦 Construction du CRM..."
cd frontend
npm run build
cd ..

# 3. Créer un fichier _redirects pour les SPA
echo "⚙️ Configuration des redirects..."
cat > frontend/dist/_redirects << 'EOF'
# Redirections pour Single Page Application
/*    /index.html   200
EOF

# 4. Créer un fichier netlify.toml pour la configuration
echo "⚙️ Configuration Netlify..."
cat > netlify.toml << 'EOF'
[build]
  publish = "frontend/dist"
  command = "cd frontend && npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
EOF

# 5. Déploiement sur Netlify
echo "🌐 Déploiement sur Netlify..."
echo ""
echo "🔗 Choisissez une option :"
echo "1. Déploiement rapide (temporaire)"
echo "2. Déploiement avec compte (permanent)"
echo ""

# Option 1 : Déploiement rapide sans compte
echo "📤 Déploiement rapide en cours..."
cd frontend/dist
netlify deploy --dir . --open

echo ""
echo "✅ CRM déployé sur Netlify !"
echo ""
echo "📋 Pour un déploiement permanent :"
echo "1. Créez un compte sur https://netlify.com"
echo "2. Lancez : netlify login"
echo "3. Lancez : netlify deploy --prod --dir frontend/dist"
echo ""
echo "🎉 Votre CRM sera accessible partout dans le monde !" 