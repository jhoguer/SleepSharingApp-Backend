const express = require('express');
const controller = require('./controller');
const response = require('../../utils/response');


const router = express.Router();

router.post('/login', (req, res, next) => {
  console.log('passsssssss=======>', req.body.password)
  console.log('username=======>', req.body.username)
  controller.login(req.body.username, req.body.password)
    .then( token => {
      response.success(req, res, token, 200)
    })
    .catch( err => {
      console.error(err.message)
      response.error(req, res, err.message, 400)
    })
})

module.exports = router;