const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');
const secure = require('./secure');
const { userIdSchema, createUsersSchema } = require('../../utils/schemas/users');
const validationHandler = require('../../utils/validationHandler');


const router = express.Router();


router.get('/', (req, res, next) => {
  controller.getUsers()
  .then(data => {
    response.success(req, res, data, 200);
  })
  .catch(err => {
    response.error(req, res, 'Server Error', 500, err);
  })
});

router.post('/', validationHandler(createUsersSchema), (req, res, next) => {
  const userData = req.body || {};

  controller.addUser(userData)
    .then(createdUserId => {
      response.success(req, res, createdUserId, 201);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err);
    });
});

// router.patch('/', (req, res, next) => {
//   const { idHost, idRoom } = req.body;

//   controller.addRoomToHost(idRoom, idHost)
//     .then(id => {
//       response.success(req, res, id, 200);
//     })
//     .catch(err => {
//       response.error(req, res, 'Server error', 500, err);
//     })
// })

router.patch('/:id/fav', secure('addFavorites'), (req, res, next) => {
  const { id: idUSer } = req.params;
  const { idRoom } = req.query;

  console.log(idUSer)
  console.log(idRoom)

  controller.addFavorites(idUSer, idRoom)
    .then(id => {
      response.success(req, res, id, 200);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err);
    })
})

module.exports = router;