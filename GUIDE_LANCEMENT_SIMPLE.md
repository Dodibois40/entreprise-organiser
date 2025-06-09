# 🚀 Guide de Lancement - Entreprise Organiser

## Lancement Rapide

### Option 1: Script Global (Recommandé)
```bash
npm run dev
```

### Option 2: Lancement Séparé
```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend  
cd frontend && npm run dev
```

## URLs d'Accès

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

## Vérification du Fonctionnement

### Backend ✅
```bash
curl http://localhost:3001/auth/profile
# Doit retourner: {"statusCode":401,"message":"Unauthorized"}
```

### Frontend ✅
```bash
curl http://localhost:5173
# Doit retourner: du HTML avec <!DOCTYPE html>
```

## Résolution des Problèmes

### Erreur "Port déjà utilisé"
```bash
# Arrêter tous les processus
pkill -f "ts-node\|vite\|npm"

# Relancer
npm run dev
```

### Erreur "Module non trouvé"
```bash
# Backend
cd backend && npm install && npx prisma generate

# Frontend
cd frontend && npm install
```

### Erreur de base de données
```bash
cd backend && npm run db:setup
```

## Scripts Disponibles

- `npm run dev` - Lance backend + frontend
- `npm run start:backend` - Lance uniquement le backend
- `npm run start:frontend` - Lance uniquement le frontend
- `npm run test` - Lance les tests
- `npm run build` - Build de production

## État Actuel ✅

- ✅ Backend NestJS fonctionnel (port 3001)
- ✅ Frontend React fonctionnel (port 5173)
- ✅ 9 modules backend complets
- ✅ 10 pages frontend intégrées
- ✅ Composants UI résolus
- ✅ Scripts de lancement configurés

**L'application est prête à être utilisée !** 🎉 