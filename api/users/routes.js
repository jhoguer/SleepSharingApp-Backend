const express = require('express');


const router = express.Router();


router.get('/', (req, res, next) => {
  res.status(200).json({
    devuelve: 'datos de 1 usuario'
  })
})

module.exports = router;