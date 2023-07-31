require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Static Files
app.use(express.static('public'));

// Templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set ('view engine', 'ejs');

// Routes
app.use('/', require('./routes/index'));
app.use('/', require('./routes/dashboard'));


// 404 error
app.get('*', function(req,res) {
    res.status(404).render('error404');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

