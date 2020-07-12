const auth = require('../../auth');

module.exports = checkAuth = (action) => {
  const middleware = (req, res, next) => {
    //console.log('Se imprime el req en secure->', req.headers)
    switch(action) {
      case 'addFavorites':
        const { id: owner } = req.params
        auth.check.own(req, owner)
        next()
        break
      
      case 'follow':
        auth.check.logged(req)
        next()
        break

      default:
        next()
    }
  }

  return middleware
}