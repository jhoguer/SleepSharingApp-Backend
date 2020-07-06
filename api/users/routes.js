const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');


const router = express.Router();


router.get('/', (req, res, next) => {
  res.status(200).json({
    devuelve: 'datos de 1 usuario'
  })
});

router.post('/', (req, res, next) => {
  const userData = req.body || {};

  controller.addUser(userData)
    .then(createdUserId => {
      response.success(req, res, createdUserId, 201);
    })
    .catch(err => {
      response.error(req, res, 'Server error', 500, err);
    });
});

module.exports = router;