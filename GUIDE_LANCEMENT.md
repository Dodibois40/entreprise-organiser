# 🚀 Guide de Lancement - Entreprise Organiser

## ✅ Prérequis Installés
- ✅ PostgreSQL 16 (installé et configuré)
- ✅ Node.js et npm
- ✅ Base de données `entreprise_organiser` créée
- ✅ Utilisateur `admin` avec mot de passe `password123`

## 🎯 Lancement de l'Application

### Méthode Simple (Recommandée)
```bash
./start-app.sh
```

### Méthode Manuelle
#### 1. Démarrer le Backend (Port 3001)
```bash
cd backend
nohup npm run dev > backend.log 2>&1 &
```

#### 2. Démarrer le Frontend (Port 5173)
```bash
cd frontend
npm run dev
```

### 3. Accéder à l'Application
- **Frontend** : http://localhost:5173
- **Backend API** : http://localhost:3001

### 4. Arrêter l'Application
```bash
./stop-app.sh
```

## 👤 Comptes de Test Disponibles

### Administrateur Système
- **Email** : admin@entreprise.com
- **Mot de passe** : admin123
- **Rôle** : ADMIN_SYS (accès complet)

### Chargé d'Affaire
- **Email** : charge.affaire@entreprise.com
- **Mot de passe** : charge123
- **Rôle** : CHARGE_AFFAIRE

### Acheteur
- **Email** : acheteur@entreprise.com
- **Mot de passe** : acheteur123
- **Rôle** : ACHETEUR

## 🔧 Commandes Utiles

### Vérifier les Serveurs
```bash
# Vérifier les ports utilisés
ss -tulpn | grep -E ":(3001|5173)"

# Vérifier les processus
ps aux | grep -E "(npm|node)" | grep -v grep
```

### Arrêter les Serveurs
```bash
# Arrêter le backend
pkill -f "npm run dev"

# Arrêter le frontend (Ctrl+C dans le terminal)
```

### Logs du Backend
```bash
tail -f backend/backend.log
```

## 📊 Fonctionnalités Disponibles

### 🏠 Dashboard
- KPIs en temps réel
- Alertes critiques
- Graphiques de performance

### 💼 Gestion des Affaires
- Création/modification d'affaires
- Suivi des statuts
- Calculs de marges

### 🛒 Achats & BDC
- Bons de commande
- Gestion des fournisseurs
- Réception des commandes

### ⏰ Pointages
- Saisie des heures
- Validation par chef d'atelier
- Statistiques par affaire

### 📦 Inventaire
- Gestion des articles
- Mouvements de stock
- Alertes stock faible

### 📈 Reporting
- Analyses avancées
- Graphiques interactifs
- Export Excel

### 🔔 Notifications
- Alertes intelligentes
- Notifications temps réel
- Filtres par priorité

### ⚙️ Administration
- Paramètres globaux
- Migration Excel
- Gestion des utilisateurs

## 🆘 Dépannage

### Backend ne démarre pas
```bash
cd backend
npx prisma generate
npm run dev
```

### Frontend ne démarre pas
```bash
cd frontend
npm install
npm run dev
```

### Base de données
```bash
# Vérifier PostgreSQL
sudo systemctl status postgresql

# Recréer la base si nécessaire
sudo -u postgres dropdb entreprise_organiser
sudo -u postgres createdb entreprise_organiser
cd backend && npx prisma migrate dev --name init
npx prisma db seed
```

## 🎉 Application Prête !

Votre application **Entreprise Organiser** est maintenant **100% fonctionnelle** !

Connectez-vous avec le compte administrateur pour explorer toutes les fonctionnalités. 