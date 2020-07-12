const err = (message, code) => {
  let e = new Error(message)

  if (code) {
    e.statusCode = code
  }

  return e.message;
}

module.exports = err