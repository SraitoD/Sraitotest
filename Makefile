# ===========================================
# SRAITO - Makefile
# Convenient commands for development
# ===========================================

.PHONY: help dev staging prod build test lint clean logs shell

# Default target
help:
	@echo ""
	@echo "🚀 SRAITO - Available Commands"
	@echo "==============================="
	@echo ""
	@echo "Development:"
	@echo "  make dev          - Start development environment (hot reload)"
	@echo "  make dev-build    - Rebuild dev containers"
	@echo "  make dev-logs     - View dev container logs"
	@echo "  make dev-shell    - Open shell in dev container"
	@echo ""
	@echo "Staging:"
	@echo "  make staging      - Start staging environment"
	@echo "  make staging-build- Rebuild staging containers"
	@echo "  make staging-logs - View staging logs"
	@echo ""
	@echo "Production:"
	@echo "  make prod         - Start production environment"
	@echo "  make prod-build   - Rebuild production containers"
	@echo "  make prod-logs    - View production logs"
	@echo ""
	@echo "Utilities:"
	@echo "  make test         - Run tests"
	@echo "  make lint         - Run linter"
	@echo "  make build        - Build for production (local)"
	@echo "  make clean        - Stop all containers and clean"
	@echo "  make prune        - Remove unused Docker resources"
	@echo ""

# ==========================================
# DEVELOPMENT
# ==========================================

dev:
	@echo "🔧 Starting development environment..."
	docker compose -f docker-compose.dev.yml up

dev-build:
	@echo "🔧 Building development environment..."
	docker compose -f docker-compose.dev.yml up --build

dev-down:
	docker compose -f docker-compose.dev.yml down

dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

dev-shell:
	docker compose -f docker-compose.dev.yml exec frontend sh

# ==========================================
# STAGING
# ==========================================

staging:
	@echo "🎭 Starting staging environment..."
	docker compose -f docker-compose.staging.yml up -d

staging-build:
	@echo "🎭 Building staging environment..."
	docker compose -f docker-compose.staging.yml up -d --build

staging-down:
	docker compose -f docker-compose.staging.yml down

staging-logs:
	docker compose -f docker-compose.staging.yml logs -f

# ==========================================
# PRODUCTION
# ==========================================

prod:
	@echo "🚀 Starting production environment..."
	docker compose -f docker-compose.prod.yml up -d

prod-build:
	@echo "🚀 Building production environment..."
	docker compose -f docker-compose.prod.yml up -d --build

prod-down:
	docker compose -f docker-compose.prod.yml down

prod-logs:
	docker compose -f docker-compose.prod.yml logs -f

prod-restart:
	docker compose -f docker-compose.prod.yml restart

# ==========================================
# LOCAL DEVELOPMENT (without Docker)
# ==========================================

install:
	npm install

start:
	npm run dev

build:
	npm run build

test:
	npm run test

lint:
	npm run lint

# ==========================================
# UTILITIES
# ==========================================

clean:
	@echo "🧹 Cleaning up..."
	docker compose -f docker-compose.dev.yml down -v 2>/dev/null || true
	docker compose -f docker-compose.staging.yml down -v 2>/dev/null || true
	docker compose -f docker-compose.prod.yml down -v 2>/dev/null || true
	rm -rf node_modules dist

prune:
	@echo "🗑️ Pruning Docker resources..."
	docker system prune -af
	docker volume prune -f

status:
	@echo "📊 Docker Status:"
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
