# Guide - Calculs de Marge Améliorés avec Taux Horaires

## 🎯 **Objectif de l'Amélioration**

Intégration de taux horaires par défaut pour calculer correctement la marge prévisionnelle en tenant compte du coût réel des heures de travail.

## 💰 **Taux Horaires par Défaut**

- **Heures Fabrication** : `100€ HT/h`
- **Heures Pose** : `50€ HT/h`

## 🧮 **Nouvelle Formule de Calcul de Marge**

### **Ancienne Formule (Incorrecte)**
```
Marge = CA HT - Achats - Frais Généraux
```

### **Nouvelle Formule (Correcte)**
```
Coût Heures Fabrication = Heures Fab × 100€/h
Coût Heures Pose = Heures Pose × 50€/h
Coût Total Heures = Coût Heures Fab + Coût Heures Pose

Marge = CA HT - Achats - Frais Généraux - Coût Total Heures
```

## 📊 **Exemple Concret : CA HT = 10 000€**

### **Calculs Automatiques**
- **Objectif Achat HT** : 10 000€ × 0.20 = `2 000€`
- **Heures Fabrication** : (10 000€ / 10 000€) × 24 = `24h`
- **Heures Pose** : (10 000€ / 10 000€) × 16 = `16h`
- **Frais Généraux** : 10 000€ × 0.30 = `3 000€`

### **Calculs des Coûts Horaires**
- **Coût Heures Fabrication** : 24h × 100€/h = `2 400€`
- **Coût Heures Pose** : 16h × 50€/h = `800€`
- **Coût Total Heures** : 2 400€ + 800€ = `2 800€`

### **Calcul de la Marge**
```
Marge = 10 000€ - 2 000€ - 3 000€ - 2 800€ = 2 200€
Taux de Marge = (2 200€ / 10 000€) × 100 = 22.0%
```

### **Coût Horaire Moyen Pondéré**
```
Coût Horaire Moyen = (2 400€ + 800€) / (24h + 16h) = 3 200€ / 40h = 80€/h
```

## 🔄 **Comparaison Avant/Après**

| Élément | Ancienne Méthode | Nouvelle Méthode |
|---------|------------------|------------------|
| **Marge** | 5 000€ (50%) | 2 200€ (22%) |
| **Coût Horaire** | 125€/h (marge/heures) | 80€/h (pondéré) |
| **Réalisme** | ❌ Surévalué | ✅ Réaliste |

## 📈 **Affichage dans l'Interface**

### **Section "Calculs Prévisionnels"**

1. **Marge Prévisionnelle**
   - Montant en euros avec indicateur de couleur selon le taux
   - Taux de marge en pourcentage

2. **Coût des Heures** (NOUVEAU)
   - Coût total des heures
   - Détail : Fab: 24h × 100€ = 2 400€
   - Détail : Pose: 16h × 50€ = 800€

3. **Coût Horaire Moyen**
   - Coût horaire pondéré par les taux
   - Total des heures affiché

## 🎨 **Indicateurs Visuels**

### **Couleurs du Taux de Marge**
- 🟢 **Vert** : Taux ≥ 20% (Excellent)
- 🟡 **Jaune** : Taux ≥ 10% (Acceptable)
- 🔴 **Rouge** : Taux < 10% (Attention)

### **Alertes**
- Alerte automatique si taux de marge < 10%
- Message d'avertissement sur la rentabilité

## 🧪 **Tests de Validation**

### **Test 1 : CA HT = 10 000€**
- ✅ Marge : 2 200€ (22%)
- ✅ Coût heures : 2 800€
- ✅ Coût horaire moyen : 80€/h

### **Test 2 : CA HT = 25 000€**
- ✅ Marge : 5 500€ (22%)
- ✅ Coût heures : 7 000€
- ✅ Coût horaire moyen : 80€/h

### **Test 3 : Modification Manuelle**
- ✅ Recalcul automatique des métriques
- ✅ Mise à jour des indicateurs visuels

## 🔧 **Implémentation Technique**

### **Frontend (AffaireForm.jsx)**
```javascript
// Taux horaires par défaut
const TAUX_FABRICATION = 100; // 100€ HT/h
const TAUX_POSE = 50; // 50€ HT/h

// Calcul du coût des heures
const coutHeuresFab = heuresFab * TAUX_FABRICATION;
const coutHeuresPose = heuresPose * TAUX_POSE;
const coutTotalHeures = coutHeuresFab + coutHeuresPose;

// Marge corrigée
const margePrevisionnelle = ca - achat - fraisGeneraux - coutTotalHeures;
```

## 📋 **Avantages de cette Amélioration**

1. **Réalisme** : Calcul de marge plus proche de la réalité
2. **Transparence** : Coût des heures visible et détaillé
3. **Aide à la décision** : Indicateurs visuels pour la rentabilité
4. **Cohérence** : Taux horaires standardisés dans l'application
5. **Évolutivité** : Possibilité d'ajuster les taux selon les besoins

## 🚀 **Prochaines Améliorations Possibles**

1. **Taux Variables** : Permettre la modification des taux horaires par affaire
2. **Historique** : Suivi de l'évolution des taux dans le temps
3. **Catégories** : Taux différents selon le type de travail
4. **Seuils Personnalisés** : Alertes configurables selon les objectifs

---

**Note** : Cette amélioration rend les calculs de marge plus précis et aide à une meilleure évaluation de la rentabilité des affaires. 