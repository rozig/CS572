const path = require('path');
const express = require('express');
const cons = require('consolidate');
const app = express();

const userController = require('./controller/users');

app.set('x-powered-by', false);
app.set('trust proxy', true);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view cache', true);
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', userController);

module.exports = app;