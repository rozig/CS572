const express = require('express');
const path = require('path');
const cons = require('consolidate');
const cookieParser = require('cookie-parser');
const mongo = require('mongodb');

const tasks = require('./routes/tasks');

const app = express();

const MongoServer = mongo.Server;
const Db = mongo.Db;

app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const server = new MongoServer('localhost', 27017, {auto_reconnect: true});
const db = new Db('todo_db', server);

app.use((req, res, next) => {
	req.db = db;
	next();
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
