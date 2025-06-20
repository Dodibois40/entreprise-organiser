# 🗺️ Configuration Google Maps API

## Étapes de configuration

### 1. Créer un projet Google Cloud

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez la facturation pour votre projet

### 2. Activer les APIs nécessaires

Dans la console Google Cloud, activez les APIs suivantes :

- **Places API** - Pour l'auto-complétion d'adresses
- **Maps JavaScript API** - Pour l'affichage des cartes
- **Geocoding API** - Pour la conversion adresse ↔ coordonnées

### 3. Créer une clé API

1. Allez dans **APIs & Services > Credentials**
2. Cliquez sur **Create Credentials > API Key**
3. Copiez votre clé API

### 4. Configurer les restrictions (optionnel mais recommandé)

#### Restrictions d'API :
- Limitez la clé aux APIs : Places API, Maps JavaScript API, Geocoding API

#### Restrictions d'application :
- **En développement** : Pas de restriction
- **En production** : Limitez aux domaines autorisés

### 5. Configuration dans l'application

#### Frontend

Créez un fichier `.env` dans le dossier `frontend/` :

```bash
# Google Maps API
REACT_APP_GOOGLE_MAPS_API_KEY=votre_cle_api_ici
```

**⚠️ Important :** Ajoutez `.env` à votre `.gitignore` pour éviter de commettre votre clé API !

#### Variables d'environnement

```bash
# Frontend .env
REACT_APP_GOOGLE_MAPS_API_KEY=AIzaSyC...

# Pour le développement local
VITE_APP_NAME=Entreprise Organiser
VITE_API_URL=http://localhost:8000
```

## 🚀 Fonctionnalités

### Auto-complétion d'adresse
- Saisie assistée avec suggestions en temps réel
- Limitation aux adresses françaises
- Parsing automatique des composants (rue, code postal, ville, pays)

### Champs séparés
- **Rue** : Numéro et nom de rue
- **Code postal** : Validation format français (5 chiffres)
- **Ville** : Nom de la ville
- **Pays** : Par défaut "France"
- **Coordonnées GPS** : Latitude/Longitude automatiques

### Validation
- Code postal français obligatoire
- Vérification de cohérence des données
- Gestion d'erreurs réseau

## 💰 Coûts

### Tarification Google Maps (indicative)

- **Places API (Autocomplete)** : ~2,83€ / 1000 requêtes
- **Geocoding API** : ~5€ / 1000 requêtes
- **Maps JavaScript API** : Gratuit jusqu'à 28 000 chargements/mois

### Optimisations pour réduire les coûts

1. **Debouncing** : Limite les requêtes en temps réel
2. **Cache local** : Mémorise les résultats récents
3. **Limitation géographique** : Restriction à la France
4. **Session tokens** : Optimise le coût des auto-complétions

## 🔒 Sécurité

### Bonnes pratiques

1. **Ne jamais committer** la clé API dans le code
2. **Utiliser des variables d'environnement**
3. **Restreindre la clé** aux APIs nécessaires
4. **Limiter par domaine** en production
5. **Monitorer l'usage** dans Google Cloud Console

### Restrictions recommandées

```javascript
// Restrictions pour la production
{
  "http_referrers": [
    "https://votre-domaine.com/*",
    "https://www.votre-domaine.com/*"
  ],
  "apis": [
    "places-api",
    "maps-js-api", 
    "geocoding-api"
  ]
}
```

## 🐛 Dépannage

### Erreurs communes

1. **"API key not valid"**
   - Vérifiez que la clé est correcte
   - Assurez-vous que les APIs sont activées

2. **"This API project is not authorized"**
   - Activez la facturation sur Google Cloud
   - Vérifiez les restrictions de la clé

3. **"REQUEST_DENIED"**
   - Vérifiez les restrictions de domaine
   - Assurez-vous que l'API est activée

### Mode fallback

Si l'API Google Maps n'est pas disponible :
- L'application continue de fonctionner
- Les champs d'adresse restent modifiables manuellement
- Un message d'avertissement s'affiche

## 📚 Documentation

- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)
- [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- [Geocoding API](https://developers.google.com/maps/documentation/geocoding/overview) 