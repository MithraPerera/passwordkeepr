const db = require('../connection');

// Get all the sites for all categories
const getAllCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

// Get all the sites under a specific category
const getAllCategorySites = (categoryId) => {
  return db.query(`SELECT * FROM accounts WHERE category_id = $1`, [categoryId])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

// Get all the sites under a specific category and organization
const getAccountsByOrganizationsAndCategory = (user_id, organization_id, category_id) => {
  return db.query(`
    SELECT users.*, organizations.*, accounts.*, categories.*, categories.name as category_name, accounts.name as account_name
    FROM accounts
    JOIN users ON accounts.user_id = users.id
    JOIN organizations ON accounts.organization_id = organizations.id
    JOIN categories ON accounts.category_id = categories.id
    WHERE users.id = $1 AND organizations.id  = $2 AND categories.id = $3;
  `, [user_id, organization_id, category_id])
    .then((result) => {
      return result.rows || [];
    })
    .catch((err) => {
      console.log(err.message);
    });
};


// Get all the PERSONAL sites under a specific category
const getPersonalAccountsByCategory = (user_id, category_id) => {
  return db.query(`
  SELECT accounts.*, categories.name as category_name
  FROM accounts
  JOIN categories ON accounts.category_id = categories.id
  WHERE user_id = $1 AND organization_id IS NULL AND category_id = $2;
  `, [user_id, category_id])
    .then((result) => {
      return result.rows || [];
    })
    .catch((err) => {
      console.log('Error', err.message);
    });
};

module.exports = { getAllCategories, getAllCategorySites, getAccountsByOrganizationsAndCategory, getPersonalAccountsByCategory };
