#!/bin/bash

# Couleurs pour l'affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}  DIAGNOSTIC ET RÉPARATION AUTOMATIQUE ${NC}"
echo -e "${BLUE}======================================${NC}"

# Fonction pour vérifier si un port est occupé
check_port() {
  local port=$1
  local pid=$(lsof -t -i:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}Port $port occupé par le processus $pid${NC}"
    return 0
  else
    echo -e "${GREEN}Port $port disponible${NC}"
    return 1
  fi
}

# Fonction pour arrêter un processus sur un port
kill_port() {
  local port=$1
  local pid=$(lsof -t -i:$port 2>/dev/null)
  if [ -n "$pid" ]; then
    echo -e "${YELLOW}Arrêt du processus $pid sur le port $port...${NC}"
    kill -9 $pid 2>/dev/null
    return 0
  else
    return 1
  fi
}

# 1. Vérifier les services en cours d'exécution
echo -e "${YELLOW}Analyse des processus en cours...${NC}"
node_processes=$(ps aux | grep node | grep -v grep)
if [ -n "$node_processes" ]; then
  echo -e "${YELLOW}Processus Node.js trouvés:${NC}"
  echo "$node_processes"
else
  echo -e "${GREEN}Aucun processus Node.js en cours d'exécution.${NC}"
fi

# 2. Vérifier l'état des ports
echo -e "${YELLOW}Vérification des ports...${NC}"
check_port 3000
frontend_port_used=$?
check_port 5001
backend_port_used=$?
check_port 24678
hmr_port_used=$?

# 3. Vérifier l'état des répertoires node_modules
echo -e "${YELLOW}Vérification des dépendances...${NC}"
frontend_deps_ok=1
backend_deps_ok=1

if [ ! -d "frontend/node_modules" ]; then
  echo -e "${RED}Les dépendances frontend sont manquantes.${NC}"
  frontend_deps_ok=0
fi

if [ ! -d "backend/node_modules" ]; then
  echo -e "${RED}Les dépendances backend sont manquantes.${NC}"
  backend_deps_ok=0
fi

# 4. Diagnostiquer les fichiers de configuration
echo -e "${YELLOW}Vérification des fichiers de configuration...${NC}"
vite_config_ok=1
backend_config_ok=1

if [ ! -f "frontend/vite.config.js" ]; then
  echo -e "${RED}Le fichier vite.config.js est manquant.${NC}"
  vite_config_ok=0
fi

if [ ! -f "backend/src/index.js" ]; then
  echo -e "${RED}Le fichier index.js du backend est manquant.${NC}"
  backend_config_ok=0
fi

# 5. Résumé du diagnostic
echo -e "${BLUE}======================================${NC}"
echo -e "${BLUE}         RÉSUMÉ DU DIAGNOSTIC         ${NC}"
echo -e "${BLUE}======================================${NC}"

problems_found=0

if [ $frontend_port_used -eq 0 ]; then
  echo -e "${RED}✗ Le port 3000 (frontend) est utilisé${NC}"
  problems_found=$((problems_found+1))
fi

if [ $backend_port_used -eq 0 ]; then
  echo -e "${RED}✗ Le port 5001 (backend) est utilisé${NC}"
  problems_found=$((problems_found+1))
fi

if [ $hmr_port_used -eq 0 ]; then
  echo -e "${RED}✗ Le port 24678 (HMR) est utilisé${NC}"
  problems_found=$((problems_found+1))
fi

if [ $frontend_deps_ok -eq 0 ]; then
  echo -e "${RED}✗ Les dépendances frontend sont manquantes${NC}"
  problems_found=$((problems_found+1))
fi

if [ $backend_deps_ok -eq 0 ]; then
  echo -e "${RED}✗ Les dépendances backend sont manquantes${NC}"
  problems_found=$((problems_found+1))
fi

if [ $vite_config_ok -eq 0 ]; then
  echo -e "${RED}✗ La configuration Vite est manquante ou invalide${NC}"
  problems_found=$((problems_found+1))
fi

if [ $backend_config_ok -eq 0 ]; then
  echo -e "${RED}✗ La configuration backend est manquante ou invalide${NC}"
  problems_found=$((problems_found+1))
fi

# 6. Demander la réparation
if [ $problems_found -eq 0 ]; then
  echo -e "${GREEN}✓ Aucun problème détecté!${NC}"
  echo -e "${GREEN}Vous pouvez démarrer les serveurs normalement.${NC}"
  exit 0
else
  echo -e "${YELLOW}$problems_found problèmes détectés.${NC}"
  read -p "Voulez-vous effectuer les réparations automatiques? (o/n) " repair_choice
  
  if [[ $repair_choice != "o" && $repair_choice != "O" ]]; then
    echo -e "${YELLOW}Réparation annulée.${NC}"
    exit 0
  fi
  
  echo -e "${BLUE}======================================${NC}"
  echo -e "${BLUE}         RÉPARATION EN COURS         ${NC}"
  echo -e "${BLUE}======================================${NC}"
  
  # 7. Réparer les problèmes
  
  # Libérer les ports si nécessaire
  if [ $frontend_port_used -eq 0 ] || [ $backend_port_used -eq 0 ] || [ $hmr_port_used -eq 0 ]; then
    echo -e "${YELLOW}Libération des ports utilisés...${NC}"
    kill_port 3000
    kill_port 5001
    kill_port 24678
    
    # Arrêter tous les processus node pour être sûr
    echo -e "${YELLOW}Arrêt des processus Node.js...${NC}"
    pkill -f node || true
    sleep 2
  fi
  
  # Réparer les dépendances
  if [ $frontend_deps_ok -eq 0 ]; then
    echo -e "${YELLOW}Installation des dépendances frontend...${NC}"
    (cd frontend && npm install) || echo -e "${RED}Erreur lors de l'installation des dépendances frontend.${NC}"
  fi
  
  if [ $backend_deps_ok -eq 0 ]; then
    echo -e "${YELLOW}Installation des dépendances backend...${NC}"
    (cd backend && npm install) || echo -e "${RED}Erreur lors de l'installation des dépendances backend.${NC}"
  fi
  
  # Réparer les configurations
  if [ $vite_config_ok -eq 0 ]; then
    echo -e "${YELLOW}Création d'une configuration Vite...${NC}"
    mkdir -p frontend
    cat > frontend/vite.config.js << 'EOL'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuration Vite
export default defineConfig({
  plugins: [react({
    include: '**/*.{jsx,js}',
    jsxRuntime: 'automatic'
  })],
  optimizeDeps: {
    include: ['prop-types'],
    force: true,
    esbuildOptions: {
      jsx: 'automatic',
      loader: {
        '.js': 'jsx'
      },
      define: {
        global: 'globalThis'
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        ws: true,
      },
    },
    port: 3000,
    strictPort: false,
    host: '0.0.0.0',
    hmr: {
      overlay: false,
      clientPort: null,
    },
    watch: {
      usePolling: true,
      interval: 1000,
    },
  },
  define: {
    'process.env': {},
    'global': 'window',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
  }
});
EOL
  fi
  
  # Nettoyage du cache
  echo -e "${YELLOW}Nettoyage des caches...${NC}"
  rm -rf frontend/.vite frontend/node_modules/.vite 2>/dev/null
  rm -rf frontend/node_modules/.cache 2>/dev/null
  rm -rf backend/node_modules/.cache 2>/dev/null
  
  # 8. Vérifier que les problèmes ont été résolus
  problems_fixed=0
  if [ $frontend_port_used -eq 0 ]; then
    check_port 3000
    if [ $? -eq 1 ]; then
      echo -e "${GREEN}✓ Le port 3000 a été libéré${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  if [ $backend_port_used -eq 0 ]; then
    check_port 5001
    if [ $? -eq 1 ]; then
      echo -e "${GREEN}✓ Le port 5001 a été libéré${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  if [ $hmr_port_used -eq 0 ]; then
    check_port 24678
    if [ $? -eq 1 ]; then
      echo -e "${GREEN}✓ Le port 24678 a été libéré${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  if [ $frontend_deps_ok -eq 0 ]; then
    if [ -d "frontend/node_modules" ]; then
      echo -e "${GREEN}✓ Les dépendances frontend ont été installées${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  if [ $backend_deps_ok -eq 0 ]; then
    if [ -d "backend/node_modules" ]; then
      echo -e "${GREEN}✓ Les dépendances backend ont été installées${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  if [ $vite_config_ok -eq 0 ]; then
    if [ -f "frontend/vite.config.js" ]; then
      echo -e "${GREEN}✓ La configuration Vite a été réparée${NC}"
      problems_fixed=$((problems_fixed+1))
    fi
  fi
  
  # 9. Conclusion
  echo -e "${BLUE}======================================${NC}"
  echo -e "${BLUE}         RÉSULTAT DES RÉPARATIONS    ${NC}"
  echo -e "${BLUE}======================================${NC}"
  
  if [ $problems_fixed -eq $problems_found ]; then
    echo -e "${GREEN}✓ Tous les problèmes ont été résolus!${NC}"
  else
    echo -e "${YELLOW}$problems_fixed sur $problems_found problèmes résolus.${NC}"
  fi
  
  echo -e "${GREEN}Vous pouvez maintenant démarrer les serveurs avec:${NC}"
  echo -e "${GREEN}./restart-vite.sh${NC}"
fi 