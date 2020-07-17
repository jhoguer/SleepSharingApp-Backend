const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');
const secure = require('./secure');
const { roomIdSchema, createRoomSchema } = require('../../utils/schemas/rooms');
const validationHandler = require('../../utils/validationHandler');


const router = express.Router();

router.get('/', (req, res, next) => {
  let { location } = req.query;

  let query;

  if (!location) {
    query = {};
  } else {
    location = location.toUpperCase();
    query = { location: location }
  }

  controller.getRooms(query)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server Error', 500, err);
    })

});

router.get('/:id', validationHandler({ id: roomIdSchema }, 'params'), (req, res, next) => {
  const {id} = req.params || '';
  controller.get(id)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err);
    });
});

router.post('/', secure('addRoom'), validationHandler(createRoomSchema), (req, res, next) => {
  const roomData = req.body || {};

  controller.addRoom(roomData)
    .then(data => {
      response.success(req, res, data, 201);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err)
    })

})


module.exports = router;