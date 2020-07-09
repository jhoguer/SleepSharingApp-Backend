const MongoLib = require('../../db/mongo');

const collection = 'users';

const db = new MongoLib();

const addUser = async (userData) => {

  // Validar que todos los datos lleguen

  const createdUserId = await db.create(collection, userData);

  return createdUserId;
}

const getUsers = async () => {
  const allUsers = await db.getAll(collection);
  return allUsers;
}

const addFavorites = async (idUser, idRoom) => {
  const addFavoritesUserId = await db.addFavoritesRoom(idUser, idRoom);

  return addFavoritesUserId;
}

const addRoomToHost = async (idUser, idRoom) => {
  const updatedUserId = await db.addHost(idUser, idRoom);

  return updatedUserId;
}

module.exports = {
  addUser,
  getUsers,
  addRoomToHost,
  addFavorites
}