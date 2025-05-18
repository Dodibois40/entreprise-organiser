# Entreprise Organiser

Application de gestion d'entreprise avec authentification, gestion des tâches et des plannings.

## Prérequis

- Node.js (v14+)
- npm (v6+)
- MongoDB (v4+)

## Installation

Pour installer toutes les dépendances nécessaires, exécutez :

```bash
./setup.sh
```

Ce script va :
1. Installer les dépendances globales (concurrently, nodemon)
2. Installer les dépendances du backend et du frontend
3. Créer les fichiers .env nécessaires

## Démarrage des serveurs

Pour démarrer à la fois le serveur backend et frontend en une seule commande, exécutez :

```bash
./start-servers.sh
# ou
npm run start
```

Pour redémarrer les serveurs après une mise à jour :

```bash
./restart-servers.sh
# ou
npm run restart
```

Les serveurs seront lancés sur :
- Backend : http://localhost:5001
- Frontend : http://localhost:3000

## Structure du projet

### Backend (Express/MongoDB)

- `/backend/src/models` - Modèles Mongoose (User, Task)
- `/backend/src/controllers` - Contrôleurs pour la logique métier
- `/backend/src/routes` - Routes API
- `/backend/src/middleware` - Middlewares (authentification, autorisation)
- `/backend/src/config` - Configuration de l'application

### Frontend (React/Mantine UI)

- `/frontend/src/pages` - Pages de l'application
- `/frontend/src/components` - Composants réutilisables
- `/frontend/src/contexts` - Contextes React (AuthContext)
- `/frontend/src/services` - Services pour les appels API

## Fonctionnalités

- **Authentification** : Inscription, connexion, profil utilisateur
- **Gestion des tâches** : Création, modification, suppression, filtrage
- **Gestion des collaborateurs** : Liste des utilisateurs, attribution de tâches
- **Tableaux de bord** : Vue d'ensemble des tâches et activités

## Développement

### Commandes NPM

```bash
# Installer les dépendances
npm run setup

# Démarrer les serveurs
npm run start

# Redémarrer les serveurs après modification
npm run restart

# Démarrer uniquement le backend
npm run backend

# Démarrer uniquement le frontend
npm run frontend
```
