// Import requirements
const express = require("express");
const router = express.Router();
const cookieSession = require("cookie-session");
const { newAccount, getAccountById, updateAccount, deleteAccountById } = require('../db/queries/newAccountQueries.js');


router.post("/:id", (req, res) => {
  console.log('req.params: ', req.params);
  const id = req.params.id;
  deleteAccountById(id)
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
