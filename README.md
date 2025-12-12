# 🚀 SRAITO - Trading Platform

<p align="center">
  <img src="public/favicon.svg" alt="Sraito Logo" width="120" height="120">
</p>

<p align="center">
  <strong>Plateforme de trading automatique no-code</strong><br>
  Créez, testez et exécutez des stratégies de trading sans écrire une ligne de code
</p>

<p align="center">
  <a href="#-démarrage-rapide">Démarrage</a> •
  <a href="#-environnements">Environnements</a> •
  <a href="#-cicd">CI/CD</a> •
  <a href="#-architecture">Architecture</a>
</p>

---

## 📋 Table des matières

- [Prérequis](#-prérequis)
- [Démarrage rapide](#-démarrage-rapide)
- [Environnements](#-environnements)
  - [Development](#development-dev)
  - [Staging](#staging)
  - [Production](#production-prod)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Structure du projet](#-structure-du-projet)
- [Commandes utiles](#-commandes-utiles)
- [Configuration](#-configuration)
- [Déploiement](#-déploiement)

---

## 🔧 Prérequis

- **Docker** >= 24.0
- **Docker Compose** >= 2.20
- **Node.js** >= 20 (pour développement local sans Docker)
- **Git**

```bash
# Vérifier les versions
docker --version
docker compose version
node --version
```

---

## 🚀 Démarrage rapide

### 1. Cloner le repository

```bash
git clone https://github.com/votre-username/sraito.git
cd sraito
```

### 2. Copier les variables d'environnement

```bash
cp .env.example .env
```

### 3. Lancer en mode développement

```bash
# Avec Docker (recommandé)
make dev

# OU sans Docker
npm install
npm run dev
```

### 4. Accéder à l'application

- **Dev**: http://localhost:3000
- **Staging**: http://localhost:8080
- **Prod**: http://localhost:80

---

## 🌍 Environnements

### Development (DEV)

Mode développement avec hot-reload pour une expérience de développement optimale.

```bash
# Démarrer
make dev
# ou
docker compose -f docker-compose.dev.yml up

# Avec rebuild
make dev-build
# ou
docker compose -f docker-compose.dev.yml up --build

# Voir les logs
make dev-logs

# Arrêter
make dev-down
```

**Caractéristiques:**
- ✅ Hot reload activé
- ✅ Source maps
- ✅ Volumes montés (code synchronisé)
- ✅ Port 3000
- ⚠️ Pas de cache nginx

---

### Staging

Environnement de pré-production pour les tests d'intégration.

```bash
# Démarrer
make staging
# ou
docker compose -f docker-compose.staging.yml up -d

# Avec rebuild
make staging-build

# Voir les logs
make staging-logs

# Arrêter
make staging-down
```

**Caractéristiques:**
- ✅ Build optimisé
- ✅ Nginx avec gzip
- ✅ Health checks
- ✅ Port 8080
- ✅ Ressources limitées (CPU/RAM)

---

### Production (PROD)

Environnement de production avec toutes les optimisations.

```bash
# Démarrer
make prod
# ou
docker compose -f docker-compose.prod.yml up -d

# Avec rebuild
make prod-build

# Voir les logs
make prod-logs

# Redémarrer
make prod-restart

# Arrêter
make prod-down
```

**Caractéristiques:**
- ✅ Build multi-stage optimisé
- ✅ Nginx avec cache et gzip
- ✅ Health checks
- ✅ Auto-restart
- ✅ Rolling updates
- ✅ Logging JSON
- ✅ Port 80

---

## 🔄 CI/CD Pipeline

Le projet utilise **GitHub Actions** pour l'intégration et le déploiement continus.

### Pipeline CI (Intégration Continue)

Déclenché sur **chaque push** et **pull request**.

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│    Lint     │ -> │    Test     │ -> │    Build    │ -> │   Docker    │
│   ESLint    │    │   Vitest    │    │    Vite     │    │   Build     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                                                                │
                                                                v
                                                         ┌─────────────┐
                                                         │  Security   │
                                                         │    Scan     │
                                                         └─────────────┘
```

**Jobs:**
1. **Lint** - Vérifie le code avec ESLint
2. **Test** - Exécute les tests unitaires
3. **Build** - Compile l'application
4. **Docker Build** - Vérifie que l'image Docker se construit
5. **Security Scan** - Scan de vulnérabilités avec Trivy

### Pipeline CD (Déploiement Continu)

```
┌─────────────────────────────────────────────────────────────────────┐
│                         DÉCLENCHEURS                                 │
├─────────────────────────────────────────────────────────────────────┤
│  push main branch  ──────────────> Deploy STAGING                   │
│  push tag v*.*.*   ──────────────> Deploy PRODUCTION               │
│  manual trigger    ──────────────> Choose environment               │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Build &   │ -> │    Push     │ -> │   Deploy    │ -> │   Health    │
│   Test      │    │   to GHCR   │    │   via SSH   │    │   Check     │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
```

### Workflow de déploiement

```bash
# DÉVELOPPEMENT
# Travaillez sur une branche feature
git checkout -b feature/ma-feature
git commit -m "feat: nouvelle fonctionnalité"
git push origin feature/ma-feature
# -> CI s'exécute automatiquement

# STAGING
# Merger dans main déclenche le déploiement staging
git checkout main
git merge feature/ma-feature
git push origin main
# -> CI + Déploiement STAGING automatique

# PRODUCTION
# Créer un tag déclenche le déploiement production
git tag v1.0.0
git push origin v1.0.0
# -> CI + Déploiement PRODUCTION automatique
```

### Configuration des Secrets GitHub

Allez dans **Settings > Secrets and variables > Actions** et ajoutez:

| Secret | Description |
|--------|-------------|
| `STAGING_HOST` | IP/hostname du serveur staging |
| `STAGING_USER` | Utilisateur SSH staging |
| `STAGING_SSH_KEY` | Clé SSH privée staging |
| `STAGING_API_URL` | URL de l'API staging |
| `PROD_HOST` | IP/hostname du serveur production |
| `PROD_USER` | Utilisateur SSH production |
| `PROD_SSH_KEY` | Clé SSH privée production |
| `PROD_API_URL` | URL de l'API production |
| `SLACK_WEBHOOK` | (Optionnel) Webhook Slack pour notifications |

---

## 📁 Structure du projet

```
sraito/
├── .github/
│   └── workflows/
│       ├── ci.yml              # Pipeline CI
│       └── cd.yml              # Pipeline CD
├── docker/                     # Configs Docker additionnelles
├── nginx/
│   ├── nginx.conf              # Config Nginx principale
│   └── default.conf            # Config du serveur
├── public/
│   └── favicon.svg             # Favicon
├── src/
│   ├── components/             # Composants React
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilitaires
│   ├── pages/                  # Pages/routes
│   ├── styles/
│   │   └── index.css           # Styles globaux + Tailwind
│   ├── App.jsx                 # Composant principal
│   └── main.jsx                # Point d'entrée
├── .env.example                # Variables d'environnement exemple
├── .gitignore
├── docker-compose.yml          # Config Docker de base
├── docker-compose.dev.yml      # Config Docker DEV
├── docker-compose.staging.yml  # Config Docker STAGING
├── docker-compose.prod.yml     # Config Docker PROD
├── Dockerfile                  # Image de production
├── Dockerfile.dev              # Image de développement
├── Makefile                    # Commandes pratiques
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## 💻 Commandes utiles

```bash
# Afficher l'aide
make help

# === DÉVELOPPEMENT ===
make dev              # Démarrer en mode dev
make dev-build        # Rebuild dev
make dev-logs         # Voir les logs
make dev-shell        # Shell dans le container
make dev-down         # Arrêter

# === STAGING ===
make staging          # Démarrer staging
make staging-build    # Rebuild staging
make staging-logs     # Voir les logs
make staging-down     # Arrêter

# === PRODUCTION ===
make prod             # Démarrer prod
make prod-build       # Rebuild prod
make prod-logs        # Voir les logs
make prod-restart     # Redémarrer
make prod-down        # Arrêter

# === UTILITAIRES ===
make test             # Lancer les tests
make lint             # Lancer le linter
make build            # Build local
make clean            # Nettoyer tout
make prune            # Nettoyer Docker
make status           # Statut des containers
```

---

## ⚙️ Configuration

### Variables d'environnement

| Variable | Description | Dev | Staging | Prod |
|----------|-------------|-----|---------|------|
| `VITE_ENV` | Environnement | development | staging | production |
| `VITE_API_URL` | URL de l'API backend | localhost:8000 | api.staging.sraito.com | api.sraito.com |
| `NODE_ENV` | Mode Node.js | development | staging | production |

### Ports par environnement

| Environnement | Frontend | API (futur) |
|---------------|----------|-------------|
| Development | 3000 | 8000 |
| Staging | 8080 | 8001 |
| Production | 80/443 | 8000 |

---

## 🚢 Déploiement

### Préparer le serveur (Staging/Prod)

```bash
# Sur le serveur
mkdir -p /opt/sraito
cd /opt/sraito

# Copier les fichiers docker-compose
scp docker-compose.staging.yml user@server:/opt/sraito/
# ou
scp docker-compose.prod.yml user@server:/opt/sraito/

# Créer le fichier .env
cp .env.example .env
# Éditer les variables
nano .env
```

### Déploiement manuel

```bash
# Staging
ssh user@staging-server
cd /opt/sraito
docker compose -f docker-compose.staging.yml pull
docker compose -f docker-compose.staging.yml up -d

# Production
ssh user@prod-server
cd /opt/sraito
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d
```

### Rollback

```bash
# Lister les versions disponibles
docker images | grep sraito

# Rollback vers une version spécifique
TAG=v1.0.0 docker compose -f docker-compose.prod.yml up -d
```

---

## 🔒 Sécurité

- ✅ Headers de sécurité Nginx (X-Frame-Options, X-Content-Type-Options, etc.)
- ✅ Scan de vulnérabilités automatique (Trivy)
- ✅ Secrets gérés via GitHub Secrets
- ✅ Images Docker multi-stage (réduction surface d'attaque)
- ✅ Health checks pour monitoring

---

## 📝 Licence

Propriétaire - Tous droits réservés

---

<p align="center">
  Fait avec ❤️ par l'équipe Sraito
</p>
