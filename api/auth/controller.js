const MongoLib = require('../../db/mongo');
const bcrypt = require('bcrypt');

const collection = 'auth';

const db = new MongoLib();

const login = async (username, password) => {
  if (!username && !password) {
    throw new Error('Username and password required!');
  }
  
  const userData = await db.getAuth(collection, username);

  return userData;
}

const addUserAuth = async (data) => {
  if (!data.username && !data.password) throw new Error('Username and password required');

  data.password = await bcrypt.hash(data.password, 5);
  await db.create(collection, data);

  return true;
}


module.exports = {
  login,
  addUserAuth
}

