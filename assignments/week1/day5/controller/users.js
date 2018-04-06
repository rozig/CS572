const express = require('express');
const fetch = require('node-fetch');
const Rx = require('rxjs/Rx');
const router = express.Router();

router.get('/', (req, res) => {
	const getUsersPromise = fetch('http://jsonplaceholder.typicode.com/users/');
	// Using Promise
	getUsersPromise
		.then(res => res.json())
		.then(data => {
			res.render('index', { users: data });
		})
		.catch(err => console.log(err));
	
	// Using async/await
	// (async () => {
	// 	const response = await getUsersPromise;
	// 	const users = await response.json();
	// 	res.render('index', { users: users });
	// })();
	
	// Using Observables
	// const source = Rx.Observable.fromPromise(getUsersPromise);
	// source.subscribe(async (data) => {
	// 	const users = await data.json();
	// 	res.render('index', { users: users });
	// }, err => console.log(err));
});

module.exports = router;