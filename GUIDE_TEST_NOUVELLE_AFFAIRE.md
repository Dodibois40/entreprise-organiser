# Guide de Test - Nouvelle Affaire avec Date de Commencement

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

## 🆕 **NOUVELLE FONCTIONNALITÉ : Date de Commencement**

### Accès à la Page "Nouvelle Affaire"
1. **Connexion :** Utilisez les identifiants admin ci-dessus
2. **Navigation :** Allez dans "Affaires" → Cliquez sur "Nouvelle affaire"

### 🎯 Fonctionnalités Ajoutées

#### **Champs de Dates Améliorés**
- **📅 Date de commencement :** Nouveau champ optionnel pour définir quand l'affaire doit commencer
- **📅 Date de clôture prévue :** Champ existant maintenant avec validation intelligente

#### **Validations Automatiques**
- **Cohérence des dates :** La date de clôture ne peut pas être antérieure à la date de commencement
- **Validation visuelle :** Avertissement en temps réel si les dates sont incohérentes
- **Validation à la soumission :** Empêche la création d'une affaire avec des dates invalides

### 🧪 Tests à Effectuer

#### **1. Test de Création avec Date de Commencement**
1. Cliquez sur **"Nouvelle affaire"**
2. Remplissez les champs obligatoires :
   - **Libellé :** "Test - Affaire avec date de commencement"
   - **Client :** "Client Test"
   - **Objectif CA HT :** 15000
   - **Objectif Achat HT :** 8000
   - **Heures Fabrication :** 120
3. **Date de commencement :** Sélectionnez une date future (ex: dans 1 semaine)
4. **Date de clôture prévue :** Sélectionnez une date après le commencement (ex: dans 2 mois)
5. Cliquez sur **"Créer l'affaire"**
6. ✅ **Vérifiez :** L'affaire est créée avec succès

#### **2. Test de Validation des Dates Incohérentes**
1. Créez une nouvelle affaire
2. **Date de commencement :** Sélectionnez le 15 mars 2024
3. **Date de clôture prévue :** Sélectionnez le 10 mars 2024 (antérieure)
4. ✅ **Vérifiez :** 
   - Message d'avertissement en temps réel s'affiche
   - La soumission du formulaire est bloquée
   - Message d'erreur rouge explique le problème

#### **3. Test de Modification avec Nouvelles Dates**
1. Modifiez une affaire existante
2. Ajoutez une date de commencement
3. Modifiez la date de clôture
4. ✅ **Vérifiez :** 
   - Les deux dates sont sauvegardées
   - Les validations fonctionnent en modification

#### **4. Test de l'Interface Utilisateur**
1. ✅ **Vérifiez l'affichage :**
   - Les deux champs de date sont côte à côte
   - Les icônes calendrier sont présentes
   - Les labels sont clairs
   - Le champ date de clôture a une contrainte `min` basée sur la date de commencement
2. ✅ **Vérifiez la réactivité :**
   - Quand on sélectionne une date de commencement, la date de clôture se met à jour automatiquement
   - Les messages d'erreur apparaissent/disparaissent en temps réel

#### **5. Test de Compatibilité avec Affaires Existantes**
1. Ouvrez une affaire existante en modification
2. ✅ **Vérifiez :** 
   - Le nouveau champ "Date de commencement" est présent
   - Il est vide par défaut (pas de régression)
   - La date de clôture existante est conservée

## 📊 Données de Test Conseillées

### Scénarios de Test
1. **Affaire courte :** Commencement dans 1 semaine, clôture dans 1 mois
2. **Affaire longue :** Commencement dans 1 mois, clôture dans 6 mois
3. **Affaire immédiate :** Commencement aujourd'hui, clôture dans 2 semaines
4. **Dates vides :** Tester avec champs optionnels vides

## 🔧 Modifications Techniques Réalisées

### Backend
- ✅ **Schema Prisma :** Ajout du champ `dateCommencement DateTime?`
- ✅ **Migration :** `20250615082257_add_date_commencement_to_affaires`
- ✅ **DTO :** Ajout du champ dans `CreateAffaireDto`
- ✅ **Validation :** Support automatique via `UpdateAffaireDto`

### Frontend
- ✅ **FormData :** Ajout du champ `dateCommencement`
- ✅ **Interface :** Deux champs de date côte à côte
- ✅ **Validation :** Contrôle de cohérence des dates
- ✅ **UX :** Contrainte `min` et messages d'erreur

## ✅ Points de Vérification

### Interface
- [ ] Le champ "Date de commencement" est visible
- [ ] Le champ "Date de clôture prévue" est à côté
- [ ] Les deux champs ont l'icône calendrier
- [ ] La validation des dates fonctionne en temps réel

### Fonctionnalité
- [ ] **Création :** Une affaire avec date de commencement se crée correctement
- [ ] **Modification :** Une affaire existante peut être modifiée avec la nouvelle date
- [ ] **Validation :** Les dates incohérentes sont rejetées
- [ ] **Compatibilité :** Les affaires existantes restent fonctionnelles

### Base de Données
- [ ] **Migration :** Le champ `dateCommencement` existe dans la table `affaires`
- [ ] **Données :** Les nouvelles affaires stockent correctement la date
- [ ] **Nullité :** Le champ accepte les valeurs nulles (optionnel)

## 🐛 Dépannage

Si les tests ne fonctionnent pas :

1. **Vérifiez les services :**
   ```bash
   curl http://localhost:8000/health  # Backend
   ```

2. **Vérifiez la migration :**
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

- **Rétrocompatibilité :** Les affaires existantes sans date de commencement continuent de fonctionner
- **Validation intelligente :** La date de clôture s'adapte automatiquement à la date de commencement
- **Interface intuitive :** Les deux dates sont présentées de manière logique et cohérente
- **Migration automatique :** La base de données est mise à jour automatiquement

---

**Statut :** ✅ Fonctionnalité implémentée et prête pour les tests
**Version :** 2025-06-15 - Ajout date de commencement 