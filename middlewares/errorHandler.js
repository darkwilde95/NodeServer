const internal_error = require('../assets/status').internal_error

module.exports = (error, req, res, next) => {
  console.error(error);
  res.status(internal_error.code).send(internal_error.msg);
}
