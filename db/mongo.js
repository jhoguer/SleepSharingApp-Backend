const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const HOST = encodeURIComponent(config.dbHost)
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${HOST}/${DB_NAME}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = DB_NAME;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }

          resolve(this.client.db(this.dbName));
          console.log('Connected succesfully to mongo');
        });
      });
    }

    return MongoLib.connection;
  }

  get(collection, id) {
    return this.connect()
      .then(db => {
        return db.collection(collection).findOne({ _id: ObjectId(id) });
      })
  }

  getAll(collection, params) {
    return this.connect()
      .then(db => {
        return db.collection(collection).find(params).toArray();
      })
  }

  getAuth(collection, username) {
    return this.connect()
      .then(db => {
        return db.collection(collection).findOne({ username: username });
      })
      .catch(err => {
        throw new Error(err);
      })
  }

  create(collection, data) {
    // console.log('data=> ', data)
    // console.log('Collection=> ', collection)

    const {idHost} = data;

    if (!data.firstName) {
      // return this.connect().then(db => {
      //     return db.collection(collection).insertOne(data);
      //   })
      //   .then(result => {
      //     return this.addHostOrFav(idHost, { 'ownRooms': result.insertedId });
      //   })
      //   .then(result => result.upsertedId || idHost);

      return this.connect().then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
    }

    return this.connect().then(db => {
      return db.collection(collection).insertOne(data);
    })
    .then(result => result.insertedId);
    


  }

  // result.insertedId

  // addHost(idRoom, idHost) {
  //   return this.connect()
  //     .then(db => {
  //       return db.collection('users').updateOne({ _id: ObjectId(idHost) }, { $addToSet: { 'ownRooms':  ObjectId(idRoom) }}, { upsert: false });
  //       // return db.collection('users').findOne({ _id: ObjectId(idHost) });
  //     }).then(result => result.upsertedId || idHost);
  // }

  addHostOrFav(idUser, data) {
    return this.connect()
      .then(db => {
        return db.collection('users').updateOne({ _id: ObjectId(idUser) }, { $addToSet: data }, { upsert: true });
        // return db.collection('users').findOne({ _id: ObjectId(idHost) });
      }).then(result => result.upsertedId || idUser);
  }

}


module.exports = MongoLib;
