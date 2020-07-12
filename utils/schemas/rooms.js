const joi = require('@hapi/joi');

const roomIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/); 
const arrayIcons = joi.array().items(joi.string().max(15));
const arrayPhotos = joi.array().items(joi.string().max(350));

const createRoomSchema = {
  idHost: joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  city: joi.string().required(),
  direction: joi.string().max(50).required(),
  neighborhood: joi.string().max(50).required(),
  location: joi.string().max(20).required(),
  size: joi.string().max(10).required(),
  price: joi.string().max(8).required(),
  description: joi.string().max(50).required(),
  furniture: joi.string().max(100).required(),
  photos: arrayPhotos.required(),
  icons: arrayIcons.required(),
  messageHost: joi.string().max(200).required(),
  state: joi.string().max(15).required()
};


module.exports = {
  roomIdSchema,
  createRoomSchema,
}