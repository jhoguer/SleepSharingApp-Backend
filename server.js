const express = require('express');
const { config } = require('./config');
const rooms = require('./api/rooms/routes');
const users = require('./api/users/routes');
const auth = require('./api/auth/routes');

const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use('/api/users', users);
app.use('/api/rooms', rooms);
app.use('/api/auth', auth);

// catch 404


// Errors middleware

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send('Algo salio mal');
})

// Server
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${ config.port }`);
});