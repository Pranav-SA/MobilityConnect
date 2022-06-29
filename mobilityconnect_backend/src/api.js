"use strict";

const express    = require('express');
const bodyParser = require('body-parser');
const helmet     = require('helmet');

const middlewares = require('./middlewares');

const auth  = require('./routes/auth');
const packages  = require('./routes/packages');
const tickets = require('./routes/tickets');
const cars = require('./routes/cars');

const api = express();

// Adding Basic Middlewares
api.use(helmet());
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(middlewares.allowCrossDomain);


// Basic route
api.get('/', (req, res) => {
    res.json({
        name: 'MobilityConnect Backend'
    });
});

// API routes
api.use('/auth'  , auth);
api.use('/packages'  , packages);
api.use('/tickets', tickets);
api.use('/cars', cars);

module.exports = api;