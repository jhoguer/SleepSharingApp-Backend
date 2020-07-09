const MongoLib = require('../../db/mongo');

const collection = 'rooms';

const db = new MongoLib();


// const addRoomToHost = async (id, idHost) => {
//   const updatedRoomId = await db.addHost(id, idHost);
//   console.log('Id de la Room actualizada', updatedRoomId);
//   return updatedRoomId;
// }

const addRoom = async (roomData) => {
  // Validar que todos los datos vengan.
  
  const { idHost } = roomData;  
  
  console.log('Id del Usuario Anfitrion', idHost);
  
  const createdRoomId = await db.create(collection, roomData);
  console.log('Id de la Habitacion creada', createdRoomId);
  // const updatedUserId = await db.addHost(createdRoomId, idHost)
  // console.log('Id de la Room actualizada despues de crear room', updatedUserId);

  // if (createdRoomId === updatedRoomId) return createdRoomId;

  return createdRoomId;
    
}

const getRooms = async () => {
  const allRooms = await db.getAll(collection);
  return allRooms;
}

const get = async (id) => {
  if (!id) {
    throw new Error('El id no llego');
  }
  
  const room = await db.get(collection, id);

  return room;
}

const updateUser = async (idRoom, idHost) => {
  const updateUserId = await db.addHost(idRoom, idHost);
  return updateUserId;
}



module.exports = {
  addRoom,
  getRooms,
  updateUser,
  get,
};