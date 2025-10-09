const express = require('express');
const client = require('prom-client');

const app = express();
const port = 8080;

// Créer un compteur simple
const counter = new client.Counter({
  name: 'node_app_requests_total',
  help: 'Nombre de requêtes vers l\'app'
});

// Middleware pour compter les requêtes
app.use((req, res, next) => {
  counter.inc();
  next();
});

// Endpoint principal
app.get('/', (req, res) => {
  res.send('Hello, Prometheus!');
});

// Endpoint métriques pour Prometheus
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(await client.register.metrics());
});

app.listen(port,'0.0.0.0', () => {
  console.log(`App listening at http://0.0.0.0:${port}`);
});
