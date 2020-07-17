

const withErrorStack = (error, stack) => {

  return {error};
  
}

const logError = (err, req, res, next) => {
  console.log(err);
  next(err);
}

const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json(withErrorStack(err.message, err.stack))
}

module.exports = {
  logError,
  errorHandler
}