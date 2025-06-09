#!/bin/bash

# Arrêt du backend via PM2
if pm2 list | grep -q "backend"; then
  echo "🛑 Arrêt du backend (PM2)..."
  pm2 stop backend
  pm2 delete backend
else
  echo "ℹ️  Le backend n'est pas lancé avec PM2."
fi

# Arrêt du frontend (Vite)
VITE_PID=$(pgrep -f "vite")
if [ -n "$VITE_PID" ]; then
  echo "🛑 Arrêt du frontend (Vite, PID: $VITE_PID)..."
  kill $VITE_PID
else
  echo "ℹ️  Aucun processus Vite (frontend) trouvé."
fi

echo "✅ Les serveurs backend et frontend sont arrêtés." 