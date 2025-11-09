Voici un README simple, clair et propre, parfait pour un projet scolaire ou pro.
Pas de superflu, que l’essentiel. Uniquement du Markdown.

# Monitoring Stack – Prometheus, Grafana, Node Exporter & Node.js

Ce projet met en place une stack simple de monitoring sur une VM Azure à l’aide de :

- Node.js (application + métriques personnalisées)
- Prometheus (scraping des métriques)
- Node Exporter (métriques système)
- Grafana (dashboards)
- Docker & Docker Compose (orchestration)

---

## Architecture



VM Azure
│
├── Node App (8080)
├── Node Exporter (9100)
├── Prometheus (9090)
└── Grafana (3000)


Prometheus récupère :
- les métriques de l'application Node.js
- les métriques système via Node Exporter  
Grafana affiche ces données sous forme de dashboards.

---

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/Rifaazs27/monitoring-stack.git
cd monitoring-stack

2. Lancer la stack
docker compose up -d --build

3. Vérifier les conteneurs
docker ps

Accès aux services
Service	URL
Node App	http://IP_PUBLIC:8080
Metrics App	http://IP_PUBLIC:8080/metrics
Prometheus	http://IP_PUBLIC:9090
Node Exporter	http://IP_PUBLIC:9100/metrics
Grafana	http://IP_PUBLIC:3000

Identifiants Grafana :
admin / admin

Configuration Prometheus

Extrait du fichier prometheus.yml :

scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['node-app:8080']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

Structure du projet
monitoring-stack/
│
├── node-app/
│   ├── index.js
│   ├── package.json
│   └── Dockerfile
│
├── prometheus/
│   └── prometheus.yml
│
├── grafana/
│
├── docker-compose.yml
└── README.md

Commandes utiles

Arrêter la stack :

docker compose down


Supprimer les volumes (réinitialisation complète) :

docker compose down -v


Tester l'application :

curl http://localhost:8080
curl http://localhost:8080/metrics

Améliorations possibles

Ajouter Alertmanager (alertes)

Ajouter Loki + Promtail (logs)

Ajouter une authentification Azure AD

Déploiement automatisé via Terraform

Conclusion

Cette stack permet de mettre en place un monitoring simple et efficace sur une machine Azure en utilisant Docker.
Elle offre une visibilité complète sur :

l’état de l’application

les métriques système

l’évolution des performances dans Grafana
