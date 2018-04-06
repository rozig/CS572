const express = require('express');
const fetch = require('node-fetch');
const Rx = require('rxjs/Rx');
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/promise', (req, res) => {
	fetch('http://jsonplaceholder.typicode.com/users/')
		.then(res => res.json())
		.then(data => {
			res.render('users', { users: data });
		})
		.catch(err => console.log(err));
});

router.get('/observable', (req, res) => {
	const source = Rx.Observable.fromPromise(fetch('http://jsonplaceholder.typicode.com/users/'));
	source
		.flatMap(response => Rx.Observable.from(response.json()))
		.subscribe(data => {
			res.render('users', { users: data });
		}, err => console.log(err));
});

router.get('/await', (req, res) => {
	(async () => {
		const response = await fetch('http://jsonplaceholder.typicode.com/users/');
		const users = await response.json();
		res.render('users', { users: users });
	})();
});

module.exports = router;