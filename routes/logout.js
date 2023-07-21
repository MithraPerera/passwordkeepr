const express = require("express");
const router  = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords

const users = require('./register');

// logout button in header
//---------------------------
router.post("/logout", (req, res) => {
  req.session = null
  res
    .redirect(301, '/login');
});

module.exports = router;
