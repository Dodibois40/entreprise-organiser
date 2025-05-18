# Guide de démarrage de l'application Entreprise-Organiser

Ce guide explique comment démarrer les serveurs backend et frontend de l'application.

## Prérequis

- Node.js (version 18 ou supérieure)
- NPM (version 8 ou supérieure)
- MongoDB (version 5 ou supérieure)

## Informations de connexion pour les tests

Pour vous connecter à l'application, vous pouvez utiliser les identifiants suivants :

### Utilisateur standard :
- Email : `user@example.com`
- Mot de passe : `password123`

### Administrateur :
- Email : `admin@example.com` 
- Mot de passe : `admin123`

Si ces comptes ne fonctionnent pas, vous devrez créer un nouveau compte en utilisant la page d'inscription.

## Démarrage des serveurs (Méthode simple avec script)

1. Assurez-vous d'être dans le bon répertoire de travail :
   ```
   cd /home/dodo/Prog/entreprise-organiser
   ```

2. Créez un script de démarrage nommé `start.sh` :
   ```
   nano start.sh
   ```

3. Copiez-collez le contenu suivant dans le fichier :
   ```bash
   #!/bin/bash

   echo "Démarrage des serveurs pour Entreprise Organiser"

   # Aller à la racine du projet
   cd $(dirname $0)

   # Arrêter les serveurs déjà en cours
   echo "Arrêt des serveurs existants..."
   pkill -f "node.*backend" || true
   pkill -f "node.*vite" || true
   sleep 2

   # Démarrer le backend
   echo "Démarrage du backend..."
   cd backend
   NODE_ENV=development npx nodemon src/index.js &
   BACKEND_PID=$!
   echo "Backend démarré (PID: $BACKEND_PID)"

   # Attendre que le backend soit prêt
   sleep 3

   # Démarrer le frontend
   echo "Démarrage du frontend..."
   cd ../frontend
   npm run dev &
   FRONTEND_PID=$!
   echo "Frontend démarré (PID: $FRONTEND_PID)"

   echo ""
   echo "Serveurs démarrés :"
   echo "Backend : http://localhost:5001"
   echo "Frontend : http://localhost:5173"
   echo ""
   echo "Appuyez sur Ctrl+C pour arrêter les serveurs"

   # Attendre que l'utilisateur arrête le script
   trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Serveurs arrêtés.'; exit" INT
   wait
   ```

4. Sauvegardez (Ctrl+O, puis Entrée) et quittez (Ctrl+X)

5. Rendez le script exécutable :
   ```
   chmod +x start.sh
   ```

6. Exécutez le script :
   ```
   ./start.sh
   ```

7. Accédez à l'application dans votre navigateur : http://localhost:5173

## Démarrage manuel des serveurs (Méthode alternative)

### Démarrage du serveur backend

1. Ouvrez un terminal
2. Accédez au répertoire backend :
   ```
   cd backend
   ```
3. Installez les dépendances si ce n'est pas déjà fait :
   ```
   npm install
   ```
4. Démarrez le serveur de développement :
   ```
   npm run dev
   ```
5. Le serveur backend sera accessible à l'adresse : http://localhost:5001

### Démarrage du serveur frontend

1. Ouvrez un nouveau terminal
2. Accédez au répertoire frontend :
   ```
   cd frontend
   ```
3. Installez les dépendances si ce n'est pas déjà fait :
   ```
   npm install
   ```
4. Démarrez le serveur de développement :
   ```
   npm run dev
   ```
5. Le serveur frontend sera accessible à l'adresse : http://localhost:5173

## Configuration du serveur backend

Le serveur backend est configuré pour utiliser MongoDB comme base de données. Assurez-vous que MongoDB est installé et en cours d'exécution sur votre machine.

## Résolution des problèmes courants

### Le serveur backend ne démarre pas

- Vérifiez que MongoDB est en cours d'exécution
- Vérifiez que le port 5001 n'est pas déjà utilisé
- Vérifiez les logs d'erreur dans la console

### Le serveur frontend ne démarre pas

- Vérifiez que le port 5173 n'est pas déjà utilisé
- Vérifiez que toutes les dépendances sont installées
- Essayez de supprimer le dossier node_modules et de réinstaller les dépendances

### Problèmes de connexion entre frontend et backend

- Vérifiez que les deux serveurs sont en cours d'exécution
- Vérifiez que la configuration CORS dans le backend autorise les connexions depuis le frontend
- Vérifiez que le frontend est configuré pour se connecter à la bonne URL du backend
- Assurez-vous que les chemins d'API sont corrects (ils doivent commencer par /api/auth/...)

### Problème avec les PropTypes

Si vous rencontrez l'erreur suivante :
```
Uncaught SyntaxError: The requested module '/node_modules/prop-types/index.js' does not provide an export named 'default'
```

Exécutez le script de correction dans le répertoire frontend :
```
node patch-prop-types.js
```

Puis redémarrez le serveur frontend.

# Solution pour corriger l'erreur PropTypes et démarrer l'application

## Erreur rencontrée
```
Uncaught SyntaxError: The requested module '/node_modules/prop-types/index.js' does not provide an export named 'default'
```

## Étapes pour résoudre le problème

1. **Installations des dépendances correctes**

```bash
# À la racine du projet
cd frontend
npm uninstall prop-types
npm install --save-exact prop-types@15.7.2
```

2. **Suppression du cache**

```bash
# À la racine du projet
rm -rf frontend/node_modules/.vite
rm -rf frontend/.vite
```

3. **Redémarrage des serveurs**

```bash
# Arrêter tous les serveurs en cours d'exécution
pkill -f "node.*/nodemon" 
pkill -f "node.*/vite"

# Attendre un moment
sleep 2

# Démarrer le backend dans un terminal
cd backend
npm run dev

# Démarrer le frontend dans un autre terminal
cd frontend
npm run dev
```

4. **Vérification du bon fonctionnement**

- Ouvrez http://localhost:3000 dans votre navigateur
- L'application devrait démarrer sans erreur dans la console

## Explication

- La version récente de `prop-types` (15.8+) ne fournit pas d'export par défaut
- La version 15.7.2 est compatible avec l'import standard (`import PropTypes from 'prop-types'`)
- Le nettoyage du cache Vite est important pour éviter les problèmes de modules mis en cache
- Le redémarrage complet des serveurs assure que tous les modules sont rechargés correctement

## Configuration permanente

Pour éviter ce problème à l'avenir, vous pouvez :

1. Ajouter un fichier `scripts/start-dev.sh` qui gère le nettoyage des caches et le démarrage des serveurs
2. Ou utiliser notre wrapper `propTypes.js` pour rendre compatible les deux façons d'importer

## Si le problème persiste

Si ces étapes ne résolvent pas le problème :

1. Vérifiez les logs complets de démarrage dans la console
2. Supprimez complètement `node_modules` et réinstallez toutes les dépendances : 
   ```bash
   rm -rf frontend/node_modules backend/node_modules node_modules
   npm run install:all
   ```
3. Vérifiez les versions de Node.js et npm pour vous assurer qu'elles sont compatibles 