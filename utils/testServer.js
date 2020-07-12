const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  const app = express();
  app.use('/api/rooms', route)
  // route(app);
  return supertest(app);
}

module.exports = testServer;