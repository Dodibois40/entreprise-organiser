# Configuration Domaine O2Switch 🌐

## 📋 Étapes de Configuration

### 1. **Accès au Panneau de Contrôle**
- Connectez-vous à votre espace client O2Switch
- Cliquez sur **"Gestion des domaines"** ou **"cPanel"**

### 2. **Configuration du Document Root**

#### **Option A : Via cPanel (Recommandé)**
1. Dans cPanel, allez dans **"Sous-domaines"** ou **"Addon Domains"**
2. Ou allez dans **"File Manager"**
3. Modifiez le **Document Root** pour pointer vers `/public_html/entreprise-organiser/`

#### **Option B : Via .htaccess (Plus Simple)**
Créez un fichier `.htaccess` dans `/public_html/` avec :

```apache
# Redirection vers le dossier entreprise-organiser
RewriteEngine On
RewriteCond %{REQUEST_URI} !^/entreprise-organiser/
RewriteRule ^(.*)$ /entreprise-organiser/$1 [L,R=301]
```

#### **Option C : Déplacer les Fichiers**
1. Déplacez tout le contenu de `entreprise-organiser/` vers `public_html/`
2. Votre structure devient :
```
public_html/
├── index.html (votre app React)
├── assets/
├── backend/
└── uploads/
```

### 3. **Vérification de la Configuration**

#### **Tester l'Accès Web**
1. Ouvrez votre navigateur
2. Allez sur `http://votre-domaine.com`
3. Vous devriez voir votre application CRM

#### **Vérifier les Logs d'Erreur**
- Dans cPanel → **"Error Logs"**
- Vérifiez s'il y a des erreurs 404 ou 500

### 4. **Configuration SSL (HTTPS)**
1. Dans cPanel → **"SSL/TLS"**
2. Activez **"Force HTTPS Redirect"**
3. Votre app sera accessible via `https://votre-domaine.com`

### 5. **Configuration Backend API**

#### **Créer un Sous-domaine API (Optionnel)**
1. Créez un sous-domaine `api.votre-domaine.com`
2. Pointez-le vers `/public_html/entreprise-organiser/backend/`

#### **Ou utiliser un dossier API**
- Votre API sera accessible via `https://votre-domaine.com/backend/api/`

## 🔧 Scripts de Configuration Automatique

### **Script de Déplacement Automatique**
```bash
#!/bin/bash
# Déplacer les fichiers vers public_html
mv entreprise-organiser/* public_html/
mv entreprise-organiser/.htaccess public_html/
```

### **Script de Test de Connectivité**
```bash
#!/bin/bash
# Tester l'accès au site
curl -I http://votre-domaine.com
curl -I http://votre-domaine.com/backend/api/
```

## 📱 URLs Finales

Après configuration, votre CRM sera accessible :

- **Frontend** : `https://votre-domaine.com`
- **API Backend** : `https://votre-domaine.com/backend/api/`
- **Admin Panel** : `https://votre-domaine.com/admin` (si configuré)

## 🚨 Points d'Attention

### **Permissions des Fichiers**
- Dossiers : `755`
- Fichiers : `644`
- Scripts exécutables : `755`

### **Configuration PHP**
- Vérifiez que PHP 8.1+ est activé
- Activez les extensions nécessaires (PostgreSQL, etc.)

### **Base de Données**
- Vérifiez que PostgreSQL est accessible
- Testez la connexion avec vos identifiants

## 🛠️ Dépannage

### **Erreur 404**
- Vérifiez le chemin du Document Root
- Assurez-vous que `index.html` existe

### **Erreur 500**
- Vérifiez les logs d'erreur
- Contrôlez les permissions des fichiers

### **API Non Accessible**
- Vérifiez la configuration du serveur web
- Testez la connexion à la base de données 