const MongoLib = require('../../db/mongo');

const collection = 'rooms';

const db = new MongoLib();


// const addRoomToHost = async (id, idHost) => {
//   const updatedRoomId = await db.addHost(id, idHost);
//   console.log('Id de la Room actualizada', updatedRoomId);
//   return updatedRoomId;
// }

const addRoom = async (roomData) => {
  
  const { idHost } = roomData;  
  // Consultar en la BD si ese IDHost Existe

  roomData.location = roomData.location.toUpperCase();

  const createdRoomId = await db.create(collection, roomData);

  // const updatedUserId = await db.addHost(createdRoomId, idHost)
  // console.log('Id de la Room actualizada despues de crear room', updatedUserId);
  const roomAddToUserId = await db.addHostOrFav(idHost, { 'ownRooms': createdRoomId });


  if (!createdRoomId && !roomAddToUserId) {
    throw new Error('Error server-');
  } 
  
  return createdRoomId;
    
}

const getRooms = async (query) => {
    const allRooms = await db.getAll(collection, query);
  
  return allRooms;
}

const get = async (id) => {
  if (!id) {
    throw new Error('El id no llego');
  }
  
  const room = await db.get(collection, id);

  return room;
}

// const updateUser = async (idRoom, idHost) => {
//   const updateUserId = await db.addHostOrFav(idHost, { 'ownRooms':  ObjectId(idRoom) });
//   return updateUserId;
// }



module.exports = {
  addRoom,
  getRooms,
  // updateUser,
  get,
};