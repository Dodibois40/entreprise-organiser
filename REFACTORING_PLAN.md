# Plan de Refactoring - Module Affaires

## 🎯 Objectifs
- Diviser les composants > 500 lignes
- Améliorer la lisibilité et la maintenabilité  
- Réduire la complexité cyclomatique
- Faciliter les tests unitaires

## 📊 Composants à Refactoriser

### 1. `AffaireDetails.jsx` (1496 lignes → 4 composants)

#### **Nouvelle Structure Proposée :**
```
AffaireDetails.jsx (200 lignes) - Composant principal
├── AffaireDashboard.jsx (400 lignes) - Tableau de bord et métriques
├── AffaireFinancialSummary.jsx (300 lignes) - Données financières et camemberts
├── AffaireTabs.jsx (400 lignes) - Gestion des onglets
└── hooks/
    ├── useAffaireData.js (200 lignes) - Hook pour les données
    └── useFinancialData.js (200 lignes) - Hook pour les finances
```

#### **Responsabilités :**
- **AffaireDetails** : Orchestration, navigation, layout principal
- **AffaireDashboard** : Cartes statistiques, graphiques, indicateurs
- **AffaireFinancialSummary** : Camemberts, marges, données financières
- **AffaireTabs** : Gestion des onglets (Devis, BDC, Achats, Équipe)

### 2. `AffaireEquipe.jsx` (1263 lignes → 3 composants)  

#### **Nouvelle Structure Proposée :**
```
AffaireEquipe.jsx (200 lignes) - Composant principal
├── EquipeStats.jsx (400 lignes) - Statistiques et graphiques
├── EquipePointages.jsx (400 lignes) - Gestion des pointages
├── EquipePlanning.jsx (300 lignes) - Planning et affectations
└── components/
    ├── OuvrierCard.jsx (100 lignes) - Carte ouvrier
    └── PointageRow.jsx (100 lignes) - Ligne de pointage
```

### 3. `AffaireAchatsUnified.jsx` (1013 lignes → 4 composants)

#### **Nouvelle Structure Proposée :**
```
AffaireAchatsUnified.jsx (200 lignes) - Layout principal
├── AchatsEstimation.jsx (300 lignes) - Colonne estimation (gauche)
├── AchatsRealises.jsx (300 lignes) - Colonne achats réels (droite)  
├── AchatsComparison.jsx (200 lignes) - Graphiques de comparaison
└── components/
    ├── CategoryCard.jsx (100 lignes) - Carte catégorie
    └── AchatsChart.jsx (150 lignes) - Graphique dédié
```

### 4. `affaires.service.ts` (817 lignes → 3 services)

#### **Nouvelle Structure Proposée :**
```
services/
├── affaires.service.ts (300 lignes) - CRUD de base
├── affaires-financial.service.ts (300 lignes) - Calculs financiers
├── affaires-stats.service.ts (200 lignes) - Statistiques et rapports
└── interfaces/
    └── affaire-financial.interface.ts (50 lignes) - Types financiers
```

## 🔧 Hooks Personnalisés à Créer

### Frontend
```javascript
// hooks/useAffaireData.js
export const useAffaireData = (id) => {
  // Logique de chargement des données affaire
}

// hooks/useFinancialData.js  
export const useFinancialData = (affaireId) => {
  // Logique de calcul des données financières
}

// hooks/useAchatsData.js
export const useAchatsData = (affaireId) => {
  // Logique des achats et BDC
}
```

## 📋 Étapes de Migration

### Phase 1 : Extraction des Hooks (1-2 jours)
1. Créer `hooks/useAffaireData.js`
2. Créer `hooks/useFinancialData.js`  
3. Migrer la logique des composants vers les hooks
4. Tester la compatibilité

### Phase 2 : Division AffaireDetails (2-3 jours)
1. Créer `AffaireDashboard.jsx`
2. Créer `AffaireFinancialSummary.jsx`
3. Créer `AffaireTabs.jsx`
4. Refactoriser le composant principal
5. Tests d'intégration

### Phase 3 : Division AffaireEquipe (2 jours)
1. Créer les sous-composants équipe
2. Migrer les fonctionnalités
3. Tests unitaires

### Phase 4 : Division AchatsUnified (2 jours)
1. Séparer estimation et réalisés
2. Créer le composant de comparaison  
3. Tests d'intégration

### Phase 5 : Backend Services (1-2 jours)
1. Diviser `affaires.service.ts`
2. Créer les interfaces TypeScript
3. Tests backend

## ✅ Critères de Validation

- [ ] Aucun composant > 500 lignes
- [ ] Tous les tests passent
- [ ] Performance conservée
- [ ] Aucune régression fonctionnelle
- [ ] Code coverage maintenu > 80%

## 🚨 Risques et Précautions

### Risques Identifiés
- **Circulation des props** : Complexité accrue du passage de données
- **État partagé** : Risque de désynchronisation
- **Performance** : Re-renders multiples possibles

### Précautions
- Utiliser React.memo pour les composants feuilles
- Implémenter des hooks personnalisés pour l'état partagé
- Tests de performance avant/après  
- Rollback plan si régression > 10%

## 📊 Metrics de Succès

### Avant Refactoring
- AffaireDetails.jsx : 1496 lignes
- AffaireEquipe.jsx : 1263 lignes  
- AffaireAchatsUnified.jsx : 1013 lignes
- **Total** : 3772 lignes dans 3 fichiers

### Après Refactoring (Objectif)
- Composants principaux : ~200 lignes chacun
- Sous-composants : ~300 lignes max
- **Total** : ~3800 lignes dans 15+ fichiers
- **Amélioration** : Complexité réduite de 70% 