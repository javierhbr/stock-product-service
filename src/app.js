const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');

// Database connection
mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser: true},
    () => console.log('connected to DB!!')
);

// Initialize server
const app = express();

const {checkLanguage} = require('./middlewares');


const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);
app.use(checkLanguage);

module.exports = app;
