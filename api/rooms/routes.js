const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');
const secure = require('./secure');
const { roomIdSchema, createRoomSchema } = require('../../utils/schemas/rooms');
const validationHandler = require('../../utils/validationHandler');


const router = express.Router();

router.get('/', (req, res, next) => {
  // const searchParams = req.query.roomParam || {};

  controller.getRooms()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server Error', 500, err);
    })

});

router.get('/:id', validationHandler({ id: roomIdSchema }, 'params'), (req, res, next) => {
  const {id} = req.params || '';
  console.log('Id en routes======>', id);
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

  // res.status(201).json({
  //   devuleve: roomData
  // });

})

// router.get('/', (req, res, next) => {
//   res.status(200).json({
//     devuelve: 'Todas las habitaiones'
//   });
// });


// router.patch('/', (req, res, next) => {
//   const { idHost, idRoom } = req.body;

//   controller.updateUser(idHost, idRoom)
//     .then(id => {
//       response.success(req, res, id, 200);
//     })
//     .catch(err => {
//       response.error(req, res, 'Server error', 500, err);
//     })
// })

module.exports = router;