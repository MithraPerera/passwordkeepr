// Load environment variables from .env file
require('dotenv').config();

// Import required modules
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
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
const bcrypt = require("bcryptjs"); 
const { userLookup, generateRandomString } = require('./helperfunctions');
app.use(cookieSession({
  name: 'session',
  keys: ['midterm'],
}));
const users = {};

const userApiRoutes = require('./routes/users-api');
const usersRoutes = require('./routes/users');
const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const registerRoute = require('./routes/register');

// Define routes for different URL paths
app.use('/users', usersRoutes);
app.use('/home', homeRoute);
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);

// Redirect the root path to '/home'
app.get('/', (req, res) => {
  res.redirect('/home');
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Handle POST request to "/registerbutton" and redirect to "/register"
app.post("/registerbutton", (req, res) => {
  res.redirect(`/register`);
});

// Handle GET request to "/register" and render the "register" page
app.get("/register", (req, res) => {
  const user_id = req.session["user_id"];
  const user = users[user_id];
  const templateVars = {
    user,
  };
  if (user_id) {
    res.redirect("/");
  } else {
    res.render("register", templateVars);
  }
});

// Handle POST request to "/register" and register a new user
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const id = 101;

  const newUser = registerNewUser(firstName, lastName, email, password)
    .then((data) => {
      console.log("data params", data)
    })
  console.log(newUser);
});

// Handle POST request to "/logout" and clear the session cookies, then redirect to "/home"
app.post("/logout", (req, res) => {
  req.session = null
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/home');
});