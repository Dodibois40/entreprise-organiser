# 🔑 IDENTIFIANTS DE TEST

## Utilisateurs créés par le seed

### Admin Système
- **Email** : `admin@exemple.fr`
- **Mot de passe** : `password123`
- **Rôle** : ADMIN_SYS

### Chargé d'Affaire
- **Email** : `charge@exemple.fr`
- **Mot de passe** : `password123`
- **Rôle** : CHARGE_AFFAIRE

### Acheteur
- **Email** : `acheteur@exemple.fr`
- **Mot de passe** : `password123`
- **Rôle** : ACHETEUR

### Chef d'Atelier
- **Email** : `chef@exemple.fr`
- **Mot de passe** : `password123`
- **Rôle** : CHEF_ATELIER

---

## 🚀 Pour démarrer l'application

```bash
npm run dev
```

- **Frontend** : http://localhost:5173/
- **Backend** : http://localhost:3001/

## 🗄️ Base de données

Les données de test ont été créées avec le seed. Pour réinitialiser :

```bash
cd backend
npx prisma db seed
``` 