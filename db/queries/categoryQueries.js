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
const getAllCategorySites_Organization = (categoryId, organizationId) => {
  return db.query(`
  SELECT accounts.*
  FROM accounts
  WHERE category_id = $1 AND organization_id = $2`, [categoryId, organizationId])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

// Get all the PERSONAL sites under a specific category
const getAllCategorySites_Personal = (categoryId) => {
  return db.query(`
  SELECT accounts.*
  FROM accounts
  WHERE category_id = $1 AND organization_id = NULL`, [categoryId])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllCategories, getAllCategorySites, getAllCategorySites_Organization, getAllCategorySites_Personal };
