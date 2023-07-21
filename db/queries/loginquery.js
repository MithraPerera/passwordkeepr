const db = require('../connection');

const loginUser = (user_email, password) => {
  const emailCheck = `SELECT * FROM users
  WHERE email LIKE $1;`;
  const passCheck = `SELECT * FROM users
  WHERE password LIKE $2;`;

  console.log('email ', emailCheck);
  console.log('password ', passCheck);

  return db.query(emailCheck, [user_email, password])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    })
    .catch((err) => {
      return err});
  // return db.query(`SELECT * FROM users
  // // WHERE email LIKE $1;`)
  };

module.exports = { loginUser };
