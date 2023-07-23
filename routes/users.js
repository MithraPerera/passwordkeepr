//dashboard route

const express = require('express');
const router  = express.Router();
const loginUserdb = require("../db/queries/loginUser");

router.get("/", (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.send({ message: "not logged in" });
  }

  loginUserdb
    .getOrganizationsByUser(user.id)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }
      const templateVars = {
        user: req.session.user
      };
      res.render('users', templateVars);
    })
    .catch((e) => res.send(e));
}); 

module.exports = router;
