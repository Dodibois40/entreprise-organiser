# Guide de Test - Suppression Heures de Service

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
Le frontend sera accessible sur un port disponible (8080, 8081, 8082, 8083...)

## 🔐 Identifiants de Connexion

### Administrateur
- **Email :** `admin@example.com`
- **Mot de passe :** `admin123`
- **Rôle :** ADMIN_SYS (accès complet)

## 🗑️ **MODIFICATION RÉALISÉE : Suppression Heures de Service**

### Accès à la Page "Nouvelle Affaire"
1. **Connexion :** Utilisez les identifiants admin ci-dessus
2. **Navigation :** Allez dans "Affaires" → Cliquez sur "Nouvelle affaire"

### 🎯 Modifications Appliquées

#### **Section "Objectifs financiers et planning"**
- **❌ SUPPRIMÉ :** Champ "Heures Service" 
- **✅ CONSERVÉ :** Champ "Heures Fabrication" (obligatoire)
- **✅ CONSERVÉ :** Champ "Heures Pose" (optionnel)
- **🔄 MISE À JOUR :** Interface passe de 3 colonnes à 2 colonnes

#### **Calculs Automatiques Mis à Jour**
- **Total heures :** Maintenant = Heures Fabrication + Heures Pose
- **Coût horaire moyen :** Basé sur le nouveau calcul des heures totales
- **Affichage latéral :** Suppression de "Ser:" dans le résumé

### 🧪 Tests à Effectuer

#### **1. Test de Création d'une Nouvelle Affaire**
1. Cliquez sur **"Nouvelle affaire"**
2. Remplissez les champs obligatoires :
   - **Libellé :** "Test - Affaire sans heures service"
   - **Client :** "Client Test"
   - **Objectif CA HT :** 20000
   - **Objectif Achat HT :** 10000
   - **Heures Fabrication :** 100
   - **Heures Pose :** 30
3. **Vérifiez l'interface :**
   - ✅ Seulement 2 champs pour les heures (Fabrication et Pose)
   - ✅ Layout en 2 colonnes au lieu de 3
   - ✅ Pas de mention "Heures Service" nulle part
4. **Vérifiez les calculs :**
   - ✅ Total heures = 130h (100 + 30)
   - ✅ Coût horaire moyen basé sur 130h
   - ✅ Affichage "Fab: 100h • Pose: 30h" (sans "Ser:")
5. Cliquez sur **"Créer l'affaire"**
6. ✅ **Vérifiez :** L'affaire est créée avec succès

#### **2. Test de Modification d'une Affaire Existante**
1. Modifiez une affaire existante (créée avant la modification)
2. ✅ **Vérifiez :** 
   - Le champ "Heures Service" n'apparaît plus
   - Les heures existantes de fabrication et pose sont conservées
   - Les calculs se basent uniquement sur fabrication + pose
3. Modifiez les valeurs et sauvegardez
4. ✅ **Vérifiez :** La sauvegarde fonctionne sans erreur

#### **3. Test de Cohérence des Calculs**
1. Créez une affaire avec :
   - **CA :** 15000€
   - **Achats :** 8000€
   - **Heures Fab :** 80h
   - **Heures Pose :** 20h
2. ✅ **Vérifiez dans la colonne de droite :**
   - **Marge prévisionnelle :** 7000€ (15000 - 8000)
   - **Total heures :** 100h (80 + 20)
   - **Coût horaire moyen :** 70€/h (7000 ÷ 100)
   - **Affichage détail :** "Fab: 80h • Pose: 20h"

#### **4. Test de Validation**
1. Tentez de créer une affaire sans heures de fabrication
2. ✅ **Vérifiez :** Message d'erreur approprié
3. Saisissez des heures négatives
4. ✅ **Vérifiez :** Validation empêche la saisie

#### **5. Test de Compatibilité avec Affaires Existantes**
1. Accédez à des affaires créées avant la modification
2. ✅ **Vérifiez :** 
   - Elles s'ouvrent sans erreur
   - Les calculs se basent maintenant sur fabrication + pose uniquement
   - Pas de régression dans l'affichage

## 📊 Données de Test Conseillées

### Scénarios de Test
1. **Affaire simple :** Fabrication 100h, Pose 20h
2. **Affaire complexe :** Fabrication 150h, Pose 50h
3. **Affaire sans pose :** Fabrication 80h, Pose 0h
4. **Affaire importante :** Fabrication 200h, Pose 100h

## 🔧 Modifications Techniques Réalisées

### Frontend
- ✅ **Formulaire :** Suppression du champ "Heures Service"
- ✅ **État :** Retrait `objectifHeuresSer` de `formData`
- ✅ **Calculs :** Mise à jour `calculateMetrics()` sans heures service
- ✅ **Validation :** Suppression validation heures service
- ✅ **Interface :** Passage de 3 à 2 colonnes
- ✅ **Affichage :** Mise à jour résumé heures latéral

### Backend
- ✅ **DTO :** Suppression `objectifHeuresSer` du `CreateAffaireDto`
- ✅ **Schema Prisma :** Suppression champs `objectifHeuresSer` et `heuresReellesSer`
- ✅ **Base de données :** Application changements avec `db push`

## ✅ Points de Vérification

### Interface
- [ ] Le champ "Heures Service" a disparu du formulaire
- [ ] Les champs restants (Fabrication, Pose) sont sur 2 colonnes
- [ ] L'interface reste équilibrée et lisible
- [ ] Pas de trace de "Heures Service" dans l'interface

### Fonctionnalité
- [ ] **Création :** Les nouvelles affaires se créent avec 2 types d'heures
- [ ] **Modification :** Les affaires existantes peuvent être modifiées
- [ ] **Calculs :** Total heures = Fabrication + Pose uniquement
- [ ] **Sauvegarde :** Aucune erreur lors de la sauvegarde

### Calculs
- [ ] **Total heures :** Somme correcte de Fabrication + Pose
- [ ] **Coût horaire :** Calcul basé sur le nouveau total
- [ ] **Affichage :** Format "Fab: Xh • Pose: Yh" sans mention de Service
- [ ] **Cohérence :** Tous les calculs prévisionnels corrects

### Base de Données
- [ ] **Schema :** Champs `objectifHeuresSer` et `heuresReellesSer` supprimés
- [ ] **Données :** Nouvelles affaires sans ces champs
- [ ] **Migration :** Base de données synchronisée

## 🐛 Dépannage

Si les tests ne fonctionnent pas :

1. **Vérifiez les services :**
   ```bash
   curl http://localhost:8000/health  # Backend
   ```

2. **Vérifiez la base de données :**
   ```bash
   cd backend
   npx prisma db push
   ```

3. **Redémarrez les services :**
   ```bash
   # Backend
   cd backend && npm run dev
   
   # Frontend  
   cd frontend && npm run dev
   ```

## 📝 Notes Importantes

- **Rétrocompatibilité :** Les affaires existantes continuent de fonctionner
- **Calculs simplifiés :** Plus que 2 types d'heures à gérer (Fabrication + Pose)
- **Interface épurée :** Layout plus simple et plus lisible
- **Cohérence :** Suppression complète du concept "heures de service"

---

**Statut :** ✅ Suppression implémentée et prête pour les tests
**Version :** 2025-06-15 - Suppression heures de service 