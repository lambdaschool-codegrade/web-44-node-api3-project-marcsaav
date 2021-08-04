const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.baseUrl}, ${Date.now()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = Users.getById(req.params.id)
    req.user = user
    next()
  } catch(err) {
    next({ status: 404, message: 'user not found'})
  }
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
