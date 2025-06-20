# Guide de Test - Automatisation des Calculs

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
Le frontend sera accessible sur `http://localhost:8080` (ou 8083 si occupé)

## 🔐 Identifiants de Connexion

### Administrateur
- **Email :** `admin@example.com`
- **Mot de passe :** `admin123`
- **Rôle :** ADMIN_SYS (accès complet)

## 🎯 **NOUVEAU : Automatisation des Calculs Financiers**

### Accès au Formulaire
1. **Connexion :** Utilisez les identifiants admin ci-dessus
2. **Navigation :** Allez dans "Affaires" → Cliquez sur **"Nouvelle Affaire"**

### 🧮 Fonctionnalités d'Automatisation

#### **Calculs Automatiques basés sur le CA HT**
Quand vous saisissez un **Objectif CA HT**, les champs suivants se remplissent automatiquement :

- **Objectif d'Achat HT** : 20% du CA HT
- **Heures Fabrication** : 24h pour 10 000€ de CA (24h/10 000€)
- **Heures Pose** : 16h pour 10 000€ de CA (16h/10 000€)
- **Frais Généraux** : 30% du CA HT

#### **Nouveau Champ : Frais Généraux**
- Ajout d'un champ "Frais Généraux" dans la section "Objectifs financiers et planning"
- Pré-rempli automatiquement à 30% du CA objectif
- Pris en compte dans le calcul de la marge prévisionnelle

### 🧪 Tests à Effectuer

#### **Test 1 : Automatisation avec CA HT = 10 000€**
1. Dans le champ **"Objectif CA HT (€)"**, saisissez : `10000`
2. Appuyez sur Tab ou cliquez ailleurs
3. ✅ **Vérifiez que les champs se remplissent automatiquement :**
   - **Objectif Achat HT** : `2000` (20% de 10 000€)
   - **Heures Fabrication** : `24` (24h pour 10 000€)
   - **Heures Pose** : `16` (16h pour 10 000€)
   - **Frais Généraux** : `3000` (30% de 10 000€)

#### **Test 2 : Automatisation avec CA HT = 25 000€**
1. Effacez le champ **"Objectif CA HT (€)"** et saisissez : `25000`
2. Appuyez sur Tab ou cliquez ailleurs
3. ✅ **Vérifiez que les champs se remplissent automatiquement :**
   - **Objectif Achat HT** : `5000` (20% de 25 000€)
   - **Heures Fabrication** : `60` (24h × 2.5)
   - **Heures Pose** : `40` (16h × 2.5)
   - **Frais Généraux** : `7500` (30% de 25 000€)

#### **Test 3 : Calcul de la Marge Prévisionnelle**
Avec CA HT = 10 000€ (valeurs automatiques) :
1. ✅ **Vérifiez dans la colonne latérale "Calculs prévisionnels" :**
   - **Marge prévisionnelle** : `2 200€` (10 000 - 2 000 - 3 000 - 2 800)
   - **Taux de marge** : `22.0%` (2 200 / 10 000 × 100)
   - **Coût des heures** : `2 800€` (24h × 100€ + 16h × 50€)
   - **Coût horaire moyen** : `70€/h` ((2 400 + 800) / 40h)

#### **Test 4 : Modification Manuelle des Champs**
1. Après l'automatisation, modifiez manuellement :
   - **Objectif Achat HT** : `3000`
   - **Frais Généraux** : `2500`
2. ✅ **Vérifiez que la marge se recalcule :**
   - **Marge prévisionnelle** : `4 500€` (10 000 - 3 000 - 2 500)
   - **Taux de marge** : `45.0%`

#### **Test 5 : Différentes Valeurs de CA**
Testez avec d'autres montants pour vérifier la cohérence :

| CA HT | Achat (20%) | Fab (24h/10k€) | Pose (16h/10k€) | FG (30%) | Coût Heures | Marge |
|-------|-------------|----------------|-----------------|----------|-------------|-------|
| 5 000€ | 1 000€ | 12h (1 200€) | 8h (400€) | 1 500€ | 1 600€ | 900€ |
| 15 000€ | 3 000€ | 36h (3 600€) | 24h (1 200€) | 4 500€ | 4 800€ | 2 700€ |
| 50 000€ | 10 000€ | 120h (12 000€) | 80h (4 000€) | 15 000€ | 16 000€ | 9 000€ |

#### **Test 6 : Création Complète d'une Affaire**
1. Remplissez tous les champs obligatoires :
   - **Libellé** : "Test Automatisation - Rénovation complète"
   - **Client** : "M. Test Automatisation"
   - **Objectif CA HT** : `15000`
2. Laissez l'automatisation remplir les autres champs
3. Cliquez sur **"Créer l'affaire"**
4. ✅ **Vérifiez que l'affaire est créée avec tous les champs automatiques**

#### **Test 7 : Mode Édition (Pas d'Automatisation)**
1. Éditez une affaire existante
2. Modifiez le **CA HT**
3. ✅ **Vérifiez que l'automatisation ne se déclenche PAS** (pour préserver les valeurs existantes)

### 📊 Indicateurs Visuels

#### **Notification d'Automatisation**
- Une petite info-bulle bleue apparaît sous le champ "Objectif CA HT" : 
  *"ℹ️ Les autres champs se remplissent automatiquement"*
- Cette notification n'apparaît que lors de la création (pas en édition)

#### **Calculs en Temps Réel**
La colonne latérale "Calculs prévisionnels" se met à jour instantanément avec :
- **Marge prévisionnelle** (CA - Achats - Frais Généraux)
- **Taux de marge** avec code couleur :
  - 🟢 Vert : ≥ 20%
  - 🟡 Jaune : 10-19%
  - 🔴 Rouge : < 10%

### 🔧 Formules de Calcul

#### **Automatisation (basée sur CA HT)**
```
Objectif Achat HT = CA HT × 0.20 (20%)
Heures Fabrication = (CA HT / 10000) × 24
Heures Pose = (CA HT / 10000) × 16
Frais Généraux = CA HT × 0.30 (30%)

Coût Heures Fabrication = Heures Fab × 100€/h
Coût Heures Pose = Heures Pose × 50€/h
Marge = CA HT - Achats - Frais Généraux - Coût Total Heures
```

#### **Marge Prévisionnelle**
```
Marge = CA HT - Objectif Achat HT - Frais Généraux
Taux de Marge = (Marge / CA HT) × 100
Coût Horaire Moyen = Marge / (Heures Fab + Heures Pose)
```

## ✅ Points de Vérification

### Automatisation
- [ ] **CA HT = 10 000€** → Achat: 2 000€, Fab: 24h, Pose: 16h, FG: 3 000€
- [ ] **Calculs instantanés** : Marge, taux, coût horaire se mettent à jour
- [ ] **Notification visible** : Info-bulle sous le champ CA HT (création uniquement)
- [ ] **Modification manuelle possible** : Les champs restent éditables après automatisation
- [ ] **Pas d'automatisation en édition** : Préservation des valeurs existantes

### Interface
- [ ] **Nouveau champ "Frais Généraux"** visible dans le formulaire
- [ ] **Calculs prévisionnels** incluent les frais généraux dans la marge
- [ ] **Validation** : Tous les champs acceptent les valeurs automatiques
- [ ] **Sauvegarde** : L'affaire se crée avec toutes les valeurs automatiques

### Base de Données
- [ ] **Champ `objectifFraisGeneraux`** ajouté au modèle Affaire
- [ ] **Migration appliquée** : Nouvelles affaires incluent les frais généraux
- [ ] **Rétrocompatibilité** : Affaires existantes ont FG = 0 par défaut

## 🐛 Dépannage

### Automatisation ne fonctionne pas
1. **Vérifiez la console du navigateur** (F12) pour les erreurs JavaScript
2. **Testez en mode création** (pas édition)
3. **Saisissez un nombre valide** dans le champ CA HT
4. **Cliquez ailleurs** ou appuyez sur Tab pour déclencher l'événement

### Calculs incorrects
1. **Vérifiez les formules** dans la console :
   ```javascript
   // Dans la console du navigateur
   const ca = 10000;
   console.log('Achat:', Math.round(ca * 0.20));
   console.log('Fab:', Math.round(ca / 10000 * 24));
   console.log('Pose:', Math.round(ca / 10000 * 16));
   console.log('FG:', Math.round(ca * 0.30));
   ```

### Backend ne démarre pas
```bash
# Tuer les processus
lsof -ti:8000 | xargs kill -9

# Redémarrer
cd backend && npm run dev
```

## 📝 Notes Importantes

- **Automatisation uniquement en création** : Préserve les données existantes lors de l'édition
- **Valeurs arrondies** : Tous les calculs sont arrondis à l'entier le plus proche
- **Champs modifiables** : L'utilisateur peut ajuster les valeurs automatiques
- **Nouveau calcul de marge** : Inclut maintenant les frais généraux (CA - Achats - FG)
- **Rétrocompatibilité** : Les affaires existantes ont des frais généraux à 0€ par défaut 