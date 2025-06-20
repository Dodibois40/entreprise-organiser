# Guide de Dépannage O2Switch - Erreurs 500 🚨

## 🔍 **Tests de Diagnostic Immédiat**

### **Étape 1 : Test des fichiers minimaux**

Testez ces URLs dans l'ordre :

1. **Test HTML Simple** ⬇️
   ```
   https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/index.html
   ```
   - ✅ **Si ça marche** : Serveur O2Switch OK
   - ❌ **Si erreur 500** : Problème de configuration serveur

2. **Test PHP** ⬇️
   ```
   https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test.php
   ```
   - ✅ **Si ça marche** : PHP activé et fonctionnel
   - ❌ **Si erreur 500** : Problème de configuration PHP

3. **Test JSON** ⬇️
   ```
   https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/test.json
   ```
   - ✅ **Si ça marche** : Types MIME configurés
   - ❌ **Si erreur 500** : Problème de configuration Apache

## 🚨 **Causes Possibles des Erreurs 500**

### **1. Problème de .htaccess**
- **Symptôme** : Erreur 500 sur toutes les pages
- **Solution** : Supprimer temporairement le fichier `.htaccess`

### **2. Permissions de fichiers**
- **Symptôme** : Certains fichiers inaccessibles
- **Solution** : Vérifier les permissions (644 pour fichiers, 755 pour dossiers)

### **3. Configuration PHP**
- **Symptôme** : Erreur sur fichiers PHP uniquement
- **Solution** : Vérifier la version PHP et les modules

### **4. Limite de mémoire/ressources**
- **Symptôme** : Erreur sur gros fichiers JavaScript
- **Solution** : Optimiser les assets ou augmenter les limites

### **5. Problème de domaine/DNS**
- **Symptôme** : Erreur de résolution
- **Solution** : Vérifier la configuration du domaine

## 🛠️ **Solutions par Étapes**

### **Solution 1 : Déploiement Sans .htaccess**

```bash
# Supprimer le .htaccess et redéployer
./deploy-without-htaccess.sh
```

### **Solution 2 : Version Statique Pure**

```bash
# Déployer uniquement les fichiers HTML/CSS/JS
./deploy-static-only.sh
```

### **Solution 3 : Contact Support O2Switch**

Si tous les tests minimaux échouent :

**📧 Email** : support@o2switch.fr  
**📞 Téléphone** : 04 44 44 60 40  
**💬 Chat** : Via votre espace client O2Switch

**Informations à fournir :**
- Votre identifiant : `cexe9174`
- Domaine concerné : `addon-lamanufacturedubois.com.cexe9174.odns.fr`
- Erreur : "500 Internal Server Error"
- Tests effectués : Fichiers HTML simples en erreur 500

## 📋 **Checklist de Vérification**

- [ ] Test HTML simple fonctionne
- [ ] Test PHP fonctionne  
- [ ] Fichiers uploadés correctement
- [ ] Permissions correctes
- [ ] .htaccess valide
- [ ] Domaine configuré
- [ ] DNS résolu

## 🔄 **Scripts de Récupération**

### **Redéploiement Complet**
```bash
./deploy-o2switch-fix-500.sh
```

### **Test Minimal**
```bash
./deploy-minimal-test.sh
```

### **Nettoyage et Recommencer**
```bash
./clean-and-redeploy.sh
```

## 📞 **Escalade vers Support**

Si après tous ces tests, l'erreur 500 persiste sur les fichiers HTML simples, c'est un **problème de configuration serveur O2Switch** qui nécessite leur intervention.

**Message type pour le support :**

> Bonjour,
> 
> J'ai un problème d'erreur 500 sur mon hébergement.
> 
> **Compte** : cexe9174  
> **Domaine** : addon-lamanufacturedubois.com.cexe9174.odns.fr  
> **Dossier** : /entreprise-organiser/
> 
> **Problème** : Erreur 500 même sur des fichiers HTML simples
> 
> **Tests effectués** :
> - Upload de fichier HTML minimal : Erreur 500
> - Suppression du .htaccess : Erreur 500 persistante
> - Test avec différents navigateurs : Même erreur
> 
> Pourriez-vous vérifier la configuration de mon hébergement ?
> 
> Merci

## 🎯 **Objectif Final**

Une fois le problème résolu, votre CRM sera accessible via :
```
https://addon-lamanufacturedubois.com.cexe9174.odns.fr/entreprise-organiser/
```

Et fonctionnera sur tous les appareils connectés à Internet ! 🌐 