const db = require('../connection');

const registerNewUser = (firstName, lastName, user_email, password, orgId) => {
  const qs = `INSERT INTO users (first_name, last_name, email, user_password, organization_id)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;
  return db.query(qs, [firstName, lastName, user_email, password, orgId])
    .then(res => res.rows)
    .catch((err) => {
      return err
    });
};

// const registerNewUserOrganization = (org, userId) => {
//   console.log("Register new Organizations function - Org variable: ", typeof org);
//   console.log("Register new Organizations function - UserId variable: ", userId);
//   const qs = `INSERT INTO organizations_users (organization_id, user_id)
//   VALUES ($1, $2)
//   RETURNING *;
//   `;
//   return db.query(qs, [Number(org), userId])
//     .then(res => res.rows)
//     .catch((err) => {
//       return err
//     });
// }

module.exports = { registerNewUser };
