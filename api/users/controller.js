const MongoLib = require('../../db/mongo');
const auth = require('../auth/controller');
const collection = 'users';

const db = new MongoLib();

const addUser = async (userData) => {


  const userForAuth = {
    username: userData.email,
    password: userData.password
  }

  // Validar que todos los datos lleguen
  if (userData.typeUser === 1) {
    userData.typeUser = 'Anfitrion';
  } else {
    userData.typeUser = 'Huesped';
  }

  try {
    const createdUserId = await db.create(collection, userData);  
    userForAuth.idUser = createdUserId;
  
    await auth.addUserAuth(userForAuth);

    return createdUserId;    
  } catch (error) {
    throw new Error(error)
  }


}

const getUsers = async () => {
  const allUsers = await db.getAll(collection);
  return allUsers;
}

const addFavorites = async (idUser, idRoom) => {
  // Consultar DB con el idRomm para saber si es de una Habitacion valida
  
  const addFavoritesUserId = await db.addHostOrFav(idUser, { 'favorites': idRoom });

  return addFavoritesUserId;
}

// const addRoomToHost = async (idUser, idRoom) => {
//   const updatedUserId = await db.addHost(idUser, idRoom);

//   return updatedUserId;
// }

module.exports = {
  addUser,
  getUsers,
  // addRoomToHost,
  addFavorites
}