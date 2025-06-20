# 🚀 Test Rapide Firebase Storage

## ✅ Serveurs prêts !

- **Frontend** : http://localhost:8080 ou http://localhost:8081
- **Backend** : http://localhost:8000
- **Page de test Firebase** : http://localhost:8080/firebase-test

## 🔥 Configuration Firebase (5 minutes)

### 1. Console Firebase
1. Aller sur : https://console.firebase.google.com/
2. Sélectionner le projet `entreprise-organiser`
3. **Activer le plan Blaze** (obligatoire pour Storage)

### 2. Activer Storage
1. Menu latéral → **Storage**
2. Cliquer sur **"Get started"**
3. Choisir la région : **`europe-west1`** (Belgique)

### 3. Règles de sécurité (temporaires)
1. Aller dans l'onglet **"Rules"**
2. Copier-coller le contenu du fichier `firebase-rules-dev.txt` :

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

3. Cliquer sur **"Publier"**

## 🧪 Tests à effectuer

### Test 1 : Configuration de base
1. Aller sur : http://localhost:8080/firebase-test
2. Onglet **"🔥 Test Firebase Basic"**
3. Cliquer sur **"Tester la connexion Firebase"**
4. ✅ Doit afficher "Connexion Firebase réussie"

### Test 2 : Upload PDF
1. Onglet **"📤 Upload Component"**
2. Glisser-déposer un fichier PDF (max 10MB)
3. ✅ Vérifier la progress bar
4. ✅ Vérifier l'upload réussi
5. ✅ Tester la prévisualisation

### Test 3 : Section BDC complète
1. Onglet **"📋 Section BDC Firebase"**
2. Tester l'interface complète BDC
3. ✅ Upload, prévisualisation, suppression

## 🔍 Vérifications Firebase Console

1. **Storage → Files** : Voir les fichiers uploadés
2. **Storage → Usage** : Vérifier l'utilisation
3. **Logs** : Vérifier qu'il n'y a pas d'erreurs

## ⚠️ Problèmes courants

### "Firebase: Error (storage/unauthorized)"
- Vérifier que les règles sont publiées
- Vérifier la configuration du bucket

### "Firebase: Error (storage/quota-exceeded)"
- Vérifier l'utilisation dans la console
- Nettoyer les fichiers de test

### Upload qui ne fonctionne pas
- Vérifier la console développeur (F12)
- Vérifier que le plan Blaze est activé
- Vérifier la région du bucket

## 🎯 Résultat attendu

Une fois les tests réussis :
- ✅ Upload PDF fonctionnel
- ✅ Prévisualisation intégrée
- ✅ URLs Firebase sécurisées
- ✅ Plus d'erreurs 401 sur les PDFs

## 📞 Support

En cas de problème :
1. Vérifier la console Firebase
2. Vérifier les DevTools (F12)
3. Consulter `FIREBASE_SETUP_GUIDE.md`

---

**🚀 Prêt pour les tests !** Suivez les étapes ci-dessus dans l'ordre. 