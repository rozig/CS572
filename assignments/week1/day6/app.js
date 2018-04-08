const express = require('express'),
        path = require('path'),
        cons = require('consolidate'),
        compression = require('compression'),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        validator = require('express-validator'),
        csrf = require('csurf'),
        helmet = require('helmet'),
        app = express()

        mainController = require('./controller/main');

require('dotenv').config();

app.set('x-powered-by', false);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view cache', true);
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(logger('dev'));
app.use(cookieParser());

let sessionOptions = {
    secret: process.env.SECRET || 'thisIsNotSecretChangeItInEnv',
    resave: false,
    saveUninitialized: true,
    cookie: {}
};

if(app.get('env') === 'production') {
    app.set('trust proxy', true);
    sessionOptions.cookie.secure = true;
}

app.use(session(sessionOptions));
app.use(csrf());
app.use(helmet());
app.use(validator());

app.use('/css', express.static(path.join(__dirname, 'public', 'stylesheets')));

app.use((req, res, next) => {
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use('/', mainController);

module.exports = app;