    'use strict'
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');

const apiRouter = require('./apiRouter');
const asgNameCache = require('./services/asgNameCache.js');
const errors = require('./errors.js');

asgNameCache.refresh();
setInterval(asgNameCache.refresh, 60 * 60 * 1000);//every hour


const app = express();
app.use(bodyParser.json({ type: 'application/json' }));
app.use('/api', apiRouter);


//SPA Files
app.use('/static', express.static(path.join(__dirname, '../pub')));
app.use('/*', express.static(path.join(__dirname, '../pub/index.html')));
app.get('/', function (req, res) { res.redirect('/index.html') });

app.use(errors.handler)

module.exports = app;
