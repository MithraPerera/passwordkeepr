const express = require("express");
const router  = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords
const { registerNewUser } = require('.././db/queries/registerNewUser.js')

// Register Button in Home Page
//----------------------------
router.post("/registerbutton", (req, res) => {
  res.redirect(`/register`);
});

// Register new user page
//---------------------------
router.get("/register", (req, res) => {
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

// registration page submission post using database
//---------------------------
router.post("/register", (req, res) => {
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

module.exports = router;

