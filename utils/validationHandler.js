const joi = require('@hapi/joi');

const validate = (data, schema) => {
  const { error } = joi.object(schema).validate(data);
  return error;
}

const validationHandler = (schema, check = 'body') => {
  return function(req, res, next) {
    const error = validate(req[check],schema);

    error ? next(new Error(error)) : next();
  }
}

module.exports = validationHandler;