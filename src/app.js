const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const express = require('express');
const lawyerRouter = require("./routes/lawyer.router");
const legalCaseRouter = require("./routes/legalCase.router");
const reportRouter = require("./routes/report.router");
const authRouter = require("./routes/auth.router");
const app = express();
const errorHandler = require('./middlewares/errorHandler');
const notFound = require('./middlewares/notFound');

 
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API running' });
});
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRouter);
app.use("/api/legal-cases", legalCaseRouter);
app.use("/api/lawyers", lawyerRouter);
app.use("/api/reports",reportRouter );

app.use(notFound);

app.use(errorHandler);

module.exports = app;
