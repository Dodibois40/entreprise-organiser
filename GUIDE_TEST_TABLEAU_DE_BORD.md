# Guide de Test - Tableau de Bord

## 🚀 Démarrage de l'Application

### Backend
```bash
cd backend
npm run dev
```
Le backend sera accessible sur `http://localhost:8000`

### Frontend
```bash
cd frontend
npm run dev
```
Le frontend sera accessible sur `http://localhost:8080`

## 🔐 Identifiants de Connexion

### Administrateur
- **Email :** `admin@example.com`
- **Mot de passe :** `admin123`
- **Rôle :** ADMIN_SYS (accès complet)

### Utilisateur Standard
- **Email :** `user@example.com`
- **Mot de passe :** `password123`
- **Rôle :** OUVRIER_ATELIER

## 🛒 **NOUVEAU : Interface Unifiée de Gestion des Achats**

### Accès à l'Interface
1. **Connexion :** Utilisez les identifiants admin ci-dessus
2. **Navigation :** Allez dans "Affaires" → Sélectionnez "25-BOIS-003"  
3. **Onglet Achats :** Cliquez sur "Achats" puis sur le bouton **"🚀 Interface Unifiée"**

### 🎯 Fonctionnalités de l'Interface Unifiée

#### **Vue à Deux Colonnes**
- **👈 Colonne Gauche (Estimation) :** Configuration et répartition prévisionnelle des achats
- **👉 Colonne Droite (Achats Réalisés) :** Suivi des achats réels avec synchronisation automatique

#### **Section BDC et Factures (En bas de page)**
- **📋 Bons de Commande :** Création, suivi et réception des BDC
- **🧾 Factures d'Achats :** Gestion des factures reçues
- **🔄 Synchronisation Automatique :** Les BDC réceptionnés et factures créées alimentent automatiquement la colonne "Achats Réalisés"

### 🧪 Tests à Effectuer

#### **1. Test de Création d'un Bon de Commande**
1. Cliquez sur **"Nouveau BDC"** dans la section du bas
2. Remplissez les champs :
   - **Fournisseur :** "Test Fournisseur BDC"
   - **Montant HT :** 1500
   - **Catégorie :** Sélectionnez "Bois"
   - **Commentaire :** "Test de création BDC"
3. Cliquez sur **"Créer le BDC"**
4. ✅ **Vérifiez :** Le BDC apparaît dans la section "Bons de Commande" avec le statut "En attente"

#### **2. Test de Réception d'un BDC**
1. Dans la section "Bons de Commande", trouvez le BDC créé
2. Cliquez sur **"Réceptionner"**
3. ✅ **Vérifiez :** 
   - Le BDC passe au statut "Réceptionné" avec fond vert
   - La colonne "Achats Réalisés" se met à jour automatiquement
   - Le montant apparaît dans la synthèse par catégorie

#### **3. Test de Création d'une Facture**
1. Cliquez sur **"Nouvelle Facture"** dans la section du bas
2. Remplissez les champs :
   - **Fournisseur :** "Test Fournisseur Facture"
   - **Montant HT :** 800
   - **Catégorie :** Sélectionnez "Quincaillerie"
   - **Date de facture :** Aujourd'hui
3. Cliquez sur **"Créer"**
4. ✅ **Vérifiez :** 
   - La facture apparaît dans la section "Factures d'Achats"
   - La colonne "Achats Réalisés" se met à jour automatiquement
   - Les totaux et pourcentages se recalculent

#### **4. Test de Synchronisation en Temps Réel**
1. Observez les montants dans la colonne "Achats Réalisés" avant création
2. Créez un BDC de 1000€ en catégorie "Bois"
3. Réceptionnez-le immédiatement
4. ✅ **Vérifiez :** 
   - La catégorie "Bois" dans "Achats Réalisés" s'incrémente de 1000€
   - Le total global se met à jour
   - Les barres de progression et icônes de comparaison se mettent à jour

#### **5. Test de la Vue d'Ensemble**
1. Créez plusieurs BDC et factures dans différentes catégories
2. ✅ **Vérifiez :** 
   - La section BDC affiche le nombre total et les réceptionnés
   - La section Factures affiche le montant total HT
   - La colonne "Achats Réalisés" reflète tous les achats (BDC + factures)
   - Les comparaisons Estimé vs Réel sont cohérentes

## 📊 Données de Test Disponibles

### Affaire de Test : "25-BOIS-003"
- **Libellé :** Test - Rénovation complète maison individuelle
- **Client :** M. et Mme Test
- **Statut :** PLANIFIEE (65% d'avancement)

#### Objectifs vs Réalisé
- **CA Objectif :** 25 000€ | **CA Réel :** 25 000€ ✅
- **Achats Objectif :** 12 000€ | **Achats Réel :** 10 500€ ✅
- **Heures Fab Objectif :** 150h | **Réel :** 75h
- **Heures Pose Objectif :** 40h | **Réel :** 60h

#### Données Associées
- **1 Devis validé :** DEV-25-003 (25 000€) ✅ VALIDE
- **2 BDC réceptionnés :** BDC-25-003 (6 000€) + BDC-25-004 (3 000€)
- **3 Achats validés :** Total 10 500€
- **2 Phases :** Démolition (terminée) + Rénovation (en cours)

#### Marges Calculées
- **Marge Objectif :** 7 400€ (29.6%)
- **Marge Réelle :** 475€ (1.9%)

## 🎯 Test du Tableau de Bord

1. **Connexion :** Utilisez les identifiants admin ci-dessus
2. **Navigation :** Allez dans "Affaires" → Sélectionnez "25-BOIS-003"
3. **Situation Financière :** Vérifiez que toutes les données s'affichent correctement :
   - Cartes de synthèse (CA, Achats, Heures, Marge, Avancement)
   - **Camembert CA Réel** : Doit afficher 25 000€ avec répartition
   - Graphiques et indicateurs
   - Détails par catégorie

## 🐛 Débogage du Camembert CA Réel

Si le camembert affiche "0,00€" malgré des devis validés :

### 1. Vérifiez la Console du Navigateur (F12)
Recherchez ces logs :
```
🔍 Données financières reçues de l'API: {...}
📊 Devis: {totalValides: 25000, nbDevisValides: 1}
💰 CA réel (devis validés): 25000
📈 Données financières calculées: {...}
```

### 2. Vérifiez l'Authentification
- Assurez-vous d'être connecté avec `admin@example.com`
- Si erreur 401, reconnectez-vous

### 3. Test API Direct
```bash
# 1. Connexion
curl -X POST "http://localhost:8000/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "admin@example.com", "password": "admin123"}'

# 2. Test situation financière (remplacez TOKEN)
curl -X GET "http://localhost:8000/affaires/986008ba-1508-4fdd-8e13-4a08f239c75b/financial-situation" \
     -H "Authorization: Bearer TOKEN" | jq '.devis'
```

**Résultat attendu :** `{"totalValides": 25000, "nbDevisValides": 1}`

### 4. Vérification Base de Données
```bash
cd backend
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.devis.findMany({ 
  where: { affaireId: '986008ba-1508-4fdd-8e13-4a08f239c75b' } 
}).then(devis => {
  console.log('Devis trouvés:');
  devis.forEach(d => console.log(\`- \${d.numero}: \${d.statut} - \${d.montantHt}€\`));
  prisma.\$disconnect();
});
"
```

**Résultat attendu :** `- DEV-25-003: VALIDE - 25000€`

## ✅ Points de Vérification

### Interface Classique
- [ ] Les 5 cartes statistiques affichent les bonnes valeurs
- [ ] **Le camembert CA Réel affiche 25 000€ et la répartition**
- [ ] Les barres de progression montrent les bons pourcentages
- [ ] Les couleurs indiquent correctement les dépassements/économies
- [ ] L'interface d'estimation des achats fonctionne
- [ ] Les données se sauvegardent automatiquement

### **Interface Unifiée (NOUVEAU)**
- [ ] **Accès :** Le bouton "🚀 Interface Unifiée" est visible dans l'onglet Achats
- [ ] **Vue 2 colonnes :** Estimation (gauche) et Achats Réalisés (droite) s'affichent correctement
- [ ] **Section BDC :** Les bons de commande s'affichent avec leur statut (En attente/Réceptionné)
- [ ] **Section Factures :** Les factures d'achats sont listées avec les détails
- [ ] **Création BDC :** Le modal de création fonctionne et génère un numéro automatique
- [ ] **Création Facture :** Le modal de création fonctionne et met à jour les achats réels
- [ ] **Réception BDC :** Le bouton "Réceptionner" fonctionne et met à jour les achats réels
- [ ] **Synchronisation :** Les BDC réceptionnés et factures créées alimentent automatiquement la colonne droite
- [ ] **Totaux :** Les totaux se calculent correctement (BDC réceptionnés + factures)
- [ ] **Catégories :** Le dropdown des catégories affiche les bonnes valeurs (Bois, Acier, Vitrage, etc.)

## 🔧 Dépannage

Si le tableau de bord ne fonctionne pas :

1. **Vérifiez les services :**
   ```bash
   curl http://localhost:8000/health  # Backend
   curl http://localhost:8080         # Frontend
   ```

2. **Redémarrez les services :**
   ```bash
   # Tuer les processus
   lsof -ti:8000 | xargs kill -9
   lsof -ti:8080 | xargs kill -9
   
   # Redémarrer
   cd backend && npm run dev &
   cd frontend && npm run dev &
   ```

3. **Vérifiez les logs :**
   - Backend : Logs dans le terminal où vous avez lancé `npm run dev`
   - Frontend : Console du navigateur (F12)

## 🔧 Correction Majeure : Devis Réalisés

### Problème Identifié
Les devis marqués comme "RÉALISÉ" n'étaient pas pris en compte dans le calcul du CA réel, causant l'affichage de 0€ dans le camembert même quand des devis étaient réalisés.

### Solution Appliquée
**Backend (`backend/src/modules/affaires/affaires.service.ts`)** :

1. **Méthode `getFinancialSituation()`** - ligne 593 :
   ```typescript
   // AVANT
   where: { affaireId, statut: 'VALIDE' }
   
   // APRÈS  
   where: { 
     affaireId, 
     statut: { in: ['VALIDE', 'REALISE'] }
   }
   ```

2. **Méthode `calculateRealFromData()`** - ligne 418 :
   ```typescript
   // AVANT
   where: { statut: 'VALIDE' }
   
   // APRÈS
   where: { statut: { in: ['VALIDE', 'REALISE'] } }
   ```

### Test de Validation
Pour vérifier que la correction fonctionne :
1. Marquez un devis comme "RÉALISÉ" dans l'interface
2. Le camembert doit immédiatement afficher le montant du devis réalisé
3. Le CA réel doit inclure les montants des devis VALIDÉS + RÉALISÉS

## 📝 Notes Importantes

- **Problème résolu :** Le camembert gère maintenant le cas où aucun devis n'est validé
- **Correction majeure :** Les devis réalisés sont maintenant inclus dans le CA réel
- **Interface unifiée ajoutée :** Gestion complète des BDC et factures avec synchronisation automatique
- Les données de test ont été créées automatiquement
- L'affaire "25-BOIS-003" contient des données complètes pour tous les tests
- Tous les calculs de marge et d'avancement sont automatiques
- L'interface d'estimation des achats est intégrée dans l'onglet "Achats"
- **Logs de débogage ajoutés** pour faciliter le diagnostic des problèmes 