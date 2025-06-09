# Guide de Déploiement - Entreprise Organiser

## Vue d'ensemble

Ce guide détaille les étapes pour déployer l'application Entreprise Organiser en production. L'application utilise une architecture moderne avec Docker, CI/CD automatisé et monitoring des performances.

## Architecture de Production

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Load Balancer │    │     Frontend    │    │     Backend     │
│     (Nginx)     │────│   (React+Nginx) │────│    (NestJS)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                       ┌─────────────────┐    ┌─────────────────┐
                       │      Redis      │    │   PostgreSQL    │
                       │     (Cache)     │    │   (Database)    │
                       └─────────────────┘    └─────────────────┘
```

## Prérequis

### Serveur de Production
- **OS**: Ubuntu 20.04+ ou CentOS 8+
- **RAM**: Minimum 4GB, recommandé 8GB+
- **CPU**: Minimum 2 cores, recommandé 4 cores+
- **Stockage**: Minimum 50GB SSD
- **Réseau**: Connexion stable avec IP publique

### Logiciels Requis
- Docker 24.0+
- Docker Compose 2.0+
- Git
- Nginx (pour le reverse proxy)
- Certbot (pour SSL)

## Installation des Prérequis

### 1. Installation Docker

```bash
# Mise à jour du système
sudo apt update && sudo apt upgrade -y

# Installation des dépendances
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release

# Ajout de la clé GPG Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Ajout du repository Docker
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Installation Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Ajout de l'utilisateur au groupe docker
sudo usermod -aG docker $USER
```

### 2. Installation Nginx et Certbot

```bash
# Installation Nginx
sudo apt install -y nginx

# Installation Certbot
sudo apt install -y certbot python3-certbot-nginx
```

## Déploiement

### 1. Clonage du Repository

```bash
# Créer le répertoire de déploiement
sudo mkdir -p /opt/entreprise-organiser
sudo chown $USER:$USER /opt/entreprise-organiser

# Cloner le repository
cd /opt/entreprise-organiser
git clone https://github.com/votre-username/entreprise-organiser.git .
```

### 2. Configuration des Variables d'Environnement

```bash
# Copier le fichier d'exemple
cp .env.example .env.production

# Éditer les variables de production
nano .env.production
```

Variables importantes à configurer :
```env
# Base de données
DATABASE_URL=postgresql://prod_user:secure_password@postgres_db:5432/entreprise_db

# JWT
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Email (optionnel)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Monitoring
SENTRY_DSN=your-sentry-dsn-here

# Domaine
DOMAIN=votre-domaine.com
```

### 3. Configuration SSL

```bash
# Obtenir un certificat SSL
sudo certbot --nginx -d votre-domaine.com -d www.votre-domaine.com

# Vérifier le renouvellement automatique
sudo certbot renew --dry-run
```

### 4. Configuration Nginx

Créer `/etc/nginx/sites-available/entreprise-organiser` :

```nginx
server {
    listen 80;
    server_name votre-domaine.com www.votre-domaine.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name votre-domaine.com www.votre-domaine.com;

    ssl_certificate /etc/letsencrypt/live/votre-domaine.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/votre-domaine.com/privkey.pem;

    # Configuration SSL moderne
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Headers de sécurité
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Frame-Options DENY always;
    add_header X-Content-Type-Options nosniff always;

    # Proxy vers l'application
    location / {
        proxy_pass http://localhost:80;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Activer le site :
```bash
sudo ln -s /etc/nginx/sites-available/entreprise-organiser /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 5. Déploiement avec Docker

```bash
# Build et démarrage des conteneurs
docker compose -f docker-compose.yml up -d --build

# Vérifier le statut
docker compose ps

# Voir les logs
docker compose logs -f
```

### 6. Configuration de la Base de Données

```bash
# Exécuter les migrations
docker compose exec backend npm run db:migrate

# Seed des données initiales
docker compose exec backend npm run db:seed

# Créer un utilisateur admin
docker compose exec backend npm run create-admin
```

## Monitoring et Maintenance

### 1. Monitoring des Conteneurs

```bash
# Script de monitoring (à placer dans /opt/scripts/monitor.sh)
#!/bin/bash

# Vérifier l'état des conteneurs
containers=("entreprise_organiser_frontend" "entreprise_organiser_backend" "entreprise_organiser_pg")

for container in "${containers[@]}"; do
    if ! docker ps | grep -q $container; then
        echo "ALERT: Container $container is not running"
        # Redémarrer le conteneur
        docker compose restart $container
    fi
done

# Vérifier l'espace disque
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ $disk_usage -gt 80 ]; then
    echo "ALERT: Disk usage is at ${disk_usage}%"
fi
```

### 2. Sauvegarde Automatique

```bash
# Script de sauvegarde (à placer dans /opt/scripts/backup.sh)
#!/bin/bash

BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

# Créer le répertoire de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarde de la base de données
docker compose exec -T postgres_db pg_dump -U devuser entreprise_db > $BACKUP_DIR/db_backup_$DATE.sql

# Sauvegarde des fichiers uploadés
tar -czf $BACKUP_DIR/uploads_backup_$DATE.tar.gz backend/uploads/

# Nettoyer les anciennes sauvegardes (garder 7 jours)
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

### 3. Crontab pour l'Automatisation

```bash
# Éditer le crontab
crontab -e

# Ajouter ces lignes :
# Monitoring toutes les 5 minutes
*/5 * * * * /opt/scripts/monitor.sh >> /var/log/monitor.log 2>&1

# Sauvegarde quotidienne à 2h du matin
0 2 * * * /opt/scripts/backup.sh >> /var/log/backup.log 2>&1

# Nettoyage des logs Docker hebdomadaire
0 3 * * 0 docker system prune -f >> /var/log/docker-cleanup.log 2>&1
```

## Mise à Jour

### 1. Mise à Jour Manuelle

```bash
cd /opt/entreprise-organiser

# Sauvegarder avant mise à jour
/opt/scripts/backup.sh

# Récupérer les dernières modifications
git pull origin main

# Reconstruire et redémarrer
docker compose down
docker compose up -d --build

# Exécuter les migrations si nécessaire
docker compose exec backend npm run db:migrate
```

### 2. Mise à Jour Automatique (CI/CD)

Le pipeline CI/CD se déclenche automatiquement lors des push sur la branche `main`. Voir `.github/workflows/ci.yml` pour les détails.

## Dépannage

### Problèmes Courants

1. **Conteneur qui ne démarre pas**
   ```bash
   # Vérifier les logs
   docker compose logs [service_name]
   
   # Redémarrer un service spécifique
   docker compose restart [service_name]
   ```

2. **Problème de base de données**
   ```bash
   # Se connecter à la base
   docker compose exec postgres_db psql -U devuser -d entreprise_db
   
   # Vérifier l'état de la base
   \dt
   ```

3. **Problème de permissions**
   ```bash
   # Corriger les permissions des uploads
   sudo chown -R 1001:1001 backend/uploads/
   ```

### Logs Importants

- Application: `docker compose logs -f`
- Nginx: `/var/log/nginx/error.log`
- Système: `/var/log/syslog`
- Monitoring: `/var/log/monitor.log`

## Sécurité

### Recommandations

1. **Firewall**
   ```bash
   sudo ufw enable
   sudo ufw allow ssh
   sudo ufw allow 80
   sudo ufw allow 443
   ```

2. **Mise à jour régulière**
   ```bash
   # Système
   sudo apt update && sudo apt upgrade -y
   
   # Images Docker
   docker compose pull
   ```

3. **Monitoring des accès**
   - Configurer fail2ban
   - Surveiller les logs d'accès Nginx
   - Utiliser des outils comme Grafana/Prometheus

## Support

Pour toute question ou problème :
- Documentation: `/docs`
- Issues GitHub: [Lien vers les issues]
- Email: support@votre-domaine.com

---

**Note**: Ce guide suppose une installation sur Ubuntu. Adaptez les commandes selon votre distribution Linux. 