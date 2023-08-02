require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

const app = express();
const port = 3000 || process.env.PORT;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
     mongoUrl: process.env.DATABASE_URL
    })
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

// COnnect to Mongo database
connectDB();

// Static Files
app.use(express.static('public'));

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set ('view engine', 'ejs');

// Routes
app.use('/', require('./routes/auth'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/dashboard'));


// 404 error
app.get('*', function(req,res) {
    res.status(404).render('error404');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

