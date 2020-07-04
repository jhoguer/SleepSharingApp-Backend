const express = require('express');
const { config } = require('./config');

const app = express();


app.use(express.urlencoded({ extended: false }));

// routes


// catch 404


// Errors middleware

// Server
app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${ config.port }`);
});