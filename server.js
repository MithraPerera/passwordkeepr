// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');

const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));


/*
-------------------------------------------------
TEMPORARY CODE FOR INTERIM LOGIN ROUTES BEFORE REFACTORING
-------------------------------------------------
*/
//require helper functions
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords
const { userLookup, generateRandomString } = require('./helperfunctions');
const users = {};
// TEMPORARY CODE ENDS HERE
// -------------------------------------------------


// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const widgetApiRoutes = require('./routes/widgets-api');
const usersRoutes = require('./routes/users');
const homeRoute = require('./routes/home');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');
const registerRoute = require('./routes/register');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/users', usersRoutes);
app.use('/home', homeRoute);
// app.use('/login', loginRoute);
// app.use('/logout', logoutRoute);
// app.use('/register', registerRoute);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  const user = {};
  const templateVars = {
    user,
  };
  res.render('index', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});


// -------------------------------------------------
// TEMPORARY CODE HERE FOR FUNCTIONALITY WHILE WE BUILD THE DATABASE CONNECTIONS
// -------------------------------------------------


// EXPLANATION OF HOW EVERYTHING IS CONNECTING IN THE MEANTIME:

  /*
    recieve a response from the logout button from header partial
    that response will be a post request containing data (params)
    using this data we'll execute an SQL query in the database
    create a connection between the post request data and our database
    whatever psql returns, we can fetch that to process the data to our liking
    send that data ot an ejs file to process it for the front end
  */

  /*
    to connect to the database:
    refer to db/connection.
    db/connection is exporting and being referenced by the queries under db/query.
    reference db/queries/users.js to see a sample of this
    export helper functions from there to be used in our routes js files
    - this sample can be seen in the users-api.js file, where you can see
    the function/promise calling the function userQueries.getUsers()
    and process the data
    use re.render to display the data, res.json can send the data
  */


//LOGIN ROUTES BUILT AS THEY WERE IN TINYAPP:
// ------------------------------------------


// Register new user page
//---------------------------
app.get("/register", (req, res) => {
  const user_id = req.session["user_id"];
  const user = users[user_id];
  const templateVars = {
    user,
  };
  if (user_id) {
    res.redirect("/urls");
  } else {
    res.render("register", templateVars);
  }
});

// Login page
//---------------------------
app.get("/login", (req, res) => {
  const user_id = req.session["user_id"];
  const user = users[user_id];
  const templateVars = {
    user,
  }
  if (user_id) {
    res.redirect("/urls");
  } else {
    res.render("login", templateVars);
  }
});

//-----------------------------------------------
// POSTS START HERE
//-----------------------------------------------

// registration page submission post
//---------------------------
app.post("/register", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const id = generateRandomString();
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (email.length < 1 || password.length < 1) {
    res
    .status(400)
    .send("Error status 400, both email and password must contain a value.");
  } else if (userLookup(users, "email", email)) {
    res
    .status(400)
    .send("Error status 400, email already exists in system.");
  } else {
    users[id] = {
      "id": id,
      "email": email,
      "hashedPassword": hashedPassword,
    };
    req.session.user_id = id;
    res
    .status(201)
    .redirect(301, '/urls');
  };
});

// login page submission post
//---------------------------
app.post("/login", (req, res) => {
  // use the userlookup function to grab the user id associateed with email
  const inputEmail = req.body.email;
  const inputPassword = req.body.password;
  const userObj = userLookup(users, "email", inputEmail);
  const password = req.body.password;
  const hashedPassword = userObj.hashedPassword;

  // edge case for logging in with a non-registered email
  if (!userLookup(users, "email", inputEmail)) {
    res.status(404).send("404: No user registered under that email.");

  // for wrong password
  } else if (!bcrypt.compareSync(password, hashedPassword)) {
    res
    .status(401)
    .send("401: Wrong password!");

  } else {
    const id = userObj.id;
    req.session.user_id = id;
    res
    .status(201)
    .redirect(301, '/urls');
  };
});

// login button in header
//---------------------------
app.post("/loginbutton", (req, res) => {
    res.redirect(`/login`);
});

// register button in header
//---------------------------
app.post("/registerbutton", (req, res) => {
  res.redirect(`/register`);
});

// logout button in header
//---------------------------
app.post("/logout", (req, res) => {
  req.session = null
  res
    .redirect(301, '/login');
});
