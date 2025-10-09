const express = require('express');
const client = require('prom-client');

const app = express();
const port = 8080;

// Création d'un registre Prometheus
const register = new client.Registry();

// Quelques métriques personnalisées
const httpRequestsTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Nombre total de requêtes HTTP reçues',
});

const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Durée des requêtes HTTP en secondes',
  buckets: [0.1, 0.5, 1, 2, 5],
});

// Enregistrer les métriques
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDuration);

// Middleware pour mesurer chaque requête
app.use((req, res, next) => {
  const end = httpRequestDuration.startTimer();
  res.on('finish', () => {
    httpRequestsTotal.inc();
    end();
  });
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, Prometheus avec métriques personnalisées 🚀');
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(port, '0.0.0.0', () => {
  console.log(`App listening at http://0.0.0.0:${port}`);
});
