const db = require('../connection');

const getCategorySites = () => {
  return db.query('SELECT * FROM categories;')
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getCategorySites };
