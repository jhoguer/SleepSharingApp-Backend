const express = require('express');
const cors = require('cors');
const { config } = require('./config');
const rooms = require('./api/rooms/routes');
const users = require('./api/users/routes');
const auth = require('./api/auth/routes');
const { logError, errorHandler } = require('./utils/error');

const app = express();

// Cors
app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/users', users);
app.use('/api/rooms', rooms);
app.use('/api/auth', auth);


// Errors middleware
app.use(logError);
app.use(errorHandler);

// Server
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${ config.port }`);
});