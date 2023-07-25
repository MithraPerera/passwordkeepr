//dashboard route

const express = require('express');
const router = express.Router();
const loginUserdb = require("../db/queries/loginUser");

router.get("/", (req, res) => {
  // Retrieve the user from the session
  const user = req.session.user;

  // Check if the user is not logged in (not present in the session)
  if (!user) {
    return res.send({ message: "User is not logged in" });
  }

  // If user is logged in, call the "getOrganizationsByUser" function from the "loginUserdb" module
  loginUserdb
    .getOrganizationsByUser(user.id)
    .then((organization) => {
      if (!organization) {
        return res.send({ error: "No organization for the logged in user found" });
      }
      const templateVars = {
        user: req.session.user,
        organization: organization.name
      };

      loginUserdb
        .getAccountsByOrganizations(user.id, organization.org_id)
        .then((accounts) => {
          
          const templateVars = {
            user: req.session.user,
            organization: organization.name,
            accounts,
          };

          // Render the view with the templateVars data
          res.render('users', templateVars);
        })
        .catch((e) => res.send(e));
    });
});

module.exports = router;
