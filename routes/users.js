//dashboard route

const express = require('express');
const router  = express.Router();
const loginUserdb = require("../db/queries/loginUser");

router.get('/', (req, res) => {
  res.render('users');
}); 

module.exports = router;
