const express = require('express'),
		crypto = require('crypto'),
		MongoClient = require('mongodb').MongoClient,
		router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/secret', (req, res) => {
	MongoClient.connect('mongodb://127.0.0.1:27017', (err, client) => {
		if(err) throw err;
		const db = client.db('testDB');

		db.collection('homework7').findOne({}, (err, doc) => {
			if(err) throw err;

			const key = process.env.KEY || 'asaadsaad';
			const decipher = crypto.createDecipher('aes256', key);
			const encrypted = doc.message;
			let decrypted = '';
			decipher.on('readable', () => {
				const data = decipher.read();

				if(data) {
					decrypted += data.toString('utf8');
				}
			});

			decipher.on('end', () => {
				res.render('secret', {
					decryptedMessage: decrypted,
					encryptedMessage: encrypted
				});

				client.close();
			});

			decipher.write(encrypted, 'hex');
			decipher.end();
		});
	});
});

module.exports = router;