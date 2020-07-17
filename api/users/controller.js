const MongoLib = require('../../db/mongo');
const auth = require('../auth/controller');
const collection = 'users';

const db = new MongoLib();

const addUser = async (userData) => {


  const userForAuth = {
    username: userData.email,
    password: userData.password
  }
  
  delete userData.password;

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
  
  const addFavoritesUserId = await db.addHostOrFav(idUser, { 'favorites': idRoom });

  return addFavoritesUserId;
}


module.exports = {
  addUser,
  getUsers,
  addFavorites
}