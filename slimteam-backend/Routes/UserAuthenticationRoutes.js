const express = require('express')
const userAuthenticationRouter = express.Router()
const {registerUser, getUsers, loginUser, logoutUser} = require('../CallbackFunctions/UserAuthenticationCallbackFunctions')

userAuthenticationRouter.route('/register').post(registerUser).get(getUsers)
userAuthenticationRouter.route('/login').post(loginUser)
userAuthenticationRouter.route('/logout').post(logoutUser)

module.exports = userAuthenticationRouter