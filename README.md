# 🏢 Entreprise Organiser

Application complète de gestion d'entreprise avec backend NestJS et frontend React.

## 🚀 Démarrage Rapide

### Installation
```bash
# Installer toutes les dépendances
npm run install:all
```

### Démarrage de l'application
```bash
# Démarrer backend + frontend simultanément
npm start
```

L'application sera disponible sur :
- **Frontend** : http://localhost:8080
- **Backend API** : http://localhost:8000
- **Health Check** : http://localhost:8000/health

### Commandes utiles
```bash
# Nettoyer les processus en cours
npm run clean

# Démarrer seulement le backend
npm run start:backend

# Démarrer seulement le frontend  
npm run start:frontend

# Build de production
npm run build

# Tests
npm test
```

## 🔧 Configuration

### Variables d'environnement

**Backend** (`backend/.env`) :
```env
DATABASE_URL="postgresql://user:password@localhost:5432/entreprise_db"
JWT_SECRET="your-secret-key"
PORT=8000
```

**Frontend** (`frontend/.env`) :
```env
VITE_API_URL=http://localhost:8000
```

## 📁 Structure du projet

```
entreprise-organiser/
├── backend/          # API NestJS
│   ├── src/
│   ├── prisma/
│   └── package.json
├── frontend/         # Interface React
│   ├── src/
│   ├── public/
│   └── package.json
└── package.json      # Scripts globaux
```

## 🛠 Technologies

- **Backend** : NestJS, Prisma, PostgreSQL
- **Frontend** : React, Vite, TailwindCSS
- **Base de données** : PostgreSQL
- **Authentification** : JWT

## 📋 Fonctionnalités

- ✅ Gestion des affaires
- ✅ Gestion des devis (avec upload PDF)
- ✅ Gestion des achats et BDC
- ✅ Système de notifications
- ✅ Reporting et dashboard
- ✅ Authentification sécurisée
- ✅ Interface responsive

## 🔍 Résolution des problèmes

Si vous rencontrez des erreurs de port :
```bash
npm run clean
npm start
```

## 📝 Notes de développement

- Le backend utilise le port 8000 par défaut
- Le frontend utilise le port 8080 par défaut
- Tous les services utilisent des exports nommés cohérents
- Les APIs sont préfixées par `/api/`
