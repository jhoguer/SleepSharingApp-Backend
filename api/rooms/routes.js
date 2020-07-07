const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');


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

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    devuelve: 'Una habitaion'
  });
});

router.post('/', (req, res, next) => {
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

module.exports = router;