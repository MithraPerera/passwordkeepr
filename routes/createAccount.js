
// Import requirements
const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { newAccount } = require('../db/queries/newAccountQueries.js');

// New route to login page
router.get('/', (req, res) => {

  const templateVars = {
    user: req.session.user
  };

  res.render('createAccount', templateVars);
});

router.post("/", (req, res) => {
  const name = req.body.name;
  const url = req.body.url;
  const username = req.body.username;
  const password = req.body.password;
  const created_on = req.body.created_on;
  const user_id = req.session.user.id;
  const orgId = req.session.user.organization_id;
  let category = req.body.category;
  let type = req.body.type;

  console.log('type: ', type);

  newAccount(name, url, username, password, category, user_id, orgId, created_on)
    .then((data) => {
      console.log("data params: ", data);
      res.redirect('/users');
    })
    .catch((e) => {
      console.log("Error registering: ", e);
      return res.status(500).send('Error adding new account');
    });
});

module.exports = router;
