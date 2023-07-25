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
  SELECT organizations.*, users.*, organizations.id as org_id
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

const getAccountsByOrganizations = (user_Id, organization_Id) => {
  return db.query(`
  SELECT users.*, organizations.*, accounts.*
  FROM accounts
  JOIN users ON accounts.user_id = users.id 
  JOIN organizations ON accounts.organization_id = organizations.id 
  WHERE users.id = $1 AND organizations.id  = $2;
`, [user_Id, organization_Id])
    .then((result) => {
      return result.rows || [];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


module.exports = { loginUser, getOrganizationsByUser, getAccountsByOrganizations };
