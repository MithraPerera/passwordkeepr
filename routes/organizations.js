const express = require('express');
const router = express.Router();
const getOrganizationsByUser = require('../db/queries/getOrganizationsByUser');

router.get('/', (req, res) => {
  const userId = req.session.userId;
  
  // Ensure the user is logged in
  if (!userId) {
    return res.status(401).send({ error: 'Not logged in' });
  }

  // Retrieve organizations belonging to the user based on userId
  getOrganizationsByUser(userId)
    .then((organizations) => {
      if (!organizations) {
        return res.send({ message: 'No organizations found for this user' });
      }

      // Return the organizations data
      return res.json({ organizations });
    })
    .catch((err) => {
      console.error('Error retrieving organizations:', err);
      return res.status(500).send({ error: 'Server error retrieving organizations' });
    });
});

module.exports = router;