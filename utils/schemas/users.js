const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/); 
const arrayObjectsId = joi.array().items(joi.string().regex(/^[0-9a-fA-F]{24}$/));

const createUsersSchema = {
  firstName: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone: joi.string().alphanum().max(15).required(),
  photo: joi.string().max(500).required(),
  typeUser: joi.number().required(),
  ownRooms: arrayObjectsId,
  favorites: arrayObjectsId
}

module.exports = {
  userIdSchema,
  createUsersSchema
}