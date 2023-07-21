const db = require('../connection');

const loginFunction = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};


module.exports = { getUsers };
