# 🔥 Guide de Configuration Firebase Storage

## Vue d'ensemble

Ce guide vous accompagne dans la configuration complète de Firebase Storage pour l'application Entreprise Organiser, permettant l'upload et la gestion des PDFs des bons de commande (BDC).

## 📋 Prérequis

- Compte Google
- Projet Firebase existant ou nouveau
- Accès administrateur au projet

## 🚀 Étape 1 : Accès à la Console Firebase

1. **Ouvrir la console Firebase**
   - Aller sur : https://console.firebase.google.com/
   - Se connecter avec votre compte Google

2. **Sélectionner/Créer le projet**
   - Si le projet existe : Cliquer sur "entreprise-organiser"
   - Si nouveau projet : Cliquer sur "Ajouter un projet" et suivre les étapes

## 💳 Étape 2 : Activation du Plan Blaze (OBLIGATOIRE)

⚠️ **Important** : Firebase Storage nécessite maintenant le plan Blaze (pay-as-you-go)

1. **Mettre à niveau le projet**
   - Dans la console, cliquer sur "Upgrade" ou "Mettre à niveau"
   - Sélectionner le plan "Blaze"

2. **Configurer la facturation**
   - Ajouter une méthode de paiement
   - Configurer des alertes budgétaires (recommandé : 10€/mois)

3. **Niveau gratuit inclus**
   - 5 GB de stockage
   - 1 GB de téléchargement/jour
   - 20 000 uploads/jour
   - 50 000 téléchargements/jour

## 🗄️ Étape 3 : Configuration de Firebase Storage

1. **Activer Storage**
   - Dans le menu latéral, cliquer sur "Storage"
   - Cliquer sur "Get started" / "Commencer"

2. **Choisir la région**
   - **Recommandé** : `europe-west1` (Belgique) pour la proximité
   - **Alternative gratuite** : `us-central1` (inclus dans le niveau gratuit)

3. **Configuration initiale**
   - Accepter les conditions
   - Cliquer sur "Terminé"

## 🔒 Étape 4 : Configuration des Règles de Sécurité

### Règles de développement (temporaires)

1. **Aller dans l'onglet "Rules"**
2. **Remplacer les règles par** :

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      // RÈGLES TEMPORAIRES POUR LE DÉVELOPPEMENT
      // ⚠️ À SÉCURISER AVANT LA PRODUCTION ⚠️
      allow read, write: if true;
    }
  }
}
```

3. **Publier les règles**

### Règles de production (à implémenter plus tard)

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Structure : bdc/{bdcId}/{timestamp}_{filename}.pdf
    match /bdc/{bdcId}/{fileName} {
      // Lecture : authentifié ou accès public pour prévisualisation
      allow read: if true; // ou if request.auth != null;
      
      // Écriture : utilisateur authentifié uniquement
      allow write: if request.auth != null
                   && request.resource.size < 10 * 1024 * 1024  // Max 10MB
                   && request.resource.contentType == 'application/pdf'; // PDF uniquement
    }
    
    // Dossier de test
    match /test/{fileName} {
      allow read, write: if true;
    }
  }
}
```

## 🔧 Étape 5 : Configuration de l'Application

### Configuration déjà en place

Les fichiers suivants sont déjà configurés dans l'application :

- `frontend/src/config/firebase.js` - Configuration Firebase
- `frontend/src/services/firebaseStorageService.js` - Service de stockage
- `frontend/src/services/bdcServiceFirebase.js` - Service BDC Firebase
- `frontend/src/components/ui/PdfUploadFirebase.jsx` - Composant d'upload
- `frontend/src/components/affaires/AffaireBdcSectionFirebase.jsx` - Interface BDC

### Vérification de la configuration

1. **Vérifier les identifiants Firebase**
   - Ouvrir `frontend/src/config/firebase.js`
   - Vérifier que `storageBucket` correspond à votre projet

2. **Tester la configuration**
   - Aller sur : http://localhost:3000/firebase-test
   - Tester l'upload d'un fichier PDF
   - Vérifier la prévisualisation

## 🧪 Étape 6 : Tests et Validation

### Test basique

1. **Accéder à la page de test**
   ```
   http://localhost:3000/firebase-test
   ```

2. **Tester l'upload**
   - Sélectionner un fichier PDF (max 10MB)
   - Cliquer sur "Upload vers Firebase"
   - Vérifier que l'upload réussit
   - Tester la prévisualisation

3. **Vérifier dans la console Firebase**
   - Aller dans Storage → Files
   - Vérifier que le fichier apparaît dans `/test/`

### Test des composants

1. **Test du composant PdfUploadFirebase**
   - Onglet "Upload Component"
   - Tester drag & drop
   - Vérifier la progress bar

2. **Test de la section BDC**
   - Onglet "Section BDC Firebase"
   - Tester l'intégration complète

## 🔍 Étape 7 : Monitoring et Debugging

### Console Firebase

1. **Monitoring des uploads**
   - Storage → Files : voir les fichiers uploadés
   - Storage → Usage : surveiller l'utilisation

2. **Logs et erreurs**
   - Aller dans "Logs" pour voir les erreurs
   - Vérifier les métriques d'utilisation

### Console développeur

1. **Ouvrir les DevTools** (F12)
2. **Vérifier la console** pour les logs Firebase
3. **Network tab** pour voir les requêtes

## ⚠️ Points d'attention

### Sécurité

- **Règles temporaires** : Les règles actuelles permettent l'accès libre
- **À sécuriser** : Implémenter l'authentification avant la production
- **Validation** : Vérifier les types de fichiers et tailles

### Performance

- **Taille des fichiers** : Limiter à 10MB maximum
- **Compression** : Considérer la compression des PDFs
- **Cache** : Les URLs Firebase sont mises en cache automatiquement

### Coûts

- **Surveillance** : Configurer des alertes budgétaires
- **Optimisation** : Supprimer les fichiers de test régulièrement
- **Niveau gratuit** : Surveiller l'utilisation pour rester dans les limites

## 🎯 Prochaines étapes

1. **Configuration terminée** ✅
2. **Tests réussis** ✅
3. **Intégration dans l'application** ⏳
4. **Sécurisation des règles** ⏳
5. **Déploiement en production** ⏳

## 🆘 Dépannage

### Erreurs courantes

1. **"Firebase: Error (storage/unauthorized)"**
   - Vérifier les règles de sécurité
   - S'assurer que les règles sont publiées

2. **"Firebase: Error (storage/quota-exceeded)"**
   - Vérifier l'utilisation dans la console
   - Nettoyer les fichiers de test

3. **"Firebase: Error (storage/invalid-format)"**
   - Vérifier que le fichier est un PDF valide
   - Vérifier la taille du fichier (max 10MB)

### Support

- **Documentation Firebase** : https://firebase.google.com/docs/storage
- **Console Firebase** : https://console.firebase.google.com/
- **Support Google** : Via la console Firebase

---

**✅ Configuration terminée !** Vous pouvez maintenant tester l'upload de PDFs via Firebase Storage. 