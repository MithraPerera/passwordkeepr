// Import requirements
const express = require("express");
const router = express.Router();
const { getAllCategories, getAllCategorySites } = require("../db/queries/categoryQueries");

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
router.get('/:category', (req, res) => {
  if (req.session.user) {
    getAllCategorySites(req.params.id)
      .then((data) => {
        const templateVars = {
          user: req.session.user,
          organization: null,
          accounts: data,
        };
        res.redirect('/users', templateVars);
      });
  } else {
    const templateVars = {
      user: req.session.user
    };
    res.render('login', templateVars);
  }
});

// ORGANIZATIONAL ACCOUNTS FILTER


module.exports = router;
