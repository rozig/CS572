const express = require('express');
const cons = require('consolidate');
const path = require('path');
const compression = require('compression');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const helmet = require('helmet');
const app = express();

const main = require('./routes/main');
const location = require('./routes/location');

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

app.use('/', main);
app.use('/location', location);

module.exports = app;
