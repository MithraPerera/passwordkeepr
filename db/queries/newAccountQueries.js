const db = require('../connection');

const newAccount = (name, url, username, password, category, user_id, orgId, created_on) => {
  const qs = `INSERT INTO accounts (name, url, username, password, category_id, user_id, organization_id, created_on)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
  `;
  return db.query(qs, [name, url, username, password, category, user_id, orgId, created_on])
    .then(res => res.rows)
    .catch((err) => {
      return err
    });
};

const getAccountById = (id) => {
  const qs = `SELECT * FROM accounts WHERE id = $1;`;
  return db.query(qs, [id])
    .then(res => res.rows[0])
    .catch((err) => {
      return err
    });
};

const updateAccount = (name, url, username, password, category, user_id, orgId, created_on, id) => {
  const qs = `UPDATE accounts
  SET name = $1,
  url = $2,
  username = $3,
  password = $4,
  category_id = $5,
  user_id = $6,
  organization_id = $7,
  created_on = $8
  WHERE id = $9;`;
  return db.query(qs, [name, url, username, password, category, user_id, orgId, created_on, id])
    .then(res => res.rows[0])
    .catch((err) => {
      return err
    });
};

const deleteAccountById = (id) => {
  const qs = `DELETE FROM accounts WHERE id = $1;`;
  return db.query(qs, [id])
    .then(res => res.rows[0])
    .catch((err) => {
      return err
    });
};

module.exports = { newAccount, getAccountById, updateAccount, deleteAccountById };
