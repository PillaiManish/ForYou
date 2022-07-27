let express = require('express')

let authRouters = express.Router()
let authController = require('../controllers/auth-controller')

authRouters.post('/authenticate', authController.authenticationAPI)

module.exports = authRouters;