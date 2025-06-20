# 🗺️ Intégration Google Maps - Guide d'utilisation

## ✨ Fonctionnalités ajoutées

### **1. Liens automatiques vers Google Maps**
- ✅ **Affichage intelligent** : Lien "Voir sur la carte" pour chaque adresse
- ✅ **Itinéraires GPS** : Bouton "Itinéraire" pour navigation directe
- ✅ **Support coordonnées GPS** : Utilisation prioritaire des coordonnées quand disponibles
- ✅ **Compatible mobile** : Ouverture dans l'app Google Maps mobile

### **2. Composants créés**

#### **`AddressLink`** - Composant complet
```jsx
<AddressLink 
  addressData={affaire}
  showDirections={true}
  showMapLink={true}
  className="custom-class"
/>
```

#### **`GoogleMapsButton`** - Bouton compact
```jsx
<GoogleMapsButton 
  addressData={affaire}
  type="map" // ou "directions"
  size="sm"  // sm, md, lg
  variant="ghost" // primary, secondary, ghost
/>
```

### **3. Utilitaires disponibles**

#### **`generateGoogleMapsLink(addressData)`**
Génère un lien Google Maps à partir des données d'adresse.

#### **`generateGoogleMapsDirectionsLink(addressData)`**
Génère un lien pour obtenir des directions vers l'adresse.

#### **`formatAddress(addressData)`**
Formate une adresse pour l'affichage.

#### **`isAddressValid(addressData)`**
Vérifie si une adresse peut être utilisée pour Google Maps.

## 🎯 Où sont utilisés les liens Google Maps

### **1. Page détails d'affaire (`AffaireDetails.jsx`)**
- Affichage complet de l'adresse avec liens carte et itinéraire
- Coordonnées GPS affichées si disponibles
- Style adapté au design de la page

### **2. Liste des affaires (`AffairesList.jsx`)**
- Lien compact "Voir sur la carte" sous les informations client
- Pas de bouton itinéraire pour éviter l'encombrement
- Affiché seulement si une adresse existe

### **3. Formulaire de création/modification**
- Auto-complétion Google Places (avec clé API)
- Saisie manuelle des champs d'adresse
- Stockage des coordonnées GPS automatique

## 🔧 Configuration requise

### **Avec clé API Google Maps :**
```bash
# Dans frontend/.env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

**Avantages :**
- ✅ Auto-complétion d'adresses
- ✅ Géocodage automatique (coordonnées GPS)
- ✅ Restriction aux adresses françaises
- ✅ Validation en temps réel

### **Sans clé API :**
**Fonctionnalités disponibles :**
- ✅ Saisie manuelle des adresses
- ✅ Liens Google Maps générés à partir du texte
- ✅ Tous les boutons et liens fonctionnent
- ❌ Pas d'auto-complétion
- ❌ Pas de coordonnées GPS automatiques

## 📱 Types de liens générés

### **1. Avec coordonnées GPS (prioritaire)**
```
https://www.google.com/maps?q=48.8566,2.3522
```

### **2. Avec adresse textuelle**
```
https://www.google.com/maps/search/?api=1&query=123%20Rue%20de%20la%20Paix%2C%2075001%20Paris
```

### **3. Liens d'itinéraire**
```
https://www.google.com/maps/dir/?api=1&destination=48.8566,2.3522
```

## 🎨 Styles et variantes

### **Variantes de boutons**
- **`primary`** : Fond bleu, texte blanc
- **`secondary`** : Fond gris, texte sombre
- **`ghost`** : Transparent, texte bleu

### **Tailles disponibles**
- **`sm`** : 24x24px (pour listes)
- **`md`** : 32x32px (standard)
- **`lg`** : 40x40px (pour headers)

## 🚀 Exemples d'utilisation

### **Affichage complet dans une carte**
```jsx
<Card>
  <CardContent>
    <h3>Adresse du chantier</h3>
    <AddressLink 
      addressData={affaire}
      showDirections={true}
      showMapLink={true}
    />
  </CardContent>
</Card>
```

### **Bouton compact dans une liste**
```jsx
<div className="flex items-center gap-2">
  <span>{affaire.libelle}</span>
  <GoogleMapsButton 
    addressData={affaire}
    type="map"
    size="sm"
  />
</div>
```

### **Génération de lien programmatique**
```jsx
import { generateGoogleMapsLink } from '@/utils/googleMapsUtils';

const handleOpenMaps = () => {
  const link = generateGoogleMapsLink(affaire);
  if (link) {
    window.open(link, '_blank');
  }
};
```

## 📊 Structure des données d'adresse

```javascript
const addressData = {
  // Adresse complète (optionnel)
  adresse: "123 Rue de la Paix, 75001 Paris, France",
  
  // Champs séparés (recommandé)
  rue: "123 Rue de la Paix",
  codePostal: "75001", 
  ville: "Paris",
  pays: "France",
  
  // Coordonnées GPS (optionnel, prioritaire)
  latitude: 48.8566,
  longitude: 2.3522
};
```

## 🔍 Détection automatique

Le système utilise cette priorité pour générer les liens :

1. **Coordonnées GPS** (latitude/longitude) - Plus précis
2. **Adresse complète** (champ `adresse`) - Pratique
3. **Champs séparés** (rue + code postal + ville) - Flexible
4. **Ville seule** (minimum requis) - Basique

## 🌐 Compatibilité

### **Navigateurs supportés**
- ✅ Chrome, Firefox, Safari, Edge
- ✅ Mobiles iOS et Android
- ✅ Mode sombre/clair

### **Appareils mobiles**
- ✅ Ouverture automatique dans l'app Google Maps
- ✅ Navigation GPS directe
- ✅ Partage d'adresse

## 🛠️ Maintenance

### **Mise à jour des liens**
Les liens sont générés dynamiquement à chaque affichage, donc :
- ✅ Toujours à jour avec les dernières données
- ✅ Pas de cache à vider
- ✅ Modification d'adresse immédiatement prise en compte

### **Logs et debugging**
```javascript
// Vérifier si une adresse est valide
import { isAddressValid } from '@/utils/googleMapsUtils';
console.log('Adresse valide :', isAddressValid(addressData));

// Générer et tester un lien
import { generateGoogleMapsLink } from '@/utils/googleMapsUtils';
const link = generateGoogleMapsLink(addressData);
console.log('Lien généré :', link);
```

## 📈 Améliorations futures possibles

- 🔄 **Cache intelligent** : Mettre en cache les coordonnées géocodées
- 📍 **Localisation utilisateur** : Directions depuis la position actuelle
- 🗺️ **Carte intégrée** : Widget Google Maps directement dans l'interface
- 📱 **Apps natives** : Liens vers Waze, Apple Plans, etc.
- 🏢 **Adresses clients** : Extension aux adresses de facturation
- 📊 **Analytics** : Suivi de l'utilisation des liens Maps 