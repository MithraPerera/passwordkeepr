
// Import requirements
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// New route to login page
router.get('/', (req, res) => {

  const templateVars = {
    user: req.session.user
  };

  res.render('createAccount', templateVars);
});


module.exports = router;
