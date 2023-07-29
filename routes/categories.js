// Import requirements
const express = require("express");
const router = express.Router();
const { getAllCategories, getAllCategorySites, getAccountsByOrganizationsAndCategory, getPersonalAccountsByCategory } = require("../db/queries/categoryQueries");
const loginUserdb = require("../db/queries/loginUser");

// PERSONAL ROUTES FILTER
// Route to display all categories - /categories
router.get('/', (req, res) => {
  if (req.session.user) {
    res.redirect('/users');
  } else {
    const templateVars = {
      user: req.session.user
    };
    res.render('login', templateVars);
  }
});

// Route to display specific category - Ex. /categories/2 displays Social sites
router.get('/:category', async (req, res) => {
  // Retrieve the user from the session
  const user = req.session.user;
  let categoryId;

  if (req.session.user) {
    if (req.params.category === 'finance') {
      categoryId = 1;
    } else if (req.params.category === 'social') {
      categoryId = 2;
    } else if (req.params.category === 'entertainment') {
      categoryId = 3;
    } else if (req.params.category === 'work') {
      categoryId = 4;
    } else {
      console.log("ERROR: Incorrect category.");
    }

    try {
      // If user is logged in, call the "getOrganizationsByUser" function from the "loginUserdb" module
      const organization = await loginUserdb.getOrganizationsByUser(user.id)
      const organizationAccounts = await getAccountsByOrganizationsAndCategory(user.id, organization.org_id, categoryId);
      const personalAccounts = await getPersonalAccountsByCategory(user.id, categoryId);
      const templateVars = {
        user: req.session.user,
        organization: organization.name,
        organizationAccounts,
        personalAccounts,
      };

      // Render the view with the templateVars data
      res.render('users', templateVars);

    } catch (e) {
      res.send(e)
    }

  } else {
    const templateVars = {
      user: req.session.user
    };
    res.render('login', templateVars);
  }
});

// ORGANIZATIONAL ACCOUNTS FILTER


module.exports = router;
