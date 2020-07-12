const assert = require('assert');
const proxyquire = require('proxyquire');

// const {getRooms} = require('../api/rooms/controller');

const { roomsMock, RoomsServiceMock } = require('../utils/mocks/rooms.js');
const testServer = require('../utils/testServer');

describe('routes - rooms', function() {
  const route = proxyquire('../api/rooms/routes', {
    './controller': RoomsServiceMock
  });

  const request = testServer(route);

  describe('GET /rooms', function() {
    it('Should respond status 200', function(done) {
      request.get('/api/rooms').expect(200, done);
    });
  });

  it('Should respond with the list of rooms', function(done) {
    request.get('/api/rooms').end((err, res) => {
      assert.deepEqual(res.body, {
        error: '',
        body: roomsMock
      });

      done();
    });
  });
    
    describe('POST /rooms', function() {
      it('Should respond status 201', function(done) {
        request.post('/api/rooms').expect(201, done);
      });
    });

    it('Should respond with the id new room created', function(done) {
      request.post('/api/rooms').end((err, res) => {
        assert.match(res.body, {
          error: '',
          body: roomsMock[0]._id
        });
  
        done();
      });
    });

});