let express = require('express')

let authRouters = express.Router()
let authController = require('../controllers/auth-controller')

authRouters.post('/otp/send', authController.sendOTPAPI)
authRouters.post('/otp/authenticate', authController.authenticateOTPApi)

module.exports = authRouters;