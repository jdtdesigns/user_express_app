const fs = require('fs');
const path = require('path');
const DB_PATH = path.join(__dirname, './data.json');

async function getUserData() {
  const users = await fs.promises.readFile(DB_PATH, 'utf8');

  return JSON.parse(users);
}

async function saveUserData(usersArr) {
  await fs.promises.writeFile(DB_PATH, JSON.stringify(usersArr, null, 2));

  console.log('User Data Updated');
}

module.exports = {
  getUserData,
  saveUserData
}