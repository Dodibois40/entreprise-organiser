# Guide de Déploiement sur O2Switch

## 📋 Prérequis

- Compte O2Switch configuré
- Accès FTP aux codes fournis
- Node.js et npm installés localement
- Projet construit et fonctionnel en local

## 🔐 Informations de Connexion FTP

- **Hôte** : volant.o2switch.net
- **Port** : 21
- **Identifiant** : cexe9174
- **Mot de passe** : rm9q-Pagd-QKP!
- **Dossier cible** : entreprise-organiser

## 🚀 Méthodes de Déploiement

### Méthode 1 : Script Automatique (Recommandé)

```bash
# Exécuter le script de déploiement complet
./deploy-o2switch.sh
```

Ce script :
- ✅ Construit automatiquement le frontend et backend
- ✅ Prépare les fichiers pour la production
- ✅ Créé un fichier .htaccess pour React Router
- ✅ Upload tous les fichiers via FTP
- ✅ Nettoie les fichiers temporaires

### Méthode 2 : Script Simplifié

Si la méthode 1 ne fonctionne pas :

```bash
# Exécuter le script simplifié
./deploy-simple.sh
```

### Méthode 3 : Déploiement Manuel

1. **Construire le projet** :
```bash
# Frontend
cd frontend
npm run build
cd ..

# Backend
cd backend
npm run build
cd ..
```

2. **Upload via client FTP** :
   - Utilisez FileZilla ou un autre client FTP
   - Connectez-vous avec les identifiants fournis
   - Uploadez `frontend/dist/` vers le dossier `entreprise-organiser/`
   - Uploadez `backend/dist/` vers `entreprise-organiser/backend/`

## 🗄️ Configuration Base de Données

### Sur O2Switch :

1. **Créer une base de données PostgreSQL** dans votre panneau de contrôle O2Switch
2. **Noter les informations de connexion** :
   - Host de la BDD
   - Nom de la base
   - Utilisateur
   - Mot de passe

3. **Configurer les variables d'environnement** :

Créez un fichier `.env` dans le dossier backend sur le serveur :

```env
# Base de données O2Switch
DATABASE_URL="postgresql://username:password@host:5432/database_name"

# JWT
JWT_SECRET="your-secret-key"

# Upload paths (ajustez selon votre structure)
UPLOAD_PATH="/home/cexe9174/www/entreprise-organiser/uploads"

# CORS (ajustez selon votre domaine)
FRONTEND_URL="https://votre-domaine.com"
```

## 🌐 Configuration du Serveur Web

### Fichier .htaccess (déjà créé par le script)

Le fichier `.htaccess` est automatiquement créé pour :
- Gérer React Router (SPA)
- Ajouter des headers de sécurité
- Rediriger toutes les routes vers index.html

### Structure recommandée sur O2Switch :

```
entreprise-organiser/
├── index.html (frontend)
├── assets/ (CSS, JS du frontend)
├── .htaccess
├── backend/
│   ├── src/
│   ├── prisma/
│   └── package.json
└── uploads/ (dossier pour les fichiers uploadés)
```

## 🔧 Post-Déploiement

### 1. Migration de la Base de Données

Connectez-vous via SSH (si disponible) ou utilisez l'interface O2Switch :

```bash
cd entreprise-organiser/backend
npm install
npx prisma migrate deploy
npx prisma db seed  # Si vous avez des données initiales
```

### 2. Configuration des Permissions

Assurez-vous que le dossier `uploads` est accessible en écriture :

```bash
chmod 755 uploads/
```

### 3. Test de l'Application

- **Frontend** : Accédez à votre domaine principal
- **Backend API** : Testez `https://votre-domaine.com/backend/api/`

## 🛠️ Dépannage

### Problème : Erreur 404 sur les routes React

**Solution** : Vérifiez que le fichier `.htaccess` est présent et configuré correctement.

### Problème : Erreur de connexion à la base de données

**Solution** : 
1. Vérifiez les paramètres de connexion dans `.env`
2. Assurez-vous que la base PostgreSQL est créée
3. Testez la connexion depuis un client externe

### Problème : Upload de fichiers ne fonctionne pas

**Solution** :
1. Vérifiez les permissions du dossier `uploads`
2. Ajustez `UPLOAD_PATH` dans `.env`
3. Vérifiez les limites d'upload d'O2Switch

### Problème : CORS errors

**Solution** :
1. Configurez `FRONTEND_URL` dans le backend
2. Ajustez les paramètres CORS selon votre domaine

## 📞 Support

- **Documentation O2Switch** : Consultez leur documentation pour les spécificités
- **Logs** : Vérifiez les logs d'erreur dans votre panneau O2Switch
- **Base de données** : Utilisez phpPgAdmin ou un client PostgreSQL pour débugger

## 🔄 Mises à Jour

Pour mettre à jour l'application :

1. Modifiez votre code en local
2. Re-exécutez le script de déploiement :
```bash
./deploy-o2switch.sh
```

---

**Note** : Ce guide suppose une configuration standard d'O2Switch. Adaptez les chemins et configurations selon votre environnement spécifique. 