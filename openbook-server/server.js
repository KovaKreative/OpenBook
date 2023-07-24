// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const cors = require('cors');

const PORT = process.env.PORT || 3000;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(cookieSession({ name: 'session', keys: ['lazyEgg'], maxAge: 365 * 24 * 60 * 60 * 1000 }));
app.use(cors({
  origin: 'http://localhost:8080',
  methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
  credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/user');
const storiesRoutes = require('./routes/stories');
const readRoutes = require('./routes/read');
const storyRoutes = require('./routes/story');
const contributeRoutes = require('./routes/contribute');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/', usersRoutes);
app.use('/stories', storiesRoutes);
app.use('/read', readRoutes);
app.use('/story', storyRoutes);
app.use('/contribute', contributeRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('login');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
