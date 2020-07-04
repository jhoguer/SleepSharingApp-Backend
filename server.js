const express = require('express');
const { config } = require('./config');
const rooms = require('./api/rooms/routes');
const users = require('./api/users/routes');

const app = express();


app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/users', users);
app.use('/api/rooms', rooms);

// catch 404


// Errors middleware

// Server
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${ config.port }`);
});