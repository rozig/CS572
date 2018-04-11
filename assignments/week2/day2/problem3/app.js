const express = require('express'),
		cons = require('consolidate'),
		path = require('path'),
        compression = require('compression'),
        logger = require('morgan'),
        cookieParser = require('cookie-parser'),
        session = require('express-session'),
        csrf = require('csurf'),
        helmet = require('helmet'),
		app = express(),

		home = require('./routes/home');

app.set('x-powered-by', false);
app.set('case sensitive routing', true);
app.set('strict routing', true);
app.set('view cache', false);
app.engine('html', cons.mustache);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
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

app.use('/css', express.static(path.join(__dirname, 'public', 'stylesheets')));
app.use('/js', express.static(path.join(__dirname, 'public', 'javascripts')));

app.use((req, res, next) => {
    res.locals.csrftoken = req.csrfToken();
    next();
});

app.use('/', home);

module.exports = app;
