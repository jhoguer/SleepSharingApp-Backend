const jwt = require('jsonwebtoken');
const { config } = require('../config/index');
const error = require('../utils/error');


const secret = config.jwtSecret;


const sign = data => {
  data = JSON.parse(JSON.stringify(data));

  return jwt.sign(data, secret);
}

const verify = token => {
  try {
    return jwt.verify(token, secret);
    
  } catch (err) {
    throw error(err.message, 500);
  }
}

const getToken = auth => {
  if (!auth) throw error('Token is empty!');

  if (auth.indexOf('Bearer') === -1) throw error('invalid format!');

  let token = auth.replace('Bearer ', '')

  return token;
}

const decodeHeader = req => {
  const authorization = req.headers.authorization || '';
  const token = getToken(authorization);
  const decoded = verify(token);

  req.idUser = decoded;

  return decoded;
}

const check = {
  own: (req, owner) => {
    // console.log('El reqqqq ', req);
    const decoded = decodeHeader(req);

    if (decoded.idUser !== owner) throw error('Invalid permissions!', 401);
  },
  logged: req => {
    const decoded = decodeHeader(req)
  }
}

module.exports = {
  sign,
  check
}