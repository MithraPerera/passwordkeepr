const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const bcrypt = require("bcryptjs");  // for hashing passwords

const users = require('./register');

// logout button in header
//---------------------------
router.post("/", (req, res) => {
  req.session = null
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/home');
});

module.exports = router;
