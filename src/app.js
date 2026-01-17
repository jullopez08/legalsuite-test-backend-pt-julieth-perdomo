const express = require('express');
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');


app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API running' });
});

app.use(notFound);

app.use(errorHandler);

module.exports = app;
