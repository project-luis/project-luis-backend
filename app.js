const logger = require('morgan');
const { isAuthenticated } = require('./middleware/jwt.middleware');

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

app.get('/home', (req, res, next) => {
	console.log(req);
	res.send('home'); // WORKING!!
});

app.use(logger('dev'));
app.use(express.static('public'));

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/index', indexRoutes);

const authRoutes = require('./auth.routes');
app.use('/auth', authRoutes);

const bootcampRouter = require('./routes/bootcamp.routes');
app.use('/bootcamps', isAuthenticated, bootcampRouter);

const moduleRouter = require('./routes/module.routes');
app.use('/modules', isAuthenticated, moduleRouter);

const profileRouter = require('./routes/profile.routes');
app.use('/profile', isAuthenticated, profileRouter);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

module.exports = app;
