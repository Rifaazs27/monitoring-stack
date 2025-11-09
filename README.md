# 📈 Monitoring Stack — Prometheus, Grafana, Node Exporter & Node.js

Ce projet met en place une stack complète de **monitoring d’application et système** sur une **VM Azure** en utilisant :

- **Prometheus** → collecte des métriques  
- **Grafana** → visualisation des métriques  
- **Node Exporter** → métriques système  
- **Node.js** → exposition de métriques personnalisées  
- **Docker Compose** → déploiement automatisé  

L’objectif est d’obtenir une solution de supervision moderne, simple à déployer et extensible.

---

## 🧩 Architecture du projet

La VM Azure héberge 4 conteneurs Docker :

+--------------------------------------------------+
| Azure Virtual Machine |
| |
| +----------------+ +-------------------+ |
| | Node App | ---> | Prometheus | |
| | (8080/metrics)| | (9090) | |
| +----------------+ +-------------------+ |
| ^ ^ |
| | | |
| +----------------+ | |
| | Node Exporter | -----------------+ |
| | (9100) | |
| +----------------+ |
| |
| +------------------------+ |
| | Grafana | |
| | (3000) | |
| +------------------------+ |
+--------------------------------------------------+

yaml
Copier le code

---

## 🚀 Stack technique

- **Node.js** → application exposant `/metrics`  
- **Express + prom-client** → génération de métriques  
- **Node Exporter** → exposition des métriques systèmes de la VM  
- **Prometheus** → scraping des métriques  
- **Grafana** → dashboards  
- **Docker Compose** → orchestration  
- **Volumes Docker** → persistance des données  

---

## 📦 Installation & Déploiement

### 1️⃣ Cloner le dépôt

```bash
git clone https://github.com/Rifaazs27/monitoring-stack.git
cd monitoring-stack
2️⃣ Lancer toute la stack
bash
Copier le code
docker compose up -d --build
3️⃣ Vérifier les conteneurs
bash
Copier le code
docker ps
Vous devez voir :

prometheus (9090)

grafana (3000)

node-exporter (9100)

node-app (8080)

🌐 Accès aux services
Service	URL
Node App	http://IP_PUBLIC:8080
Metrics App	http://IP_PUBLIC:8080/metrics
Prometheus	http://IP_PUBLIC:9090
Node Exporter	http://IP_PUBLIC:9100/metrics
Grafana	http://IP_PUBLIC:3000

⚙️ Configuration de Prometheus
Le fichier prometheus.yml contient les targets scrappées :

yaml
Copier le code
scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['node-app:8080']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']
📊 Dashboards Grafana
Accéder à Grafana
→ http://IP_PUBLIC:3000

Se connecter (admin / admin)

Ajouter Prometheus comme datasource :

URL : http://prometheus:9090

Importer des dashboards :

Node Exporter Full (ID : 1860)

Dashboard personnalisé pour les métriques de l'app

📁 Structure du projet
pgsql
Copier le code
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
│   └── (données persistées via volumes)
│
├── docker-compose.yml
├── .gitignore
└── README.md
🔒 Persistance des données
Grâce aux volumes Docker, les données sont conservées :

prometheus-data → stocke l’historique des métriques

grafana-data → stocke les dashboards, utilisateurs, datasources

🧪 Tests & Démonstration
Tester l'application Node
bash
Copier le code
curl http://localhost:8080
curl http://localhost:8080/metrics
Générer du trafic pour voir les métriques évoluer
bash
Copier le code
watch -n 0.2 curl -s http://localhost:8080 > /dev/null
Vérifier les métriques sur Prometheus
Aller dans :
🔎 http://IP_PUBLIC:9090 → Status → Targets

🛑 Arrêter la stack
bash
Copier le code
docker compose down
Supprimer les volumes :

bash
Copier le code
docker compose down -v
📌 Améliorations possibles
Ajouter Loki + Promtail (logs)

Ajouter Alertmanager (alerting)

Connecter Grafana à Azure AD

Déploiement Terraform

Déployer la stack sur plusieurs VM

✅ Conclusion
Cette stack fournit une solution complète de monitoring applicatif et système :

👉 Node.js expose des métriques personnalisées
👉 Node Exporter expose les métriques système
👉 Prometheus collecte les métriques
👉 Grafana permet d’analyser et visualiser









