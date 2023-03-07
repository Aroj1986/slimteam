const express = require('express')
const jobWallRouter = express.Router()
const {createPost, getPosts, deletePostOne} = require('../CallbackFunctions/JobWallCallbackFunctions')

jobWallRouter.route('/jobwall').post(createPost).get(getPosts)
jobWallRouter.route('/jobwall/delete-post/:id').put(deletePostOne)

module.exports = jobWallRouter