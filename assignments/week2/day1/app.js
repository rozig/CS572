const express = require('express'),
		cons = require('consolidate'),
		path = require('path'),
		app = express(),

		main = require('./controller/main');

app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use('/', main);

module.exports = app;