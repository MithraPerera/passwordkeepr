// Import requirements
const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords
const registerNewUser = require('../db/queries/registerNewUser.js');


// Register new user page
//---------------------------
router.get("/", (req, res) => {
  if (req.session.user) {
    res.redirect("/users");
  } else {
    const templateVars = {
      user: req.session.user
    };
    res.render('register', templateVars);
  }
});

// Register Button in Home Page
//----------------------------
// router.post("/registerbutton", (req, res) => {
//   res.redirect(`/register`);
// });

// registration page submission post using database
//---------------------------
router.post("/", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  // const id = 101;

  registerNewUser.registerNewUser(firstName, lastName, email, password)
    .then((data) => {
      console.log("data params", data);
      res.redirect('/login');
    })
    .catch((e) => {
      console.log("Error registering: ", e);
      return res.status(500).send('Server error during registration');
    });
});

module.exports = router;

