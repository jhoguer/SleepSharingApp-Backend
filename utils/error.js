

const withErrorStack = (error, stack) => {
  // let e = new Error(message)

  // if (code) {
  //   e.statusCode = code
  // }

  // return { error, stack };
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