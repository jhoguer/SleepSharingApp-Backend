const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');


const router = express.Router();

router.post('/login', (req, res, next) => {
  controller.login(req.body.username, req.body.password)
    .then( token => {
      response.success(req, res, token, 200)
    })
    .catch( err => {
      // response.error(req, res, err.message, 400)
      next(err);
    })
})

module.exports = router;