const db = require('../connection');

const registerNewUser = (firstName, lastName, user_email, password) => {
  const userVar = `INSERT INTO users (first_name, last_name, email, user_password)
  VALUES ($1, $2, $3, $4)
  RETURNING *;
  `;
  return db.query(userVar, [firstName, lastName, user_email, password])
    .then(res => res.rows)
    .catch((err) => {
      return err});
  };

module.exports = { registerNewUser };
