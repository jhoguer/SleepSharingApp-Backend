const express = require('express');


const router = express.Router();

router.get('/', (req, res, next) => {
  const searchParams = req.query.roomParam || {};
  console.log(searchParams)

  res.status(200).json({
    devuleve: searchParams
  });
});

router.get('/:id', (req, res, next) => {
  res.status(200).json({
    devuelve: 'Una habitaion'
  });
});

router.post('/', (req, res, next) => {
  const roomData = req.body || {};

  
})

// router.get('/', (req, res, next) => {
//   res.status(200).json({
//     devuelve: 'Todas las habitaiones'
//   });
// });

module.exports = router;