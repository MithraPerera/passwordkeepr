const{ getUsers } = require('./db/queries/users.js');

// function to generate random string of 6 characters for user id
const generateRandomString = function() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let counter = 0;
  while (counter < 7) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
    counter += 1;
  }
  return result;
};

// *** refactor this to use sql query and check if user exists in database
const userLookup = function(key, value) {
  const gettingUsers = getUsers().then(data => {
    return data
  });
  console.log('is this the console.log', gettingUsers);
  // for (let i in users) {
  //   if (users[i][key] === value) {
  //     return users[i];
  //   }
  // }
  return null;
};

module.exports = { generateRandomString, userLookup };
