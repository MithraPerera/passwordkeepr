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


module.exports = { newAccount };
