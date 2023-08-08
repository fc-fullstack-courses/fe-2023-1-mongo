const express = require('express');
const cors = require('cors');
const router = require('./routers');
const { basicErrorHandler } = require('./middlewares/errors');
const { tokenErrorHandler } = require('./middlewares/errors/tokens');

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

app.use(tokenErrorHandler);
app.use(basicErrorHandler);

module.exports = app;
