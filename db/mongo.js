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

  getAll(collection) {
    return this.connect()
      .then(db => {
        return db.collection(collection).find().toArray();
      })
  }

  create(collection, data) {
    // console.log('data=> ', data)
    // console.log('Collection=> ', collection)
    return this.connect().then(db => {
        return db.collection(collection).insertOne(data);
      })
      .then(result => result.insertedId);
  }

}


module.exports = MongoLib;
