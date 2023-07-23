
// Import requirements
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const loginUserdb = require("../db/queries/loginUser");
const users = require('./register');

// New route to login page
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

// Log a user in
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Call the loginUser function to retrieve the user based on email and password
  loginUserdb.loginUser(email, password)
    .then((user) => {
      if (!user) {
        return res.status(401).send({ error: "Invalid login credentials" });
      }
      // Compare the password provided by the user with the hashed password from the database
      // if (!bcrypt.compareSync(password, user.user_password)) {
      //   return res.status(401).send({ error: "Invalid login credentials" });
      // }

      req.session.user = user;
      res.redirect('/users');
      //return res.redirect(`/organizations?user_id=${user.id}`);
    })
    .catch((err) => {
      console.error('Error during login:', err);
      return res.status(500).send('Server error during login');
    });
});


module.exports = router;
