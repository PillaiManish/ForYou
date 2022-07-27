let express = require('express')

let authRouters = express.Router()
let authController = require('../controllers/auth-controller')

authRouters.get('/', authController.login)
authRouters.post('/register', authController.registerApi)

module.exports = authRouters;