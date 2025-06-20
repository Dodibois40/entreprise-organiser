# Configuration Rapide O2Switch 🚀

## 📋 Informations de Connexion

### Base de Données
- **Utilisateur** : `cexe9174_cexe9174`
- **Mot de passe** : `rm9q-Pagd-QKP!`
- **Hôte** : `volant.o2switch.net`
- **Port** : `5432`
- **Base** : `cexe9174_cexe9174`

### FTP
- **Hôte** : `volant.o2switch.net`
- **Utilisateur** : `cexe9174`
- **Mot de passe** : `rm9q-Pagd-QKP!`
- **Dossier** : `entreprise-organiser`

## 🚀 Déploiement Rapide

### 1. Déploiement Complet (Recommandé)
```bash
chmod +x deploy-o2switch-complete.sh
./deploy-o2switch-complete.sh
```

### 2. Configuration de la Base de Données
```bash
chmod +x setup-database-o2switch.sh
./setup-database-o2switch.sh
```

## 📁 Fichiers Créés

- ✅ `env.production` - Configuration d'environnement
- ✅ `deploy-o2switch-complete.sh` - Script de déploiement complet
- ✅ `setup-database-o2switch.sh` - Configuration BDD

## 🔧 Configuration Manuelle (si nécessaire)

### Dans votre panneau O2Switch :

1. **Activer PostgreSQL** dans la section "Bases de données"
2. **Créer la base** `cexe9174_cexe9174` si pas déjà créée
3. **Vérifier les accès** avec les identifiants fournis

### Variables d'environnement importantes :

```env
# Base de données
DATABASE_URL="postgresql://cexe9174_cexe9174:rm9q-Pagd-QKP!@volant.o2switch.net:5432/cexe9174_cexe9174"

# Sécurité
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-2025"

# Domaine (à modifier selon votre domaine)
FRONTEND_URL="https://votre-domaine.com"
CORS_ORIGIN="https://votre-domaine.com"
```

## 🌐 Structure de Déploiement

```
entreprise-organiser/
├── index.html (React App)
├── assets/ (CSS, JS, images)
├── .htaccess (Configuration Apache)
├── backend/
│   ├── .env (Configuration production)
│   ├── src/ (Application NestJS)
│   ├── prisma/ (Migrations et schéma)
│   ├── package.json
│   └── start.js (Script de démarrage)
└── uploads/ (Fichiers uploadés)
```

## ✅ Vérification du Déploiement

### 1. Test de l'Interface
- Accédez à votre domaine
- Vérifiez que l'interface React se charge

### 2. Test de l'API
- Testez : `https://votre-domaine.com/backend/api/`
- Devrait répondre avec les routes disponibles

### 3. Test de la Base de Données
```bash
# Depuis votre machine locale
psql -h volant.o2switch.net -p 5432 -U cexe9174_cexe9174 -d cexe9174_cexe9174
```

## 🚨 Dépannage

### Problème : Base de données non accessible
1. Vérifiez que PostgreSQL est activé dans votre panneau O2Switch
2. Vérifiez que la base `cexe9174_cexe9174` existe
3. Testez la connexion depuis un client externe

### Problème : 404 sur l'application
1. Vérifiez que le `.htaccess` est présent
2. Vérifiez la configuration de votre domaine
3. Assurez-vous que les fichiers sont dans le bon dossier

### Problème : Erreurs CORS
1. Modifiez `FRONTEND_URL` dans le `.env`
2. Remplacez `"https://votre-domaine.com"` par votre vrai domaine

## 📞 Support

- **O2Switch** : Documentation et support technique
- **Logs** : Consultez les logs d'erreur dans votre panneau
- **Debugging** : Utilisez les outils de développement du navigateur

---

**Important** : Remplacez `"https://votre-domaine.com"` par votre domaine réel dans le fichier `env.production` avant le déploiement ! 