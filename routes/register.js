const express = require("express");
const router  = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords

const users = {};

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

// registration page submission post
//---------------------------
router.post("/register", (req, res) => {
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


module.exports = router;

