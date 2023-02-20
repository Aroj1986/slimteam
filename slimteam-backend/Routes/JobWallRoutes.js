const express = require('express')
const jobWallRouter = express.Router()
const {createPost, getPosts} = require('../CallbackFunctions/JobWallCallbackFunctions')

jobWallRouter.route('/jobwall').post(createPost).get(getPosts)

module.exports = jobWallRouter