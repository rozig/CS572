const express = require('express');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const router = express.Router();
const dbUri = 'mongodb://127.0.0.1:27017';

router.get('/new', (req, res) => {
    res.render('add');
});

router.get('/edit/:id', (req, res) => {
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

router.post('/new', (req, res) => {
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

router.post('/update/:id', (req, res) => {
    MongoClient.connect(dbUri, (err, client) => {
        if(err) throw err;
        const db = client.db('test_db');

        const id = new mongo.ObjectID(req.params.id);
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

router.get('/delete/:id', (req, res) => {
    MongoClient.connect(dbUri, (err, client) => {
        if(err) throw err;
        const db = client.db('test_db');

        const id = new mongo.ObjectID(req.params.id);

        db.collection('locationPoints').remove({_id: id}, (err, result) => {
            if(err) throw err;

            console.dir(result);
            res.redirect('/');
            return client.close();
        });
    });
});

module.exports = router;
