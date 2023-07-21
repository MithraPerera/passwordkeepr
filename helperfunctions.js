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

const userLookup = function(users, key, value) {
  for (let i in users) {
    if (users[i][key] === value) {
      return users[i];
    }
  }
  return null;
};
