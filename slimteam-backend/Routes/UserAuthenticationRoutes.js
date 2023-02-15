const express = require('express')
const userAuthenticationRouter = express.Router()
const {registerUser, loginUser, logoutUser} = require('../CallbackFunctions/UserAuthenticationCallbackFunctions')

userAuthenticationRouter.route('/register').post(registerUser)
userAuthenticationRouter.route('/login').post(loginUser)
userAuthenticationRouter.route('/logout').post(logoutUser)

module.exports = userAuthenticationRouter