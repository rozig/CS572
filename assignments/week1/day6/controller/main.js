const express = require('express'),
        url = require('url'),
        fs = require('fs'),
        router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/newsletter', (req, res) => {
    res.render('newsletter');
});

router.post('/newsletter', (req, res) => {
    req.assert('email', 'Email is required').notEmpty();
    req.assert('email', 'Email must be valid').isEmail();

    const errors = req.validationErrors();

    if(errors) {
        res.render('newsletter', { errors: errors });
    } else {
        const email = req.body.email;
        fs.stat('subscribers.txt', (err, stat) => {
            if(err === null) {
                fs.appendFile('subscribers.txt', `,${email}`, (err) => {
                    if(err) return console.log(err);
                })
            } else if(err.code === 'ENOENT') {
                fs.writeFile('subscribers.txt', email, (err) => {
                    if(err) return console.log(err);
                });
            } else {
                console.log(err);
            }
        });
        res.redirect(`/thankyou?email=${email}`);
    }
});

router.get('/thankyou', (req, res) => {
    const queryString = url.parse(req.url, true);
    res.locals.email = queryString.query.email;
    res.render('thankyou');
});

module.exports = router;
