const express = require("express");
const router  = express.Router();
const bcrypt = require("bcryptjs");  // for hashing passwords

const loginUser = require("../db/queries/loginUser");
const users = require('./register');

// new route to login page
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/users');
  } else {
    const templateVars = {
      user: req.session.user
    };
    res.render('login', templateVars);
  }
});


// login page submission post
//---------------------------
router.post("/login", (req, res) => {
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


module.exports = router;
