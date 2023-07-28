const db = require('../connection');

const loginUser = (email, user_password) => {
  return db.query(`
  SELECT * FROM users
  WHERE email = $1 AND user_password =$2;
`, [email,user_password])
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
  JOIN users ON organizations.id = users.organization_id
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
    SELECT users.*, organizations.*, accounts.*, categories.*, categories.name as category_name, accounts.name as account_name, accounts.id as id
    FROM accounts
    JOIN users ON accounts.user_id = users.id
    JOIN organizations ON accounts.organization_id = organizations.id
    JOIN categories ON accounts.category_id = categories.id
    WHERE accounts.user_id = $1 AND accounts.organization_id  = $2;
  `, [user_Id, organization_Id])
    .then((result) => {
      return result.rows || [];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

  const getPersonalAccounts = (user_Id, organization_Id) => {
  return db.query(`
  SELECT accounts.*, categories.name as category_name
  FROM accounts
  JOIN categories ON accounts.category_id = categories.id
  where user_id = $1 AND organization_id IS NULL;
  `, [user_Id])
    .then((result) => {
      return result.rows || [];
    })
    .catch((err) => {
      console.log('Error', err.message);
    });
};

module.exports = { loginUser, getOrganizationsByUser, getAccountsByOrganizations, getPersonalAccounts };
