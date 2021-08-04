const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.baseUrl}, ${Date.now()}`)
  next()
}

async function validateUserId(req, res, next) {
  try {
    const user = await Users.getById(req.params.id)
    req.user = user
    next()
  } catch(err) {
    next({ status: 404, message: 'user not found'})
  }
}

function validateUser(req, res, next) {
  let { name } = req.body
  if(!name) {
    res.status(400).json({ message: "missing required name field" })
  } else {
    next()
  }
}

function validatePost(req, res, next) {
  let { text } = req.body
  if(!text) {
    res.status(400).json({ message: "missing required text field" })
  } else {
    next()
  }
}

// do not forget to expose these functions to other modules

module.exports = {
  logger,
  validateUserId,
  validateUser,
  validatePost
}
