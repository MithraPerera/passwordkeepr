
// Import requirements
const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { newAccount, getAccountById, updateAccount } = require('../db/queries/newAccountQueries.js');

router.get("/:id", async (req, res) => {
  console.log(req.params);

  const account = await getAccountById(req.params.id);
  const templateVars = {
    user: req.session.user,
    account
  };
  console.log('account: ', account);

  res.render('editAccount', templateVars);
});

router.post("/:id", (req, res) => {
  console.log('req.params: ', req.params);
  const account = getAccountById(req.params.id);
  const name = req.body.name;
  const url = req.body.url;
  const username = req.body.username;
  const password = req.body.password;
  const created_on = req.body.created_on;
  const user_id = req.session.user.id;
  let orgId = req.session.user.organization_id;
  let category = req.body.category;
  let type = req.body.type;
  const id = req.params.id;

  if(type === "personal") {
    orgId = null;
  }


  console.log('Values going into updateAccount:', name, url, username, password, category, user_id, orgId, created_on, id);


  updateAccount(name, url, username, password, category, user_id, orgId, created_on, id)
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
