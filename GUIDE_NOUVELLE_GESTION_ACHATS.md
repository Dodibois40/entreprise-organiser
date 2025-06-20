# 📋 Guide - Nouvelle Gestion des Achats Unifiée

## 🎯 Objectif de la Restructuration

La gestion des achats a été repensée pour une meilleure expérience utilisateur et une vision plus claire des données financières.

### ❌ Problèmes de l'ancienne structure
- **Éparpillement** : Estimation interactive et suivi par catégorie séparés
- **Confusion** : Difficile de comparer estimation vs réel
- **Navigation complexe** : Trop d'onglets et de sous-onglets
- **Données dupliquées** : Informations répétées entre les composants

### ✅ Avantages de la nouvelle structure
- **Vision unifiée** : Estimation et achats réels côte à côte
- **Comparaison immédiate** : Écarts visibles en temps réel
- **Interface simplifiée** : Moins de clics, plus d'efficacité
- **Données cohérentes** : Source unique de vérité

## 🏗️ Architecture de la Nouvelle Interface

### 📊 Interface à Deux Colonnes

```
┌─────────────────┬─────────────────┐
│  📋 ESTIMATION  │  💰 ACHATS RÉELS │
│                 │                 │
│ • Configuration │ • Synthèse      │
│ • % Achats/CA   │ • Par catégorie │
│ • Répartition   │ • Détail achats │
│ • Sauvegarde    │ • Actions CRUD  │
└─────────────────┴─────────────────┘
```

### 🎯 Fonctionnalités Principales

#### Colonne Gauche - Estimation
- **Configuration globale** : CA objectif et % achats
- **Répartition interactive** : Pourcentages par catégorie
- **Sauvegarde automatique** : Données persistées
- **Validation** : Contrôle que la somme = 100%

#### Colonne Droite - Achats Réels
- **Synthèse par catégorie** : Comparaison vs estimation
- **Ajout facile** : Modal d'ajout d'achats
- **Gestion complète** : Modification/suppression
- **Indicateurs visuels** : Écarts colorés avec icônes

### 📋 Onglets Complémentaires

1. **Estimation vs Réel** ⭐ (Principal)
2. **Bons de Commande** 📄 (Composant existant)
3. **Factures d'Achats** 🧾 (Redirection vers l'onglet principal)

## 🚀 Accès à la Nouvelle Interface

### Route
```
/affaires/:id/achats-unified
```

### Navigation
1. **Depuis le détail d'affaire** → Bouton "🚀 Interface Unifiée"
2. **Depuis la liste des affaires** → Actions → Gestion des achats
3. **URL directe** avec l'ID de l'affaire

## 💻 Composants Techniques

### Nouveau Composant Principal
```javascript
// AffaireAchatsUnified.jsx
- État unifié pour estimation et achats réels
- Comparaison automatique des données
- Interface responsive avec Grid Mantine
- Gestion d'erreurs intégrée
```

### Page Conteneur
```javascript
// AffaireAchatsUnifiedPage.jsx
- Système d'onglets avec Mantine Tabs
- Breadcrumbs de navigation
- Integration avec les composants existants
```

### Mise à Jour du Router
```javascript
// Nouvelle route ajoutée
<Route path=":id/achats-unified" element={<AffaireAchatsUnifiedPage />} />
```

## 🎨 Design et UX

### Codes Couleurs
- **Bleu** : Estimation/Prévisionnel
- **Vert** : Achats réels/Réalisé
- **Rouge** : Dépassements
- **Orange** : Avertissements

### Indicateurs Visuels
- **🔺 IconTrendingUp** : Dépassement (rouge)
- **🔻 IconTrendingDown** : Économie (vert)
- **➡️ IconEqual** : Conforme (bleu)

### Responsive Design
- **Desktop** : 2 colonnes égales
- **Tablet** : 2 colonnes adaptatives
- **Mobile** : Colonnes empilées

## 📊 Calculs et Logique Métier

### Montant Total Estimé
```
Montant Total = (CA Objectif × % Achats) / 100
```

### Montant par Catégorie
```
Montant Catégorie = (Montant Total × % Catégorie) / 100
```

### Écarts
```
Écart = Montant Réel - Montant Estimé
```

### Seuils d'Alerte
- **Dépassement** : Réel > Estimé × 1.1 (>10%)
- **Économie** : Réel < Estimé × 0.9 (<-10%)
- **Conforme** : Entre -10% et +10%

## 🔄 Migration des Données

### Données Conservées
- ✅ Estimations existantes (service estimationAchatsService)
- ✅ Achats existants (service achatService)
- ✅ Catégories d'achats (service categorieAchatService)
- ✅ Bons de commande (composant AffaireBdc existant)

### Compatibilité
- **Rétrocompatible** : Anciennes pages toujours fonctionnelles
- **Migration progressive** : Utilisateurs peuvent choisir
- **Données partagées** : Même API backend

## 🧪 Tests et Validation

### Points de Test
1. **Chargement des données** : Estimation + achats réels
2. **Calculs** : Montants et pourcentages
3. **Sauvegarde** : Persistence des modifications
4. **CRUD achats** : Ajout/modification/suppression
5. **Responsive** : Affichage sur tous écrans
6. **Navigation** : Transitions entre onglets

### Données de Test
- Utiliser l'affaire "25-BOIS-003" (voir GUIDE_TEST_TABLEAU_DE_BORD.md)
- Estimation par défaut : 30% du CA
- Catégories prédéfinies avec pourcentages

## 🔧 Configuration Backend

### APIs Utilisées
- `GET /estimations-achats/:affaireId` - Récupération estimation
- `POST /estimations-achats/:affaireId` - Sauvegarde estimation
- `GET /achats?affaireId=:id` - Liste des achats
- `POST /achats` - Création achat
- `PUT /achats/:id` - Modification achat
- `DELETE /achats/:id` - Suppression achat
- `GET /categories-achat` - Liste catégories

### Modèles de Données
```javascript
EstimationAchats {
  affaireId: UUID
  pourcentageAchats: Number
  montantDevisValides: Number
  montantTotalAchats: Number
  categories: Array<CategorieEstimation>
}

Achat {
  id: UUID
  affaireId: UUID
  categorieId: UUID
  fournisseur: String
  montantHt: Number
  montantTtc: Number
  dateFacture: Date
  commentaire: String
}
```

## 🎯 Prochaines Étapes

### Phase 1 - Mise en Place ✅
- [x] Création composant unifié
- [x] Intégration dans le router
- [x] Bouton d'accès depuis l'affaire

### Phase 2 - Amélioration 🔄
- [ ] Mode sombre complet
- [ ] Export des données
- [ ] Graphiques avancés
- [ ] Notifications temps réel

### Phase 3 - Optimisation 📈
- [ ] Cache des données
- [ ] Recherche et filtres
- [ ] Historique des modifications
- [ ] Rapports PDF

## 📞 Support

### En cas de problème
1. **Vérifier les logs** de la console navigateur
2. **Tester les APIs** avec les outils de développement
3. **Revenir à l'ancienne interface** si nécessaire
4. **Signaler les bugs** avec captures d'écran

### Ressources
- **Guide de test** : GUIDE_TEST_TABLEAU_DE_BORD.md
- **Documentation API** : backend/src/modules/*/README.md
- **Composants UI** : frontend/src/components/README.md

---

## 🎊 Félicitations !

Vous disposez maintenant d'une interface moderne et efficace pour la gestion des achats. Cette restructuration devrait considérablement améliorer votre productivité et la visibilité sur vos données financières.

**Bonne utilisation ! 🚀** 