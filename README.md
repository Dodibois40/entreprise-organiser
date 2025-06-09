# 🏗️ Entreprise Organiser - CRM pour Menuiserie

Une application web SaaS complète pour la gestion d'entreprises de menuiserie, développée avec React.js et Node.js.

## 📋 Table des matières

- [Fonctionnalités](#-fonctionnalités)
- [Technologies](#-technologies)
- [Prérequis](#-prérequis)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Utilisation](#-utilisation)
- [Structure du projet](#-structure-du-projet)
- [API Documentation](#-api-documentation)
- [Tests](#-tests)
- [Contribution](#-contribution)
- [Licence](#-licence)

## ✨ Fonctionnalités

### 🎯 Modules Principaux

- **Dashboard** : Vue d'ensemble avec KPIs et statistiques en temps réel
- **Gestion des Affaires** : Suivi complet des projets de menuiserie
- **Pointages** : Enregistrement et validation des heures de travail
- **Achats & BDC** : Gestion des bons de commande et achats
- **Inventaire** : Gestion complète du stock et des articles
- **Planification** : Planning des ressources et des projets
- **Ressources** : Gestion des équipements et matériaux
- **Analyses Avancées** : Rapports et graphiques détaillés
- **Migration Excel** : Import/export de données Excel
- **Notifications** : System d'alertes intelligent

### 🔐 Système d'Authentification

- Connexion sécurisée avec JWT
- Gestion des rôles (Admin, Chef d'atelier, Employé)
- Réinitialisation de mot de passe
- Vérification d'email

### 📊 Fonctionnalités Avancées

- **Temps réel** : Actualisation automatique des données
- **Responsive Design** : Compatible mobile et desktop
- **Thème sombre/clair** : Interface personnalisable
- **Graphiques interactifs** : Charts.js intégré
- **Cache intelligent** : Optimisation des performances
- **Export CSV** : Export des données

## 🛠️ Technologies

### Backend
- **Node.js** + **Express.js**
- **MongoDB** avec Mongoose
- **JWT** pour l'authentification
- **bcryptjs** pour le hachage des mots de passe
- **CORS** configuré
- **Nodemon** pour le développement

### Frontend
- **React.js** avec hooks
- **Vite** comme bundler
- **Tailwind CSS** pour le styling
- **React Router** pour la navigation
- **Axios** pour les requêtes API
- **Chart.js** pour les graphiques
- **Tabler Icons** pour les icônes
- **Sonner** pour les notifications

### Base de Données
- **MongoDB** comme base de données principale
- **Mongoose** pour l'ODM
- Collections : Users, Affaires, Pointages, BDC, Articles, etc.

## 📋 Prérequis

- **Node.js** (version 16+ recommandée)
- **MongoDB** (version 4.4+ recommandée)
- **Git**
- **npm** ou **yarn**

## 🚀 Installation

### 1. Cloner le repository

```bash
git clone https://github.com/Dodibois40/entreprise-organiser.git
cd entreprise-organiser
```

### 2. Installation Backend

```bash
cd backend
npm install
```

### 3. Installation Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuration

### 1. Configuration MongoDB

Assurez-vous que MongoDB est installé et en cours d'exécution :

```bash
# Ubuntu/Debian
sudo systemctl start mongod
sudo systemctl enable mongod

# Vérifier le statut
sudo systemctl status mongod
```

### 2. Variables d'environnement

Le backend est préconfigué pour fonctionner avec MongoDB sur `localhost:27017`.

### 3. Création des utilisateurs de test

```bash
cd backend
node user-direct.js
```

Cela créera les utilisateurs suivants :
- **Admin** : `admin@example.com` / `admin123`
- **Utilisateur** : `user@example.com` / `password123`

## 🎮 Utilisation

### Démarrage rapide

```bash
# Depuis la racine du projet
./start-all.sh
```

### Démarrage manuel

**Terminal 1 - Backend :**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend :**
```bash
cd frontend
npm run dev
```

### Accès à l'application

- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001/api
- **MongoDB** : mongodb://localhost:27017/entreprise-organiser

### Identifiants de connexion

```
Administrateur :
Email : admin@example.com
Mot de passe : admin123

Utilisateur standard :
Email : user@example.com
Mot de passe : password123
```

## 📁 Structure du projet

```
entreprise-organiser/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── controllers/       # Contrôleurs des routes
│   │   ├── models/           # Modèles MongoDB/Mongoose
│   │   ├── routes/           # Définition des routes
│   │   ├── middleware/       # Middlewares personnalisés
│   │   ├── services/         # Services métier
│   │   ├── config/           # Configuration
│   │   └── index.js          # Point d'entrée
│   ├── package.json
│   └── nodemon.json
├── frontend/                  # Application React
│   ├── src/
│   │   ├── components/       # Composants réutilisables
│   │   ├── pages/           # Pages de l'application
│   │   ├── services/        # Services API
│   │   ├── contexts/        # Contextes React
│   │   ├── utils/           # Utilitaires
│   │   └── main.jsx         # Point d'entrée
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── README.md
└── start-all.sh              # Script de démarrage
```

## 📡 API Documentation

### Authentification

```bash
# Connexion
POST /api/auth/login
{
  "email": "admin@example.com",
  "password": "admin123"
}

# Inscription
POST /api/auth/register
{
  "nom": "Doe",
  "prenom": "John",
  "email": "john@example.com",
  "password": "password123"
}
```

### Endpoints principaux

- **Utilisateurs** : `/api/users`
- **Affaires** : `/api/affaires`
- **Pointages** : `/api/pointages`
- **BDC** : `/api/bdc`
- **Articles** : `/api/articles`

Tous les endpoints nécessitent un token JWT dans le header :
```
Authorization: Bearer <token>
```

## 🧪 Tests

```bash
# Tests backend
cd backend
npm test

# Tests frontend
cd frontend
npm test

# Tests E2E
npm run test:e2e
```

## 🔧 Scripts utiles

```bash
# Démarrage complet
./start-all.sh

# Démarrage rapide backend + frontend (à lancer depuis la racine)
./go.sh

# Recréer les utilisateurs de test
cd backend && node user-direct.js

# Build pour production
cd frontend && npm run build
cd backend && npm run build

# Vérifier les logs
cd backend && tail -f logs/app.log
```

## 🚨 Dépannage

### Problèmes courants

1. **MongoDB non connecté**
   ```bash
   sudo systemctl start mongod
   ```

2. **Port déjà utilisé**
   ```bash
   lsof -ti:3001 | xargs kill -9
   lsof -ti:5173 | xargs kill -9
   ```

3. **Erreur d'authentification**
   ```bash
   cd backend && node user-direct.js
   ```

## 🤝 Contribution

1. Forker le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commiter les changes (`git commit -m 'Add amazing feature'`)
4. Pusher sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**Dorian Moreau**
- GitHub: [@Dodibois40](https://github.com/Dodibois40)
- Email: dorianlacanau@gmail.com

## 🎯 Roadmap

- [ ] Application mobile (React Native)
- [ ] Mode hors ligne
- [ ] Intégration comptabilité
- [ ] API GraphQL
- [ ] Tests automatisés avancés
- [ ] Déploiement Docker
- [ ] Monitoring avancé

---

⭐ **N'hésitez pas à star le projet si il vous a été utile !**
