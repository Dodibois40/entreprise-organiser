#!/bin/bash

# Couleurs pour affichage
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Variables de configuration
CHECK_INTERVAL=5 # Intervalle de vérification en secondes
MAX_RESTARTS=3 # Nombre maximum de redémarrages automatiques
BACKEND_PORT=5001
FRONTEND_PORT=3000
LOG_FILE="process-monitor.log"
HEALTH_LOG="health-check.log"

# Réinitialiser les compteurs de redémarrage
BACKEND_RESTART_COUNT=0
FRONTEND_RESTART_COUNT=0

# Fonction pour vérifier si un port est utilisé (service actif)
check_port() {
    local port=$1
    lsof -i:$port -t >/dev/null 2>&1
    return $?
}

# Fonction pour redémarrer le backend
restart_backend() {
    echo -e "${YELLOW}$(date) - Tentative de redémarrage du backend...${NC}" | tee -a "$LOG_FILE"
    
    # Vérifier si le compteur de redémarrage a atteint la limite
    if [ "$BACKEND_RESTART_COUNT" -ge "$MAX_RESTARTS" ]; then
        echo -e "${RED}$(date) - Nombre maximum de redémarrages du backend atteint ($MAX_RESTARTS). Intervention manuelle requise.${NC}" | tee -a "$LOG_FILE"
        return 1
    fi
    
    # Tuer les processus existants sur le port backend (s'il y en a)
    local pid=$(lsof -ti:$BACKEND_PORT 2>/dev/null)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}$(date) - Arrêt du processus backend existant (PID: $pid)...${NC}" | tee -a "$LOG_FILE"
        kill $pid 2>/dev/null
        sleep 2
    fi
    
    # Démarrer le backend en arrière-plan
    echo -e "${GREEN}$(date) - Démarrage du backend...${NC}" | tee -a "$LOG_FILE"
    (cd backend && nohup node src/index.js > backend.log 2>&1) &
    
    # Attendre que le backend soit disponible
    echo -e "${YELLOW}$(date) - Attente du démarrage du backend...${NC}" | tee -a "$LOG_FILE"
    for i in {1..10}; do
        if check_port $BACKEND_PORT; then
            echo -e "${GREEN}$(date) - Backend redémarré avec succès!${NC}" | tee -a "$LOG_FILE"
            BACKEND_RESTART_COUNT=$((BACKEND_RESTART_COUNT + 1))
            return 0
        fi
        sleep 2
    done
    
    echo -e "${RED}$(date) - Échec du redémarrage du backend.${NC}" | tee -a "$LOG_FILE"
    return 1
}

# Fonction pour redémarrer le frontend
restart_frontend() {
    echo -e "${YELLOW}$(date) - Tentative de redémarrage du frontend...${NC}" | tee -a "$LOG_FILE"
    
    # Vérifier si le compteur de redémarrage a atteint la limite
    if [ "$FRONTEND_RESTART_COUNT" -ge "$MAX_RESTARTS" ]; then
        echo -e "${RED}$(date) - Nombre maximum de redémarrages du frontend atteint ($MAX_RESTARTS). Intervention manuelle requise.${NC}" | tee -a "$LOG_FILE"
        return 1
    fi
    
    # Tuer les processus existants sur le port frontend (s'il y en a)
    local pid=$(lsof -ti:$FRONTEND_PORT 2>/dev/null)
    if [ -n "$pid" ]; then
        echo -e "${YELLOW}$(date) - Arrêt du processus frontend existant (PID: $pid)...${NC}" | tee -a "$LOG_FILE"
        kill $pid 2>/dev/null
        sleep 2
    fi
    
    # Démarrer le frontend en arrière-plan
    echo -e "${GREEN}$(date) - Démarrage du frontend...${NC}" | tee -a "$LOG_FILE"
    (cd frontend && nohup npm run dev > frontend.log 2>&1) &
    
    # Attendre que le frontend soit disponible
    echo -e "${YELLOW}$(date) - Attente du démarrage du frontend...${NC}" | tee -a "$LOG_FILE"
    for i in {1..15}; do
        if check_port $FRONTEND_PORT; then
            echo -e "${GREEN}$(date) - Frontend redémarré avec succès!${NC}" | tee -a "$LOG_FILE"
            FRONTEND_RESTART_COUNT=$((FRONTEND_RESTART_COUNT + 1))
            return 0
        fi
        sleep 2
    done
    
    echo -e "${RED}$(date) - Échec du redémarrage du frontend.${NC}" | tee -a "$LOG_FILE"
    return 1
}

# Fonction pour vérifier la santé des services
check_health() {
    # Vérifier le backend
    if ! check_port $BACKEND_PORT; then
        echo -e "${RED}$(date) - Backend arrêté! Port $BACKEND_PORT non utilisé.${NC}" | tee -a "$LOG_FILE" "$HEALTH_LOG"
        restart_backend
    else
        echo -e "${GREEN}$(date) - Backend en cours d'exécution.${NC}" | tee -a "$HEALTH_LOG"
    fi
    
    # Vérifier le frontend
    if ! check_port $FRONTEND_PORT; then
        echo -e "${RED}$(date) - Frontend arrêté! Port $FRONTEND_PORT non utilisé.${NC}" | tee -a "$LOG_FILE" "$HEALTH_LOG"
        restart_frontend
    else
        echo -e "${GREEN}$(date) - Frontend en cours d'exécution.${NC}" | tee -a "$HEALTH_LOG"
    fi
}

# Initialisation
echo -e "${BLUE}=====================================${NC}"
echo -e "${BLUE}SURVEILLANCE DES PROCESSUS DE L'APPLICATION${NC}"
echo -e "${BLUE}=====================================${NC}"
echo -e "${YELLOW}Date de démarrage: $(date)${NC}"
echo -e "${YELLOW}Intervalle de vérification: ${CHECK_INTERVAL} secondes${NC}"
echo -e "${YELLOW}Nombre maximum de redémarrages: ${MAX_RESTARTS}${NC}"
echo -e "${BLUE}=====================================${NC}"

# Réinitialiser les fichiers de log
> "$LOG_FILE"
> "$HEALTH_LOG"

# Boucle principale de surveillance
while true; do
    check_health
    
    # Si les deux serveurs ont atteint le nombre maximum de redémarrages, arrêter la surveillance
    if [ "$BACKEND_RESTART_COUNT" -ge "$MAX_RESTARTS" ] && [ "$FRONTEND_RESTART_COUNT" -ge "$MAX_RESTARTS" ]; then
        echo -e "${RED}$(date) - Nombre maximum de redémarrages atteint pour les deux serveurs. Arrêt de la surveillance.${NC}" | tee -a "$LOG_FILE"
        echo -e "${RED}INTERVENTION REQUISE: Exécutez ./fix-background-process.sh pour résoudre les problèmes.${NC}" | tee -a "$LOG_FILE"
        break
    fi
    
    sleep $CHECK_INTERVAL
done

echo -e "${RED}$(date) - Surveillance terminée.${NC}" | tee -a "$LOG_FILE"
echo -e "${YELLOW}Pour résoudre les problèmes, exécutez ./fix-background-process.sh${NC}" | tee -a "$LOG_FILE" 