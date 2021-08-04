const Users = require('../users/users-model')

function logger(req, res, next) {
  console.log(`Method: ${req.method}, URL: ${req.baseUrl + req.url}, ${Date.now()}`)
  next()
}

function validateUserId(req, res, next) {
  let { id } = req.params
  Users.getById(id)
    .then((user) => {
      if(!user) {
        res.status(404).json({ message: 'user not found' })
      } else {
        req.user = user
        next()
      }
    })
    .catch(next)
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
