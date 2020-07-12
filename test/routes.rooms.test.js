const assert = require('assert');
const proxyquire = require('proxyquire');

// const {getRooms} = require('../api/rooms/controller');

const { roomsMock, RoomsServiceMock } = require('../utils/mocks/rooms.js');
const testServer = require('../utils/testServer');

describe('routes - rooms', function() {
  const route = proxyquire('../api/rooms/routes', {
    './controller': RoomsServiceMock
  });

  console.log('Request', route);
  console.log('Request');
  const request = testServer(route);

  describe('GET /rooms', function() {
    it('Should respond status 200', function(done) {
      request.get('/api/rooms').expect(200, done);
    });
  });

});