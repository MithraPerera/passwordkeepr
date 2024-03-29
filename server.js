// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const bcrypt = require("bcryptjs");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8080;
const app = express();

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware setup
app.use(morgan('dev')); // Logging middleware
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Sass middleware for compiling SASS to CSS
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false,
  })
);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Import required functions and routes
const { registerNewUser } = require('./db/queries/registerNewUser.js');

app.use(cookieSession({
  name: 'session',
  keys: ['midterm'],
}));

const usersRoutes = require('./routes/users');
const homeRoute = require('./routes/home');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const categoryRoute = require('./routes/categories')
const createAccountRoute = require('./routes/createAccount');
const editAccountRoute = require('./routes/editAccount');
const deleteAccountRoute = require('./routes/deleteAccount');

// Define routes for different URL paths
app.use('/users', usersRoutes);
app.use('/home', homeRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/users/category/', categoryRoute);
app.use('/createAccount', createAccountRoute);
app.use('/editAccount', editAccountRoute);
app.use('/deleteAccount', deleteAccountRoute);

// Redirect the root path to '/home'
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
