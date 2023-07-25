const db = require('../connection');

const getAllCategories = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

const getAllCategorySites = (categoryId) => {
  return db.query(`SELECT * FROM accounts WHERE category_id = $1`, [categoryId])
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getAllCategories, getAllCategorySites };
