const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');
const { loginAuthSchema } = require('../../utils/schemas/auth');
const validationHandler = require('../../utils/validationHandler');


const router = express.Router();

router.post('/login', validationHandler(loginAuthSchema), (req, res, next) => {
  controller.login(req.body.username, req.body.password)
    .then( token => {
      response.success(req, res, token, 200)
    })
    .catch( err => {
      next(err);
    })
})

module.exports = router;