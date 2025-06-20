#!/bin/bash

# Script de configuration de base de données pour O2Switch
echo "🗄️ Configuration de la base de données O2Switch..."

# Configuration de la base de données
DB_HOST="volant.o2switch.net"
DB_USER="cexe9174_cexe9174"
DB_PASS="rm9q-Pagd-QKP!"
DB_NAME="cexe9174_cexe9174"
DB_PORT="5432"

echo "📋 Informations de connexion :"
echo "  Host: $DB_HOST"
echo "  Base: $DB_NAME"
echo "  User: $DB_USER"
echo "  Port: $DB_PORT"

# Vérifier si psql est installé
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL client n'est pas installé."
    echo "Pour installer : sudo apt-get install postgresql-client"
    echo ""
    echo "Vous pouvez aussi utiliser l'interface web d'O2Switch (phpPgAdmin)"
    exit 1
fi

echo ""
echo "🔍 Test de connexion à la base de données..."

# Tester la connexion
PGPASSWORD=$DB_PASS psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();"

if [ $? -eq 0 ]; then
    echo "✅ Connexion à la base de données réussie !"
    
    echo ""
    echo "🚀 Lancement des migrations Prisma..."
    
    # Se placer dans le dossier backend
    cd backend
    
    # Copier le fichier .env de production
    cp ../env.production .env
    
    # Installer les dépendances si nécessaire
    if [ ! -d "node_modules" ]; then
        echo "📦 Installation des dépendances..."
        npm install --production
    fi
    
    # Générer le client Prisma
    echo "🔧 Génération du client Prisma..."
    npx prisma generate
    
    # Déployer les migrations
    echo "📊 Déploiement des migrations..."
    npx prisma migrate deploy
    
    # Optionnel : Seeder les données initiales
    echo "🌱 Voulez-vous initialiser les données de base ? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        echo "🌱 Seeding des données initiales..."
        npx prisma db seed
    fi
    
    echo ""
    echo "✅ Configuration de la base de données terminée !"
    echo ""
    echo "📝 Prochaines étapes :"
    echo "1. Vérifiez que vos données sont bien présentes"
    echo "2. Testez votre application"
    echo "3. Configurez votre domaine pour pointer vers le dossier entreprise-organiser"
    
else
    echo "❌ Impossible de se connecter à la base de données"
    echo ""
    echo "🔧 Solutions possibles :"
    echo "1. Vérifiez que la base de données est créée dans votre panneau O2Switch"
    echo "2. Vérifiez les identifiants de connexion"
    echo "3. Vérifiez que PostgreSQL est activé sur votre hébergement"
    echo "4. Contactez le support O2Switch si nécessaire"
fi 