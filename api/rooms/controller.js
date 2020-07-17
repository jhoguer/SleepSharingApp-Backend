const MongoLib = require('../../db/mongo');

const collection = 'rooms';

const db = new MongoLib();

const addRoom = async (roomData) => {
  
  const { idHost } = roomData;  

  roomData.location = roomData.location.toUpperCase();

  const createdRoomId = await db.create(collection, roomData);


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