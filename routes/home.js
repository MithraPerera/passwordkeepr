const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  // Retrieve user data from the session and store it in the templateVars object
  const templateVars = {
    user: req.session.user
  };

  // Render the "index" view with the templateVars data as the context
  res.render('index', templateVars);
});

module.exports = router;