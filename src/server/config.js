const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

//Initialization
const app = express();

//Settings
app.set('port',process.env.PORT || 3005);

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors({origin: process.env.URL_CORS }));

//Routes
app.use(require('../routes/message.routes'));

//Exports
module.exports = app;