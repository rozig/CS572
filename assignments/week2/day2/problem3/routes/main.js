const express = require('express');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const router = express.Router();
const dbUri = 'mongodb://127.0.0.1:27017';

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

router.get('/result', (req, res) => {
    MongoClient.connect(dbUri, (err, client) => {
        if(err) throw err;
        const db = client.db('test_db');

        db.collection('locationPoints').find({}).toArray((err, docs) => {
            if(err) throw err;

            res.locals.locations = docs;
            res.render('result');
            return client.close();
        });
    });
});

module.exports = router;
