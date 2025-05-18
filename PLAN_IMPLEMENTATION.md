# Plan d'implémentation - Transformation Excel vers SaaS pour la menuiserie/alu

## Phase 1: Mise en place de l'architecture et du modèle de données

### 1.1 Migration vers TypeScript
- [ ] Convertir le backend JS en TypeScript avec NestJS
  - [ ] Installer les dépendances TypeScript et NestJS
  - [ ] Configurer tsconfig.json
  - [ ] Transformer les fichiers JS en TS (.js → .ts)
  - [ ] Ajouter les types aux fonctions et variables
- [ ] Migrer le frontend vers TypeScript avec des composants React typés
  - [ ] Installer les dépendances TypeScript pour React
  - [ ] Configurer tsconfig.json pour le frontend
  - [ ] Transformer les fichiers JSX en TSX (.jsx → .tsx)
  - [ ] Ajouter les types aux props et états

### 1.2 Définition du schéma de base de données avec Prisma
- [ ] Créer le modèle Prisma pour toutes les entités
  - [ ] Modèle affaire avec tous les champs requis
  - [ ] Modèle categorie_achat
  - [ ] Modèle bdc (bon de commande)
  - [ ] Modèle pointage
  - [ ] Modèle parametre_global
  - [ ] Modèles user, role, role_assignment
- [ ] Configurer PostgreSQL et les migrations Prisma
  - [ ] Installer PostgreSQL et créer la base de données
  - [ ] Configurer Prisma pour PostgreSQL
  - [ ] Générer et exécuter les migrations initiales
- [ ] Implémenter la logique de gestion des relations entre entités
  - [ ] Relations one-to-many et many-to-many
  - [ ] Indices pour les performances
  - [ ] Contraintes d'intégrité

### 1.3 Mise en place de l'authentification et RBAC
- [ ] Intégrer Clerk ou Auth.js avec JWT
  - [ ] Installation et configuration du système d'authentification
  - [ ] Mise en place des endpoints d'authentification
  - [ ] Configuration des tokens JWT
- [ ] Définir les rôles et permissions selon les spécifications
  - [ ] Admin SYS
  - [ ] Chargé d'affaires
  - [ ] Acheteur
  - [ ] Chef d'atelier/équipe
  - [ ] Consultation
- [ ] Créer les middlewares d'authentification
  - [ ] Vérification des tokens
  - [ ] Validation des rôles et permissions
  - [ ] Gestion des erreurs d'authentification

## Phase 2: Développement backend

### 2.1 Architecture des API REST
- [ ] Créer les contrôleurs NestJS pour chaque entité
  - [ ] Contrôleur Affaires
  - [ ] Contrôleur BDC
  - [ ] Contrôleur Pointages
  - [ ] Contrôleur Reporting
  - [ ] Contrôleur Paramètres
- [ ] Implémenter la validation avec Zod
  - [ ] Schémas de validation pour chaque endpoint
  - [ ] Middleware de validation des requêtes
  - [ ] Gestion des erreurs de validation
- [ ] Développer les services métier avec logique business
  - [ ] Service Affaires
  - [ ] Service BDC
  - [ ] Service Pointages
  - [ ] Service Reporting
  - [ ] Service Paramètres

### 2.2 Logique métier
- [ ] Calcul des frais généraux
  - [ ] Appliquer le pourcentage FG de la catégorie à chaque achat
  - [ ] Stocker le montant des frais généraux
- [ ] Algorithmes de marge et pourcentages
  - [ ] Calcul de la marge affaire (€ et %)
  - [ ] Calcul de l'écart heure
  - [ ] Agrégation des données pour le reporting
- [ ] Système de statuts automatiques pour les affaires
  - [ ] Logique de transition des statuts (PLANIFIEE → EN COURS → TERMINEE → CLOTUREE)
  - [ ] Déclencheurs pour les changements de statut
- [ ] Jobs cron pour les tâches récurrentes
  - [ ] Refresh des vues matérialisées
  - [ ] Envoi des alertes par email
  - [ ] Purge RGPD

### 2.3 Outils de migration depuis Excel
- [ ] Script de parsing Excel vers la DB
  - [ ] Parser la feuille LISTES AFFAIRES
  - [ ] Parser la feuille LISTES BDC
  - [ ] Parser la feuille SAISIE_POINTAGES
  - [ ] Parser la feuille PARAMETRES
- [ ] Validation et nettoyage des données
  - [ ] Vérification des formats
  - [ ] Gestion des valeurs manquantes
  - [ ] Correction des anomalies
- [ ] Tests de cohérence après migration
  - [ ] Vérification des totaux et calculs
  - [ ] Contrôle des relations entre entités
  - [ ] Validation des données importées

## Phase 3: Développement frontend

### 3.1 Structure de l'interface
- [ ] Layout global avec sidebar et header
  - [ ] Composant Sidebar avec navigation
  - [ ] Composant Header avec recherche et profil
  - [ ] Gestion des états de navigation
- [ ] Système de navigation et de recherche
  - [ ] Router avec gestion des routes protégées
  - [ ] Barre de recherche omnibox
  - [ ] Filtres et tris avancés
- [ ] Dashboard avec KPIs et graphiques
  - [ ] Cartes de KPIs
  - [ ] Graphique de marge cumulative
  - [ ] Tableau des dérives de marge

### 3.2 Modules principaux
- [ ] Module Affaires avec CRUD complet
  - [ ] Liste des affaires avec DataTable
  - [ ] Formulaire de création/édition d'affaire
  - [ ] Vue détaillée avec onglets
  - [ ] Gestion de la clôture d'affaire
- [ ] Module Achats/BDC avec workflows
  - [ ] Création de BDC avec sélection d'affaire
  - [ ] Liste des BDC avec filtres
  - [ ] Gestion de la réception et des montants finaux
- [ ] Module Pointages avec calendrier
  - [ ] Vue calendrier type Timesheet
  - [ ] Saisie des heures par jour et par type
  - [ ] Validation individuelle ou en masse
- [ ] Module Reporting avec graphiques et exports
  - [ ] Sélecteur de période et filtres
  - [ ] Graphiques de visualisation
  - [ ] Export CSV/XLSX et PDF

### 3.3 Composants UI avancés
- [ ] DataTable pour les listes (shadcn/ui)
  - [ ] Configuration des colonnes et filtres
  - [ ] Pagination et tri
  - [ ] Actions contextuelles
- [ ] Formulaires typés et validés
  - [ ] Composants de formulaire réutilisables
  - [ ] Validation côté client
  - [ ] Gestion des erreurs
- [ ] Drawers et modals pour les actions
  - [ ] Composant Drawer pour création/édition
  - [ ] Composant Modal pour confirmations
  - [ ] Gestion des états et transitions
- [ ] Visualisations et graphiques
  - [ ] Graphiques de barres et courbes
  - [ ] Cartes de données
  - [ ] KPIs dynamiques

## Phase 4: Tests et qualité

### 4.1 Tests unitaires et d'intégration
- [ ] Tests unitaires des services et logique métier
  - [ ] Tests des calculs de marge et FG
  - [ ] Tests des transitions de statut
  - [ ] Tests des validations
- [ ] Tests d'intégration des API
  - [ ] Tests des endpoints avec Supertest
  - [ ] Mocks des services externes
  - [ ] Tests de la sécurité et permissions
- [ ] Tests de bout en bout avec Playwright
  - [ ] Scénario de création d'affaire → BDC → pointage → reporting
  - [ ] Tests des workflows complets
  - [ ] Tests multi-navigateurs

### 4.2 Optimisation et monitoring
- [ ] Configuration Sentry pour le monitoring
  - [ ] Intégration Sentry au frontend et backend
  - [ ] Configuration des alertes
  - [ ] Tracking des performances
- [ ] Optimisation des requêtes PostgreSQL
  - [ ] Analyse des performances avec pg_stat_statements
  - [ ] Optimisation des requêtes complexes
  - [ ] Mise en place d'index
- [ ] Mise en place des backups automatiques
  - [ ] Configuration des backups PostgreSQL
  - [ ] Stockage sur S3 ou équivalent
  - [ ] Tests de restauration

### 4.3 Documentation et déploiement
- [ ] Documentation API avec Swagger
  - [ ] Configuration Swagger/OpenAPI 3.1
  - [ ] Documentation de tous les endpoints
  - [ ] Exemples de requêtes/réponses
- [ ] README détaillé et .env.sample
  - [ ] Instructions d'installation
  - [ ] Guide de démarrage
  - [ ] Variables d'environnement nécessaires
- [ ] Configuration CI/CD avec GitHub Actions
  - [ ] Workflow de test et build
  - [ ] Déploiement automatique
  - [ ] Notification de déploiement
- [ ] Configuration du déploiement sur Railway/Render/Fly.io
  - [ ] Configuration de l'environnement de production
  - [ ] Gestion des secrets
  - [ ] Scaling et monitoring

## Prochaines étapes immédiates

1. **Création du schéma Prisma**
   - [ ] Définir les modèles pour toutes les entités
   - [ ] Configurer les relations et indices
   - [ ] Préparer les migrations initiales

2. **Mise en place NestJS backend**
   - [ ] Convertir la structure Express en NestJS
   - [ ] Organiser en modules, services et contrôleurs
   - [ ] Implémenter la validation avec class-validator et Zod

3. **Refonte du frontend React+TS**
   - [ ] Configurer Vite+TS+TailwindCSS+shadcn/ui
   - [ ] Créer layout et navigation principale
   - [ ] Développer les premiers composants réutilisables

4. **Implémentation de l'authentification**
   - [ ] Intégrer Clerk ou Auth.js
   - [ ] Configurer les rôles et permissions
   - [ ] Sécuriser les routes backend 