/*const MongoLib = require('../../db/mongo');

const collection = 'rooms';

const db = new MongoLib();


// const addRoomToHost = async (id, idHost) => {
//   const updatedRoomId = await db.addHost(id, idHost);
//   console.log('Id de la Room actualizada', updatedRoomId);
//   return updatedRoomId;
// }

const addRoom = async (roomData) => {
  // Validar que todos los datos vengan.
  
  const { idHost,  } = roomData;  
  // Consultar en la BD si ese IDHost Existe
  

  
  const createdRoomId = await db.create(collection, roomData);

  // const updatedUserId = await db.addHost(createdRoomId, idHost)
  // console.log('Id de la Room actualizada despues de crear room', updatedUserId);
  const roomAddToUserId = await db.addHostOrFav(idHost, { 'ownRooms': createdRoomId });


  if (!createdRoomId && !updatedRoomId) {
    throw new Error('Error server-');
  } 
  
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

*/

const MongoLib = require('../../db/mongo');




// const addRoomToHost = async (id, idHost) => {
//   const updatedRoomId = await db.addHost(id, idHost);
//   console.log('Id de la Room actualizada', updatedRoomId);
//   return updatedRoomId;
// }

class RoomController {
  constructor() {
    this.collection = 'rooms';
    this.db = new MongoLib();
  }

  async addRoom(roomData) {
    // Validar que todos los datos vengan.
    
    const { idHost,  } = roomData;  
    // Consultar en la BD si ese IDHost Existe
    
  
    
    const createdRoomId = await this.db.create(collection, roomData);
  
    // const updatedUserId = await db.addHost(createdRoomId, idHost)
    // console.log('Id de la Room actualizada despues de crear room', updatedUserId);
    const roomAddToUserId = await this.db.addHostOrFav(idHost, { 'ownRooms': createdRoomId });
  
  
    if (!createdRoomId && !updatedRoomId) {
      throw new Error('Error server-');
    } 
    
    return createdRoomId;
      
  }

  async getRooms() {
    const allRooms = await this.db.getAll(collection);
    return allRooms;
  }
  
  async get(id){
    if (!id) {
      throw new Error('El id no llego');
    }
    
    const room = await this.db.get(collection, id);
  
    return room;
  }
}

module.exports = RoomController;

