const express = require('express');
const RoomController = require('./controller');
const response = require('../../utils/response');


const router = express.Router();

const roomController = new RoomController()

router.get('/', (req, res, next) => {
  // const searchParams = req.query.roomParam || {};

  roomController.getRooms()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server Error', 500, err);
    })

});

router.get('/:id', (req, res, next) => {
  const {id} = req.params || '';
  console.log('Id en routes======>', id);
  roomController.get(id)
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err);
    });
});

router.post('/', (req, res, next) => {
  const roomData = req.body || {};

  roomController.addRoom(roomData)
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