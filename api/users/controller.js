const MongoLib = require('../../db/mongo');

const collection = 'users';

const db = new MongoLib();

const addUser = async (userData) => {

  // Validar que todos los datos lleguen

  const createdUserId = await db.create(collection, userData);

  return createdUserId;
}

module.exports = {
  addUser,
}