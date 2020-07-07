const MongoLib = require('../../db/mongo');

const collection = 'rooms';

const db = new MongoLib();

const addRoom = async (roomData) => {
  // Validar que todos los datos vengan.

  

  const createdRoomId = await db.create(collection, roomData);
  console.log('DDDDDDDDDDDDDDDDD', createdRoomId);
  return createdRoomId;
    
}

const getRooms = async () => {
  const allRooms = await db.getAll(collection);
  return allRooms;
}

module.exports = {
  addRoom,
  getRooms
};