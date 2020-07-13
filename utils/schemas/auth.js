const joi = require('@hapi/joi');

const loginAuthSchema = {
  username: joi.string().email().required(),
  password: joi.string().alphanum().required()
}

module.exports = {
  loginAuthSchema
}