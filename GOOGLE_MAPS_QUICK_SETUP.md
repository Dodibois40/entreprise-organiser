# Configuration rapide Google Maps API

## 🚀 Activation de l'auto-complétion d'adresses

### Étape 1 : Obtenir une clé API
1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un projet ou sélectionnez un projet existant
3. Activez l'API "Places API"
4. Créez une clé API dans "APIs & Services" > "Credentials"

### Étape 2 : Configurer la clé
1. Ouvrez le fichier `frontend/.env`
2. Remplacez `VOTRE_CLE_API` par votre vraie clé :
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

### Étape 3 : Redémarrer le serveur
```bash
cd frontend
npm run dev
```

## 💡 Mode actuel
- ✅ **Saisie manuelle** : Fonctionne sans clé API
- ⚠️ **Auto-complétion** : Nécessite une clé API Google Maps

## 🔒 Sécurité
- Ajoutez des restrictions sur votre clé API
- Limitez l'usage aux domaines autorisés
- Ne commitez jamais votre clé API dans Git

## 💰 Coûts
- Google offre 200$ de crédit gratuit par mois
- L'auto-complétion coûte ~0.017$ par requête après épuisement du crédit 