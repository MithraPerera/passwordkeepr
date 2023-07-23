const db = require('../connection');

const loginUser = (email, user_password) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1;
`, [email])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getOrganizationsByUser = (user_Id) => {
  return db.query(`
  SELECT organizations.name, users.first_name, users.last_name
  FROM organizations
  JOIN users ON organizations.admin_id = users.id
  WHERE users.id = $1;

`, [user_Id])
    .then((result) => {
      return result.rows[0] || null;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { loginUser, getOrganizationsByUser };
