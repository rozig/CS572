const express = require('express'),
		mongo = require('mongodb'),
		MongoClient = mongo.MongoClient,
		router = express.Router(),

		dbUri = 'mongodb://127.0.0.1:27017';

router.get('/', (req, res) => {
	MongoClient.connect(dbUri, (err, client) => {
		if(err) throw err;
		const db = client.db('test_db');

		db.collection('locationPoints').find({}).toArray((err, docs) => {
			if(err) throw err;

			res.locals.locations = docs;
			res.render('index');
			return client.close();
		});
	});
});

router.get('/location/new', (req, res) => {
	res.render('add');
});

router.get('/location/edit/:id', (req, res) => {
	MongoClient.connect(dbUri, (err, client) => {
		if(err) throw err;
		const db = client.db('test_db');
		const id = new mongo.ObjectID(req.params.id);

		db.collection('locationPoints').findOne({_id: id}, (err, doc) => {
			if(err) throw err;
			console.dir(doc);
			res.locals.location = doc;
			res.render('edit');
			return client.close();
		});
	});
});

router.post('/location', (req, res) => {
	MongoClient.connect(dbUri, (err, client) => {
		if(err) throw err;
		const db = client.db('test_db');

		const location = {
			name: req.body.name,
			category: req.body.category,
			long: req.body.longitude,
			lat: req.body.latitude
		};

		db.collection('locationPoints').insert(location, (err, docInserted) => {
			if(err) throw err;

			res.redirect('/');	
			return client.close();
		});
	});
});

router.post('/location/update/:id', (req, res) => {
	MongoClient.connect(dbUri, (err, client) => {
		if(err) throw err;
		const db = client.db('test_db');

		const id = mongo.ObjectID(req.params.id);
		const location = {
			name: req.body.name,
			category: req.body.category,
			long: req.body.longitude,
			lat: req.body.latitude
		};

		db.collection('locationPoints').update({_id: id}, location, {upsert: true}, (err, numUpdated) => {
			if(err) throw err;

			res.redirect('/');
			return client.close();
		});
	});
});

router.get('/location/delete/:id', (req, res) => {
	MongoClient.connect(dbUri, (err, client) => {
		if(err) throw err;
		const db = client.db('test_db');

		const id = mongo.ObjectID(req.params.id);

		db.collection('locationPoints').remove({_id: id}, (err, result) => {
			if(err) throw err;

			console.dir(result);
			res.redirect('/');
			return client.close();
		});
	});
});

module.exports = router;
