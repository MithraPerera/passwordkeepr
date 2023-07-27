// Import requirements
const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords
const { registerNewUser } = require('../db/queries/registerNewUser.js');


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

// registration page submission post using database
//---------------------------
router.post("/", (req, res) => {
  const firstName = req.body.firstname;
  const lastName = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;
  const organization = req.body.organization;
  // const hashedPassword = bcrypt.hashSync(password, 10);
  // const id = 101;

  registerNewUser(firstName, lastName, email, password, organization)
    .then((data) => {
      console.log("data params: ", data);
      // const userId = data[0].id;
      // registerNewUserOrganization(organization, userId)
      //   .then((data2) => {
      //     console.log("Register new user organization data: ", data2)
      //     res.redirect('/login');
      //   });
      res.redirect('/login');
    })
    .catch((e) => {
      console.log("Error registering: ", e);
      return res.status(500).send('Server error during registration');
    });
});

module.exports = router;

