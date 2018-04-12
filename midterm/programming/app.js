const express = require('express');
const path = require('path');
const cons = require('consolidate');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;

const tasks = require('./routes/tasks');

const app = express();

app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
	app.db = client.db('test_db');
});

app.use('/tasks', tasks);

app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
});

module.exports = app;
