const auth = require('../../auth');

module.exports = checkAuth = (action) => {
  const middleware = (req, res, next) => {
    switch(action) {
      case 'addRoom':
        const { idHost: owner } = req.body;
        auth.check.own(req, owner)
        next()
        break
      
      default:
        next()
    }
  }

  return middleware
}